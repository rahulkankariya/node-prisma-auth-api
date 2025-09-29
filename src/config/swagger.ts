import swaggerUi from 'swagger-ui-express';
import { Express, Router } from 'express';


function addRoutesToSwagger(prefix: string, router: Router, paths: any) {
  router.stack.forEach((layer: any) => {
   
    if (layer.route) {
      const routePath = prefix + layer.route.path;
      const methods = Object.keys(layer.route.methods);
      methods.forEach((method) => {
        paths[routePath] = paths[routePath] || {};
        paths[routePath][method] = {
          summary: `Auto route: ${method.toUpperCase()} ${routePath}`,
          requestBody: {
            required: false,
            content: {
              'application/json': { schema: { type: 'object' } },
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    file: { type: 'string', format: 'binary' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Success' },
            400: { description: 'Bad request' },
            401: { description: 'Unauthorized' },
          },
        };
      });
    }
 
    else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
      let newPrefix = prefix;

     
      if (layer.regexp && layer.regexp.source) {
        const routeMatch = layer.regexp.source
          .replace('\\/?', '')
          .replace('^', '')
          .replace('(?:\\/(?=$))?$', '')
          .replace(/\\\//g, '/');

        if (routeMatch !== '') {
          newPrefix += routeMatch.startsWith('/') ? routeMatch : '/' + routeMatch;
        }
      }

      addRoutesToSwagger(newPrefix, layer.handle, paths);
    }
  });
}

export const swaggerSetup = (app: Express, routers: { prefix: string; router: Router }[]) => {
  const paths: Record<string, any> = {};

  routers.forEach(({ prefix, router }) => {
    addRoutesToSwagger(prefix, router, paths);
  });

  const swaggerDoc = {
    openapi: '3.0.0',
    info: {
      title: 'Auto-generated API',
      version: '1.0.0',
      description: 'Swagger docs generated from Express routes',
    },
    servers: [{ url: 'http://localhost:5000/' }],
    paths,
    components: {
      securitySchemes: {
        bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      },
       parameters: {
      AcceptLanguageHeader: {
        name: 'accept-language',
        in: 'header',
        description: 'Optional language code for translations (e.g., en, es)',
        required: false,
        schema: {
          type: 'string',
          default: 'en',
        },
      },
    }
    },
  };

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
  console.log('Swagger docs available at /docs');
};

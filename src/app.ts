import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { i18nMiddleware } from './middlewares/i18n.middleware';
import { swaggerSetup } from './config/swagger';
import { languageMiddleware } from './middlewares/languageMiddleware';
dotenv.config();
const app = express();
const prisma = new PrismaClient();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(languageMiddleware);
app.use(i18nMiddleware);

app.use('/uploads', express.static('uploads'));


app.use('/api', routes);


swaggerSetup(app, [{ prefix: '/api', router: routes }]);


app.use(errorHandler);


async function checkDatabase() {
  try {
    await prisma.$connect();
    console.log('Prisma connected to database!');

    const dbName = await prisma.$queryRaw<{ current_database: string }[]>`SELECT current_database() AS current_database;`;
    console.log('Connected DB name:', dbName[0]?.current_database);
 
  } catch (err) {
    console.error(' Prisma connection error:', err);
  }
}

checkDatabase();

export default app;

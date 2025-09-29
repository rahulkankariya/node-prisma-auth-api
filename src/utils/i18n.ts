import * as path from 'path';
import * as fs from 'fs';

const localeDir = path.join(__dirname, '../locales');

// Preload all JSON files
const locales: Record<string, Record<string, string>> = {};
fs.readdirSync(localeDir).forEach(file => {
  if (file.endsWith('.json')) {
    const lang = file.replace('.json', '');
    const content = fs.readFileSync(path.join(localeDir, file), 'utf-8');
    locales[lang] = JSON.parse(content);
  }
});

export const t = (key: string, req?: any, lang?: string) => {
  const language =
    lang ||
    (req?.headers?.['accept-language']?.split(',')[0].trim()) ||
    'en';
  const L = locales[language] || locales['en'];
  return L[key] || locales['en'][key] || key;
};

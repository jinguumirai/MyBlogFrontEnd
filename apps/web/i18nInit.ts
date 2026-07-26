import i18n from 'i18next';
import { initReactI18next } from "react-i18next";
import en from './src/locales/en.json';
import cn from './src/locales/cn.json';
import jp from './src/locales/jp.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      cn: { translation: cn },
      jp: { translation: jp }
    },
    lng: "jp",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });
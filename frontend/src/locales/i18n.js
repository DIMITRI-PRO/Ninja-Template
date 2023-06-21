import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./en.json";
import translationFR from "./fr.json";

export default i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    fr: {
      translation: translationFR,
    },
  },
  lng: "fr",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

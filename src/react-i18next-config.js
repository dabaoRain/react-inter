import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from "i18next";
import { initReactI18next } from "react-i18next";


import cn from './locales/zh-cn.json'
import hk from './locales/zh-HK.json'
import en from './locales/en-us.json'

const resources = {
  "zh-CN": {
    translation: cn
  },
  "zh-HK": {
    translation: hk
  },
  "en-US": {
    translation: en
  },
};

i18n.use(LanguageDetector) //嗅探当前浏览器语言 
.use(initReactI18next) 
  .init({
    resources,
    fallbackLng: "zh-CN",
    debug: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    detection: {
      caches: ['localStorage', 'sessionStorage', 'cookie'],
    }
  })

export default i18n

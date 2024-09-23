import i18n, {
    LanguageDetectorAsyncModule,
    Services,
    InitOptions,
  } from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ar, en, hi } from '.';

const STORE_LANGUAGE_KEY = "settings.lang";
const CHOOSED_LANAUAGE = "en";


const languageDetectorPlugin: LanguageDetectorAsyncModule = {
    type: "languageDetector",
    async: true,
    init: (
        _services: Services,
        _detectorOptions: object,
        _i18nextOptions: InitOptions,
      ) => {
        /* use services and options */
      },
    detect: (callback: (lng: string) => void) => {
        try {
            // get stored language from Async storage
            // put your own language detection logic here
             AsyncStorage.getItem(STORE_LANGUAGE_KEY).then((language) => {
                if (language) {
                    //if language was stored before, use this language in the app
                    return callback(language);
                } else {
                    //if language was not stored yet, use english
                    return callback(CHOOSED_LANAUAGE);
                }
            });
        } catch (error) {
            console.log("Error reading language", error);
        }
    },
    cacheUserLanguage: async function (language: string) {
        try {
            const lan = await AsyncStorage.getItem(STORE_LANGUAGE_KEY)
            console.log("language is:: "+ lan)
            //save a user's language choice in Async storage
            await AsyncStorage.setItem(STORE_LANGUAGE_KEY, language);
        } catch (error) {
            console.log("Error saving language", error);
         }
    },
};

const resources = {
    en: {
        translation: en,
    },
    hi: {
        translation: hi,
    },
    ar: {
        translation: ar,
    },
};

i18n.use(languageDetectorPlugin).use(initReactI18next).init({
    resources: resources,
    compatibilityJSON: 'v3',
     // default language is set to hindi
    // fallback language is set to english
    interpolation: {
        escapeValue: false,
    },
    react: {
        useSuspense: false,
    },
});

/* i18n.on('languageChanged', (lng: string) => {
    console.log("language changed reading language", lng);
}); */

export default i18n;
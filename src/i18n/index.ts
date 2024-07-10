import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import vi from "./vi";
import en from "./en";
i18n
.use(initReactI18next)
    .init({
        resources: {
            en,
            vi 
        },
        lng: localStorage.getItem("lng") || "",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });
    
import resources from "./translations";
/*import i18n from "i18next";
import {initReactI18next} from "react-i18next";
i18n.use(initReactI18next).init({
  resources,
  lng: "es",
  fallbackLng: "es",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});
export default i18n;*/
export default function t(tag) {
  const traduction = resources[process.env.REACT_APP_LNG].translation[tag];
  if (traduction === undefined) {
    return tag;
  }
  return traduction;
}

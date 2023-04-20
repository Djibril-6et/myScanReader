import I18n from "react-native-i18n";
import en from "./locales/en";
import fr from "./locales/fr";
import pt from "./locales/pt";

I18n.fallbacks = true;

I18n.translations = {
  en,
  fr,
  pt,
};

I18n.defaultLocale = "en";

export default I18n;

import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import theme from "./src/config/styledTheme";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./StackNavigator";
// REDUX
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/config/store";
import { LanguageProvider } from "./src/traduction/LanguageContext";
import I18n from "./src/traduction/i18n";
import Header from "./src/components/Header"

const App = () => {
  const [language, setLanguage] = useState("en");

  const [myTheme, setTheme] = useState("dark");
  const isDarkTheme = myTheme === 'dark'

  const toggleTheme = () => {
    setTheme(isDarkTheme ? 'light' : 'dark')
  }

  const handleSetLanguage = (lang) => {
    i18n.locale = lang;
    setLanguage(lang);
  };

  return (
    <LanguageProvider value={{ language, setLanguage: handleSetLanguage }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <ThemeProvider theme={isDarkTheme ? theme.darkTheme : theme.lightTheme}>
              <StackNavigator/>
              <Header toggleTheme={toggleTheme}/>
            </ThemeProvider>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </LanguageProvider>
  );
};

export default App;

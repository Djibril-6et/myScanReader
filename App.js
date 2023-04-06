import React from "react";
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

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LanguageProvider>
          <NavigationContainer>
            <ThemeProvider theme={theme}>
              <StackNavigator />
            </ThemeProvider>
          </NavigationContainer>
        </LanguageProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;

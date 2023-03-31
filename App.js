import React from "react";
import { ThemeProvider } from 'styled-components';
import theme from './src/config/styledTheme';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import StackNavigator from "./StackNavigator"
import Header from './src/components/Header'

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StackNavigator />
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/pages/Home'
import MangaScans from './src/pages/MangeScans'
import Favorites from './src/pages/Favorites'

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, cardStyle: { backgroundColor: '#0A0A0A' }}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="MangaScans" component={MangaScans} />
      <Stack.Screen name="Favorites" component={Favorites} />
    </Stack.Navigator>
  );
};

export default StackNavigator;

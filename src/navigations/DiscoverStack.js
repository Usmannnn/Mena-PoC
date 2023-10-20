import React from 'react';
import Discover from '../screens/Discover';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Detail from '../screens/Detail';

const Stack = createNativeStackNavigator();

const DiscoverStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};

export default DiscoverStack;

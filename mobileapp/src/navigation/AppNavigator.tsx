import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BottomTabs from './BottomTabs';

const Drawer = createDrawerNavigator();

const AppNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen
      name="Main"
      component={BottomTabs}
      options={{headerShown: false}}
    />
  </Drawer.Navigator>
);

export default AppNavigator;

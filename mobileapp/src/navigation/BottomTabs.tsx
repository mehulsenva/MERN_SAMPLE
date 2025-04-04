import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import Screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => (
  <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({color, size}) => {
        let iconName;
        if (route.name === 'Home') iconName = 'home-outline';
        else if (route.name === 'Profile') iconName = 'account-outline';
        else if (route.name === 'Settings') iconName = 'cog-outline';

        return <Icon name={iconName || 'info'} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#2da07b',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: {
        backgroundColor: '#222',
        height: 72,
        paddingBottom: 8,
        paddingTop: 8,
      },
      tabBarLabelStyle: {
        fontSize: 12,
        marginTop: -2,
      },
    })}>
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{headerShown: false}}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{headerShown: false}}
    />
  </Tab.Navigator>
);

export default BottomTabs;

import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'

import {
  HomeNavigator,
  SearchNavigator,
  FavoritesNavigator,
  SettingsNavigator,
} from 'navigation/StackNavigator'

const screenOptionStyle = {
  activeTintColor: '#000000',
}

const Tab = createBottomTabNavigator()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator tabBarOptions={screenOptionStyle}>
      <Tab.Screen name="Home" component={HomeNavigator} />
      <Tab.Screen name="Search" component={SearchNavigator} />
      <Tab.Screen name="Favorites" component={FavoritesNavigator} />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator

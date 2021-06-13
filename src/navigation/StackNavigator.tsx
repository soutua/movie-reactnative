import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Search from 'features/search/Search'
import Favorites from 'features/favorites/Favorites'
import Category from 'features/category/Category'
import Details from 'features/details/Details'
import Login from 'features/auth/Login'
import Settings from 'features/auth/Settings'
import Register from 'features/auth/Register'
import {RootStackParamList} from 'app/types'

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#0d0d16',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
}

const Stack = createStackNavigator<RootStackParamList>()

const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen
        name="Home"
        children={() => <Category category="popular" />}
      />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
}

const SearchNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
}

const FavoritesNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
}

const SettingsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  )
}

export {HomeNavigator, SearchNavigator, FavoritesNavigator, SettingsNavigator}

import 'react-native-gesture-handler'
import React from 'react'
import {useEffect} from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {loadAuth} from 'features/auth/authSlice'
import {loadConfig} from 'features/config/configSlice'
import {selectConfig} from 'features/config/configSlice'
import {View} from 'react-native'
import {Provider} from 'react-redux'
import {store} from 'app/store'
import BottomTabNavigator from 'navigation/BottomTabNavigator'

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(loadAuth())
    dispatch(loadConfig())
  }, [dispatch])

  const config = useAppSelector(selectConfig)

  if (config) {
    return (
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    )
  } else {
    return <View />
  }
}

export default AppWrapper

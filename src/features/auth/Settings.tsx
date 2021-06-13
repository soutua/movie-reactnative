import {useNavigation} from '@react-navigation/core'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {margins} from 'app/styles'
import React from 'react'
import {Button, StyleSheet, View} from 'react-native'
import {getAuth, logout} from './authSlice'

const styles = StyleSheet.create({
  button: {
    margin: margins.md,
  },
})

const Settings = () => {
  const auth = useAppSelector(getAuth)
  const dispatch = useAppDispatch()
  const navigation = useNavigation()

  if (auth) {
    return (
      <View style={styles.button}>
        <Button onPress={() => dispatch(logout())} title="Logout" />
      </View>
    )
  } else {
    return (
      <View>
        <View style={styles.button}>
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
        <View style={styles.button}>
          <Button
            title="Register"
            onPress={() => navigation.navigate('Register')}
          />
        </View>
      </View>
    )
  }
}

export default Settings

import React, {useEffect} from 'react'
import {Formik} from 'formik'
import {useAppDispatch, useAppSelector} from 'app/hooks'
import {getAuth, getRegisterError, register} from './authSlice'
import {Button, StyleSheet, Text, View} from 'react-native'
import {TextInput} from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/core'
import * as Yup from 'yup'
import {colors, margins} from 'app/styles'

interface RegisterFormValues {
  username: string
  password: string
}

const registerSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
})

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginStart: margins.md,
    marginEnd: margins.md,
    marginTop: margins.md,
    borderWidth: 1,
    color: colors.primary,
  },
  error: {
    color: colors.error,
    marginTop: margins.sm,
    marginStart: margins.md,
  },
  button: {
    margin: margins.md,
  },
})

const Register = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector(getAuth)
  const registerError = useAppSelector(getRegisterError)
  const navigation = useNavigation()

  const handleRegister = (values: RegisterFormValues) => {
    dispatch(
      register({
        username: values.username,
        password: values.password,
      }),
    )
  }

  useEffect(() => {
    if (auth) {
      navigation.goBack()
    }
  }, [auth, navigation])

  if (auth) {
    return <View />
  } else {
    const initialValues: RegisterFormValues = {username: '', password: ''}

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={handleRegister}
        validationSchema={registerSchema}>
        {({handleChange, handleBlur, handleSubmit, values, errors}) => (
          <View>
            <TextInput
              style={styles.input}
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              autoCapitalize="none"
            />
            {errors.username ? (
              <Text style={styles.error}>Username required</Text>
            ) : null}
            <TextInput
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              autoCapitalize="none"
              secureTextEntry={true}
            />
            {errors.password ? (
              <Text style={styles.error}>Password required</Text>
            ) : null}
            {registerError && (
              <Text style={styles.error}>
                {registerError === 'username_exists'
                  ? 'Username already taken'
                  : 'Registration failed'}
              </Text>
            )}
            <View style={styles.button}>
              <Button onPress={handleSubmit} title="Register" />
            </View>
          </View>
        )}
      </Formik>
    )
  }
}

export default Register

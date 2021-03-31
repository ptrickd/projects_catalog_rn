import React, { useState, useEffect, useMemo, useReducer } from 'react';
import { View, ActivityIndicator } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import RootStackScreen from './Screens/RootStackScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from './constants/Colors';
import { AuthContext } from './components/context';
import { config } from "./config/config";


export default function App() {

  const MainStack = createStackNavigator();


  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null
  }

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false
        };
    }
  }

  const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);

  const authContext = useMemo(() => ({

    signIn: (username, password) => {
      console.log(username, password)
      fetch(`${config.SERVER.URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password
        })
      })
        .then(resp => resp.json())
        .then(data => {
          dispatch({ type: 'LOGIN', id: userName, token: userToken })
        })
        .catch(err => console.log('err::', err))
    },
    signOut: () => {
      dispatch({ type: 'LOGOUT' })
    }
  }));

  // useEffect(() => {
  //   dispatch({ type: 'RETRIEVE_TOKEN', token: 'kkdkdk' })
  // }, [])

  // if (loginState.isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color={Colors.title} />
  //     </View>
  //   )
  // }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken
          ? <MainStack.Navigator>
            <MainStack.Screen name="HomeScreen" component={HomeScreen} options={{
              title: "Home",
              headerTitleAlign: 'center',
              headerTintColor: Colors.title
            }} />
            <MainStack.Screen name="DetailsScreen" component={DetailsScreen} options={{
              title: "Details",
              headerTitleAlign: 'center',
              headerTintColor: Colors.title
            }} />
          </MainStack.Navigator>

          : <RootStackScreen />
        }
      </NavigationContainer >
    </AuthContext.Provider>

  );
}


import React, { useState, useEffect, useReducer, useMemo } from 'react';
import { View, ActivityIndicator } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import RootStackScreen from './Screens/RootStackScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from './constants/Colors';
import { AuthContext } from './components/context';
import { config } from './config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {
  const [isLogin, setIsLogin] = useState(false)
  const MainStack = createStackNavigator();


  const initialState = {
    isLoading: true,
    isLogin: false,
    user: {}
  }


  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOGIN':
        // console.clear
        // console.log('case LOGIN:Paylaod', action.payload)
        // console.log('case LOGIN:prevState', prevState)
        return {
          ...prevState,
          isLoading: false,
          isLogin: true,
          user: action.payload
        };
      case 'LOGOUT':
        return {
          ...prevState,
          isLoading: false,
          isLogin: false,
          user: {}
        };
      default:
        return prevState;
    }
  }




  const [loginState, dispatch] = useReducer(loginReducer, initialState)

  const authContext = useMemo(() => ({

    signIn: async (username, password) => {
      try {
        const response = await fetch(`${config.SERVER.URL}/api/auth/signin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username,
            password
          })
        })
        if (!response) throw new Error('Server Error')
        const data = await response.json()
        await AsyncStorage.setItem('userToken', data.accessToken)
        dispatch({ type: 'LOGIN', payload: data })
        // const result = await AsyncStorage.getItem('userToken')
        // console.log(data)
      }
      catch (err) {
        console.log(err)
      }
    },
    signOut: () => {
      dispatch({ type: 'LOGOUT' })
    }
  }), []);


  useEffect(() => {
    setIsLogin(loginState.isLogin)
  }, [loginState])
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

        {false ? (<MainStack.Navigator>
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
        </MainStack.Navigator>)

          : <RootStackScreen />
        }
      </NavigationContainer >
    </AuthContext.Provider>

  );
}


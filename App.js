import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function App() {

  const MainStack = createStackNavigator();

  return (
    <NavigationContainer>
      <MainStack.Navigator>
        <MainStack.Screen name="HomeScreen" component={HomeScreen} options={{ title: "Home" }} />
        <MainStack.Screen name="DetailsScreen" component={DetailsScreen} options={{ title: "Details" }} />
      </MainStack.Navigator>
    </NavigationContainer>
    // <View style={styles.container}>
    //   <HomeView />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

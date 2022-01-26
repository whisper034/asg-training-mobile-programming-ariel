import React from 'react';
import { NavigationContainer, StackActions, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootStackParamList';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"HomeScreen"}>
        <Stack.Screen 
          name={"HomeScreen"} 
          component={HomeScreen} 
          options={({navigation}) => ({
            headerStyle: {
              backgroundColor: "#755f43",
            },
            headerTintColor: "white",
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => navigation.navigate("FavoriteScreen")}>
                  <Image source={require('../../images/star_white.png')} style={styles.headerButton}/>
              </TouchableOpacity>
            ),
            title: "Home",
          })}
        />
        <Stack.Screen 
          name={"DetailScreen"} 
          component={DetailScreen} 
          options={{
            headerStyle: {
              backgroundColor: "#755f43",
            },
            headerTintColor: "white",
            title: "GitHub User Details"
          }}
        />
        <Stack.Screen 
          name={"FavoriteScreen"} 
          component={FavoriteScreen} 
          options={{
            headerStyle: {
              backgroundColor: "#755f43",
            },
            headerTintColor: "white",
            title: "Favorites"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

const styles = StyleSheet.create ({
  headerButton: {
    height: 27,
    width: 27,
  }
})
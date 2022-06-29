import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from './Screens/Home.js';
import Map from './Screens/Maps.js';
import Settings from './Screens/Settings.js';
import Notes from './Screens/Notes.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

//theme: cotton candy
//https://coolors.co/palette/d8e2dc-ffe5d9-ffcad4-f4acb7-9d8189

//cookies and cream
//https://coolors.co/palette/ede0d4-e6ccb2-ddb892-b08968-7f5539-9c6644

//matcha lover
//https://coolors.co/e5f9e0-a3f7b5-40c9a2-2f9c95-664147

//taro coconut
//https://coolors.co/564787-dbcbd8-f2fdff-9ad4d6-101935

//create bottom tab navbar
const Tab = createBottomTabNavigator();

export default function App() {

  const [currentTheme, setCurrentTheme] = useState('cottonCandy');

  const getTheme = async () => {
    try {
      const theme = await AsyncStorage.getItem('theme')
      if(theme !== null) {
        // value previously stored
        setCurrentTheme(theme);
      } else {
        setCurrentTheme('cottonCandy')
      }
    } catch(e) {
      // error reading value
      console.log(e)
    }
  }

  const storeTheme = (newTheme) => {
    try {
      AsyncStorage.setItem('theme', newTheme)
      setCurrentTheme(newTheme)
      getTheme()
    } catch (e) {
      // saving error
      console.log(e)
    }
  }

  useEffect(() => {getTheme()}, [])

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            //change navbar icons based on active screen
            if (route.name === 'Home') {
              iconName = focused
                ? 'home'
                : 'home-outline';
            } else if (route.name === 'Settings') {
              iconName = focused 
                ? 'settings' 
                : 'settings-outline';
            } else if (route.name === 'Map') {
              iconName = focused 
                ? 'cafe' 
                : 'cafe-outline';
            } else if (route.name === 'Notes') {
              iconName = focused 
                ? 'document-text' 
                : 'document-text-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: currentTheme == 'cottonCandy' ? '#F4ACB7' : '#C1B8BB',
          tabBarInactiveTintColor: currentTheme == 'cottonCandy' ? '#F4ACB7' : '#C1B8BB',
          tabBarStyle: {backgroundColor: currentTheme == 'cottonCandy' ? '#FFECE4' : '#664147'},
          headerStyle: {backgroundColor: currentTheme == 'cottonCandy' ? '#FFECE4' : '#664147'},
          headerTintColor: currentTheme == 'cottonCandy' ? '#F4ACB7' : '#C1B8BB'
        })}
      >
        <Tab.Screen name="Home">{(props) => <Home {...props} storeTheme={ storeTheme } currentTheme={ currentTheme }/>}</Tab.Screen>
        <Tab.Screen name="Map">{(props) => <Map {...props} storeTheme={ storeTheme } currentTheme={ currentTheme }/>}</Tab.Screen>
        <Tab.Screen name="Notes">{(props) => <Notes {...props} storeTheme={ storeTheme } currentTheme={ currentTheme }/>}</Tab.Screen>
        <Tab.Screen name="Settings">{(props) => <Settings {...props} storeTheme={ storeTheme } currentTheme={ currentTheme }/>}</Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
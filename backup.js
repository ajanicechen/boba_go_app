import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import locations from './locations.json';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

//theme: cotton candy
//https://coolors.co/palette/d8e2dc-ffe5d9-ffcad4-f4acb7-9d8189

//cookies and cream
//https://coolors.co/palette/ede0d4-e6ccb2-ddb892-b08968-7f5539-9c6644

//loads home
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Boba Go Loaded!</Text>
    </View>
  );
}

//loads map
function BobaMap() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } 

  console.log(location)

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <MapView style={styles.map}
    region={{
      latitude: locations[0].lat,
      longitude: locations[0].long,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}>
      {locations.map((marker, index) => (
      <Marker
    coordinate={{ latitude : marker.lat , longitude : marker.long }} key={marker.name} image={require('./assets/marker.png')}
    />
    ))}
    </MapView>    
    </View>
  );
}

//loads settings
function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings!</Text>
    </View>
  );
}

//create bottom tab navbar
const Tab = createBottomTabNavigator();

export default function App() {
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
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#F4ACB7',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={BobaMap} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

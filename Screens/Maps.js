import { Text, View, } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import myMarker from '../assets/marker.png';
import matchaMarker from '../assets/matcha_marker.png';
import CottonCandy from '../Styles/CottonCandy.js'
import MatchaLuvr from '../Styles/MatchaLuvr.js'


//loads map
export default function MapScreen({route, navigation, currentTheme, markers}) {

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    
    let msg
    let style

    if(currentTheme === 'cottonCandy'){
      style = CottonCandy
    } else {
      style = MatchaLuvr
    }

    //lowkey initial region
    const [region, setRegion] = useState({
      latitude: 51.916900,
      longitude: 4.478560,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })

    //use effect for different ways to handle
    useEffect(() => {
      //when pressing the map tab on navbar, show current user location
      navigation.addListener('tabPress', (e) => {
          if (location) {
              setRegion({
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
              })
          }
      })
      //when someone navigates through the list
      if (route.params?.latitude) {
          setRegion({
              latitude: route.params.latitude,
              longitude: route.params.longitude,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421
          })
      }
      //when current location is found, show current location
      else if (location) {
          setRegion({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.00922,
              longitudeDelta: 0.00421
          })
      }
  }, [location, route.params?.latitude, route])
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        } else {
          setErrorMsg('please give us a moment to find ur location...');
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);

      })();
    }, []);
  
    //message for view
    if (location == null) {
      msg = errorMsg
    } //else {
      //msg = "Location found!"
    //}

    return (
      <View style={style.container}>
      <Text style={style.msg}>{msg}</Text>
      <MapView style={style.map}
      showsUserLocation
      region={ region}>
        {//map through all marker locations
        markers.map((marker, index) => (
        <Marker coordinate={{ latitude : marker.lat , longitude : marker.long }} key={marker.name} image={myMarker} 
          onPress={ ()=> navigation.navigate("Notes", {"marker": marker})}/>
        ))}
      </MapView>    
      </View>
    );
  }

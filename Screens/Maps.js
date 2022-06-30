import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useState, useEffect } from 'react';
import myMarker from '../assets/marker.png';
import matchaMarker from '../assets/matcha_marker.png';
import Style from '../Styles/Style.js'


//loads map
export default function MapScreen({route, navigation}) {
    const [location, setLocation] = useState(null);
    const [markers, setMarkers] = useState([])
    const [errorMsg, setErrorMsg] = useState(null);

    //lowkey initial region
    const [region, setRegion] = useState({
      latitude: 51.916900,
      longitude: 4.478560,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421
    })

    //GET Request
    const myHeadersGET = new Headers()
    myHeadersGET.append('Accept', 'application/json')

    const myInitGET = {
      method: 'GET',
      headers: myHeadersGET
    }

    const apiUrl = 'https://stud.hosted.hr.nl/0999525/boba_marker_locations.json'

    const loadJSON = () => {
      fetch(apiUrl, myInitGET)
      .then(res => res.json())
      .then(data => updateData(data))
      .catch(error => console.log(error))
    }

    function updateData(data){
      setMarkers(data)
    }

    useEffect(() => {loadJSON()}, [])

    useEffect(() => {
      //when pressing the map tab on navbar, show current location
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
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      })();
    }, []);
  
    let text = 'Waiting...';
    if (location == null) {
        text = errorMsg;
    } else {
        text = "Location Found"
    }

    return (
      <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>        
      <MapView style={styles.map}
      showsUserLocation
      region={ region
        //it takes a while for user location to load so we write an if statement
        //if user location is loaded, set user coords, else a hardcoded coord
        // latitude: location ? location.coords.latitude : 51.901241339389706,
        // longitude: location ? location.coords.longitude : 4.261946355786722,
        // latitudeDelta: 0.00922,
        // longitudeDelta: 0.00421, 
      }>
        {//map through all marker locations
        markers.map((marker, index) => (
        <Marker coordinate={{ latitude : marker.lat , longitude : marker.long }} key={marker.name} image={myMarker}/>
        ))}
      </MapView>    
      </View>
    );
  }

const styles = Style
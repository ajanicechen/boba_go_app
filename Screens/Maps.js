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

    //api url
    const apiUrl = 'https://stud.hosted.hr.nl/0999525/boba_marker_locations.json'

    //fetch api
    const loadJSON = () => {
      fetch(apiUrl, myInitGET)
      .then(res => res.json())
      .then(data => updateData(data))
      .catch(error => console.log(error))
    }

    //put markers in useState markers array that uv made before
    function updateData(data){
      setMarkers(data)
    }

    //use effect to initiate ur fetch 
    useEffect(() => {loadJSON()}, [])

    //use effect for different ways to handle
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
  
    let text = 'please give us a moment to find ur location...';
    if (location == null) {
        text = text;
    } else {
        text = "Location Found"
    }

    return (
      <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>        
      <MapView style={styles.map}
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

const styles = Style
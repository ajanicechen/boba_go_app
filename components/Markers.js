import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';

//loads home
export default function Markers() {
    const [markers, setMarkers] = useState([])

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

    //put markers in an array named markers that we makde earlier
    function updateData(data){
      setMarkers(data)
    }

    //useEffect to initialize fetch
    useEffect(() => {loadJSON()}, [])

}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


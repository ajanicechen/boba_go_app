import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import CottonCandy from '../Styles/CottonCandy.js'
import MatchaLuvr from '../Styles/MatchaLuvr.js'

//loads home
export default function HomeScreen({currentTheme, navigation}) {

  let style

  if(currentTheme === 'cottonCandy'){
    style = CottonCandy
  } else {
    style = MatchaLuvr
  }

  const [list, setList] = useState([])

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

  //set all marker location in list array we made earlier
  function updateData(data){
    setList(data)
  }

  //initializes fetch
  useEffect(() => {loadJSON()}, [])

  const Item = ({ name, lat, long }) => (
    <View style={style.item}>
      {/* navigate to the marker on the map by pressing each list item */}
      <TouchableOpacity onPress={()=> navigation.navigate("Map", {
        "latitude" : lat,
        "longitude" : long
      })}>
        <Text style={style.name}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderItem = ({ item }) => <Item name={item.name} lat={item.lat} long={item.long} />;

  return (
    <View style={style.container}>
      <Text style={style.h1}>Welcome to Boba Go!</Text>
      <Text style={style.h2}>Where would you wanna </Text>
      <Text style={style.h2}>go today uwu?</Text>
      {/* create flatlist with hotspot items */}
      <FlatList data={list} renderItem={renderItem} keyExtractor={item => item.name} />
    </View>
  );
}

// const styles = Style


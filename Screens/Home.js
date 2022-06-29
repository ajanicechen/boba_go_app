import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import Style from '../Styles/Style.js'
import { NavigationHelpersContext } from '@react-navigation/native';

//loads home
export default function HomeScreen({currentTheme, navigation}) {
  // console.log(Settings)

  const [list, setList] = useState([])

  const themeH1Style = currentTheme === 'cottonCandy' ? styles.h1.cottonCandy : styles.h1.matcha;
  const themeH2Style = currentTheme === 'cottonCandy' ? styles.h2.cottonCandy : styles.h2.matcha;
  const themeContainerStyle = currentTheme === 'cottonCandy' ? styles.container.cottonCandy : styles.container.matcha;

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
    setList(data)
  }

  // console.log(list)

  useEffect(() => {loadJSON()}, [])

  const Item = ({ name }) => (
    <View style={styles.item}>
      <TouchableOpacity onPress={()=> navigation.navigate("Map", {
        "latitude" : name.lat,
        "longitude" : name.long
      })}>
        <Text style={styles.name}>{name}</Text>
      </TouchableOpacity>
    </View>
  );
  
  const renderItem = ({ item }) => <Item name={item.name} />;

  return (
    <View style={themeContainerStyle}>
      <Text style={themeH1Style}>Welcome to Boba Go!</Text>
      <Text style={themeH2Style}>Where would you wanna </Text>
      <Text style={themeH2Style}>go today uwu?</Text>
      {/* create flatlist with hotspot items */}
      <FlatList data={list} renderItem={renderItem} keyExtractor={item => item.name} />
    </View>
  );
}

const styles = Style


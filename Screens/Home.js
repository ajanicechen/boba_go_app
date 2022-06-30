import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import CottonCandy from '../Styles/CottonCandy.js'
import MatchaLuvr from '../Styles/MatchaLuvr.js'

//loads home
export default function HomeScreen({currentTheme, navigation, markers}) {

  let style

  if(currentTheme === 'cottonCandy'){
    style = CottonCandy
  } else {
    style = MatchaLuvr
  }

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
      <FlatList data={markers} renderItem={renderItem} keyExtractor={item => item.name} />
    </View>
  );
}



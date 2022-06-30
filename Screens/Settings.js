import { Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import CottonCandy from '../Styles/CottonCandy.js'
import MatchaLuvr from '../Styles/MatchaLuvr.js'

//loads settings
export default function SettingsScreen({storeTheme, currentTheme}) {

   let style

   if(currentTheme === 'cottonCandy'){
     style = CottonCandy
   } else {
     style = MatchaLuvr
   }

   return (
      <View style={style.container}>
         <Text style={style.h1}>Select a Theme!</Text>
         <Picker
            style={style.picker}
            selectedValue={currentTheme}
            onValueChange={(currentTheme, itemIndex) =>
            {storeTheme(currentTheme)}}>
            <Picker.Item label="Cotton Candy" value="cottonCandy" />
            <Picker.Item label="Matcha Luvr" value="matcha" />
         </Picker>
      </View>
   );
}

  
import { Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Style from '../Styles/Style.js'

//loads settings
export default function SettingsScreen({currentTheme}) {

   const themeTextStyle = currentTheme === 'cottonCandy' ? styles.h1.cottonCandy : styles.h1.matcha;
   const themeContainerStyle = currentTheme === 'cottonCandy' ? styles.container.cottonCandy : styles.container.matcha;

   return (
      <View style={themeContainerStyle}>
         <Text style={themeTextStyle}>Leave a note!</Text>
      </View>
   );
}

const styles = Style
  
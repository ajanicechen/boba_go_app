import { Text, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Style from '../Styles/Style.js'

//loads settings
export default function SettingsScreen({storeTheme, currentTheme}) {

  // const [selectedTheme, setSelectedTheme] = useState('cottonCandy');

   const themeTextStyle = currentTheme === 'cottonCandy' ? styles.h1.cottonCandy : styles.h1.matcha;
   const themeContainerStyle = currentTheme === 'cottonCandy' ? styles.container.cottonCandy : styles.container.matcha;

   return (
      <View style={themeContainerStyle}>
         <Text style={themeTextStyle}>Select a Theme!</Text>
         <Picker
            style={styles.picker}
            selectedValue={currentTheme}
            onValueChange={(currentTheme, itemIndex) =>
            {storeTheme(currentTheme)}}>
            <Picker.Item label="Cotton Candy" value="cottonCandy" />
            <Picker.Item label="Matcha Luvr" value="matcha" />
         </Picker>
      </View>
   );
}

const styles = Style
  
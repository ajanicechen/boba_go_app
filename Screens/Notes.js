import { Text, SafeAreaView, TextInput, Button, FlatList, View } from 'react-native';
import { useState } from 'react';
import Style from '../Styles/Style.js'

//loads settings
export default function SettingsScreen({currentTheme}) {

   const [text, setText] = useState("")
   const [notes, setNotes] = useState([])

   const submitHandler = (text) => {
      let obj = {note: text}
      setNotes([obj, ...notes])
   }

   const themeTextStyle = currentTheme === 'cottonCandy' ? styles.h1.cottonCandy : styles.h1.matcha;
   const themeContainerStyle = currentTheme === 'cottonCandy' ? styles.container.cottonCandy : styles.container.matcha;

   // Create the notes for the flatlist
   const Notes = ({ text }) => (
      <View style={styles.item}>
         <Text style={styles.name}>{text}</Text>
      </View>
   );
 
   const renderNote = ({ item }) => <Notes text={item.note} />

   return (
      <SafeAreaView style={themeContainerStyle}>
         {/* <KeyboardAvoidingView> */}
            <Text style={themeTextStyle}>Leave a note!</Text>
            <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            />
            <Button title="Add Note" onPress={() => {
               submitHandler(text)
            }} />
            <FlatList
               data={notes}
               renderItem={renderNote}
            />
         {/* </KeyboardAvoidingView> */}

      </SafeAreaView>
   );
}

const styles = Style
  
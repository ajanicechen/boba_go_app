import { Text, SafeAreaView, TextInput, Button, FlatList, View, TouchableWithoutFeedback, Keyboard, Touchable, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import Style from '../Styles/Style.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SettingsScreen({currentTheme}) {

   const [text, setText] = useState("")   //useState for text input for notes
   const [notes, setNotes] = useState([]) //usestate for all notes as an array

   //get notes from local storage
   const getNotes = async () => {
      try {
         const storedNotes = await AsyncStorage.getItem('notes')
         if (notes !== null) {
            setNotes(JSON.parse(storedNotes))
         } else {
         }
      } catch (err) {
         console.log(err)
      }
   }

   //store notes to local storage
   const storeNotes = () => {
      if (notes) {
         try {
            AsyncStorage.setItem("notes", JSON.stringify(notes))
          } catch (err) {
            console.log(err)
         }
      }
   }

   //function to submit a note
   const submitNote = (text) => {
      setNotes([{ "note": text}, ...notes]) //still need to add an id to it 
   }

   //function to delete a note
   const deleteNote = (note) => {

   }

   //useEffect to get notes once
   useEffect(() => { getNotes() }, [])

   //useEffect to store notes every time notes are set
   useEffect(() => { storeNotes() }, [notes])

   const themeTextStyle = currentTheme === 'cottonCandy' ? styles.h1.cottonCandy : styles.h1.matcha;
   const themeContainerStyle = currentTheme === 'cottonCandy' ? styles.container.cottonCandy : styles.container.matcha;

   // Create the notes for the flatlist
   const Notes = ({ text }) => (
      <View style={styles.item}>
         <Text style={styles.name}>{text}</Text>
            <Ionicons
               name="close-circle"
               color= "#9D8189"
               size={25}
               onPress={() => deleteNote(notes)} />
      </View>
   );
 
   const renderNote = ({ item }) => <Notes text={item.note} />

   return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <SafeAreaView style={themeContainerStyle}>
            <Text style={themeTextStyle}>Leave a note!</Text>
            <TextInput
            style={styles.input}
            onChangeText={setText}
            value={text}
            />
            <Button title="Add Note" onPress={() => {
               submitNote(text)
            }} />
            <FlatList
               data={notes}
               renderItem={renderNote}
            />
         </SafeAreaView>
      </TouchableWithoutFeedback>
      
   );
}

const styles = Style
  
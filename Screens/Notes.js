import { Text, SafeAreaView, TextInput, Button, FlatList, View, TouchableWithoutFeedback, Keyboard, Share, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CottonCandy from '../Styles/CottonCandy.js'
import MatchaLuvr from '../Styles/MatchaLuvr.js'

export default function SettingsScreen({currentTheme, route}) {

   const [text, setText] = useState("")   //useState for text input for notes
   const [notes, setNotes] = useState([]) //usestate for all notes as an array
   const [name, setName] = useState(route.params?.marker.name) //useState for marker name

   let style

   if(currentTheme === 'cottonCandy'){
     style = CottonCandy
   } else {
     style = MatchaLuvr
   }

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
      if(text !== ""){
         setNotes([{ "id": Math.random().toString(), "name": name, "note": text}, ...notes]) 
      } 
   }

   const editNote = (name, text) => {
      console.log(name, text)
   }

   //function to delete a note
   const deleteNote = (id) => {
      setNotes((oldNotes) => {
         return oldNotes.filter(note => note.id != id)
      })
   }

   //function for sharing notes
   const shareNote = async (name, text) => {
      try {
         const result = await Share.share({
         message:
            `${name} | note: ${text}`,
         });
      } catch (error) {
         alert(error.message);
      }
   }

   useEffect(() => {
      //when someone navigates through Marker on the map
      setName(route.params?.marker.name)
  }, [route, route.params?.marker.name])

   //useEffect to get notes once
   useEffect(() => { getNotes() }, [])

   //useEffect to store notes every time notes are set
   useEffect(() => { storeNotes() }, [notes])

   // Create the notes for the flatlist
   const Note = ({ text, name, id }) => (
      <View style={style.item}>
         <TouchableOpacity onPress={editNote(name, text)}>
            <Text style={style.name}>{ [name, ": "] }</Text>
            <Text style={style.name}>{ text }</Text>
         </TouchableOpacity>
            <Ionicons
               name="close-circle"
               color= "#9D8189"
               size={25}
               onPress={() => deleteNote(id)} />
            <Ionicons 
               name="share-outline"
               color= "#9D8189"
               size={25}
               onPress={() => shareNote(name, text)}/>
      </View>
   );
 
   const renderNote = ({ item }) => <Note id={item.id} name={item.name} text={item.note} />

   return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <SafeAreaView style={style.container}>
            <Text style={style.h1}>Leave a note!</Text>
            <TextInput
            style={style.input}
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
  
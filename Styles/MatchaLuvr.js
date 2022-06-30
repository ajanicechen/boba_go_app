import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#e5f9e0',
      alignItems: 'center',
      justifyContent: 'center',
   },
   h1: {
      color: '#664147',
      fontSize: 32
   },
   h2: {
      fontSize: 25,
      textAlign: 'center',
      color: '#664147'
   },
   picker:{
      width:  300
   },
   map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
   },
   item: {
      backgroundColor: '#D8E2DC',
      alignItems: 'center',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
   },
   name:{
      color:  '#9D8189',
      fontWeight: 'bold'
   },
   input: {
      height: 40,
      width: 300,
      margin: 12,
      borderWidth: 1,
      borderColor: '#9D8189',
      backgroundColor: '#D8E2DC',
      borderRadius: 10,
      padding: 10,
   },
   msg: {
      fontSize: 18,
      textAlign: 'center',
    },
});
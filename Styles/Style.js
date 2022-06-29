import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
    container: {
        cottonCandy: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
        matcha: {
          flex: 1,
          backgroundColor: '#e5f9e0',
          alignItems: 'center',
          justifyContent: 'center',
        },
      },
      h1: {
        cottonCandy: {
          color: '#9D8189',
          fontSize: 32
        },
        matcha: {
          color: '#664147',
        fontSize: 32
        }
      },
      h2: {
        cottonCandy: {
            fontSize: 25,
            textAlign: 'center',
            color: '#9D8189'
        },
        matcha: {
            fontSize: 25,
            textAlign: 'center',
            color: '#664147'
        }
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
      }
});
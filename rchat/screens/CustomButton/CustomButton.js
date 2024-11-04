import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({onPress, text, type = "Primary"}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, styles[`container_${type}`]]}>
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  )
}

const styles= StyleSheet.create({
    container:{
      
        width:'80%',
        padding: 15,
        marginVertical: 0,
        alignItems: 'center',
        borderRadius: 5,
        top:5,
        transform: [{ scale: 0.7 }], // Ajoutez cette ligne pour dézoomer le bouton
        flex: 1,
        backgroundColor: 'yellow',
    marginHorizontal: 5,

    },
    container_Primary:{
      backgroundColor: '#7a1628',
    },
    container_TERTIARY:{
      borderWidth: 3,
      borderColor: '#1396DE',
      borderStyle: 'solid',
    },
    text:{
        fontWeight: 'bold',
        color: 'white',
    },
    text_TERTIARY:{
      color: '#4EB7F1',
    },

});
export default CustomButton
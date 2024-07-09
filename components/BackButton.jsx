import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import  { icons }  from '../constants'

const BackButton = ({ handlePress}) => {
  return (
    <TouchableOpacity 
    onPress = {handlePress}
    activeOpacity ={0.7}
    style={{ position: 'absolute', top: 48, left: 20 }}>

        <Image
          source={icons.Back}
          //resizeMode='contain'
          style={{ width: 36, height: 36 }}
        />              
    </TouchableOpacity>
  )
}

export default BackButton
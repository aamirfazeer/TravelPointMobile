import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons } from '../constants'

const FormField = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  const [showPassword, setshowPassword] = useState(false)
    
  return (
    <View className={`pace-y-2 ${otherStyles}`}>
      <Text className="text-base text-secondary font-IRegular">{title}</Text>

      <View className="border-2 w-full h-16 px-4 bg-white rounded-2xl items-center flex-row">
        <TextInput 
           className="flex-1 text-black font-IRegular"
           value={value}
           placeholder={placeholder}
           placeholderTextColor="#EFF2FB"
           onChangeText={handleChangeText}
           secureTextEntry={title==='Password' && !showPassword}
        />
        {title === 'Password' &&(
          <TouchableOpacity onPress={()=>
            setshowPassword(!showPassword)}>
              <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-6 h-6" resizeMode='contain'/>
          </TouchableOpacity>
        )}
        
      </View>
    </View>
  )
}

export default FormField
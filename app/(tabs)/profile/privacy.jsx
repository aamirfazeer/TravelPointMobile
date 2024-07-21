import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import { RadioButton, Provider as PaperProvider } from 'react-native-paper';

const styles = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#ffffff',
    },
    radioButtonContainer: {
        flexDirection: 'row',
        paddingBottom:25 ,
        justifyContent: 'space-between', 
    },
    title: {
        fontWeight:'bold',
        fontFamily: 'Poppins-Regular',
        fontSize:20,
        paddingTop:18,
        paddingLeft:15
    },
    subtitle:{
        fontFamily: 'Poppins-Regular',
        fontSize:18,
        paddingTop:18,
        paddingLeft:15
    }
})


const privacy = () =>
{
    const [checked, setChecked] = useState('first');
    return (
        <View style = {styles.container}>
            <Text style={styles.title}>Travel Point</Text>

            <Text style={styles.subtitle}>Privacy</Text> 

            <PaperProvider>
            <View style={{ flex: 1,paddingLeft:25, paddingTop:45}}>
                <RadioButton.Group onValueChange={value => setChecked(value)} value={checked}>
                <View style={styles.radioButtonContainer}>
                    <Text style = {{fontSize:17}}>Show Activity Status</Text>
                    <RadioButton value="first"/>
                </View>
                <View style={styles.radioButtonContainer}>
                    <Text style = {{fontSize:17}}>Hide Activity Status</Text>
                    <RadioButton value="second"/>
                </View>
                </RadioButton.Group>
            </View>
            </PaperProvider>
           
        </View>
   

    );

}
export default privacy;
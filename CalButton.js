import React from 'react';
import {StyleSheet, Text,Button, View, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
        containerStyle:{
            padding: 7
         },
        butStyle:{
            alignItems:'center',
            justifyContent: 'center',
            //padding: 10,
            width: 76,
            height: 76,
            borderRadius: 38,
          },
        textStyle: {
            fontSize: 30,
            color: '#000000'
          }
    
});



const CalButton = props => (
      <View style = {styles.containerStyle} > 
        <TouchableOpacity onPress = {props.onPress} style ={[styles.butStyle, props.style]} >
        <Text style = {[styles.textStyle, props.textStyle]}> {props.title} </Text>
        </TouchableOpacity>
      </View>
     )

export default CalButton;

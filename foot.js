import React, {useState} from 'react';
import { SafeAreaView, View, Text, Image, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import couleurs from './Couleurs';


const Footer = () => {

    const handlePress = (url) => {
        Linking.openURL(url);
      };

    return (
      <View style={{ flex : 1, backgroundColor: 'transparent', padding: 10,marginTop : 30 , justifyContent:'center'}}>
        <View style={{alignContent:'flex-start',flexDirection: 'row',justifyContent:'center',alignItems:'center' }} > 
        
        <TouchableOpacity onPress={() => handlePress('https://www.instagram.com/nsigmaje')}>

        <Text style={{ color: 'rgb(173,143,112)',fontSize : 25,fontFamily : 'body_font' }}>Made by @Nsigma</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handlePress('https://www.nsigma.fr')}>
        <Image source={require('./assets/logo_nsigma.png')} style={{ width: 50, height: 50*695/1817 }} resizeMode="contain" />
        </TouchableOpacity>
        </View>
      </View>
    );
  };
  
  export default Footer;
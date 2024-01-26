import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import couleurs from './Couleurs';

const CountdownComponent = ({date_limit}) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    // Clean up the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  function calculateTimeRemaining() {
    const currentDate = new Date();
    const yourDateLimit = new Date(date_limit); // Replace with your date limit

    const difference = yourDateLimit - currentDate;
    if (difference <= 0) {
      // Time has elapsed, you can do something here
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return (
    <React.Fragment >
      <View style={{marginTop : 0, flex: 0.6, backgroundColor: couleurs.backgroundColor,justifyContent :'flex-end' }}>

      <Image source={require("./assets/wes.png")} 
      style={{flex : 0.8,aspectRatio : 2, resizeMode: 'contain',alignSelf : "center"}}/>
      
    </View>

    
      <View style={{flex : 1.5,backgroundColor : couleurs.backgroundColor,alignItems : 'center',justifyContent :'flex-start'}} >
      {/* <Text style={[styles.titre]} ></Text> */}
      <Text style={styles.txt} >{timeRemaining.days}j</Text>
      <Text style={styles.txt} > {timeRemaining.hours}h</Text>
      <Text style={styles.txt} >{timeRemaining.minutes}m</Text>
      <Text style={styles.txt} >{timeRemaining.seconds}s</Text>
    
      </View>
      {/* <View style={{flex : 7}}></View> */}
    </React.Fragment>
  );
};


const styles = StyleSheet.create({


    titre: {
        color: 'black',
        fontSize: 40,
        //fontWeight: 'bold',
        fontFamily: 'paragraphe_font',
        margin : 10,
        flex : 1
      },
      txt: {
        color: 'black',
        fontSize: 55,
        //fontWeight: 'bold',
        fontFamily: 'body_font',
        margin : 10,
        flex : 1,
        
      },

})

export default CountdownComponent;

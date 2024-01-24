import React, {useState, useEffect,useCallback,useRef} from 'react';
import { SafeAreaView, View, Text, Image, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useFonts } from 'expo-font';

import * as Font from 'expo-font'

import customFonts from './FontManager.js'


//https://docs.expo.dev/versions/latest/sdk/splash-screen/ <- pour le splash screen

import PODPage from './PODPage.js'
import CALPage from './CALPage.js'
import SOSPage from './SOSPage.js'
import WELPage from './WELPage.js'
import {DEFPage} from './DEFPage.js'
import Countdown from './Countdown.js'
import couleurs from './Couleurs.js'



const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();



const HeaderBar = () => {
  const handlePress = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={{backgroundColor : couleurs.backgroundColor}}>
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={() => handlePress('https://www.instagram.com/spiderliste/')}>
            <Image source={require('./assets/instagram.png')} style={styles.logo} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('https://www.facebook.com/profile.php?id=61555892932426')}>
            <Image source={require('./assets/facebook.png')} style={styles.logo} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('http://www.youtube.com/@SpiderlisteFakeliste')}>
            <Image source={require('./assets/youtube.png')} style={[styles.logo,{height: 35,width: 40,marginLeft : 2}]} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          
          <Image source={require('./assets/petitlogo.png')} style={{ width: 150, height: 150*695/1817 }} resizeMode="contain" />
        </View>
      </View>
    </SafeAreaView>
    </View>
  );
}; 
 


const BottomBar = () => {

  //const yourDateLimit = new Date('2024-01-25T00:42:00.000Z'); // Remplacez par votre date limite
  const yourDateLimit = new Date('2024-01-10T00:42:00.000Z'); // Remplacez par votre date limite

  const [showSOS, setShowSOS] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      setShowSOS(currentDate >= yourDateLimit);
    }, 1000);

    // Nettoyage de l'intervalle lorsque le composant est démonté
    return () => clearInterval(intervalId);
  }, [yourDateLimit]);




  
  return (
    <View style={{ flex: 1,backgroundColor:couleurs.backgroundColor }}>
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        tabBarPosition="bottom"
        initialRouteName ="CAL"
        tabBarOptions={{
          style: {
            backgroundColor: couleurs.backgroundColor,
            borderTopWidth: 1,
            borderTopColor: couleurs.barBorderColor,
            borderTopWidth : 2,
            height : 60,
          },
          labelStyle: {
            fontSize: 12,
          },
          tabStyle: {
            justifyContent: 'center',
          },
          indicatorStyle: {
            backgroundColor: couleurs.buttonColor1,
          },
          showLabel: false,
        }}
      >
        <Tab.Screen
          name="Pod"
          component={PODPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/classement.png')}
                style={{ width: 35, height: 35, tintColor: couleurs.buttonColor1, alignSelf: 'center' }}
              />
            ),
          }}
        />




  

{showSOS ? ( 
          <Tab.Screen
            name="SOS"
            component={SOSPage}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Image
                source={require('./assets/bottom_bar/sos.png')}
                //source={require('./assets/sos.png')}
                  style={{ width: 35, height: 35, tintColor: couleurs.buttonColor1, alignSelf: 'center' }}
                />
              ),
            }}
          />
        ) : (
          <Tab.Screen
            name="Countdown"
            component={() => <Countdown date_limit={yourDateLimit} />}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Image
                  //source={require('./assets/sos.png')}
                  source={require('./assets/bottom_bar/sos.png')}
                  style={{ width: 35, height: 35, tintColor: couleurs.buttonColor1, alignSelf: 'center' }}
                />
              ),
            }}
          />
        )}




        <Tab.Screen
          name="CAL"
          component={CALPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/calendrier.png')}
                style={{ width: 30, height: 30, tintColor: couleurs.buttonColor1, alignSelf: 'center' }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="WEL"
          component={WELPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                //source={require('./assets/burger.png')}
                source={require('./assets/bottom_bar/wel.png')}

                style={{ width: 30, height: 35, tintColor: couleurs.buttonColor1, alignSelf: 'center' }}
              
              />
              
            ),
          }}
        />
        <Tab.Screen
          name="DEF"
          component={DEFPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                //source={require('./assets/defi.png')}
                source={require('./assets/bottom_bar/def.png')}
                style={{ width: 30, height: 35, tintColor: couleurs.buttonColor1, alignSelf: 'center' }}
              
              />
              
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
    </View>
  );
};

const App = () => {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  
  async function loadFontsAsync() {
    await Font.loadAsync(customFonts);
    setFontsLoaded(true);
  }

  useEffect(() => {
    loadFontsAsync();
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  // let [fontsLoaded] = useFonts({
  //   'body_font': require('./assets/BebasNeue-Regular.ttf'),
  // });
  // if (!fontsLoaded) {
  //   return null;
  // }


  const bottomBarRef = React.createRef();
  return (

    <NavigationContainer>
         
      <Stack.Navigator
        screenOptions={{
          header: () => <HeaderBar />,
        }}
      >
      <Stack.Screen name="Home">
    {() => <BottomBar ref={bottomBarRef} />}
  </Stack.Screen>
      </Stack.Navigator>

    </NavigationContainer>

  );
};


// function App() {
//   const [fontsLoaded, setFontsLoaded] = useState(false);

//   let customFonts = {
//     'body_font': require('./assets/BebasNeue-Regular.ttf'),
//   };
//   async function loadFontsAsync() {
//     await Font.loadAsync(customFonts);
//     setFontsLoaded(true);
//   }

//   useEffect(() => {
//     loadFontsAsync();
//   }, []);

//   if (!fontsLoaded) {
//     return null;
//   }


//   return(
//     <Text style={{ fontFamily: 'body_font', fontSize: 30 }}>Inter Black</Text>

//   )
// }


const styles = StyleSheet.create({
  header: {
    
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 2,  // Épaisseur de la bordure
    borderBottomColor: couleurs.barBorderColor
  },
  titleHeader: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: 0,
  },
  logo: {
    height: 32,
    width: 40,
    marginRight: 2,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft : 0
  }
});
 
export default App;

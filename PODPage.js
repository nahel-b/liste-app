import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList,Image } from 'react-native';
import React, { useEffect, useState, useCallback } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import { useFonts } from 'expo-font';
import couleurs from './Couleurs';
import { useIsFocused } from '@react-navigation/native'; // Importez cette dépendance
import Footer from './foot';

const firebaseConfig = {
  apiKey: "AIzaSyDLiHG0MgpgcjDJ9Ur-c6Rf9svkc29qzvg",
  authDomain: "list-app-eebc2.firebaseapp.com",
  databaseURL: "https://list-app-eebc2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "list-app-eebc2",
  storageBucket: "list-app-eebc2.appspot.com",
  messagingSenderId: "151475659058",
  appId: "1:151475659058:web:86f6999b0e2cb32a63772b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const renderItem = ({ item, index,data }) => {
  const minIndex = 0;
  const maxIndex = data.length - 1;
  
  // Calculer la position normalisée de l'élément dans la liste
  const position = (index - minIndex) / (maxIndex - minIndex);
  // Interpolation linéaire pour obtenir une couleur intermédiaire
  const backgroundColor = interpolateColor(couleurs.buttonColor1, couleurs.buttonColor3, position);

  const dynamicStyles = {
    backgroundColor: backgroundColor,
  };

  return (
    <View style={[styles.rectangle, dynamicStyles]}>
      <View style={styles.leftColumn}>
        <Image
          source={require('./assets/hublot.png')}
          style={styles.image} // Ajustez la taille selon vos besoins
        />
        <Text style={styles.position}>{index + 1}{index === 0 ? "er " : "eme"}</Text>
      </View>
      <View style={styles.rightColumn}>
        <Text style={styles.textNom}>{item.prenom} {item.nom}</Text>
        <Text style={styles.textPoint}>Points : {item.point}</Text>
      </View>
    </View>
  );
};

const interpolateColor = (color1, color2, position) => {
  const interpolateChannel = (channel1, channel2) => Math.ceil(channel1 * (1 - position) + channel2 * position);

  const r1 = parseInt(color1.match(/\d+/g)[0], 10);
  const g1 = parseInt(color1.match(/\d+/g)[1], 10);
  const b1 = parseInt(color1.match(/\d+/g)[2], 10);

  const r2 = parseInt(color2.match(/\d+/g)[0], 10);
  const g2 = parseInt(color2.match(/\d+/g)[1], 10);
  const b2 = parseInt(color2.match(/\d+/g)[2], 10);

  const r = interpolateChannel(r1, r2);
  const g = interpolateChannel(g1, g2);
  const b = interpolateChannel(b1, b2);

  return `rgb(${r},${g},${b})`;
};

  const ClassementListe = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const fetchData = useCallback(async () => {
      try {
        const utilisateursRef = ref(db, 'utilisateurs');
        const utilisateursSnapshot = await get(utilisateursRef);
  
        if (utilisateursSnapshot.exists()) {
          const utilisateursData = utilisateursSnapshot.val();
          const newData = Object.entries(utilisateursData).map(([username, userData]) => {
            if (isNaN(userData.point)) {
              return null;
            }
  
            return {
              username,
              prenom: userData.prénom,
              nom: userData.nom,
              point: userData.point
            };
          }).filter(item => item !== null);
  
          newData.sort((a, b) => b.point - a.point);
  
          setData(newData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      } 
    }, [setLoading]);


    
  
    const isFocused = useIsFocused(); // Récupérez l'état de focus de l'écran
  
    useEffect(() => {
      // Chargez les données lorsque le composant est monté
      fetchData();
    }, [fetchData]);
  
    useEffect(() => {
      // Rechargez les données lorsque l'écran est en focus
      if (isFocused) {
        fetchData();
      }
    }, [isFocused, fetchData]);
  
    const [loaded] = useFonts({
      // Specify custom fonts if needed
      // Example: 'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
    });
  
    if (!loaded || loading) {
      const dataNull = [
        { prenom: "Chargement", nom: "--", point: "0" },
        { prenom: "Chargement", nom: "--", point: "0" },
        { prenom: "Chargement", nom: "--", point: "0" },
        { prenom: "Chargement", nom: "--", point: "0" },
        { prenom: "Chargement", nom: "--", point: "0" },
        { prenom: "Chargement", nom: "--", point: "0" }
      ];
      return (
      <View>
      <Text style={{marginTop : 10, fontSize: 40, alignSelf: 'center',fontFamily:'body_font' }}>Chargement...</Text>
      <Text style={{margin : 0, fontSize: 20, alignSelf: 'center',fontFamily:'body_font' }}>Vérifie ta connexion</Text>
      </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.username}
          renderItem={({ item, index }) => renderItem({ item, index, data })}
          />
        
      </View>
    );
  };
  
const PODPage = () => 
(

   
        <View style={{backgroundColor : couleurs.backgroundColor,flex:1}}>
            {/*<Text>POD Page</Text>*/}
            <ClassementListe/>
        </View>
    
)

export default PODPage


const styles = StyleSheet.create({
    container: {
      marginTop: 0,
      padding: 10,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,

    },
    rectangle: {
       // Prend presque toute la largeur
      marginVertical: 5,
      padding: 10,
      borderRadius: 25,
      flexDirection: 'row', // Ajoutez cette ligne pour assurer la disposition en colonne
    },
    leftColumn: {
      marginRight: 10,
      alignItems  : 'center',
    },
    rightColumn: {
        width: '80%',
        justifyContent: 'center'
    },
    position: {
      //fontWeight: 'bold',
      marginBottom: 0,
      color : 'white',
      fontSize : 17,
      fontFamily:'body_font'
    },
    textNom: 
    {
        color : 'white',
        fontSize : 30,
        //fontWeight : 'bold',
        fontFamily:'body_font'
    },
    textPoint: 
    {
        color : 'white',
        fontSize : 22,
        //fontWeight : 'bold',
        fontFamily:'body_font'
    },
    image: { width: 40, height: 40 }
  });
  
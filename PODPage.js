import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';
import { useFonts } from 'expo-font';

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

const ClassementListe = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const utilisateursRef = ref(db, 'utilisateurs');
        const utilisateursSnapshot = await get(utilisateursRef);

        if (utilisateursSnapshot.exists()) {
          const utilisateursData = utilisateursSnapshot.val();
          const newData = Object.entries(utilisateursData).map(([username, userData]) => ({
            username,
            prenom: userData.prénom,
            nom: userData.nom,
            point: userData.point
          }));

          // Triez le tableau par points de manière décroissante
          newData.sort((a, b) => b.point - a.point);

          setData(newData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const [loaded] = useFonts({
    // Specify custom fonts if needed
    // Example: 'Roboto': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!loaded) {
    return null; // Render a loading component if fonts are not yet loaded
  }

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.username}
        renderItem={({ item, index }) => (
          <View style={styles.rectangle}>
            <View style={styles.leftColumn}>
              <Text style={styles.position}>{index + 1}{index === 0 ? "er " : "eme"}</Text>
            </View>
            <View style={styles.rightColumn}>
              <Text>{item.prenom} {item.nom}</Text>
              <Text>Points : {item.point}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ClassementListe

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangle: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    alignItems: 'center'
  },
  leftColumn: {
    marginRight: 10,
  },
  rightColumn: {
    flex: 1
  },
  position: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

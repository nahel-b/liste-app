import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const numColumns = 3;

const Row1 = ({ image1Source, image2Source }) => {
  return (
    <View style={styles.row}>
      <Image source={require("./assets/hublot.png")} style={styles.image} />
      <Image
        source={require("./assets/hublot.png")}
        style={[styles.image, { marginTop: 50 }]} // Ajoutez le style marginTop ici
      />
      <Image source={require("./assets/hublot.png")} style={styles.image} />
    </View>
  );
};

const Row2 = ({ image1Source, image2Source }) => {
  return (
    <View style={[styles.row, { marginTop: -30 }]}>
      <Image source={require("./assets/hublot.png")} style={styles.image} />
      <Image source={require("./assets/hublot.png")} style={styles.image} />
    </View>
  );
};
const Row3 = ({ image1Source, image2Source }) => {
  return (
    <View style={styles.row}>
      <Image source={require("./assets/hublot.png")} style={styles.image} />
      <Image source={require("./assets/bateau.png")} style={styles.image} />
      <Image source={require("./assets/hublot.png")} style={styles.image} />
    </View>
  );
};

const SOSPage = () => {
  return (
    <View>
      <Text style={styles.titre}>SOS</Text>
      <Row1  />
      <Row2  />
      <Row3 />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  image: {
    width: 120, // Ajustez la largeur selon vos besoins
    height: 120, // Ajustez la hauteur selon vos besoins
    resizeMode: 'cover',
  },
  titre: {
    marginTop: 10,
    borderRadius: 30,
    fontSize: 150, // Ajustez la taille de la police selon vos besoins
    textAlign: 'center',
    textAlignVertical: 'center',
    overflow: 'hidden',
  },
});

export default SOSPage;

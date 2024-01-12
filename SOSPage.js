import React,{useCallback,useEffect,useState,useRef} from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import couleurs  from './Couleurs';
import Accordion from 'react-native-collapsible/Accordion';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer,useNavigation } from '@react-navigation/native';


const CommandePage = () => {
  const [activeSectionsColonne1, setActiveSectionsColonne1] = useState([]);
  const itemContainerRefColonne1 = useRef();
  const itemContainerRefColonne2 = useRef();

  const renderHeader = (content, index, isActive, section, ref) => (
    <View
      ref={isActive ? ref : null}
      style={[styles.itemContainer_defi, isActive && styles.selectedHeader]}
    >
      <Text style={styles.itemText}>{content.nom}</Text>
    </View>
  );

  const renderContent = (section) => (
    <View style={styles.descriptionContainer}>
      <Text style={styles.descriptionText}>{section.description}</Text>
    </View>
  );

  const updateSectionsColonne1 = (activeSections) => {
    setActiveSectionsColonne1(activeSections);
  };

  const onTransitionEnd = useCallback((ref) => {
    if (ref.current) {
      ref.current.setNativeProps({
        style: { borderBottomRightRadius: 20, borderBottomLeftRadius: 20 },
      });
    }
  }, []);

  useEffect(() => {
    onTransitionEnd(itemContainerRefColonne1);
    onTransitionEnd(itemContainerRefColonne2);
  }, [onTransitionEnd]);

  const styles = StyleSheet.create({


    itemContainer_defi: {
      marginTop: 8,
      marginHorizontal: 8,
      backgroundColor: couleurs.buttonColor1,
      borderRadius: 20,
      padding: 16,
      alignItems: 'center',
      justifyContent: 'center',
      //overflow: 'hidden',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
      marginBottom: 5,
    },
    selectedHeader: {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      marginBottom: 0,
    },
    itemText: {
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
    },
    descriptionContainer: {
      backgroundColor: couleurs.buttonColor3,
      borderRadius: 10,
      padding: 16,
      marginHorizontal: 8,
      marginTop: -8,
      
    },
    descriptionText: {
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
    },

  });

  const dataJour = [
    { nom: 'LUNDI', description: '18h-5h \n\n zone 1 : 06 81 87 67 55 \n\n zone 2 : 09 67 54 24 56 \n\n zone 3 : 07 83 56 35 44' },
    { nom: 'MARDI', description: '18h-5h \n\n zone 1 : 06 81 87 67 55 \n\n zone 2 : 09 67 54 24 56 \n\n zone 3 : 07 83 56 35 44' },
    { nom: 'MERCREDI', description: '18h-5h \n\n zone 1 : 06 81 87 67 55 \n\n zone 2 : 09 67 54 24 56 \n\n zone 3 : 07 83 56 35 44' },
    { nom: 'JEUDI', description: '18h-5h \n\n zone 1 : 06 81 87 67 55 \n\n zone 2 : 09 67 54 24 56 \n\n zone 3 : 07 83 56 35 44' },
    { nom: 'VENDREDI', description: '18h-5h \n\n zone 1 : 06 81 87 67 55 \n\n zone 2 : 09 67 54 24 56 \n\n zone 3 : 07 83 56 35 44' },
    { nom: 'SAMEDI', description: '18h-5h \n\n zone 1 : 06 81 87 67 55 \n\n zone 2 : 09 67 54 24 56 \n\n zone 3 : 07 83 56 35 44' },
  ];

  return (
    <View style={{ backgroundColor: couleurs.backgroundColor, flex: 1 }}>
      <Image source={require('./assets/carte.jpg')} style={{ height: 200, aspectRatio: 1, alignSelf: 'center' }} />
      <ScrollView style={{ backgroundColor: couleurs.backgroundColor, flex: 1 }}>

        <Accordion
          style={{}}
          sections={dataJour}
          activeSections={activeSectionsColonne1}
          renderHeader={(content, index, isActive, section) =>
            renderHeader(content, index, isActive, section, itemContainerRefColonne1)
          }
          renderContent={renderContent}
          onChange={updateSectionsColonne1}
          underlayColor={'transparent'}
          onTransitionEnd={() => onTransitionEnd(itemContainerRefColonne1)}
          expandMultiple={true}
        />
      </ScrollView>
    </View>
  );
};

const DEFPage = () => {


  const Stack = createStackNavigator();


  const [selectedItem, setSelectedItem] = useState(0);

  //useEffect(() => {loadFonts();}, []);

  
    return (
     <Stack.Navigator headerMode="none">
      <Stack.Screen name="SOSPageAccueil" component={SOSPageAccueil} />
      <Stack.Screen name="CommandePage" component={CommandePage} />
      
    </Stack.Navigator>
  );
};


const SOSPageAccueil = () => {

  const navigation = useNavigation();


  const Row1 = ({ handlePress }) => {
    return (
      <View style={[styles.row, { marginTop: 0 }]}>
          <TouchableOpacity onPress={() => handlePress(0)} style={{margin : 0}}>
              <Image source={require("./assets/hublots/SOS/bob.png")} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(1)} style={{alignSelf : 'flex-end'}} >
              <Image source={require("./assets/hublots/SOS/phlow_talent.png")} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(1)} style={{margin : 0}}>
              <Image source={require("./assets/hublots/SOS/alter.png")} style={styles.image} />
          </TouchableOpacity>
      </View>
    );
  };
  
  const Row2 = ({ handlePress }) => {
    return (
      <View style={[styles.row, { marginTop: 0 }]}>
          <TouchableOpacity onPress={() => handlePress(0)} style={{margin : 0}}>
              <Image source={require("./assets/hublots/SOS/phlow_talent.png")} style={[styles.image,{flex : 1}]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(1)} style={{alignSelf : 'flex-end'}} >
              <Image source={require("./assets/hublots/SOS/phlow_talent.png")}  style={[styles.image,{flex : 1}]} />
          </TouchableOpacity>
          
      </View>
    );
  };
  const Row3 = ({ image1Source, image2Source }) => {
    return (
      <View style={[styles.row, { marginTop: 0 }]}>
          <TouchableOpacity onPress={() => navigation.navigate('CommandePage')} >
              <Image source={require("./assets/bateau.png")} style={[{flex : 1,aspectRatio: 1}]} />
          </TouchableOpacity>
      </View>
    );
  };

  const handlePress = (index) => {
    setSelectedItem(index);
    navigation.navigate('PageOuverte', { selectedIndex: index });
  };

  return (
    <ScrollView contentContainerStyle={{
      flex: 1,
      justifyContent: 'space-between'
  }} style={{ backgroundColor: couleurs.backgroundColor}}>

    <View style={{flex : 1, backgroundColor :  couleurs.backgroundColor,flex : 1}}>
    <View style={{ flex: 0.8, backgroundColor: 'transparent',justifyContent :'flex-end' }}>
     {// <Text style={styles.titre}>SOS</Text>
     }
     <Image source={require("./assets/SOS_titre.png")} 
      style={{flex : 0.8,aspectRatio : 3, resizeMode: 'contain',alignSelf : "center"}}/>
      

    </View>
    <View style={{ flex: 1, backgroundColor : 'transparent' }}>
      {<Row1 handlePress={handlePress} />
      }
    </View>
    <View style={{ flex: 1, backgroundColor : 'transparent' }}>
      {
        <Row2 handlePress={handlePress} />
      }
    </View>
    <View style={{ flex: 0.7, backgroundColor : 'transparent' }}>
      {
        <Row3 handlePress={handlePress} />
      }
    </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent : "center",
    flex : 1,
    },
  image: {
    flex : 1,
    aspectRatio: 1, // Ajustez la largeur selon vos besoins
    resizeMode: 'cover',
    alignSelf : 'center',
    margin : 10,
  },
  titre: {
    marginTop: 10,
    borderRadius: 30,
    fontSize: 100, // Ajustez la taille de la police selon vos besoins
    textAlign: 'center',
    textAlignVertical: 'center',
    overflow: 'hidden',
    fontFamily: 'body_font',
  },
});

export default DEFPage;

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity,Linking } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Accordion from 'react-native-collapsible/Accordion';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
//import { loadFonts, body_font } from './FontManager';
import {Footer,Retour} from './foot';
import couleurs from './Couleurs';
import { ScrollView } from 'react-native-gesture-handler';
import { specificStyles } from './specificStyles';


const DEFPage = () => {

  const Stack = createStackNavigator();
  const [selectedItem, setSelectedItem] = useState(0);
  
    return (
     <Stack.Navigator headerMode="none">
      <Stack.Screen name="DEFPageContent" component={DEFPageContent} />
      <Stack.Screen name="PageOuverte" component={PageOuverte} />
    </Stack.Navigator>
  );
};

const DEFPageContent = () => {


const Row1 = ({ handlePress }) => {
  return (
    <View style={[stylesPage.row]}>
      <TouchableOpacity onPress={() => handlePress(0)} style={stylesPage.imageContainer}>
        <Image source={require("./assets/hublots/DEF/dd_.png")} style={stylesPage.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress(1)} style={stylesPage.imageContainer}>
        <Image source={require("./assets/hublots/DEF/d_l_.png")} style={stylesPage.image} />
      </TouchableOpacity>
    </View>
  ); 
};

const Row2 = ({ handlePress }) => {
  return (
    <View style={[stylesPage.row,{alignItems: 'flex-start'}]}>
      <TouchableOpacity onPress={() => handlePress(2)}  style={stylesPage.imageContainer} >
        <Image source={require("./assets/hublots/DEF/d_p_.png")} style={stylesPage.image} />
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => handlePress(3)} style={[stylesPage.imageContainer, {position: 'relative', top: '-20%' }]}>
        <Image source={require("./assets/hublots/DEF/d_c_.png")} style={stylesPage.image} />
      </TouchableOpacity> */}
      <TouchableOpacity onPress={() => handlePress(3)} style={stylesPage.imageContainer}>
        <Image source={require("./assets/hublots/DEF/d_c_.png")} style={stylesPage.image} />
      </TouchableOpacity>
    </View>
  );
};
  const navigation = useNavigation();
  const [selectedItem, setSelectedItem] = useState(0);

  const handlePress = (index) => {
    setSelectedItem(index);
    navigation.navigate('PageOuverte', { selectedIndex: index });
  };

  return (

    
    <ScrollView contentContainerStyle={{
      flex: 1,
      justifyContent: 'space-between'
  }} style={{ backgroundColor: couleurs.backgroundColor}}>

  
            <View style={{ flex: 1, backgroundColor: couleurs.backgroundColor }}>
            
            <View style={{ flex: 0.6, backgroundColor: 'transparent',justifyContent :'flex-end' }}>

        <Image source={require("./assets/DEF_titre.png")} 
              style={{flex : 0.8,aspectRatio : 2.8, resizeMode: 'contain',alignSelf : "center"}}/>
              


        </View>

        <View style={{  backgroundColor: 'transparent' }}>

        <Text style={{margin : 10, textAlign : 'center',fontSize : 23,fontFamily : 'body_font',color : 'rgb(148,136,111)'}}>Tout défi devra être envoyé au compte instagram de la liste: @Top1inp</Text>
          
          </View>
            
            <View style={{ flex: 1,backgroundColor : 'transparent' }}>

              <Row1 handlePress={handlePress} />
              </View>

            <View style={{ flex: 1, backgroundColor : 'transparent' }}>

              <Row2 handlePress={handlePress} />
              </View>


            </View>
    </ScrollView>
  );
};

const stylesPage = StyleSheet.create({
  row: {
    marginHorizontal : 10,
    flex : 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 0,
  },
  
  image: {
    flex : 1,
    margin : 10,
    
       // ajustez la largeur selon vos besoins
      aspectRatio: 1,// Ajustez la hauteur selon vos besoins
      resizeMode: 'cover', // Optional: Add border radius for rounded corners
  },
  titre: {
    marginTop: 0,
    borderRadius: 30,
    flex : 1,
    fontSize: 130, // Ajustez la taille de la police selon vos besoins
    textAlign: 'center',  
    textAlignVertical: 'center',
    overflow: 'hidden',
    //fontWeight: 'bold',
    fontFamily: 'body_font',
  },
});





// CATEGORIE OUVERTE

const CalendrierItem = ({ item, isSelected, selectedItem, index }) => {
  return (
    <View style={[styles.itemContainer, isSelected && styles.selectedItem]}>
      <Image source={item.image_src} style={styles.image} />
    </View>
  );
};


//defis DD
const dataDefi1 = [
  { nom: 'Lundi vert 10pts', description: 'Manger végé le lundi (et faire une photo?)' },
  { nom: 'Nouvelle cuisine 10pts', description: 'Cuisiner des épluchures' },
  { nom: 'Bilan carbone 20pts', description: 'Faire son bilan carbone sur Nos Gestes Climats.fr' },
  { nom: 'Home-made 20pts', description: 'Fabriquer soi-même un produit ménager (gel nettoyant, produit à vitre…)' },
  { nom: 'Compost 20pts', description: 'Composter les déchets alimentaires de ses repas pendant une semaine (ou plus)' },
  { nom: 'Range tes mails 20pts', description: 'Supprimer ses mails lus et inutiles' },
  { nom: 'Affiche green 30pts', description: 'Faire une affiche de sensibilisation pour afficher dans Phelma (ex: pollution des cigarettes, éteindre les lumières, pollution de l’avion…)' },
  { nom: 'Clean Walk 30pts', description: 'Faire une clean walk et ramener un sac de déchet' },
  { nom: 'Achat local 30pts', description: 'Acheter des légumes d’un producteur à moins de 50km de Grenoble' },
  { nom: 'Seconde main 30pts', description: 'Trier et donner ses vêtements qu’on ne porte plus' },
];

//defie la liste
const dataDefi2 = [
  { nom: 'Théo VETTORATO 10pts', description: 'Préparer une meilleure Chicha que lui' },
  { nom: 'Manon PARNAUDEAU 10pts', description: 'La battre en 1v1 jongles' },
  { nom: 'Youss MOHAMED 10pts', description: 'Le battre en 1v1 SKATE' },
  { nom: 'Alice GIRAUD 10pts', description: 'Lui faire un showcase de Werenoi' },
  { nom: 'Julien BELIARD 10pts', description: 'Lui placer un COUBEH' },
  { nom: 'Roman CASCALES 10pts', description: 'Le checker en même temps que BASMA' },
  { nom: 'Camille MOUTIN 10pts', description: 'Se lever 10 min avant ses partiels' },
  { nom: 'Camille MOUTIN 10pts', description: 'Se lever 10 min avant ses partiels' },
  { nom: 'Guillaume BNN 10pts', description: 'Lui donner 1 euro' },
  { nom: 'Ellie OUDET 10pts', description: 'Lui apprendre quelque chose sur le DD' },
  { nom: 'Lucas GRANGEORGE 10pts', description: 'Assumer un plaquage par ce monstre' },
  { nom: 'Julian MARTINEAU 10pts', description: 'Partager une pinte de blonde avec lui' },
  { nom: 'DImantino AGR 20pts', description: 'Venir jongler devant lui en collant' },
  { nom: 'Hortense ARNOUX 20pts', description: 'La battre en 1v1 temps de danse sur la piste à une soirée' },
  { nom: 'Mathieu WHITE 20pts', description: 'Assumer une sauce pimentée en pokerface préparée par lui-même' },
  { nom: 'Baptiste GRANET 20pts', description: 'Lui donner un gâteau maison' },
  { nom: 'Juliette LECOMPTE 20pts', description: 'La faire vomir' },
  { nom: 'Pierre DEVALROGER 20pts', description: 'Le battre en 1v1 Clash Royal' },
  { nom: 'Théo GIOVANNI 20pts', description: 'Le battre au baby foot' },
  { nom: 'Cassandre SALAME 50pts', description: 'Réussir à la staffer' },
  { nom: 'Mathis HURSTEL 50pts', description: 'Réussir à monter dans un camion de pompiers' },
  { nom: 'Maxime DESCOS 50pts', description: 'Battre son meilleur STRAVA en course à pied' },
  { nom: 'Iris THOUARD 150pts', description: 'Monter dans un hélico en vol' },

  { nom: 'Clément METAYER 60pts', description: 'Prendre une photo sur un Âne' },
  
];


//défis phlow
const dataDefi3 = [
  { nom: 'D1 10pts', description: 'Photo à la piscine' },
  { nom: 'D2 10pts', description: 'Faire même Spiderman à chaque événement' },
  { nom: 'D3 10pts', description: 'Boire avec le tuba' },
  { nom: 'D4 10pts', description: 'Danser le refrain de la chorée' },
  { nom: 'D5 20pts', description: 'Ne parler qu’en Spiderman avec un inconnu' },
  { nom: 'D6 30pts', description: 'Venir en marinière à la soirée' },
  { nom: 'D7 40pts', description: 'Faire un showcase au chalet avec notre rap' },
  { nom: 'D8 50pts', description: 'Pêcher un poisson dans l’Isère' },
  { nom: 'D9 50pts', description: 'Venir en cours avec des accessoires de plongée (tuba, combi, palme...)' },
  { nom: 'D10 50pts', description: 'Descendre une piste de ski en maillot' },
  { nom: 'D11 100pts', description: 'Prendre une photo avec chaque membre de la liste' },
];


//Défis classiques
const dataDefi4 = [
  { nom: 'F144 5pts l', description: 'Description de F1' },
  { nom: 'F2 5pts', description: 'Description de F2' },
  { nom: 'F3 5pts', description: 'Description de F3' },
  { nom: 'F4 5pts', description: 'Description de F4' },
  { nom: 'F5 5pts', description: 'Description de F5' },
  { nom: 'F6 5pts', description: 'Description de F6' },
  { nom: 'F7 5pts', description: 'Description de F7' },
  { nom: 'F8 5pts', description: 'Description de F8' },
  { nom: 'F9 5pts', description: 'Description de F9' },
];

//Défis quotidiens
const BoutonsDeroulant = ({ data, key }) => {
  const [activeSectionsColonne1, setActiveSectionsColonne1] = useState([]);
  const [activeSectionsColonne2, setActiveSectionsColonne2] = useState([]);

  const itemContainerRefColonne1 = useRef(null);
  const itemContainerRefColonne2 = useRef(null);

  const dataColonne1 = data.filter((_, index) => index % 2 === 0);
  const dataColonne2 = data.filter((_, index) => index % 2 !== 0);

  const renderHeader = (content, index, isActive, section, ref) => (
    <View
      ref={isActive ? ref : null}
      style={[styles.itemContainer_defi, isActive && styles.selectedHeader,specificStyles.shadowBoutonDeroulant]}
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

  const updateSectionsColonne2 = (activeSections) => {
    setActiveSectionsColonne2(activeSections);
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
  }, [onTransitionEnd, key]);

  return (
    <View style={styles.boutonDefiContainer}>
      <Accordion
        key={key}
        style={styles.column}
        sections={dataColonne1}
        activeSections={activeSectionsColonne1}
        renderHeader={(content, index, isActive, section) =>
          renderHeader(content, index, isActive, section, itemContainerRefColonne1)
        }
        renderContent={renderContent}
        onChange={updateSectionsColonne1}
        underlayColor={'transparent'}
        onTransitionEnd={() => onTransitionEnd(itemContainerRefColonne1)}
        expandMultiple={false}
      />
      <Accordion
        key={key}
        style={styles.column}
        sections={dataColonne2}
        activeSections={activeSectionsColonne2}
        renderHeader={(content, index, isActive, section) =>
          renderHeader(content, index, isActive, section, itemContainerRefColonne2)
        }
        renderContent={renderContent}
        onChange={updateSectionsColonne2}
        underlayColor={'transparent'}
        onTransitionEnd={() => onTransitionEnd(itemContainerRefColonne2)}
        expandMultiple={false}
      />
    </View>
  );
};


const Def5 = () => {

  const handlePress = (url) => {
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity onPress={() => handlePress('https://www.instagram.com/spiderliste/')}>

    <View style={{ flex: 1,height : "auto", marginBottom : "10%",marginTop : "5%" }}>
    {//<Text  style={{margin : 10, textAlign : 'center',fontSize : 20,fontFamily : 'body_font',color : 'rgb(148,136,111)'}}>regarde notre compte insta pour voir les défis quotidiens : @Top1inp</Text>
   }
    <View style={{flex: 1, backgroundColor: couleurs.buttonColor2, justifyContent: 'center', alignItems: 'center', margin: 10, borderRadius: 25}}>
    <Text style={{color: 'white', margin: 10, lineHeight: 25, padding: 5, textAlign: 'center', fontSize: 20, fontFamily: 'paragraphe_font'}}>
        Regarde notre compte insta pour voir les défis quotidiens : 
        <Text style={{color: 'gray', fontFamily: 'paragraphe_font'}}> @Top1inp</Text>
    </Text>
    <Text style={{color: 'white', marginTop: -25, marginBottom: 0, lineHeight: 25, padding: 5, textAlign: 'center', fontSize: 10, fontFamily: 'paragraphe_font'}}>(clique ici)</Text>
</View>
    </View>
    </TouchableOpacity>

  )
}



const PageOuverte = ({ route }) => {
  const { selectedIndex } = route.params;
  const [selectedItem, setSelectedItem] = useState(selectedIndex);

  const calendrierData = [
    { key: '1',image_src: require('./assets/hublots/DEF/dd_.png'), elements: <BoutonsDeroulant data={dataDefi1} key="1" /> },
    { key: '2',image_src: require('./assets/hublots/DEF/d_l_.png'), elements: <BoutonsDeroulant data={dataDefi2} key="2" /> },
    { key: '3',image_src: require('./assets/hublots/DEF/d_p_.png'), elements: <BoutonsDeroulant data={dataDefi3} key="3" /> },
    //{ key: '4',image_src: require('./assets/hublots/DEF/d_c_.png'), elements: <BoutonsDeroulant data={dataDefi4} key="4" /> },
    { key: '4',image_src: require('./assets/hublots/DEF/d_c_.png'), elements: <Def5 /> },

  ];

  const onSnapToItem = (index) => {
    setSelectedItem(index);
  };

  const renderItem = ({ item, index }) => {
    return (
      <CalendrierItem
        item={item}
        isSelected={(index % calendrierData.length) === selectedItem % calendrierData.length}
        selectedItem={selectedItem}
        index={index}
      />
    );
  };

  const { width: viewportWidth } = Dimensions.get('window');
  const ITEM_WIDTH = viewportWidth * 0.35;

  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: couleurs.backgroundColor, flex: 1 }}>
            <Retour onPress={() => navigation.navigate('DEFPageContent')}/>

    <View style={{ marginTop: 0,marginBottom : 0 }}>
      <Carousel
        data={calendrierData}
        renderItem={renderItem}
        sliderWidth={viewportWidth}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={onSnapToItem}
        loop
        enableSnap={true}
        loopClonesPerSide={calendrierData.length}
        removeClippedSubviews={false}
        inactiveSlideScale={0.8}
        itemHorizontalMargin={1}
        initialScrollIndex={selectedItem}
        firstItem={selectedItem}
        getItemLayout={(data, index) => ({
          length: ITEM_WIDTH,
          offset: ITEM_WIDTH * index,
          index,
        })}
      />
      </View>
      <ScrollView style={{ flex: 1 }}>
      
      {calendrierData[selectedItem]?.elements}
      <Footer/>
      
    </ScrollView>
    
  </View>
  );
};


const styles = StyleSheet.create({
  itemContainer: {
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  boutonDefiContainer: {
    flexDirection: 'row', 
    justifyContent : 'center',
    marginBottom : 50
    // Align accordions in a row
  },
  itemContainer_defi: {
    marginTop: 8,
    marginHorizontal: 8,
    backgroundColor: couleurs.buttonColor1,
    borderRadius: 10,

    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width : Dimensions.get('window').width/2.2,
  },
  selectedHeader: {
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  itemText: {
    color: 'white',
    fontSize: 25,
    //fontWeight: 'bold',
    fontFamily : 'body_font'
  },
  descriptionContainer: {
    backgroundColor: couleurs.buttonColor3,
    borderRadius: 10,
    padding: 16,
    margin: 8,
    marginTop: -8,
    alignSelf : 'center',
    width : Dimensions.get('window').width/2.4,
  },
  descriptionText: {
    color: '#A1A1A1',
    fontSize: 20,
    textAlign: 'center',
    fontFamily : 'body_font'
  },
  column: 
  {
    
    
  },
});

export  {DEFPage,PageOuverte,DEFPageContent};
 
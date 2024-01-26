import React,{useCallback,useEffect,useState,useRef} from 'react';
import { View, Text, StyleSheet, Image, ScrollView,Dimensions, TouchableOpacity } from 'react-native';
import couleurs  from './Couleurs';
import Accordion from 'react-native-collapsible/Accordion';
import Carousel from 'react-native-snap-carousel';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import {Footer,Retour} from './foot';
import { specificStyles } from './specificStyles';
import { Linking } from 'react-native';

const CommandePage = () => {
  const [activeSectionsColonne1, setActiveSectionsColonne1] = useState([]);
  const itemContainerRefColonne1 = useRef();
  const itemContainerRefColonne2 = useRef();


  const navigation = useNavigation();

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
      fontSize: 30,
      fontFamily: 'body_font',
      //fontWeight: 'bold',
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
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'body_font',
    },

  });

  const dataJour = [
   { nom: 'VENDREDI', description: '16h-20h\nzone 1 : 07 69 40 78 52 \nzone 2 : 06 27 02 25 35 \n\n20h-00h\nzone 1 : 07 82 81 71 50\nzone 2 : 06 16 20 15 12\n\n00h-03h:\nZone 1: 07 69 00 65 31\nZone 2: 06 51 43 95 43' },
    { nom: 'SAMEDI', description: '8h-12h:\nZone 1: 06 51 49 57 42\nZone 2: 06 70 75 50 02\n\n12h-16h:\nZone 1: 06 65 07 78 52\nZone 2: 07 52 02 59 87\n\n16h-18h:\nZone 1: 06 74 91 50 38\nZone 2: 07 68 03 56 25\n\n18h-21h:\nZone 1: 06 12 90 09 71\nZone 2: 07 67 13 81 64' },
    { nom: 'DIMANCHE', description: '8h-12h:\nZone 1: 07 69 00 65 31\nZone 2: 07 61 38 43 70\n\n12h-16h:\nZone 1: 07 81 16 29 13\nZone 2: 07 82 08 46 75\n\n16h-19h:\nZone 1: 06 42 56 54 51\nZone 2: 06 63 78 80 04\n\n19h-22h:\nZone 1: 06 62 47 38 57\nZone 2: 06 42 15 85 29\n\n22h-00h:\nZone 1: 06 95 97 07 57\nZone 2: 07 67 25 22 17' },

  ];

  return ( 
    <View style={{ backgroundColor: couleurs.backgroundColor, flex: 1 }}>
            <Retour onPress={() => navigation.navigate('SOSPageAccueil')}/>


<TouchableOpacity onPress={() => navigation.navigate('PageCarte')} style={{alignSelf : 'center',margin : 10}}>
      <Image source={require('./assets/carte_sos.jpg')} style={{ margin : 10,height: 200, aspectRatio: 1, alignSelf: 'center' }} />
      
      </TouchableOpacity>
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
      <Stack.Screen name="PageOuverte" component={PageOuverte} />
      <Stack.Screen name="PageCarte" component={PageCarte} />
    </Stack.Navigator>
  );
};


const SOSPageAccueil = () => {


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

  const navigation = useNavigation();


  const Row1 = ({ handlePress }) => {
    return (
      <View style={[styles.row, { marginTop: 0 }]}>
          <TouchableOpacity onPress={() => handlePress(0)} style={{margin : 0}}>
              <Image source={require("./assets/hublots/SOS/bob.png")} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(1)} style={{alignSelf : 'flex-end'}} >
              <Image source={require("./assets/hublots/SOS/phlow_talent_.png")} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(2)} style={{margin : 0}}>
              <Image source={require("./assets/hublots/SOS/alter_.png")} style={styles.image} />
          </TouchableOpacity>
      </View>
    );
  };
  
  const Row2 = ({ handlePress }) => {
    return (
      <View style={[styles.row, { marginTop: 0 }]}>
          <TouchableOpacity onPress={() => handlePress(3)} style={{margin : 0}}>
              <Image source={require("./assets/hublots/SOS/phlow_packs_.png")} style={[styles.image,{flex : 1}]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(4)} style={{alignSelf : 'flex-end'}} >
              <Image source={require("./assets/hublots/SOS/kraken_.png")}  style={[styles.image,{flex : 1}]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(5)} style={{margin : 0}}>
              <Image source={require("./assets/hublots/SOS/animation_spider__.png")} style={styles.image} />
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


const PageCarte = () => 
{

  const navigation = useNavigation()

  return (


    <View style={{ backgroundColor: couleurs.backgroundColor, flex: 1,alignContent : 'space-around' }}>


      <Retour onPress={() => navigation.navigate('CommandePage')}/>

      <Image source={require('./assets/carte_sos.jpg')} style={{ resizeMode : "contain", aspectRatio: 1, alignSelf: 'center' }} />


      </View>

  )

 }

// CATEGORIE OUVERTE

const CalendrierItem = ({ item, isSelected, selectedItem, index }) => {
  return (
    <View style={[styles.itemContainer, isSelected && styles.selectedItem]}>
      <Image source={item.image_src} style={styles.image} />
    </View>
  );
};


//bob l'éponge
const dataDefi1 = 
{
  texte : 'Encore un jour où votre demeure se rapproche plus du bateau pirate que du yacht de luxe? La Phlow se plie en quatre pour pouvoir raviver le charme de votre frégate et tout ça avec joie et bonne humeur!',
  boutonData : [
  { nom: 'Plonge', description: 'Nos plongeurs font votre plonge' },
  { nom: 'Rangement', description: 'Rangement et nettoyage pour que votre appart ait du Phlow' },
  { nom: 'Ariel', description: 'On vous fait votre lessive en chantant' },
  { nom: 'Ménage au choix', description: 'Fait nous part de tes désirs' },

]
}
;

//la phlow a du talent
const dataDefi2 = {
  texte : 'Vous avez désespérément besoin de quelque chose de particulier, d’inhabituel? Heureusement, nos marins sont là pour vous, remplis de talents cachés! N’hésitez pas à nous interroger pour plus, la Phlow regorge de phénomènes prêts à vous rendre service.',
  boutonData : [
  { nom: 'Talents de gamer', description: 'On vous fait un top1 Fortnite' },
  { nom: 'Talents de styliste', description: 'Relooking pour que tu sois encore plus frais qu’un crustacé' },
  { nom: 'Talents de chanteurs', description: 'concerts privés de Nico et Manon' },
  { nom: 'Talents de cuist’eau', description: 'Un Colin vous cuisine du Colin' },
  { nom: 'Talent au choix', description: 'Fait nous part de tes désirs' }
]};

//Alter égo
const dataDefi3 = {
  texte : 'Vous êtes seuls et avez besoin de quelqu’un pour une activité ? Ne vous inquiétez pas la PHLOW est là pour vous et vous envoie un partenaire surprise pour former un duo inoubliable au détour d’un moment de folie.',
  boutonData : [
  { nom: 'Partenaire date', description: 'envie d’un Netflix and chill, d’un cinéma, d’une sortie en ville ou plus ?...' },
  { nom: 'Partenaire de jeu', description: 'cherche quelqu’un pour un fifa, un fortnite, une partie de switch ou encore un jeu de société ?' },
  { nom: 'Partenaire de sport', description: 'il te faut un collègue pour partir en randonnée, danser, un bowling ou encore un footing ?' },
  { nom: 'Partenaire de soirée, apéro', description: 'besoin express de quelqu’un pour t’accompagner en soirée, partager un apéro ou même un repas…' },
  { nom: 'partenaire confession', description: 'promis on oublie tout comme Dory' },
  { nom: 'Partenaire au choix', description: 'laisse parler ton imagination, tu cherches forcément un duo pour quelque chose ?' },
 
]};

//phlow-packs
const dataDefi4 = {
  texte : 'Plongez dans les offres promotionnelles les plus folles de ces mers. Découvrez des packs adaptés à toutes sortes de situations, nous somme sûr que vous en trouverez un à votre goût.',
  boutonData : [
  { nom: 'RC 5€', description: 'RC + Mulet + Chicha' },
  { nom: 'Brunch après une descente aux Abysses 2,3€', description: 'Brunch ( boisson froide( RedBull ou jus de fruit) + boisson chaude (Café ou chocolat) + oeufs brouillés (supplément bacon 2,7€) + viennoiserie)' },
  { nom: 'Apéro 4pers 4,5€ ', description: 'Bière ou redbull + Tortilla + Guacamole + Jambon de Bayonne' },
  { nom: 'Goûter au Krusty-Krab 1€', description: 'Chocolat chaud + Cookies' },
  { nom: 'Ambiance TitaNique', description: 'Aide pour trouver cadeau de St Valentin + Conseils de drague + Fleur à offrir' },
]};

//kraken
const dataDefi5 = {
  texte : 'Fini la peau écaillée, plongez dans la détente et laissez vos soucis sombrer grâce à la Phlow qui vous apporte ses meilleures sirènes pour vous chouchouter! ',
  boutonData : [
  { nom: 'Massage', description: 'Un massage au fond musical “vagues”' },
  { nom: 'Soin du visage', description: 'Un soin privé de votre visage aux algues' },
  { nom: 'Soin des pieds', description: 'Les meilleurs poissons pour votre meilleure pédicure' },
  { nom: 'Soin au choix', description: 'Fait nous part de tes désirs' },

]};

//animation
const dataDefi6 = {
  texte : 'Des immersions dans l’univers de la Phlow pour que vous nous découvriez plus en profondeur!',
  boutonData : [
  { nom: 'Dents de la mer', description: 'Jeux de liste (alcool et sans alcool)' },
  { nom: 'Spider Sauvetage', description: 'On vient vous chercher en Spider-Mobile' },
  { nom: 'Spider-Tease', description: '3 SpiderMans débarquent et se dessapent (que la combi)' },
  { nom: 'Pack au choix', description: 'Fait nous part de tes désirs' },

]};

//Boutons deroulants
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


const ElementSOS = ({data,key}) => 
{


  return (

    <View style={{ flex: 1 }}>

    <View style={{flex : 1,backgroundColor : '#AF9D78' ,justifyContent : 'center',alignItems : 'center', margin : 10,borderRadius : 25}}>
    <Text style={{color : couleurs.buttonColor1,margin : 10,lineHeight: 25,padding : 5, textAlign : 'center',fontSize : 20,fontFamily : 'paragraphe_font'}}>""{data.texte}""</Text>
    </View>
    <BoutonsDeroulant data={data.boutonData} key={key} />

    </View>
  )
}



const PageOuverte = ({ route }) => {
  const { selectedIndex } = route.params;
  const [selectedItem, setSelectedItem] = useState(selectedIndex);

  const calendrierData = [
    { key: '1',image_src: require('./assets/hublots/SOS/bob.png'), elements: <ElementSOS data={dataDefi1} key="1" /> },
    { key: '2',image_src: require('./assets/hublots/SOS/phlow_talent_.png'), elements: <ElementSOS data={dataDefi2} key="2" /> },
    { key: '3',image_src: require('./assets/hublots/SOS/alter_.png'), elements: <ElementSOS data={dataDefi3} key="3" /> },
    { key: '4',image_src: require('./assets/hublots/SOS/phlow_packs_.png'), elements: <ElementSOS data={dataDefi4} key="4" /> },
    { key: '5',image_src: require('./assets/hublots/SOS/kraken_.png'), elements: <ElementSOS data={dataDefi5} key="5" />  },
    { key: '6',image_src: require('./assets/hublots/SOS/animation_spider__.png'), elements: <ElementSOS data={dataDefi6} key="6" />  },

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

  const Row3 = ({ image1Source, image2Source }) => {
    return (
      <View style={[ { marginTop: 0,alignItems : 'center' }]}>
          <TouchableOpacity onPress={() => navigation.navigate('CommandePage')} >
              <Image source={require("./assets/bateau.png")} style={[{width : 150,height : 150,aspectRatio: 1}]} />
          </TouchableOpacity>
      </View>
    );
  };

  const navigation = useNavigation();
  return (
    <View style={{ backgroundColor: couleurs.backgroundColor, flex: 1 }}>
            <Retour onPress={() => navigation.navigate('SOSPageAccueil')}/>

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

      <Row3/>
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
    fontFamily : 'body_font'
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

export default DEFPage;

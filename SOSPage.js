import React,{useCallback,useEffect,useState,useRef} from 'react';
import { View, Text, StyleSheet, Image, ScrollView,Dimensions, TouchableOpacity } from 'react-native';
import couleurs  from './Couleurs';
import Accordion from 'react-native-collapsible/Accordion';
import Carousel from 'react-native-snap-carousel';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
import {Footer,Retour} from './foot';
import { specificStyles } from './specificStyles';


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
    { nom: 'LUNDI', description: '18h-5h \n\n zone 1 : 06 81 87 67 55 \n\n zone 2 : 09 67 54 24 56 \n\n zone 3 : 07 83 56 35 44' },
    { nom: 'MARDI', description: '18h-5h \n\n zone 1 : 06 81 87 67 55 \n\n zone 2 : 09 67 54 24 56 \n\n zone 3 : 07 83 56 35 44' },
    { nom: 'MERCREDI', description: '18h-5h \n\n zone 1 : 06 81 87 67 55 \n\n zone 2 : 09 67 54 24 56 \n\n zone 3 : 07 83 56 35 44' },
    { nom: 'JEUDI', description: '18h-5h \n\n zone 1 : 06 81 87 67 55 \n\n zone 2 : 09 67 54 24 56 \n\n zone 3 : 07 83 56 35 44' },
    { nom: 'VENDREDI', description: '18h-5h \n\n zone 1 : 06 81 87 67 55 \n\n zone 2 : 09 67 54 24 56 \n\n zone 3 : 07 83 56 35 44' },
    { nom: 'SAMEDI', description: '18h-5h \n\n zone 1 : 06 81 87 67 55 \n\n zone 2 : 09 67 54 24 56 \n\n zone 3 : 07 83 56 35 44' },
  ];

  return ( 
    <View style={{ backgroundColor: couleurs.backgroundColor, flex: 1 }}>
            <Retour onPress={() => navigation.navigate('SOSPageAccueil')}/>


<TouchableOpacity onPress={() => navigation.navigate('PageCarte')} style={{alignSelf : 'center',margin : 10}}>
      <Image source={require('./assets/carte.jpg')} style={{ margin : 10,height: 200, aspectRatio: 1, alignSelf: 'center' }} />
      
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
              <Image source={require("./assets/hublots/SOS/phlow_talent.png")} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(2)} style={{margin : 0}}>
              <Image source={require("./assets/hublots/SOS/alter.png")} style={styles.image} />
          </TouchableOpacity>
      </View>
    );
  };
  
  const Row2 = ({ handlePress }) => {
    return (
      <View style={[styles.row, { marginTop: 0 }]}>
          <TouchableOpacity onPress={() => handlePress(3)} style={{margin : 0}}>
              <Image source={require("./assets/hublots/SOS/phlow_packs.png")} style={[styles.image,{flex : 1}]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(4)} style={{alignSelf : 'flex-end'}} >
              <Image source={require("./assets/hublots/SOS/kraken.png")}  style={[styles.image,{flex : 1}]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(5)} style={{margin : 0}}>
              <Image source={require("./assets/hublots/SOS/animation.png")} style={styles.image} />
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

      <Image source={require('./assets/carte.jpg')} style={{ resizeMode : "contain", aspectRatio: 1, alignSelf: 'center' }} />


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
  { nom: 'Partenaire autre', description: 'aisse parler ton imagination, tu cherches forcément un duo pour quelque chose ?' },
 
]};

//phlow-packs
const dataDefi4 = {
  texte : 'Plongez dans les offres promotionnelles les plus folles de ces mers. Découvrez des packs adaptés à toutes sortes de situations, nous somme sûr que vous en trouverez un à votre goût.',
  boutonData : [
  { nom: 'RC', description: 'RC + Mulet + Chicha' },
  { nom: 'Remise en forme après une descente aux Abysses', description: 'RedBull + bacon + oeufs' },
  { nom: 'Apéro', description: 'Bière + Chips + Jambon de Bayonne + Tomates cerises' },
  { nom: 'Goûter au Krusty-Krab', description: 'Chocolat chaud + Cookies' },
  { nom: 'Ambiance TitaNique', description: 'Aide pour trouver cadeau de St Valentin + Conseils de drague + Fleur à offrir' },
]};

//kraken
const dataDefi5 = {
  texte : 'Fini la peau écaillée, plongez dans la détente et laissez vos soucis sombrer grâce à la Phlow qui vous apporte ses meilleures sirènes pour vous chouchouter! ',
  boutonData : [
  { nom: 'Massage', description: 'Un massage au fond musical “vagues”' },
  { nom: 'Soin du visage', description: 'Un soin privé de votre visage aux algues' },
  { nom: 'Soin des pieds', description: ' Les meilleurs poissons pour votre meilleure pédicure' },
  
]};

//animation
const dataDefi6 = {
  texte : 'Des immersions dans l’univers de la Phlow pour que vous nous découvriez plus en profondeur!',
  boutonData : [
  { nom: 'Dents de la mer', description: 'Jeux de liste (alcool et sans alcool)' },
  { nom: 'Spider Sauvetage', description: 'On vient vous chercher en Spider-Mobile' },
  { nom: 'Showcase', description: 'Un Showcase du rap de la liste' },
  { nom: 'Spider-Tease', description: '3 SpiderMans débarquent et se dessapent (que la combi)' },
 
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
    { key: '2',image_src: require('./assets/hublots/SOS/phlow_talent.png'), elements: <ElementSOS data={dataDefi2} key="2" /> },
    { key: '3',image_src: require('./assets/hublots/SOS/alter.png'), elements: <ElementSOS data={dataDefi3} key="3" /> },
    { key: '4',image_src: require('./assets/hublots/SOS/phlow_packs.png'), elements: <ElementSOS data={dataDefi4} key="4" /> },
    { key: '5',image_src: require('./assets/hublots/SOS/kraken.png'), elements: <ElementSOS data={dataDefi5} key="5" />  },
    { key: '6',image_src: require('./assets/hublots/SOS/animation_spider.png'), elements: <ElementSOS data={dataDefi6} key="6" />  },

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

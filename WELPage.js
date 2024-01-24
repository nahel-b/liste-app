import React,{ useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Image,Dimensions,TouchableOpacity } from 'react-native';
import couleurs from './Couleurs';
import Carousel from 'react-native-snap-carousel';
import Accordion from 'react-native-collapsible/Accordion';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
//import { loadFonts, body_font } from './FontManager';
import { ScrollView } from 'react-native-gesture-handler';
import { specificStyles } from './specificStyles';
import Footer, { Retour } from './foot'

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
    { nom: 'JEUDI', description: '17h-00h\nrouge : 07 61 38 43 70 \nverte : 06 04 02 67 02\nbleu : 07 77 03 47 13' },
    { nom: 'SAMEDI', description: '9h-15h\nrouge : 07 82 28 79 09\nverte : 07 61 38 43 70 \nbleu : 06 27 65 47 70\n\n15h-21h\nrouge : 07 82 28 79 09\nverte : 06 49 06 92 44\nbleu : 07 82 87 49 31' },
    { nom: 'DIMANCHE', description: '9h-14h\nrouge : 06 52 30 24 24\nverte : 06 49 06 92 44\nbleu : 07 67 13 81 64\n\n14h-19h\nrouge : 07 83 90 86 03\nverte : 06 70 75 50 02\nbleu : 06 59 76 43 71\n\n19h-00h\nrouge : 06 27 02 25 35\nverte : 06 47 38 33 49\nbleu : 06 88 10 34 49' },

  ];

  return (
    <View style={{ backgroundColor: couleurs.backgroundColor, flex: 1 }}>
            <Retour onPress={() => navigation.navigate('WELPageContent')}/>


<TouchableOpacity onPress={() => navigation.navigate('PageCarte')} style={{alignSelf : 'center',margin : 10}}>
      <Image source={require('./assets/carte_wel.jpg')} style={{ margin : 10,height: 200, aspectRatio: 1, alignSelf: 'center' }} />
      
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


const WELPage = () => {

  const Stack = createStackNavigator();
  const [selectedItem, setSelectedItem] = useState(0);
  
    return (
     <Stack.Navigator headerMode="none">
      <Stack.Screen name="WELPageContent" component={WELPageContent} />
      <Stack.Screen name="PageOuverte" component={PageOuverte} />
    <Stack.Screen name="CommandePage" component={CommandePage} />

    <Stack.Screen name="PageCarte" component={PageCarte} />

    </Stack.Navigator>
  );
};

const WELPageContent = () => {

  const navigation = useNavigation();


  const Row1 = ({ handlePress }) => {
    return (
      <View style={[styles.row, { marginTop: 0 }]}>
          <TouchableOpacity onPress={() => handlePress(0)} style={{margin : 0}}>
              <Image source={require("./assets/hublots/WEL/j_.png")} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(1)} style={{alignSelf : 'flex-end'}} >
              <Image source={require("./assets/hublots/WEL/s_.png")} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(1)} style={{margin : 0}}>
              <Image source={require("./assets/hublots/WEL/d_.png")} style={styles.image} />
          </TouchableOpacity>
      </View>
    );
  };
  
  const Row2 = ({ handlePress }) => {
    return (
      <View style={[styles.row, { marginTop: 0 }]}>
          <TouchableOpacity onPress={() => navigation.navigate('CommandePage')} >
              <Image source={require("./assets/bateau.png")} style={[{flex : 1,aspectRatio: 1}]} />
          </TouchableOpacity>
      </View>
    );
  };


  const styles = StyleSheet.create({
    row: {
      flex : 1,
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginHorizontal : 10,
    },
    image: {
      flex : 0.6,
       // ajustez la largeur selon vos besoins
      aspectRatio: 1,// Ajustez la hauteur selon vos besoins
      resizeMode: 'cover',
    },
    titre: {
      marginTop: 0,
      borderRadius: 30,
      flex : 1,
      display: 'flex',
      fontSize: 100, // Ajustez la taille de la police selon vos besoins
      textAlign: 'center',
      textAlignVertical: 'center',
      overflow: 'hidden',
      //fontWeight: 'bold',
      fontFamily: 'body_font',
      textShadowColor:'#585858',
      textShadowOffset:{width: 5, height: 5},
      textShadowRadius:0 ,
      
    },
   
  });
  
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
      <View style={{flex : 1, paddingHorizontal : 10, flexDirection: 'column',justifyContent :'space-around', backgroundColor: couleurs.backgroundColor}}>
    <View style={{marginTop : 10, flex: 0.6, backgroundColor: 'transparent',justifyContent :'flex-end' }}>
      {//<Text style={styles.titre}>WEL</Text>
      }
      <Image source={require("./assets/wes.png")} 
      style={{flex : 0.8,aspectRatio : 3, resizeMode: 'contain',alignSelf : "center"}}/>
      
    </View>
    <View style={{ flex: 1.5 }}>
      {<Row1 handlePress={handlePress} />
      }
    </View>
    <View style={{ flex: 0.6, backgroundColor : 'transparent' }}>
      {
        <Row2 handlePress={handlePress} />
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

      <Image source={require('./assets/carte_wel.jpg')} style={{ resizeMode : "contain", aspectRatio: 1, alignSelf: 'center' }} />


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

//Jeudi Soir
const data1 = [
  { nom: 'Wok aux légumes 1,5€', description: 'champignons de Paris, sauce soja, carottes, nouilles, oignons, avec ou sans poivrons',source : require('./assets/wel_plat/3.jpg') },
  { nom: 'Wok au poulet 2€', description: 'champignons de Paris, sauce soja, carottes, nouilles, oignons, avec ou sans poivrons, poulet',source : require('./assets/wel_plat/4.jpg') },
  { nom: 'Petite faim 1€', description: 'lot de 3 briques (oeufs, patate, thon, kiri)',source : require('./assets/wel_plat/5.jpg') },
  { nom: 'Dessert 1€', description: 'fondant (PAS de metro) ou verrine',source : require('./assets/wel_plat/6.jpg') },
  { nom: 'Panier de toxico 1,5€', description: '1 redbull + 3 clopes',source : require('./assets/wel_plat/7.jpg') },
];

//Samedi
const data2 = [
  { nom: 'Formule phel’matin', description: "Malheureusement nous n'avons que très peu d’infos sur cette formule gargantuesque, regardez nos storys insta pour en savoir plus…",source : require('./assets/wel_plat/9.jpg') },
  { nom: 'Burger raclette végé 3€', description: 'servi avec des frites (oignon, steak végé, salade, tomate, raclette, sauce)',source : require('./assets/wel_plat/10.jpg') },
  { nom: 'Burger raclette 3€', description: 'servi avec des frites (oignon, steak de bœuf, salade, tomate, raclette, sauce )',source : require('./assets/wel_plat/12.jpg') },
  { nom: 'Petite faim 1€', description: ': lot de 3 briques (oeufs, patate, thon, kiri)',source : require('./assets/wel_plat/11.jpg') },
  { nom: 'Desserts 1€', description: 'tiramisu ou fondant',source : require('./assets/wel_plat/13.jpg') },
  { nom: 'Panier de toxico 1,5€', description: '1 redbull + 3 clopes',source : require('./assets/wel_plat/7.jpg') },  

];

//Dimanche
const data3 = [
  { nom: 'Formule phel’matin', description: "Malheureusement nous n'avons que très peu d’infos sur cette formule gargantuesque, regardez nos storys insta pour en savoir plus…",source : require('./assets/wel_plat/9.jpg') },
  { nom: 'Pain pita aux falafels 2€', description: 'falafels, tomate, salade, oignon, épices à kebab, sauce blanche',source : require('./assets/wel_plat/17.jpg') },
  { nom: 'Pain pita au poulet 1.5€', description: 'poulet, tomate, salade, oignon, épices à kebab, sauce blanche',source : require('./assets/wel_plat/18.jpg') },
  { nom: 'Petite faim 1€', description: ': lot de 3 briques (oeufs, patate, thon, kiri)',source : require('./assets/wel_plat/11.jpg') },
  { nom: 'Desserts 1€', description: 'mousse au choc ou crumble',source : require('./assets/wel_plat/20.jpg') },
  { nom: 'Panier de toxico 1,5€', description: '1 redbull + 3 clopes',source : require('./assets/wel_plat/7.jpg') },
  
];


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
      style={[{flexDirection : "column"},styles.itemContainer_defi, isActive && styles.selectedHeader,specificStyles.shadowBoutonDeroulant]}
    >
  <Image source={content.source} style={{ width :  Dimensions.get('window').width/3, height :  Dimensions.get('window').width/3, resizeMode: 'contain' }} />
      <Text style={[{flex : 1},styles.itemText]}>{content.nom}</Text>
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
    <View style={[styles.boutonDefiContainer,{marginBottom : 0}]}>
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


const PageOuverte = ({ route }) => {
  const { selectedIndex } = route.params;
  const [selectedItem, setSelectedItem] = useState(selectedIndex);

  const calendrierData = [
    { key: '1', image_src: require('./assets/hublots/WEL/j_.png'), elements: <BoutonsDeroulant data={data1} key="1" /> },
    { key: '2', image_src: require('./assets/hublots/WEL/s_.png'), elements: <BoutonsDeroulant data={data2} key="2" /> },
    { key: '3', image_src: require('./assets/hublots/WEL/d_.png'), elements: <BoutonsDeroulant data={data3} key="3" /> },
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


  const Row3 = ({ image1Source, image2Source }) => {
    return (
      <View style={[ { marginTop: 0,alignItems : 'center' }]}>
          <TouchableOpacity onPress={() => navigation.navigate('CommandePage')} >
              <Image source={require("./assets/bateau.png")} style={[{width : 150,height : 150,aspectRatio: 1}]} />
          </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ backgroundColor: couleurs.backgroundColor, flex: 1 }}>
      <Retour onPress={() => navigation.navigate('WELPageContent')}/>
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
        <View style={{ flex : 1, alignItems: 'center',marginBottom:20 }}>
        {calendrierData[selectedItem]?.elements}
        </View>
        <Row3/>
        <View style={{ flex : 1, alignItems: 'center',justifyContent : 'flex-end' }}>
        <Footer/>
        </View>
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
    marginBottom : 10,
    
    // Align accordions in a row
  },
  itemContainer_defi: {
    marginTop: 8,
    marginHorizontal: 8,
    backgroundColor: couleurs.buttonColor1,
    borderRadius: 10,
    
    padding: 14,
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
    flex : 1,
    fontFamily: 'body_font',
    marginTop : 10,
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
    //fontWeight : 'bold'
  },
  column: 
  {
    
    
  },
});


export default WELPage;

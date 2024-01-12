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
import Footer from './foot'

const WELPage = () => {

  const Stack = createStackNavigator();
  const [selectedItem, setSelectedItem] = useState(0);
  
    return (
     <Stack.Navigator headerMode="none">
      <Stack.Screen name="WELPageContent" component={WELPageContent} />
      <Stack.Screen name="PageOuverte" component={PageOuverte} />
    </Stack.Navigator>
  );
};

const WELPageContent = () => {

  const Row1 = ({ handlePress }) => {
    return (
      <View style={[styles.row, { marginTop: 0 }]}>
          <TouchableOpacity onPress={() => handlePress(0)} style={{margin : 0}}>
              <Image source={require("./assets/hublots/WEL/j.png")} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(1)} style={{alignSelf : 'flex-end'}} >
              <Image source={require("./assets/hublots/WEL/s.png")} style={styles.image} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress(1)} style={{margin : 0}}>
              <Image source={require("./assets/hublots/WEL/d.png")} style={styles.image} />
          </TouchableOpacity>
      </View>
    );
  };
  
  const Row2 = ({ handlePress }) => {
    return (
      <View style={[styles.row, { marginTop: 0 }]}>
          <TouchableOpacity onPress={() => handlePress(2)} >
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
      //marginBottom: 0,
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
      fontWeight: 'bold',
      fontFamily: 'body_font',
      textShadowColor:'#585858',
      textShadowOffset:{width: 5, height: 5},
      textShadowRadius:0 ,
      
    },
   
  });
  
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
      <View style={{flex : 1, paddingHorizontal : 10, flexDirection: 'column',justifyContent :'space-around', backgroundColor: couleurs.backgroundColor}}>
    <View style={{ flex: 0.6, backgroundColor: 'transparent',justifyContent :'flex-start' }}>
      {<Text style={styles.titre}>WEL</Text>
      }
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
  { nom: 'Wok aux légumes', description: 'champignons de Paris, sauce soja, carottes, nouilles, oignons, avec ou sans poivrons' },
  { nom: 'Wok au poulet', description: 'champignons de Paris, sauce soja, carottes, nouilles, oignons, avec ou sans poivrons, poulet' },
  { nom: 'Dessert', description: 'mousse au choc' },
  { nom: 'Panier de toxico', description: '1 redbull + 3 clopes' },
];

//Samedi
const data2 = [
  { nom: 'Formule phel’matin', description: 'panier brunch : pain, beurre, confiture, nutella, gaufres, salade de fruits, café ou thé ou tisane' },
  { nom: 'Burger raclette végé', description: 'servi avec des frites : oignon, steak végé, salade, tomate, raclette, sauce' },
  { nom: 'Burger raclette', description: 'servi, avec des frites : oignon, steak de bœuf, salade, tomate, raclette, sauce' },
  { nom: 'Desserts', description: '??' },
  { nom: 'Panier de toxico', description: '1 redbull + 3 clopes' },
  

];

//Dimanche
const data3 = [
  { nom: 'Formule phel’matin', description: 'panier brunch : pain, beurre, confiture, nutella, gaufres, salade de fruits, café ou thé ou tisane' },
  { nom: 'Pain pita aux falafels', description: 'falafels, tomate, salade, oignon, épices à kebab, sauce blanche' },
  { nom: 'Pain pita au poulet', description: 'poulet, tomate, salade, oignon, épices à kebab, sauce blanche' },
  { nom: 'Desserts', description: '??' },
  { nom: 'Panier de toxico', description: '1 redbull + 3 clopes'}
  
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
      style={[styles.itemContainer_defi, isActive && styles.selectedHeader,specificStyles.shadowBoutonDeroulant]}
    >
      <Text style={[styles.itemText]}>{content.nom}</Text>
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
    { key: '1', image_src: require('./assets/hublots/WEL/j.png'), elements: <BoutonsDeroulant data={data1} key="1" /> },
    { key: '2', image_src: require('./assets/hublots/WEL/s.png'), elements: <BoutonsDeroulant data={data2} key="2" /> },
    { key: '3', image_src: require('./assets/hublots/WEL/d.png'), elements: <BoutonsDeroulant data={data3} key="3" /> },
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

  return (
    <View style={{ backgroundColor: couleurs.backgroundColor, flex: 1 }}>
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
    marginBottom : 10,
    
    // Align accordions in a row
  },
  itemContainer_defi: {
    marginTop: 8,
    marginHorizontal: 8,
    backgroundColor: couleurs.buttonColor1,
    borderRadius: 10,
    
    padding: 16,
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
    fontSize: 22,
    fontWeight: 'bold',
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
    color: 'gray',
    fontSize: 16,
    textAlign: 'center',
    fontWeight : 'bold'
  },
  column: 
  {
    
    
  },
});


export default WELPage;

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image,TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Accordion from 'react-native-collapsible/Accordion';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer,useNavigation } from '@react-navigation/native';
//import { loadFonts, body_font } from './FontManager';

import couleurs from './Couleurs';
import { ScrollView } from 'react-native-gesture-handler';


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
        <Image source={require("./assets/hublots/DEF/quotidien.png")} style={stylesPage.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress(1)} style={stylesPage.imageContainer}>
        <Image source={require("./assets/hublots/DEF/classique.png")} style={stylesPage.image} />
      </TouchableOpacity>
    </View>
  ); 
};

const Row2 = ({ handlePress }) => {
  return (
    <View style={[stylesPage.row]}>
      <TouchableOpacity onPress={() => handlePress(2)}  style={stylesPage.imageContainer} >
        <Image source={require("./assets/hublots/DEF/la_liste.png")} style={stylesPage.image} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePress(3)} style={stylesPage.imageContainer}>
        <Image source={require("./assets/hublots/DEF/liste.png")} style={stylesPage.image} />
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
    <View style={{ flex: 1, backgroundColor: couleurs.backgroundColor }}>
      <Text style={stylesPage.titre}>DEFIS</Text>
      <Row1 handlePress={handlePress} />
      <Row2 handlePress={handlePress} />
    </View>
  );
};

const stylesPage = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 0,
  },
  
  image: {
    width: Dimensions.get('window').width/2,
    height: Dimensions.get('window').width/2,
    resizeMode: 'cover',
    borderRadius: 8, // Optional: Add border radius for rounded corners
  },
  titre: {
    marginTop: 20,
    borderRadius: 30,
    fontSize: 130, // Ajustez la taille de la police selon vos besoins
    textAlign: 'center',  
    textAlignVertical: 'center',
    overflow: 'hidden',
    fontWeight: 'bold',
    //fontFamily: body_font,
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

const dataDefi1 = [
  { nom: 'D1 5pts quotidien', description: 'Description de D1 ugo' },
  { nom: 'D2 5pts', description: 'Description de D2' },
  { nom: 'D3 5pts', description: 'Description de D3' },
  { nom: 'D4 5pts', description: 'Description de D4' },
  { nom: 'D5 5pts', description: 'Description de D5' },
  { nom: 'D6 5pts', description: 'Description de D6' },
  { nom: 'D7 5pts', description: 'Description de D7' },
  { nom: 'D8 5pts', description: 'Description de D8' },
  { nom: 'D9 5pts', description: 'Description de D9' },
];
const dataDefi2 = [
  { nom: 'F1 5pts classique', description: 'Description de F1' },
  { nom: 'F2 15pts', description: 'Description de F2' },
  { nom: 'F3 10pts', description: 'Description de F3' },
  { nom: 'F4 5pts', description: 'Description de F4' },
  { nom: 'F5 50pts', description: 'Description de F5' },
  { nom: 'F6 25pts', description: 'Description de F6' },
  { nom: 'F7 15pts', description: 'Description de F7' },
  { nom: 'F8 20pts', description: 'Description de F8' },

];
const dataDefi3 = [
  { nom: 'D1 5pts la l', description: 'Description de D1' },
  { nom: 'D2 5pts', description: 'Description de D2' },
  { nom: 'D3 5pts', description: 'Description de D3' },
  { nom: 'D4 5pts', description: 'Description de D4' },
  { nom: 'D5 5pts', description: 'Description de D5' },
  { nom: 'D6 5pts', description: 'Description de D6' },
  { nom: 'D7 5pts', description: 'Description de D7' },
  { nom: 'D8 5pts', description: 'Description de D8' },
  { nom: 'D9 5pts', description: 'Description de D9' },
];
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

const BoutonDefi1 = () => {
  
  const [activeSectionsColonne1, setActiveSectionsColonne1] = useState([]);
  const [activeSectionsColonne2, setActiveSectionsColonne2] = useState([]);

  const itemContainerRefColonne1 = useRef(null);
  const itemContainerRefColonne2 = useRef(null);

  // Divise dataDefi1 en deux colonnes
  const dataDefi1Colonne1 = dataDefi1.filter((_, index) => index % 2 === 0);
  const dataDefi1Colonne2 = dataDefi1.filter((_, index) => index % 2 !== 0);

  const renderHeader = (content, index, isActive, section, ref) => (
    <View
      ref={isActive ? ref : null}
      style={[styles.itemContainer_defi, isActive && styles.selectedHeader]}
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
  }, [onTransitionEnd]);

  return (
    <View style={styles.boutonDefiContainer}>
      <Accordion
      style={styles.column}
        sections={dataDefi1Colonne1}
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
      <Accordion
      style={styles.column}
        sections={dataDefi1Colonne2}
        activeSections={activeSectionsColonne2}
        renderHeader={(content, index, isActive, section) =>
          renderHeader(content, index, isActive, section, itemContainerRefColonne2)
        }
        renderContent={renderContent}
        onChange={updateSectionsColonne2}
        underlayColor={'transparent'}
        onTransitionEnd={() => onTransitionEnd(itemContainerRefColonne2)}
        expandMultiple={true}
      />
    </View>
  );
};
////////////////////////////
const BoutonDefi2 = () => {
  const [activeSectionsColonne1, setActiveSectionsColonne1] = useState([]);
  const [activeSectionsColonne2, setActiveSectionsColonne2] = useState([]);

  const itemContainerRefColonne1 = useRef(null);
  const itemContainerRefColonne2 = useRef(null);

  // Divise dataDefi1 en deux colonnes
  const dataDefi1Colonne1 = dataDefi2.filter((_, index) => index % 2 === 0);
  const dataDefi1Colonne2 = dataDefi2.filter((_, index) => index % 2 !== 0);

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
  }, [onTransitionEnd]);

  return (
    <View style={styles.boutonDefiContainer}>
      <Accordion
      style={styles.column}
        sections={dataDefi1Colonne1}
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
      <Accordion
      style={styles.column}
        sections={dataDefi1Colonne2}
        activeSections={activeSectionsColonne2}
        renderHeader={(content, index, isActive, section) =>
          renderHeader(content, index, isActive, section, itemContainerRefColonne2)
        }
        renderContent={renderContent}
        onChange={updateSectionsColonne2}
        underlayColor={'transparent'}
        onTransitionEnd={() => onTransitionEnd(itemContainerRefColonne2)}
        expandMultiple={true}
      />
    </View>
  );
};
const BoutonDefi3 = () => {
  const [activeSectionsColonne1, setActiveSectionsColonne1] = useState([]);
  const [activeSectionsColonne2, setActiveSectionsColonne2] = useState([]);

  const itemContainerRefColonne1 = useRef(null);
  const itemContainerRefColonne2 = useRef(null);

  // Divise dataDefi1 en deux colonnes
  const dataDefi1Colonne1 = dataDefi3.filter((_, index) => index % 2 === 0);
  const dataDefi1Colonne2 = dataDefi3.filter((_, index) => index % 2 !== 0);

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
  }, [onTransitionEnd]);

  return (
    <View style={styles.boutonDefiContainer}>
      <Accordion
      style={styles.column}
        sections={dataDefi1Colonne1}
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
      <Accordion
      style={styles.column}
        sections={dataDefi1Colonne2}
        activeSections={activeSectionsColonne2}
        renderHeader={(content, index, isActive, section) =>
          renderHeader(content, index, isActive, section, itemContainerRefColonne2)
        }
        renderContent={renderContent}
        onChange={updateSectionsColonne2}
        underlayColor={'transparent'}
        onTransitionEnd={() => onTransitionEnd(itemContainerRefColonne2)}
        expandMultiple={true}
      />
    </View>
  );
};
const BoutonDefi4 = () => {
  const [activeSectionsColonne1, setActiveSectionsColonne1] = useState([]);
  const [activeSectionsColonne2, setActiveSectionsColonne2] = useState([]);

  const itemContainerRefColonne1 = useRef(null);
  const itemContainerRefColonne2 = useRef(null);

  // Divise dataDefi1 en deux colonnes
  const dataDefi1Colonne1 = dataDefi4.filter((_, index) => index % 2 === 0);
  const dataDefi1Colonne2 = dataDefi4.filter((_, index) => index % 2 !== 0);

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
  }, [onTransitionEnd]);

  return (
    <View style={styles.boutonDefiContainer}>
      <Accordion
      style={styles.column}
        sections={dataDefi1Colonne1}
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
      <Accordion
      style={styles.column}
        sections={dataDefi1Colonne2}
        activeSections={activeSectionsColonne2}
        renderHeader={(content, index, isActive, section) =>
          renderHeader(content, index, isActive, section, itemContainerRefColonne2)
        }
        renderContent={renderContent}
        onChange={updateSectionsColonne2}
        underlayColor={'transparent'}
        onTransitionEnd={() => onTransitionEnd(itemContainerRefColonne2)}
        expandMultiple={true}
        
      />
    </View>
  );
};


const PageOuverte = ({ route }) => {
  const { selectedIndex } = route.params;
  const [selectedItem, setSelectedItem] = useState(selectedIndex);

  const calendrierData = [
    { image_src: require('./assets/hublots/DEF/quotidien.png'), elements: <BoutonDefi1 /> },
    { image_src: require('./assets/hublots/DEF/classique.png'), elements: <BoutonDefi2 /> },
    { image_src: require('./assets/hublots/DEF/la_liste.png'), elements: <BoutonDefi3 /> },
    { image_src: require('./assets/hublots/DEF/liste.png'), elements: <BoutonDefi4 /> },
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
      <View style={{ marginTop: 0 }}>
        <Carousel
          data={calendrierData}
          renderItem={renderItem}
          sliderWidth={viewportWidth}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={onSnapToItem}
          loop
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
        <ScrollView style={{ marginBottom : 150}}>
        {calendrierData[selectedItem]?.elements}
      </ScrollView>
      </View>
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
    overflow: 'hidden',
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
  },
  column: 
  {
    
    
  },
});

export  {DEFPage,PageOuverte,DEFPageContent};
 
import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions,TouchableOpacity, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import couleurs from './Couleurs';
import { ScrollView } from 'react-native-gesture-handler';
import Accordion from 'react-native-collapsible/Accordion';
import Footer from './foot';

//import { loadFonts, body_font } from './FontManager';
// const body_font = ''
// const loadFonts = () => {}

const CalendrierItem = ({ item, isSelected,selectedItem,index }) => {

  return (
    <View style={[styles.itemContainer, isSelected && styles.selectedItem]}>
      <Text style={styles.monthText}>{item.mois}</Text>
      <Text style={styles.numText}>{item.num}</Text>
      <Text style={styles.dayText}>{item.jour}</Text>
    </View>
  );
};


const BoutonDeroulant = ({ data }) => 
{

  const stylesAccordion = StyleSheet.create({


    itemContainer_defi: {
      marginTop: 18,
      marginHorizontal: 8,
      backgroundColor: couleurs.buttonColor3,
      borderRadius: 20,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      //overflow: 'hidden',
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 3,
      marginBottom: 0,
      width: Dimensions.get('window').width*0.9,
    },
    selectedHeader: {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      marginBottom: 0,
    },
    itemText: {
      color: 'white',
      fontSize: 45,
      fontWeight: 'bold',
      fontFamily: 'body_font',
    },
    descriptionContainer: {
      backgroundColor: couleurs.buttonColor2,
      borderRadius: 10,
      padding: 10,
      marginHorizontal: 8,
      marginTop: -8,
      width: Dimensions.get('window').width*0.8,
      alignSelf: 'center',
      
    },
    descriptionText: {
      color: 'white',
      fontSize: 22,
      textAlign: 'center',
      fontFamily: 'body_font',
    },

  });
  
  const renderHeader = (content, index, isActive, section) => 
  {
    return(  
    <View  style={[stylesAccordion.itemContainer_defi]} >
      <Text style={stylesAccordion.itemText}>{content.nom}</Text>
    </View>
  )}
  
  const renderContent = (section) => (
    <View style={stylesAccordion.descriptionContainer}>
      <Text style={stylesAccordion.descriptionText}>{section.description}</Text>
    </View>
  );


  const [activeSections, setActiveSections] = useState([]);

  const updateSections = (activeSections) => {
    setActiveSections(activeSections);
  };

  return (

    <Accordion
    activeSections={activeSections}
      
      sections={data}
      renderHeader={
        renderHeader
      }
      renderContent={renderContent}
      onChange={updateSections}
      underlayColor={'transparent'}
    />
    
  );
}

const CustomComponent = ({ selectedButtons, handlePress }) => {

  const availableButtons = {
    SOS: { label: 'SOS', backgroundColor: couleurs.buttonColor1 },
    WEL: { label: 'WEL', backgroundColor: couleurs.buttonColor2 },
    
  };
  const availableAccordion = 
  {
    EL : { label: 'EVENTS LISTE', backgroundColor: couleurs.buttonColor3 },
    EAL : { label: 'EVENTS AUTRE LISTE', backgroundColor: couleurs.buttonColor3 },
  }

  return (
    <View style={[styles.customComponentContainer]}>  
      {selectedButtons.map((buttonName, index) => {
        const button = availableButtons[buttonName];
        const accor = availableAccordion[buttonName]
        if (button) {
          return (
            <TouchableOpacity key={index} style={[styles.button, { backgroundColor: button.backgroundColor }]} onPress={() => handlePress(buttonName)}>
              <Text style={styles.buttonText}>{button.label}</Text>
            </TouchableOpacity>
          );
        }
        else if (buttonName["nom"]) {
          return <BoutonDeroulant data={[{ nom: buttonName["nom"], description: buttonName["description"]}]} />;
        }
        
        return null; // Ignorer les boutons inconnus
      })}
    </View>
  );
};


const CALPage = ({ navigation }) => {

  // useEffect(() => {
  //   loadFonts();
  // }, []);

  const handlePress = (page) => {
    navigation.navigate(page);
  };
 
  
  const calendrierData = [
    { jour: 'Lun', num: '30', mois: 'Janvier', selectedButtons: ['SOS', 'WEL',{nom : 'EVENT LISTE', description : 'desc 1'},{nom : 'EVENT AUTRE LISTE', description : 'desc 2'}] },
    { jour: 'Mar', num: '31', mois: 'Janvier', selectedButtons: ['SOS', 'WEL'] },
    { jour: 'Mer', num: '01', mois: 'Février', selectedButtons: ['SOS', 'EL'] },
    { jour: 'Jeu', num: '02', mois: 'Février', selectedButtons: ['WEL', 'EAL'] },
    { jour: 'Ven', num: '03', mois: 'Février', selectedButtons: ['SOS', 'WEL'] },
    { jour: 'Sam', num: '04', mois: 'Février', selectedButtons: ['SOS', ] },
  ];

  


  const [selectedItem, setSelectedItem] = useState(0);


  const onSnapToItem = (index) => {
    setSelectedItem(index);
  };

const renderItem = ({ item, index }) => {
  return <CalendrierItem item={item} isSelected={(index % calendrierData.length)  === selectedItem % calendrierData.length} selectedItem={selectedItem} index={index}/>;
};

  const { width: viewportWidth } = Dimensions.get('window');
  const ITEM_WIDTH = viewportWidth * 0.20;

  return (
    <View style={{ flex: 1,backgroundColor :  couleurs.backgroundColor }}>
    <View style={{flex : 1, marginTop: 0}}>
      <View style={{justifyContent : 'flex-start', alignItems: 'center' }}>
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
        containerCustomStyle={{ height: 'auto'}}
        inactiveSlideOpacity={1}


      />
      </View>
      <ScrollView style={{ flex : 1 }}>
      {<CustomComponent selectedButtons={calendrierData[selectedItem]?.selectedButtons} handlePress={handlePress} />
}
      
      <View style={{ flex : 1, alignItems: 'center' }}>
        
        <Image
          source={require('./assets/Logo.png')}
          style={{ width: 150, height: 150 * 1200 / 1080,marginBottom: 0 }}
          resizeMode="contain"
        />
        <Footer/>
        <View style={{ backgroundColor : 'black' }}>
        </View>
      </View>

      </ScrollView>
    </View>
    </View>
  );
}; 

const styles = StyleSheet.create({
  itemContainer: {
    margin : 0,
    padding: 5, // Ajustez la marge intérieure
    backgroundColor: couleurs.buttonColor3,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    marginBottom : 10,
  },
  monthText: {
    paddingTop: 5,
    fontSize: 17,
    marginBottom: 5,
    color : "white",
    fontFamily: 'body_font',
  },
  numText: {
    marginTop : -15, 
    marginBottom : -15,
    fontSize: 55,
    color : "white",
    fontFamily: 'body_font',
  },
  dayText: {
    fontSize: 20,
    marginTop: 5,
    color : "white",
    paddingBottom: 0,
    fontFamily: 'body_font',
  },
  customComponentContainer: {
    
    marginTop: 0,
    padding: 10,
    
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center' 
    
  },
  button: {
    width: '95%', // Prend presque toute la largeur
    marginTop: 18,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  buttonText: {
    margin : 0 ,
    fontSize: 45,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'body_font',
  },
  selectedItem: {
    backgroundColor: couleurs.buttonColor1,

  },
});

export default CALPage;

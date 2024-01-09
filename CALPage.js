import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions,TouchableOpacity, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import couleurs from './Couleurs';
import { ScrollView } from 'react-native-gesture-handler';
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

const CustomComponent = ({ selectedButtons, handlePress }) => {

  const availableButtons = {
    SOS: { label: 'SOS', backgroundColor: couleurs.buttonColor1 },
    WEL: { label: 'WEL', backgroundColor: couleurs.buttonColor2 },
    EL : { label: 'EVENTS LISTE', backgroundColor: couleurs.buttonColor3 },
    EAL : { label: 'EVENTS AUTRE LISTE', backgroundColor: couleurs.buttonColor3 },
  };

  return (
    <View style={[styles.customComponentContainer]}>  
      {selectedButtons.map((buttonName, index) => {
        const button = availableButtons[buttonName];
        if (button) {
          return (
            <TouchableOpacity key={index} style={[styles.button, { backgroundColor: button.backgroundColor }]} onPress={() => handlePress(buttonName)}>
              <Text style={styles.buttonText}>{button.label}</Text>
            </TouchableOpacity>
          );
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
    { jour: 'Lun', num: '30', mois: 'Janvier', selectedButtons: ['SOS', 'WEL','EL','EAL'] },
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
    <View style={{ marginTop: 20}}>
      <View style={{ alignItems: 'center' }}>
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
      <ScrollView style={{  }}>
      {<CustomComponent selectedButtons={calendrierData[selectedItem]?.selectedButtons} handlePress={handlePress} />
}
      
      <View style={{  alignItems: 'center' }}>
        <Image
          source={require('./assets/Logo.png')}
          style={{ width: 150, height: 150 * 1200 / 1080,marginBottom: 150 }}
          resizeMode="contain"
        />
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
    fontSize: 15,
    marginBottom: 5,
    color : "white",
    //fontFamily: body_font,
  },
  numText: {
    marginTop : -15, 
    marginBottom : -15,
    fontSize: 50,
    color : "white",
    //fontFamily: body_font,
  },
  dayText: {
    fontSize: 15,
    marginTop: 5,
    color : "white",
    paddingBottom: 5,
    //fontFamily: body_font,
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
    marginVertical: 10,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  buttonText: {
    margin : 10 ,
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    //fontFamily: body_font,
  },
  selectedItem: {
    backgroundColor: couleurs.buttonColor1,

  },
});

export default CALPage;

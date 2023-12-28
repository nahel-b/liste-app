import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions,TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const CalendrierItem = ({ item, isSelected,selectedItem,index }) => {

  return (
    <View style={[styles.itemContainer, isSelected && styles.selectedItem]}>
      <Text style={styles.monthText}>{item.mois}</Text>
      <Text style={styles.numText}>{item.num}</Text>
      <Text style={styles.dayText}>{item.jour}</Text>
    </View>
  );
};

const CustomComponent1 = ({ handlePress }) => (
  <View style={styles.customComponentContainer}>
    <TouchableOpacity style={[styles.button,{backgroundColor: 'rgb(0,72,171)'}]} onPress={() => handlePress('SOS')}>
      <Text style={styles.buttonText} >SOS/WEL</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button,{backgroundColor: 'rgb(55,182,255)'}]}>
      <Text style={styles.buttonText}>EVENTS LISTE</Text>
    </TouchableOpacity>
    <TouchableOpacity style={[styles.button,{backgroundColor: 'rgb(90,225,230)'}]}>
      <Text style={styles.buttonText}>EVENT AUTRE LISTE</Text>
    </TouchableOpacity>
  </View>
);

const CustomComponent2 = ({ handlePress }) => (
  <View style={styles.customComponentContainer}>
    <TouchableOpacity style={styles.button} onPress={() => handlePress('SOS')}>
      <Text style={styles.buttonText}>SOS/WEL</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>MINP</Text>
    </TouchableOpacity>
    
  </View>
);
const CustomComponent3 = ({ handlePress }) => (
  <View style={styles.customComponentContainer}>
   
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>MINP</Text>
    </TouchableOpacity>
    
  </View>
);

const CALPage = ({ navigation }) => {

  const handlePress = (page) => {
    navigation.navigate(page);
  };
  
  const calendrierData = [
    { jour: 'Lun', num: '30', mois: 'Janvier', elements: <CustomComponent1 handlePress={handlePress} /> },
    { jour: 'Mar', num: '31', mois: 'Janvier', elements: <CustomComponent2 handlePress={handlePress}/> },
    { jour: 'Mer', num: '01', mois: 'Février', elements: <CustomComponent3 handlePress={handlePress} /> },
    { jour: 'Jeu', num: '02', mois: 'Février', elements: <CustomComponent2 handlePress={handlePress}/> },
    { jour: 'Ven', num: '03', mois: 'Février', elements: <CustomComponent1 handlePress={handlePress}/> },
    { jour: 'Sam', num: '04', mois: 'Février', elements: <CustomComponent2 handlePress={handlePress}/> },
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
    <View style={{ marginTop: 20 }}>
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

      />
      {calendrierData[selectedItem]?.elements}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin : 0,
    padding: 5, // Ajustez la marge intérieure
    backgroundColor: 'rgb(6,192,223)',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    //height : 100  
  },
  monthText: {
    paddingTop: 5,
    fontSize: 15,
    marginBottom: 5,
    color : "white"
  },
  numText: {
    marginTop : -15, 
    marginBottom : -15,
    fontSize: 50,
    color : "white"
  },
  dayText: {
    fontSize: 15,
    marginTop: 5,
    color : "white",
    paddingBottom: 5
  },
  customComponentContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 10,
    alignItems: 'center',
  },
  button: {
    width: '95%', // Prend presque toute la largeur
    marginVertical: 10,
    padding: 15,
    backgroundColor: 'skyblue',
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    padding : 7,
    fontSize: 30,
    color: 'white',
  },
  selectedItem: {
    backgroundColor: 'rgb(0,72,171)',

  },
});

export default CALPage;

import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions,TouchableOpacity,Image,FlatList } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const CalendrierItem = ({ item, isSelected,selectedItem,index }) => {

  return (
    <View style={[styles.itemContainer, isSelected && styles.selectedItem]}>
      <Image source={item.image_src} style={styles.image} />
    </View>
  );
};

const CustomComponent1 = ({ handlePress }) => {

  const dataDefi = [{nom : "D1 5pts"},{nom : "D2 5pts"},{nom : "D3 5pts"},{nom : "D4 5pts"},{nom : "D5 5pts"},{nom : "D6 5pts"},{nom : "D7 5pts"},{nom : "D8 5pts"},{nom : "D9 5pts"},{nom : "D10 5pts"}]
const renderItem = ({ item }) => (
    <View style={styles.itemContainer_defi}>
      <Text style={styles.itemText}>{item.nom}</Text>
    </View>
  );
return(
  <FlatList
      data={dataDefi}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      contentContainerStyle={styles.flatListContainer}
    />
  
  )
};

const CustomComponent2 = ({ handlePress }) => {

  const dataDefi = [{nom : "D1 5pts"},{nom : "D2 15pts"},{nom : "D3 10pts"},{nom : "D4 5pts"},{nom : "D5 12pts"},{nom : "D6 50pts"},{nom : "D7 8pts"},{nom : "D8 5pts"}]
const renderItem = ({ item }) => (
    <View style={styles.itemContainer_defi}>
      <Text style={styles.itemText}>{item.nom}</Text>
    </View>
  );
return(
  <FlatList
      data={dataDefi}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={2}
      contentContainerStyle={styles.flatListContainer}
    />
  
  )
};
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
    { image_src : require("./assets/hublot.png"), elements: <CustomComponent1 handlePress={handlePress} /> },
    { image_src : require("./assets/hublot.png"), elements: <CustomComponent2 handlePress={handlePress}/> },
    { image_src : require("./assets/hublot.png"), elements: <CustomComponent3 handlePress={handlePress} /> },
    
  ];
 

  


  const [selectedItem, setSelectedItem] = useState(0);


  const onSnapToItem = (index) => {
    setSelectedItem(index);
  };

const renderItem = ({ item, index }) => {
  return <CalendrierItem item={item} isSelected={(index % calendrierData.length)  === selectedItem % calendrierData.length} selectedItem={selectedItem} index={index}/>;
};

  const { width: viewportWidth } = Dimensions.get('window');
  const ITEM_WIDTH = viewportWidth * 0.35;

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
    backgroundColor: 'transparent',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    //height : 100  
  },
  image: {
    width : 120,
    height : 120
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
    backgroundColor: 'transparent',

  },
   flatListContainer: {
    padding: 16,
  },
  itemContainer_defi: {
    flex: 1,
    margin: 8,
    backgroundColor: 'rgb(90,223,229)',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    color: 'black',
    fontSize: 22,
  },
});

export default CALPage;

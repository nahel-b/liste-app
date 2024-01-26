import React, { useState,useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions,TouchableOpacity, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import couleurs from './Couleurs';
import { ScrollView } from 'react-native-gesture-handler';
import Accordion from 'react-native-collapsible/Accordion';
import Footer from './foot';
import moment from 'moment';

import { specificStyles } from './specificStyles';



const CalendrierItem = ({ item, isSelected,selectedItem,index }) => {

  return (
    <View style={[styles.itemContainer, isSelected && styles.selectedItem,specificStyles.shadowBoutonDeroulant]}>
      <Text style={styles.monthText}>{item.mois}</Text>
      <Text style={styles.numText}>{item.num}</Text>
      <Text style={styles.dayText}>{item.jour}</Text>
    </View>
  );
};


const BoutonDeroulant = ({ data,key,bg_color = couleurs.buttonColor3 }) => 
{

  const stylesAccordion = StyleSheet.create({


    itemContainer_defi: {
      marginTop: 18,
      marginHorizontal: 8,
      backgroundColor: bg_color,
      borderRadius: 20,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      //overflow: 'hidden',
      // shadowColor: 'black',
      // shadowOffset: { width: 0, height: 4 },
      // shadowOpacity: 0.5,
      // shadowRadius: 3,
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
      //fontWeight: 'bold',
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
    <View  style={[stylesAccordion.itemContainer_defi,specificStyles.shadowBoutonDeroulant]} >
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
    WEL: { label: 'WEL', backgroundColor: couleurs.buttonColor1 },
    
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
          index = index +1
          let bg_color = couleurs.buttonColor1
          if (buttonName["nom"] == "EVENT AUTRES LISTE" || buttonName["nom"] == "EVENT AUTRE LISTE")
          {
              bg_color = couleurs.buttonColor3
          }

          return <BoutonDeroulant data={[{key : `${index}`, nom: buttonName["nom"], description: buttonName["description"]}]} bg_color={bg_color} />;


        }
        
        return null; // Ignorer les boutons inconnus
      })}
    </View>
  );
};


const CALPage = ({ navigation }) => {

  
  useEffect(() => {
    setSelectedItem(findInitialIndex());
  }, []);
  

  
  const handlePress = (page) => {
    navigation.navigate(page);
  };
 
  const findInitialIndex = () => {
    const currentDate = moment();
    const todayIndex = calendrierData.findIndex(item =>
      moment(`${item.num} ${item.moisNumero}`, 'DD M').isSame(currentDate, 'day')
    );
    
    return todayIndex >= 0 ? todayIndex : 0;
  };
  
  const calendrierData = [

 

    {jour: 'Ven', num: '26', mois: 'Janvier', selectedButtons:['SOS',{nom : 'Goûter Campus', description : 'Les plus beaux des poissons vous ont préparé le plus beau des goûters, préparez vous vos 4 heures seront des plus tristes après ce jour'},{nom : 'EVENT AUTRES LISTE', description : 'SAT Pizzaioliste'}], moisNumero: 1},

    {jour: 'Sam', num: '27', mois: 'Janvier', selectedButtons:['SOS',{nom : 'EVENT AUTRES LISTE', description : 'EVENT LIBRE Révoliste\nSOIREE Aliste'}], moisNumero: 1},

    {jour: 'Dim', num: '28', mois: 'Janvier', selectedButtons:['SOS',{nom : 'EVENT AUTRES LISTE', description : 'EVENT SPORT Préhistoliste'}], moisNumero: 1},

    {jour: 'Lun', num: '29', mois: 'Janvier', selectedButtons:[{nom : 'Soirée MINP', description : "Un soirée MINP sans alocool..., de toute façon c'est pas ça qui faisait venir les gens à la KFET non?"},{nom : 'EVENT AUTRE LISTE', description : 'GOUTER CAMPUS Révoliste'}], moisNumero: 1},

    {jour: 'Mar', num: '30', mois: 'Janvier', selectedButtons:[{nom : 'EVENT AUTRE LISTE', description : 'GOUTER MINATEC Pizzaiolitse'}], moisNumero: 1},

    {jour: 'Mer', num: '31', mois: 'Janvier', selectedButtons:[{nom : 'EVENT AUTRE LISTE', description : 'GOUTER CAMPUS Préhistoliste\nMINP Aliste'}], moisNumero: 1},

    {jour: 'Jeu', num: '01', mois: 'Fevrier', selectedButtons:['WEL',{nom : 'Event DD', description : "C'est le moment de montrer que même à Phelma on est plus durables qu'au Cube"}], moisNumero: 2},

    {jour: 'Ven', num: '02', mois: 'Fevrier', selectedButtons:[{nom : 'EVENT AUTRE LISTE', description : 'GOUTER MINATEC Aliste\nSoirée Zik Révoliste'}], moisNumero: 2}, 

    {jour: 'Sam', num: '03', mois: 'Fevrier', selectedButtons:['WEL',{nom : 'EVENT AUTRE LISTE', description : 'EVENT LIBRE Pizzaioliste\nSOIREE Préhistoliste'}], moisNumero: 2},

    {jour: 'Dim', num: '04', mois: 'Fevrier', selectedButtons:['WEL',{nom : 'Event Sport', description : 'Rejoignez le navire, la Phlow vous a préparé une activité GARGANTUESQUE!'}], moisNumero: 2},

    {jour: 'Lun', num: '05', mois: 'Fevrier', selectedButtons:[{nom : 'EVENT AUTRE LISTE', description : 'GOUTER CAMPUS Pizzaioliste\nSAT Révoliste'}], moisNumero: 2},

    {jour: 'Mar', num: '06', mois: 'Fevrier', selectedButtons:[{nom : 'EVENT AUTRE LISTE', description : 'GOUTER MINATEC Préhistoliste'}], moisNumero: 2},

    {jour: 'Mer', num: '07', mois: 'Fevrier', selectedButtons:[{nom : 'EVENT AUTRE LISTE', description : 'GOUTER MINATEC Révoliste'}], moisNumero: 2},

    {jour: 'Jeu', num: '08', mois: 'Fevrier', selectedButtons:[{nom : 'Goûter Minatec',description :'Le premier vous a pas suffit? Nos poissons sont de retours avec de nouvelles saveurs qui rendraient doux les plus féroces des requins'},{nom : 'EVENT AUTRE LISTE', description : 'SOIREE ZIK Pizzaioliste '}], moisNumero: 2},

    {jour: 'Ven', num: '09', mois: 'Fevrier', selectedButtons:[{nom : 'EVENT AUTRE LISTE', description : 'GOUTER CAMPUS Aliste\nMINP Préhistoliste'}], moisNumero: 2},

    {jour: 'Sam', num: '10', mois: 'Fevrier', selectedButtons:[{nom : 'Soirée', description : "Ne prévoyez rien non plus Dimanche, ce sera pour vous une déception après la soirée de folie qui vous attends aujourd'hui"}], moisNumero: 2},

    {jour: 'Dim', num: '11', mois: 'Fevrier', selectedButtons:[{nom : 'Débat des Prez', description : ''},{nom : 'EVENT AUTRE LISTE', description : 'EVENT SPORT Aliste'}], moisNumero: 2}

  ];

  // const calendrierData = [

  //   {jour: 'Ven', num: '26', mois: 'Janvier', selectedButtons:['SOS',{nom : 'Goûter Campus', description : 'Miam'},{nom : 'EVENT AUTRE LISTE', description : 'SAT'}], moisNumero: 1},
  //   {jour: 'Sam', num: '27', mois: 'Janvier', selectedButtons:['SOS',{nom : 'Soirée', description : ''},{nom : 'EVENT AUTRE LISTE', description : 'Event Libre'}], moisNumero: 1},
  //   {jour: 'Dim', num: '28', mois: 'Janvier', selectedButtons:['SOS',{nom : 'Event Sport', description : ''}], moisNumero: 1},
  //   {jour: 'Lun', num: '29', mois: 'Janvier', selectedButtons:[{nom : 'Kfet', description : ' '},{nom : 'EVENT AUTRE LISTE', description : 'Goûter Campus'}], moisNumero: 1},
  //   {jour: 'Mar', num: '30', mois: 'Janvier', selectedButtons:[{nom : 'Fakelistes', description : ' '},{nom : 'EVENT AUTRE LISTE', description : 'Goûter Minatec'}], moisNumero: 1},
  //   {jour: 'Mer', num: '31', mois: 'Janvier', selectedButtons:[{nom : 'EVENT AUTRE LISTE', description : 'Goûter Minatec\nKfet'}], moisNumero: 1},
  //   {jour: 'Jeu', num: '01', mois: 'Fevrier', selectedButtons:['WEL',{nom : 'Event DD', description : ' '}], moisNumero: 2},
  //   {jour: 'Ven', num: '02', mois: 'Fevrier', selectedButtons:[{nom : 'EVENT AUTRE LISTE', description : 'Goûter Minatec\nSoirée Zik'}], moisNumero: 2},  
  //   {jour: 'Sam', num: '03', mois: 'Fevrier', selectedButtons:['WEL',{nom : 'EVENT AUTRE LISTE', description : 'Event Libre\nSoirée'}], moisNumero: 2},
  //   {jour: 'Dim', num: '04', mois: 'Fevrier', selectedButtons:['WEL',{nom : 'Event Sport', description : ' '}], moisNumero: 2},
  //   {jour: 'Lun', num: '05', mois: 'Fevrier', selectedButtons:[{nom : 'EVENT AUTRE LISTE', description : 'Goûter Campus\nSAT'}], moisNumero: 2},
  //   {jour: 'Mar', num: '06', mois: 'Fevrier', selectedButtons:[{nom : 'EVENT AUTRE LISTE', description : 'Goûter Minatec'}], moisNumero: 2},
  //   {jour: 'Mer', num: '07', mois: 'Fevrier', selectedButtons:[{nom : 'EVENT AUTRE LISTE', description : 'Goûter Minatec'}], moisNumero: 2},
  //   {jour: 'Jeu', num: '08', mois: 'Fevrier', selectedButtons:[{nom : 'Goûter Minatec',description :' '},{nom : 'EVENT AUTRE LISTE', description : 'Soirée Zik'}], moisNumero: 2},
  //   {jour: 'Ven', num: '09', mois: 'Fevrier', selectedButtons:[{nom : 'EVENT AUTRE LISTE', description : 'Goûter Campus\nKfet'}], moisNumero: 2},
  //   {jour: 'Sam', num: '10', mois: 'Fevrier', selectedButtons:[{nom : 'Soirée', description : ''}], moisNumero: 2},
  //   {jour: 'Ven', num: '09', mois: 'Fevrier', selectedButtons:[{nom : 'Débat des Prez', description : ''},{nom : 'EVENT AUTRE LISTE', description : 'Event Sport'}], moisNumero: 2}
  // ];

  


const [selectedItem, setSelectedItem] = useState(findInitialIndex());


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
        firstItem={selectedItem}

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
        <View style={{flex : 1, marginTop:20}} >
        <Footer />
        </View>
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
    // shadowColor: 'black',
    // shadowOffset: {width: 0, height: 4},
    // shadowOpacity: 0.5,
    // shadowRadius: 3,
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
    //fontWeight: 'bold',
    fontFamily: 'body_font',
  
  },
  selectedItem: {
    backgroundColor: couleurs.buttonColor1,
  },
});

export default CALPage;

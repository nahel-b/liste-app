import React from 'react';
import { SafeAreaView, View, Text, Image, Linking, TouchableOpacity, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PODPage from './PODPage.js'
import CALPage from './CALPage.js'
import SOSPage from './SOSPage.js'
import WELPage from './WELPage.js'
import DEFPage from './DEFPage.js'

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const CategoryScreen = ({ route }) => {
  const { category } = route.params || {};

  return (
    <View>
      <Text>{category}</Text>
    </View>
  );
};

const CustomHeader = () => {
  const handlePress = (url) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={() => handlePress('https://www.instagram.com')}>
            <Image source={require('./assets/instagram.png')} style={styles.logo} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('https://www.facebook.com')}>
            <Image source={require('./assets/facebook.png')} style={styles.logo} resizeMode="contain" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handlePress('https://www.youtube.com')}>
            <Image source={require('./assets/youtube.png')} style={styles.logo} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleHeader}>NOM LISTE</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const BottomBar = () => {
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        tabBarPosition="bottom"
        initialRouteName ="CAL"
        tabBarOptions={{
          style: {
            backgroundColor: '#f1f1f1',
            borderTopWidth: 1,
            borderTopColor: '#ccc',
            height : 60,
          },
          labelStyle: {
            fontSize: 12,
          },
          tabStyle: {
            justifyContent: 'center',
          },
          indicatorStyle: {
            backgroundColor: '#3498db',
          },
          showLabel: false,
        }}
      >
        <Tab.Screen
          name="Pod"
          component={PODPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/classement.png')}
                style={{ width: 35, height: 35, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="SOS"
          component={SOSPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/burger.png')}
                style={{ width: 30, height: 30, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="CAL"
          component={CALPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/calendrier.png')}
                style={{ width: 30, height: 30, tintColor: color }}
              />
            ),
          }}
        />
        <Tab.Screen
          name="WEL"
          component={WELPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/wel.png')}
                style={{ width: 50, height: 40, tintColor: color }}
              
              />
              
            ),
          }}
        />
        <Tab.Screen
          name="DEF"
          component={DEFPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require('./assets/defi.png')}
                style={{ width: 35, height: 35, tintColor: color }}
              
              />
              
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const App = () => {

  const bottomBarRef = React.createRef();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: () => <CustomHeader />,
        }}
      >
      <Stack.Screen
          name="Home"
          component={() => <BottomBar ref={bottomBarRef} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 14,
    backgroundColor: 'white',
    borderBottomWidth: 2,  // Épaisseur de la bordure
    borderBottomColor: 'black'
  },
  titleHeader: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginLeft: -15,
  },
  logo: {
    height: 32,
    width: 40,
    marginRight: 2,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
 
export default App;

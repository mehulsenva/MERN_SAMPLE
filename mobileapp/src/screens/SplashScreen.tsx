import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const spl = require('../../assets/spl.json');

const SplashScreen = ({navigation}: any) => {
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');

        if (token) {
          navigation.replace('Main');
        } else {
          navigation.replace('Login');
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        navigation.replace('Login');
      }
    };

    setTimeout(checkLoginStatus, 2000);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView source={spl} autoPlay loop style={styles.lottie} />

              <Text style={styles.buttonText}>Mobile App</Text>
      
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  lottie: {width: 300, height: 100},
   buttonText: {color: '#124573', fontSize: 28,fontWeight:'bold',marginTop:20},

});

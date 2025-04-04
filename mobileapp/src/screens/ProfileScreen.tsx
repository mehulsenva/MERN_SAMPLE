import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../component/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = ({navigation}: any) => {
  const [storedValue, setStoredValue] = useState<string | null>(null);

  useEffect(() => {
    getStoredValue();
  }, []);

  const getStoredValue = async () => {
    try {
      const value = await AsyncStorage.getItem('userName');
      if (value !== null) {
        setStoredValue(value);
      } else {
        setStoredValue('');
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#2da07b'}} />
      <StatusBar backgroundColor="#2da07b" />

      <Header
        title="Profile"
        leftIconName="menu"
        rightIconName="bell-outline"
        IconComponent={MaterialCommunityIcons}
        onLeftPress={() => console.log('Menu pressed')}
        onRightPress={() => console.log('Notification pressed')}
      />

      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <Text style={styles.buttonText}>User name : {storedValue}</Text>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5'},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {color: '#000', fontSize: 18},
});

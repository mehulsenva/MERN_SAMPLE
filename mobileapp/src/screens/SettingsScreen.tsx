import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../component/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingsScreen = ({navigation}: any) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Setting"
        leftIconName="menu"
        rightIconName="logout"
        IconComponent={MaterialCommunityIcons}
        onLeftPress={() => console.log('Menu pressed')}
        onRightPress={() => handleLogout()}
      />

      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5', padding: 10},
  title: {fontSize: 24, fontWeight: 'bold', marginBottom: 20},
  button: {
    backgroundColor: '#1c1c1c',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {color: '#fff', fontSize: 18},
});

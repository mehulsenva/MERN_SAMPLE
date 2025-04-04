import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {apiRequest} from '../services/apiRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../component/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    let userToken = await AsyncStorage.getItem('userToken');

    console.log('userToken111', userToken);

    setLoading(true);
    try {
      const data = await apiRequest({
        endpoint: '/products',
        method: 'GET',
        headers: {
          Authorization: userToken || '',
        },
      });

      console.log('data111', JSON.stringify(data));

      setLoading(false);
      setData(data);
    } catch (err) {}
  };

  const renderItem = ({item}: any) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 0, backgroundColor: '#2da07b'}} />
      <StatusBar backgroundColor="#2da07b" />
      <Header
        title="Home"
        leftIconName="menu"
        rightIconName="bell-outline"
        IconComponent={MaterialCommunityIcons}
        onLeftPress={() => console.log('Menu pressed')}
        onRightPress={() => console.log('Notification pressed')}
      />

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ff5733" />
        </View>
      )}
      {error && <Text style={styles.error}>Error: {error}</Text>}

      {!loading && !error && (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: 20, marginTop: 30}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f5f5f5'},
  loaderContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'}, // Centering loader
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'uppercase',
  },
  description: {fontSize: 14, color: '#666', marginVertical: 5},
  price: {fontSize: 16, fontWeight: 'bold', color: '#2da07b'},
  error: {color: 'red', fontSize: 16, textAlign: 'center', marginTop: 20},
});

export default HomeScreen;

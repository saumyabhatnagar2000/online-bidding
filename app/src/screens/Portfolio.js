import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {Icon} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ToastAndroid,
  StyleSheet,
  TouchableOpacity,
  Linking,
  RefreshControl,
} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import actukart from '../../actukart';
import LocationIcon from '../icons/Location';

export const Portfolio = () => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshin] = useState(false);
  const {navigate} = useNavigation();
  const PortfolioRow = ({data}) => {
    const navigateTo = destination => {
      if (destination) {
        if (Platform.OS === 'android') {
          const URL = `https://www.google.com/maps/dir/?api=1&travelmode=driving&destination=${destination}`;
          Linking.openURL(URL);
        }
      } else ToastAndroid.show('No location found', ToastAndroid.SHORT);
    };
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F6F8Fb',
          paddingVertical: RFPercentage(2),
          width: '100%',
          marginVertical: RFPercentage(2),
          paddingHorizontal: RFPercentage(2),
        }}
        onPress={() => {
          navigate('PortfolioDetail', {data: data});
        }}>
        <View
          style={{justifyContent: 'center', alignItems: 'center', flex: 2.5}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              // justifyContent: 'center',
              paddingVertical: RFPercentage(1),
            }}>
            <Text
              style={[
                styles.textStyle,
                {
                  fontWeight: 'bold',
                  fontSize: 20,
                  // marginHorizontal: RFPercentage(2),
                },
              ]}>
              Item Name: {data?.item_id?.name}
            </Text>
          </View>
          <View>
            <Text style={[styles.textStyle, {fontSize: 16, fontWeight: '600'}]}>
              Status: {data?.item_id?.status}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={styles.textStyle}>
                Category: {data?.item_id?.category ?? ''}
              </Text>
              <Text style={styles.textStyle}>
                {` || Sub Category: ${data?.item_id?.sub_category ?? ''}`}
              </Text>
            </View>
            <Text style={[styles.textStyle, {textTransform: 'none'}]}>
              Uploader Id: {data?.item_id?.seller_id?.email ?? ''}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigateTo(data?.item_id?.item_address)}>
          <LocationIcon />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const getData = async () => {
    setRefreshin(true);
    try {
      const token = await AsyncStorage.getItem('token');
      const apiResponse = await actukart({
        url: '/items_to_verify',
        headers: {
          Authorization: token,
        },
      });
      console.log(apiResponse?.data);
      setData(apiResponse?.data);
    } catch (e) {
      console.log(e);
      ToastAndroid.show('Something went wrong', ToastAndroid.SHORT);
    }
    setRefreshin(false);
  };

  useFocusEffect(
    useCallback(() => {
      getData();
    }, []),
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        // ListEmptyComponent={}
        ListHeaderComponent={() => (
          <View
            style={{
              backgroundColor: '#92bcf799',
              width: '100%',
              height: RFPercentage(10),
            }}>
            <Text
              style={{
                color: '#043E90',
                fontSize: 24,
                textAlign: 'center',
                marginVertical: RFPercentage(3),
                fontWeight: 'bold',
              }}>
              Item Portfolio
            </Text>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={getData} />
        }
        data={data}
        renderItem={item => <PortfolioRow data={item.item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: '#043E90',
    textTransform: 'capitalize',
    // textAlign: 'center',
    paddingVertical: RFPercentage(0.25),
  },
});

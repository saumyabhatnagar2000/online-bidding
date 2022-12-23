import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@rneui/base';
import React, {useState} from 'react';
import {View, Text, Image, TextInput, ToastAndroid} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import actukart from '../../actukart';

export const LoginScreen = ({}) => {
  const {navigate} = useNavigation();
  const loginUser = async () => {
    try {
      const response = await actukart({
        url: '/user/login',
        method: 'POST',
        data: {
          email: email.trim(),
          password: password.trim(),
          role: 'agent',
        },
      });
      console.log(response?.data);
      await AsyncStorage.setItem('token', response?.data?.token);
      await AsyncStorage.setItem('role', response?.data?.user?.role);
      navigate('Portfolio');
    } catch (e) {
      ToastAndroid.show('some error ocurred', ToastAndroid.SHORT);
      console.log(e);
    }
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <Image
        style={{
          height: 200,
          width: 200,
          alignSelf: 'center',
          marginTop: RFPercentage(20),
          borderRadius: 25,
        }}
        source={require('../../auctkart-high-resolution-color-logo.png')}
      />
      <TextInput
        placeholder="Enter email"
        placeholderTextColor={'#043E90'}
        value={email}
        onChangeText={e => setEmail(e)}
        style={{
          borderColor: '#043E90',
          borderWidth: 1,
          width: '70%',
          minHeight: RFPercentage(5),
          borderRadius: 8,
          marginTop: RFPercentage(5),
          padding: RFPercentage(1),
        }}
      />
      <TextInput
        placeholder="Enter password"
        placeholderTextColor={'#043E90'}
        style={{
          borderColor: '#043E90',
          borderWidth: 1,
          width: '70%',
          minHeight: RFPercentage(5),
          borderRadius: 8,
          marginTop: RFPercentage(5),
          padding: RFPercentage(1),
        }}
        value={password}
        onChangeText={e => setPassword(e)}
      />
      <Button
        title={'Submit'}
        onPress={loginUser}
        containerStyle={{
          width: '35%',
          height: RFPercentage(5),
          borderRadius: 3,
          marginVertical: RFPercentage(4),
        }}
      />
    </View>
  );
};

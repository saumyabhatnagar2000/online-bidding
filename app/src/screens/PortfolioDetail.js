import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button, Input} from '@rneui/base';
import {CheckBox} from '@rneui/themed';
import React, {useMemo, useState} from 'react';
import {ViewBase, View, Text, FlatList, StyleSheet} from 'react-native';
import {RFPercentage} from 'react-native-responsive-fontsize';
import actukart from '../../actukart';

export const PortfolioDetail = ({navigation, route}) => {
  const data = route?.params?.data;
  const specifications = Object.entries(data?.item_id?.specifications);
  const [remarks, setRemarks] = useState('');
  console.log(specifications);

  const submitReview = async () => {
    let verified = false;
    if (selected) {
      verified =
        Object?.keys(selected)?.length == specifications.length
          ? 'accepted'
          : 'rejected';
    }
    console.log(verified);
    try {
      const token = await AsyncStorage.getItem('token');
      const apiResponse = await actukart({
        url: `/item/${data?.item_id?._id}`,
        method: 'PATCH',
        data: {verified, remark: remarks, verification_id: data?._id},
        headers: {
          Authorization: token,
        },
      });
      console.log(apiResponse?.data);
      navigation.goBack();
    } catch (e) {
      console.log(e);
    }
  };

  const [selected, setSelected] = useState({});

  const selectItem = data => {
    let temp = {...selected};
    if (temp[data[0]]) {
      delete temp[data[0]];
    } else {
      temp = {...selected, [data[0]]: true};
    }
    setSelected(temp);
  };

  console.log(selected);

  const ItemRow = ({data}) => {
    console.log(data);
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <CheckBox
          title={`${data[0]}:${data[1]}`}
          checked={selected[data[0]]}
          textStyle={styles.checkboxText}
          checkedColor="#043E90"
          onPress={() => {
            selectItem(data);
          }}
          containerStyle={styles.checkboxContainer}
        />
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F6F8fb'}}>
      <Text
        style={{
          color: '#000',
          fontSize: 18,
          textAlign: 'center',
          marginVertical: RFPercentage(2),
        }}>
        Item Name: {data?.item_id?.name}
      </Text>
      <Text
        style={{
          color: '#043E90',
          fontSize: 18,
          textDecorationLine: 'underline',
          fontWeight: '600',
          marginHorizontal: RFPercentage(2),
          marginVertical: RFPercentage(3),
        }}>
        Item Specification List
      </Text>
      <FlatList
        data={specifications}
        renderItem={item => {
          return <ItemRow data={item.item} />;
        }}
      />
      <Input
        placeholder="Any Remarks"
        containerStyle={{
          borderColor: '#043E90',
          borderWidth: 2,
          marginHorizontal: RFPercentage(2),
          alignSelf: 'center',
          width: '90%',
          borderRadius: 8,
          marginVertical: RFPercentage(5),
        }}
        value={remarks}
        onChangeText={e => setRemarks(e)}
        inputContainerStyle={{borderBottomWidth: 0}}
        textAlign="center"
        placeholderTextColor={'#043E90'}
      />
      <Button
        // disabled={!checkDisabled}
        onPress={submitReview}
        title={'Submit'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    backgroundColor: '#f6f8fb',
    borderWidth: 0,
    minWidth: '80%',
  },
  checkboxText: {
    color: '#043E90',
    fontSize: RFPercentage(1.8),
    fontWeight: 'normal',
  },
});

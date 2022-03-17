import React, { Component } from 'react';
import {  View, TouchableOpacity, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'; //date picker
//COMMON COMPONENT
import {Text} from '../components';
//ASSETS
import {
  COLORS,
} from '../assets';

export default function DateTimePick(props) {
  return (
    <DateTimePicker
          style={{backgroundColor: COLORS.primaryColor}}
          testID="dateTimePicker"
          value={props.value}
          mode={props.mode}
          is24Hour={false}
          display="default"
          onChange={props.onChange}
        />
  );
}

const styles = StyleSheet.create({
//   Container: {

//   },
});

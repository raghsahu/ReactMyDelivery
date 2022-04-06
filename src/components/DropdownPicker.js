import React, {Component, useRef} from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
//COMMON COMPONENT
import {Text} from '../components';
//ASSETS
import {COLORS, DIMENSION} from '../assets';
import {Picker} from '@react-native-picker/picker'; //for dropdown

export default function DropdownPicker(props) {
  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  return (
    <View style={[styles.inputContainer, styles.inputView, {marginTop: 10}]}>
      {props.isLeft && (
        <View
          style={{
            backgroundColor: COLORS.primaryColor,
            height: 40,
            width: 40,
            borderRadius: 20,
            alignSelf: 'center',
            justifyContent: 'center',
            marginRight: 5,
          }}>
          <Image
            source={props.isLeft}
            tintColor={COLORS.white}
            style={{
              height: 24,
              width: 24,
              alignSelf: 'center',
              justifyContent: 'center',
            }}
          />
        </View>
      )}
      <Picker
        dropdownIconColor={COLORS.black}
        // placeholder={props.placeholder}
        //placeholderStyle={{color: COLORS.gray}}
        //placeholderIconColor={COLORS.gray}
        //itemStyle={{color: COLORS.black, backgroundColor: COLORS.black}}
        style={{
          color: COLORS.black,
          width: 250,
          // placeholderTextColor: COLORS.gray,
        }}
        ref={pickerRef}
        selectedValue={props.selectedValue}
        mode="dropdown"
        onValueChange={(itemValue, itemIndex) => props.onChange(itemValue)}>
        {/* <Picker.Item
          color={COLORS.gray}
          label={props.placeholder}
          value={props.placeholder}
        /> */}
        {props.options.map(item => {
          return (
            <Picker.Item label={item.label} value={item.value} key={item.key} />
          );
        })}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    marginHorizontal: DIMENSION.marginHorizontal,
  },
  inputContainer: {
    height: 48,
    paddingVertical: 1,
    borderRadius: 24,
    paddingHorizontal: 5,
    backgroundColor: COLORS.lightGray,
    flexDirection: 'row',
  },
});

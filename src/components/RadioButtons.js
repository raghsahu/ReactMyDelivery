import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
//COMMON COMPONENT
import {Text} from '../components';
//ASSETS
import {COLORS} from '../assets';

export default function RadioButtons({
  options,
  selectedOption,
  onSelect,
  style,
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {options.map(item => {
        return (
          <View key={item.key} style={[style, styles.buttonContainer]}>
            <TouchableOpacity
              style={[styles.circle, {marginLeft: 10}]}
              onPress={() => {
                onSelect(item);
              }}>
              {selectedOption && selectedOption.key === item.key && (
                <View style={styles.checkedCircle} />
              )}
            </TouchableOpacity>
            <Text
              weight="500"
              size="16"
              color={COLORS.black}
              style={{
                marginLeft: 10,
              }}>
              {item.text}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginBottom: 30,
  },

  circle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkedCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.primaryColor,
  },
});

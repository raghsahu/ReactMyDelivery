import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';

//Common Component
import {Text} from '../components';

//ASSETS
import {COLORS, IMAGES} from '../assets';

/**
 * Button is Component to render app buttons
 * @property {Any} style - style as per parent view
 * @property {string} title - button title
 * @property {number} size - icon size
 * @property {type} type - 1 or 2
 */

const CustomRatingBar = props => {
  return (
    <View style={(props.style, styles.customRatingBarStyle)}>
      {props.maxRating.map((data, index) => {
        return (
          <TouchableOpacity
            activeOpacity={0.7}
            key={index}
            onPress={() => {
              props.onSelect(data);
            }}>
            <Image
              style={styles.starImageStyle}
              source={
                data <= props.defaultRatings
                  ? IMAGES.StarFilled
                  : IMAGES.StarCorner
              }
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default CustomRatingBar;

import React from 'react';
import {Platform, ImageBackground} from 'react-native';
//ASSETS
import {COLORS, IMAGES} from '../assets';

const BottomBackground = props => {
  return (
    <ImageBackground
      source={IMAGES.bottom_bg}
      style={{
        flex: 1,
        bottom: 0,
        height: 200,
        width: '100%',
        position: 'absolute',
      }}></ImageBackground>
  );
};

export default BottomBackground;

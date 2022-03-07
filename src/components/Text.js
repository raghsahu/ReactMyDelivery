import React from 'react';
import { Platform, Text as RNText } from 'react-native';

/**
 * Text is Component to render app text with custom font
 * @property {Any} style - style as per parent view
 * @property {string} color - text color
 * @property {string} align - text alignment
 * @property {string} weight - font weight 
 * @property {Any} size - font size 
 */

const Text = (props) => {


    function getPoppinsFont() {
        if (props.weight == 400) {
            return 'Poppins-Regular'
        }
        else if (props.weight == 500) {
            return 'Poppins-Medium'
        }
        else if (props.weight == 600) {
            return 'Poppins-SemiBold'
        }
        else if (props.weight == 800) {
            return 'Poppins-Bold'
        }
        else if (props.weight == 'bold') {
            return 'Poppins-Bold'
        }
        else {
            return 'Poppins-Regular'
        }
    }

    return (
        <RNText
            {...props}
            style={[
                props.style,
                {
                    color: props.color,
                    textAlign: props.align,
                    fontWeight: props.weight,
                    fontSize: parseInt(props.size),
                    fontFamily: getPoppinsFont()
                },
            ]}>
            {props.children}
        </RNText>
    )

}


Text.defaultValue = {
    style: {},
    align: 'left',
    size: 14,
    weight: '400',
    color: '#fff',
};

export default Text;

import React, { useContext } from 'react';
import { View, Dimensions, Image, TouchableOpacity } from 'react-native';
const { height, width } = Dimensions.get('screen');
//ASSETS
import { COLORS, IMAGES } from '../assets';
//COMMON COMPONENT
import { Text, Button } from '../components';
import { APPContext } from '../context/AppProvider';
import { CommonUtilsContext, changeMMMDateFormat} from '../context/CommonUtils';


const SuggestionItemList = props => {
    const { changeDateFormat } = useContext(CommonUtilsContext);
    const item = props.item;

    return (
            <View
                style={{
                    elevation: 2,
                    marginTop: 10,
                    marginHorizontal: 10,
                    backgroundColor: COLORS.lightGray,
                    borderRadius: 8,
                    alignSelf: 'flex-end'
                }}>

                <View
                    style={{
                        //flex: 1,
                        margin: 5,
                        //alignSelf: 'flex-end'
                    }}>

                    <Text color={COLORS.black} size="16" weight="500">
                        {item.sugsn_message}
                    </Text>
                    <Text color={COLORS.darkGray} size="14" weight="500">
                        {changeMMMDateFormat(item.sugsn_create_date) }
                       
                    </Text>
                </View>
            </View>
        
    );
};

export default SuggestionItemList;

import React, {useContext} from 'react';
import {View, TouchableOpacity, StyleSheet, Modal, Dimensions} from 'react-native';
import moment from 'moment'; // date format
//COMMON COMPONENT
import {Text, Button} from '../components';
//ASSETS
import {COLORS, DIMENSION} from '../assets';
const {height, width} = Dimensions.get('screen');
import { LocalizationContext } from '../context/LocalizationProvider';

export default function OpenInfoModal(props) {
    const { getTranslation } = useContext(LocalizationContext);

  return (
     <Modal
     animationType="slide"
     transparent
     visible={props.isOpenInfoModal}
     presentationStyle="overFullScreen"
     onDismiss={props.openInfoModal}>
     <View style={styles.viewWrapper}>
       <View style={styles.modalView}>

         <View
           style={{
             flexDirection: 'row',
             margin: 5,
           }}>
           <Text style={{ flex: 1 }} color={COLORS.black} size="16" weight="500">
             {getTranslation('deliveryman_commission') + ' :'}
           </Text>

           <Text
             style={{
               marginLeft: 5,
               flex: 1,
             }}
             color={COLORS.black}
             size="16"
             weight="500">
             {'80% Overall commission'}
           </Text>
         </View>

         <View
           style={{
             flexDirection: 'row',
             margin: 5,
           }}>
           <Text style={{ flex: 1 }} color={COLORS.black} size="16" weight="500">
             {'Management fees' + ' :'}
           </Text>

           <Text
             style={{
               marginLeft: 5,
               flex: 1,
             }}
             color={COLORS.black}
             size="16"
             weight="500">
             {'20% Overall commission'}
           </Text>
         </View>

         <TouchableOpacity
           style={{ marginRight: 20, marginTop: 10 }}
           onPress={() => {
             props.openInfoModal();
           }}>
           <Text
             color={COLORS.primaryColor}
             size="16"
             weight="500"
             align={'right'}>
             {getTranslation('ok')}
           </Text>
         </TouchableOpacity>
       </View>
     </View>
   </Modal>

);
}

const styles = StyleSheet.create({
    container: {
        flex: 1.0,
        backgroundColor: '#FAFAFA',
      },
      inputView: {
        marginHorizontal: DIMENSION.marginHorizontal,
      },
      inputContainer: {
        marginTop: 16,
      },
      viewWrapper: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
      },
      modalView: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
        height: 150,
        width: width * 0.85,
        backgroundColor: '#fff',
        borderRadius: 7,
      },
});
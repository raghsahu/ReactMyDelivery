import React, {useContext} from 'react';
import {View, StyleSheet, Modal, Dimensions} from 'react-native';
import moment from 'moment'; // date format
//COMMON COMPONENT
import {Text, Button} from '../components';
import { LocalizationContext } from '../context/LocalizationProvider';
//ASSETS
import {COLORS, DIMENSION} from '../assets';
const {height, width} = Dimensions.get('screen');

export default function DeleteModal(props) {
  const { getTranslation } = useContext(LocalizationContext);

  return (
    // <View style={styles.container}>
    <Modal
    animationType="slide"
    transparent
    visible={props.isDeleteModalVisible}
    presentationStyle="overFullScreen"
    onDismiss={props.isDeleteModalVisible}>
    <View style={styles.viewWrapper}>
      <View style={styles.modalView1}>
        <Text
          style={{alignSelf: 'center', marginTop: 15, marginHorizontal: 10}}
          size="20"
          weight="500"
          align="left"
          color={COLORS.black}>
          {getTranslation('are_you_sure_delete_announcement')}
        </Text>

        <View
          style={{
            marginHorizontal: DIMENSION.marginHorizontal,
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            // position: 'absolute',
          }}>
          <Button
            style={[
              {
                width: 90,
                height: 41,
                alignSelf: 'center',
                justifyContent: 'center',
              },
            ]}
            title={'Yes'}
            onPress={() => {
              props.getDeleteAd();
            }}
          />

          <Button
            style={[{width: 90, height: 41, justifyContent: 'center'}]}
            title={'No'}
            onPress={() => {
              props.deleteModalVisibility();
            }}
          />
        </View>
      </View>
    </View>
  </Modal>
//   </View>
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
      modalView1: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        elevation: 5,
        transform: [{translateX: -(width * 0.4)}, {translateY: -90}],
        height: 140,
        width: width * 0.85,
        backgroundColor: '#fff',
        borderRadius: 7,
      },
});

import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';

//ASSETS
import {COLORS, IMAGES, DIMENSION} from '../assets';
const {height, width} = Dimensions.get('screen');
//COMMON COMPONENT
import {Button, Header, Text, Input, PublishedItemList} from '../components';

function Published(props) {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const deleteModalVisibility = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />

      <SafeAreaView style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={['', '', '', '', '']}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <PublishedItemList
                onDelete={() => {
                  deleteModalVisibility();
                }}
               
              />
            );
          }}
        />
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent
        visible={isDeleteModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={isDeleteModalVisible}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView1}>
            <Text
              style={{alignSelf: 'center', marginTop: 15, marginHorizontal: 10}}
              size="20"
              weight="500"
              align="left"
              color={COLORS.black}>
              {'Are you sure to delete this announcement'}
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
                style={[{width: 90,  height: 41, alignSelf: 'center', justifyContent: 'center'}]}
                title={'Yes'}
                onPress={() => {
                  // props.navigation.navigate('Market')
                }}
              />

              <Button
                style={[{width: 90, height: 41, justifyContent: 'center'}]}
                title={'No'}
                onPress={() => {
                  deleteModalVisibility();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
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

export default Published;

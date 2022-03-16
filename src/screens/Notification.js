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
import {Button, Header, Text, Input, NotificationItemList, BottomBackground} from '../components';
import { LocalizationContext } from '../context/LocalizationProvider';

function Notification(props) {
  const { getTranslation} = useContext(LocalizationContext);


  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />

      <BottomBackground></BottomBackground>

      <SafeAreaView style={styles.container}>
       <Header
          title={getTranslation('notifications')}
          onBack={() => {
            props.navigation.goBack();
          }}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={['', '', '', '', '']}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <NotificationItemList
               
              />
            );
          }}
        />
      </SafeAreaView>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLORS.lightGray,
  },
  inputView: {
    marginHorizontal: DIMENSION.marginHorizontal,
  },
  inputContainer: {
    marginTop: 16,
  },

});

export default Notification;

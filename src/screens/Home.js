import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  FlatList,
  ActivityIndicator,
  Toast,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

//ASSETS
import {COLORS, IMAGES} from '../assets';

//COMMON COMPONENT
import {Button, Header, Text, Input, BottomBackground} from '../components';
//CONTEXT
//import {APPContext} from '../context/APPProvider';

function Home(props) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

      <BottomBackground></BottomBackground>
        
      <SafeAreaView style={styles.container}>
        <View
          style={{
            backgroundColor: COLORS.primaryColor,
            flex: 1,
            Top: 0,
            height: 350,
            width: '100%',
            position: 'absolute',
          }}></View>

        <Header
          title={'Hello, Umar'}
          onNotification={() => {
            props.navigation.navigate('Notification')
          }}
        />

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            <Text
              style={{marginTop: 20}}
              size="22"
              weight="500"
              align="center"
              color={COLORS.white}>
              {'Choose'}
            </Text>

            <View
              style={{
                marginHorizontal: 20,
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // position: 'absolute',
              }}>
             <TouchableOpacity
             onPress={() => {
               props.navigation.navigate('AddProduct');
             }}
             >
              <View style={{}}>
                <Image
                  source={IMAGES.home_user}
                  style={{
                    height: 90,
                    width: 90,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginBottom: 5,
                  }}
                />

                <Text
                  size="14"
                  weight="500"
                  align="center"
                  color={COLORS.white}>
                  {'User'}
                </Text>
              </View>
             </TouchableOpacity> 
          
              <View style={{}}>
                <Image
                  source={IMAGES.home_delivery_man}
                  style={{
                    height: 90,
                    width: 90,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginBottom: 5,
                  }}
                />

                <Text
                  size="14"
                  weight="500"
                  align="center"
                  color={COLORS.white}>
                  {'Delivery Man'}
                </Text>
              </View>
              <View style={{}}>
                <Image
                  source={IMAGES.home_sender}
                  style={{
                    height: 90,
                    width: 90,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    marginBottom: 5,
                  }}
                />

                <Text
                  size="14"
                  weight="500"
                  align="center"
                  color={COLORS.white}>
                  {'Sender (a gift)'}
                </Text>
              </View>
            </View>

            <Image
              source={IMAGES.home_video_bg}
              style={[
                styles.inputView,
                {
                  height: 156,
                  width: 342,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  // position: 'absolute',
                  marginTop: 30,
                },
              ]}
            />

            <Image
              source={IMAGES.home_video_bg_comming_soon}
              style={[
                styles.inputView,
                {
                  height: 156,
                  width: 342,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  // position: 'absolute',
                  margin: 20,
                },
              ]}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    //backgroundColor: COLORS.primaryColor,
  },
  inputView: {
    marginHorizontal: 30,
  },
});

export default Home;

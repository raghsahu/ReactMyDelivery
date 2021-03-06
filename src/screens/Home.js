import React, { useEffect, useContext, } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  Linking,
  TouchableOpacity,
} from 'react-native';

//ASSETS
import { COLORS, IMAGES, DIMENSION } from '../assets';

//COMMON COMPONENT
import { Header, Text, BottomBackground } from '../components';
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';
import { APPContext } from '../context/AppProvider';
import moment from 'moment'; // date format

function Home(props) {
  const { getTranslation } = useContext(LocalizationContext);
  const { user, buy_and_deliver_to_other_video, pickup_and_deliver } = useContext(APPContext);

  useEffect(() => {

  }, []);

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
          title=
          {getTranslation('hello') + ', ' + user.user_f_name + ' ' + user.user_l_name}
          onNotification={() => {
            props.navigation.navigate('Notification');
          }}
        />

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View style={{ flex: 1 }}>
            <Text
              style={{ marginTop: 20, }}
              size="22"
              weight="500"
              align="center"
              color={COLORS.white}>
              {getTranslation('choose')}
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
                }}>
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
                    {getTranslation('user')}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('DescribePlaceOfDelivery');
                }}>
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
                    {getTranslation('delivery_man')}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {

                }}>
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
                    {getTranslation('sender_a_gift')}
                  </Text>
                </View>
              </TouchableOpacity>

            </View>

            <TouchableOpacity
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
              onPress={() => {
                Linking.openURL(buy_and_deliver_to_other_video);
              }}>
              <Image
                source={IMAGES.home_video_bg}

              />
            </TouchableOpacity>

            <TouchableOpacity
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
              onPress={() => {
                Linking.openURL(pickup_and_deliver);
              }}>
              <Image
                source={IMAGES.home_video_bg_comming_soon}

              />
            </TouchableOpacity>

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
    marginHorizontal: DIMENSION.marginHorizontal,
  },
});

export default Home;

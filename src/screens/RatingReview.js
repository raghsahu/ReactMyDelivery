import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  ImageBackground,
  TextInput,
} from 'react-native';

//ASSETS
import {COLORS, IMAGES} from '../assets';

//COMMON COMPONENT
import {
  Button,
  Header,
  Text,
  Input,
  BottomBackground,
  CustomRatingBar,
} from '../components';
import OTPInputView from '@twotalltotems/react-native-otp-input';

function RatingReview(props) {
  const [defaultRating, setDefaultRating] = useState(2);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const onSelect = item => {
    setDefaultRating(item);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />
      <BottomBackground></BottomBackground>
      <SafeAreaView
      style={styles.container}
      >
        <Header
          title={'Review & Rating'}
          onBack={() => {
            props.navigation.goBack();
          }}
        />
        <ScrollView
          //style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Text
            style={[{marginTop: 20, marginBottom: 20}]}
            size="18"
            weight="500"
            align="center"
            color={COLORS.black}>
            {'Please rate the application'}
          </Text>

          <CustomRatingBar
            onSelect={onSelect}
            defaultRatings={defaultRating}
            maxRating={maxRating}
          />

          <TextInput
            style={[styles.inputView, styles.comment]}
            placeholder={'Leave a comment...'}
            multiline={true}
            //value={''}
          />

          <View
            style={[
              {
                height: 10,
                marginTop: 20,
                backgroundColor: COLORS.lightGray,
                //borderWidth: 0.4,
              },
            ]}></View>

          <Text
            style={[{marginTop: 20, marginBottom: 20}]}
            size="18"
            weight="500"
            align="center"
            color={COLORS.black}>
            {'Please rate Test'}
          </Text>

          <CustomRatingBar
            onSelect={onSelect}
            defaultRatings={defaultRating}
            maxRating={maxRating}
          />

          <TextInput
            style={[styles.inputView, styles.comment]}
            placeholder={'Leave a comment...'}
            multiline={true}
            //value={''}
          />

          <View
            style={[
              styles.inputView,
              {
                flexDirection: 'row',
                marginTop: 30,
                marginBottom: 20,
                alignItems: 'center',
              },
            ]}>
            <Text
              style={{justifyContent: 'center'}}
              size="18"
              weight="500"
              align="left"
              color={COLORS.black}>
              {'Share Now :'}
            </Text>

            <View
              style={{
                backgroundColor: COLORS.primaryColor,
                height: 52,
                width: 52,
                borderRadius: 26,
                marginLeft: 20,
                alignSelf: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={styles.shareImg}
                source={IMAGES.share}
                resizeMode="contain"
                // tintColor={COLORS.primaryColor}
              />
            </View>
          </View>

          <Button
            style={[styles.inputView, {marginTop: 20, marginBottom: 20}]}
            title={'Submit'}
            onPress={() => {
              // props.navigation.navigate('SuccessScreen');
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLORS.white,
  },
  inputView: {
    marginHorizontal: 30,
  },
  shareImg: {
    height: 26,
    width: 26,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  comment: {
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    marginTop: 20,
    height: 120,
   // backgroundColor: COLORS.lightGray,
    borderRadius: 24,
    borderColor: COLORS.gray,
    borderWidth: 1,
  },
});

export default RatingReview;

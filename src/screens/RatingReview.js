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
import {COLORS, IMAGES, DIMENSION} from '../assets';

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
import {Rating} from 'react-native-ratings';
import { LocalizationContext } from '../context/LocalizationProvider';

function RatingReview(props) {
  const [defaultRating, setDefaultRating] = useState(0);
  // To set the max number of Stars
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const { getTranslation} = useContext(LocalizationContext);

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
          title={getTranslation('review_rating')}
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
            {getTranslation('pls_rate_application')}
          </Text>

            <Rating
                  type="custom"
                  tintColor={COLORS.white}
                  ratingColor="#04D9C5"
                  startingValue={0}
                  ratingBackgroundColor="#DBDBDB"
                  ratingCount={5}
                  imageSize={45}
                  // onFinishRating={this.ratingCompleted}
                  style={{marginTop: 1,  paddingVertical: 1}}
                />

          <TextInput
            style={[styles.inputView, styles.comment]}
            placeholder={getTranslation('leave_comment')}
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

              <Rating
                  type="custom"
                  tintColor={COLORS.white}
                  ratingColor="#04D9C5"
                  startingValue={0}
                  ratingBackgroundColor="#DBDBDB"
                  ratingCount={5}
                  imageSize={45}
                  // onFinishRating={this.ratingCompleted}
                  style={{marginTop: 1,  paddingVertical: 1}}
                />
          {/* <CustomRatingBar
            onSelect={onSelect}
            defaultRatings={defaultRating}
            maxRating={maxRating}
          /> */}

          <TextInput
            style={[styles.inputView, styles.comment]}
            placeholder={getTranslation('leave_comment')}
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
              {getTranslation('share_now')}
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
            title={getTranslation('submit')}
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
    marginHorizontal:DIMENSION.marginHorizontal,
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

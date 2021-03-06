import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Share,
  BackHandler,
} from 'react-native';

//ASSETS
import { COLORS, IMAGES, DIMENSION } from '../assets';

//COMMON COMPONENT
import {
  Button,
  Header,
  Text,
  BottomBackground,
  ProgressView,
} from '../components';
import { Rating } from 'react-native-ratings';
import { LocalizationContext } from '../context/LocalizationProvider';
import Toast from 'react-native-simple-toast';
import { APPContext } from '../context/AppProvider';

function RatingReview(props) {
  const { userName , rate_ad_id} = props.route.params;
  const [ratingForUser, setRatingForUser] = useState(0);
  const { getTranslation } = useContext(LocalizationContext);
  const [commentForUser, setCommentForUser] = useState('');
  const [ratingForApp, setRatingForApp] = useState(0);
  const [commentForApp, setCommentForApp] = useState('');
  const { putRating, user } = useContext(APPContext);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setRatingForUser(0)
  }, []);

  useEffect(() =>{
    function handleBackButton() {
      backAction();
      return true;
  }
  const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  return () => backHandler.remove();
  }, []);

  const backAction = () => {
    props.navigation.goBack();
   };

  const onSelect = rating => {
    setRatingForUser(rating);
  };

  const onSelectRateApp = rating => {
    setRatingForApp(rating);
  };

  const shareApp = async () => {
    try {
      const result = await Share.share({
          title: 'App link',
          message: 'Let me recommend you this application \n\n , https://play.google.com/store/apps/details?id=com.mydelivery',
          url: 'https://play.google.com/store/apps/details?id=com.mydelivery'
     
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
     // alert(error.message);
      console.log('errorOnShare ', error)
    }
  };

  const onNext = async () => {
    setLoading(true);
    const result = await putRating(
      props.route.params.rate_user_id,
      user.user_id,
      ratingForUser,
      commentForUser,
      props.route.params.rate_ad_id,
      ratingForApp,
      commentForApp,
    );
    setLoading(false);
    if (result.status == true) {
      Toast.show(result.error);
      setRatingForUser(0)
      setCommentForUser('')
      setCommentForApp('')
      setRatingForApp(0)
      // props.route.params.onReturn('RatingDone');
      //       props.navigation.goBack();
            props.navigation.navigate('MyAccount', {
              tabIndex: 4,
              subTabIndex: 1,
            });

    } else {
      Toast.show(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />
      <BottomBackground></BottomBackground>
      <SafeAreaView style={styles.container}>
        <Header
          title={getTranslation('review_rating')}
          onBack={() => {
            backAction();
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={[{ marginTop: 20, marginBottom: 20 }]}
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
            onFinishRating={onSelectRateApp}
            style={{ marginTop: 1, paddingVertical: 1 }}
          />

          <TextInput
            style={[styles.inputView, styles.comment]}
            placeholder={getTranslation('leave_comment')}
            multiline={true}
            onChangeText={text => {
              setCommentForApp(text);
            }}
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
            style={[{ marginTop: 20, marginBottom: 20 }]}
            size="18"
            weight="500"
            align="center"
            color={COLORS.black}>
            {getTranslation('pls_rate') + ' ' + props.route.params.userName}
          </Text>

          <Rating
            type="custom"
            tintColor={COLORS.white}
            ratingColor="#04D9C5"
            startingValue={ratingForUser}
            ratingBackgroundColor="#DBDBDB"
            ratingCount={5}
            imageSize={45}
            onFinishRating={onSelect}
            style={{ marginTop: 1, paddingVertical: 1 }}
          />

          <TextInput
            style={[styles.inputView, styles.comment]}
            placeholder={getTranslation('leave_comment')}
            multiline={true}
            onChangeText={text => {
              setCommentForUser(text);
            }}
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
              style={{ justifyContent: 'center' }}
              size="18"
              weight="500"
              align="left"
              color={COLORS.black}>
              {getTranslation('share_now')}
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: COLORS.primaryColor,
                height: 52,
                width: 52,
                borderRadius: 26,
                marginLeft: 20,
                alignSelf: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                shareApp();
              }}
            >
              <Image
                style={styles.shareImg}
                source={IMAGES.share}
                resizeMode="contain"
              // tintColor={COLORS.primaryColor}
              />
            </TouchableOpacity>
          </View>

          <Button
            style={[styles.inputView, { marginTop: 20, marginBottom: 20 }]}
            title={getTranslation('submit')}
            onPress={() => {
              if (!commentForApp) {
                Toast.show(getTranslation('pls_enter_comment_for_app'))
              } else if (ratingForApp == 0) {
                Toast.show(getTranslation('pls_enter_rating_app'))
              }else if (!commentForUser) {
                Toast.show(getTranslation('pls_enter_comment_for_user_rate'))
              } else if (ratingForUser == 0) {
                Toast.show(getTranslation('pls_enter_rating_for_user'))
              } else {
                onNext();
              }
              // props.navigation.navigate('SuccessScreen');
            }}
          />
        </ScrollView>
      </SafeAreaView>
      {isLoading ? <ProgressView></ProgressView> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLORS.white,
  },
  inputView: {
    marginHorizontal: DIMENSION.marginHorizontal,
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

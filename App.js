import React, {useState, useEffect, useRef, useContext} from 'react';
import {View, Platform, LogBox, Image} from 'react-native';
LogBox.ignoreAllLogs(true);
//SCREENS
import {
  Splash,
  Login,
  Register,
  ForgotPassword,
  EmailOtp,
  EmailSuccess,
  MobileOtp,
  SuccessScreen,
  ResetPassword,
  Home,
  MyAccount,
  SendSuggestion,
  ChatScreen,
  EditAccount,
  Notification,
  AddProduct,
  AddProductCommision,
  AddProductSummary,
  SummaryTransaction,
  RatingReview,
  ExchangeSuccessSummary,
  ProposalChangedDate,
  DescribePlaceOfDelivery,
  RequestsListForPlaces,
  AdSummaryDetails,
  AdModificationProposal,
  GooglePlacesInput,
  PublishedAdsDetails,
  SendComplain,
} from './src/screens';
//PACKAGES
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import {
  LocalizationProvider,
  LocalizationContext,
} from './src/context/LocalizationProvider';
import {APPContext, AppProvider} from './src/context/AppProvider';
import {CommonUtils} from './src/context/CommonUtils';

import {COLORS, IMAGES, DIMENSION} from './src/assets';

const {Navigator, Screen} = createStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Home" component={Home} />
      <Screen
        name="DescribePlaceOfDelivery"
        component={DescribePlaceOfDelivery}
      />
      <Screen name="RequestsListForPlaces" component={RequestsListForPlaces} />
    </Navigator>
  );
}

const BottomBar = () => {
  const {getTranslation} = useContext(LocalizationContext);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.primaryColor,
          borderTopRightRadius: 20, //add border top right radius
          borderTopLeftRadius: 20, //add border top left radius
          height: 54,
        },
        tabBarLabelStyle: {
          fontSize: 16,
          fontWeight: '600',
          color: COLORS.white,
        },
      }}
      // tabBar={props => <TabBar {...props} />}
    >
      <Tab.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({size, focused, color}) => {
            return (
              <Image
                style={{width: 20, height: 20, tintColor: '#ffffff'}}
                source={IMAGES.home}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          title: 'My Account',
          tabBarStyle: {display: 'none'},
          tabBarIcon: ({size, focused, color}) => {
            return (
              <Image
                style={{width: 20, height: 20, tintColor: '#ffffff'}}
                source={IMAGES.name}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs([
      "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
    ]);
  }, []);

  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification here
        showNotification(notification);
        // required on iOS only
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // Android only
      senderID: '397368923340',
      // iOS only
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

  }, []);

  const showNotification = (remoteMessage) => {
    PushNotification.createChannel(
      {
        channelId: remoteMessage.channelId, // (required)
        channelName: `Custom channel - Counter: ${remoteMessage.channelId}`, // (required)
        channelDescription: `A custom channel to categories your custom notifications. Updated at: ${Date.now()}`, // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );

    let data;
   // console.log("data_message " + remoteMessage.hasOwnProperty("data"));
    if (remoteMessage.hasOwnProperty("data") && remoteMessage.data) {
      let notification = remoteMessage.data;
      data = {
        message: notification.noti_body ? notification.noti_body : remoteMessage.message,
        title: notification.noti_title ? notification.noti_title : remoteMessage.title,
        //image: notification.noti_image_url ? notification.noti_image_url : remoteMessage.notification.image,
      };
      // console.log("admin_data_noti" + data);
    } else {
      data = remoteMessage;
    }

    PushNotification.localNotification({
      /* Android Only Properties */
      // id: "0", // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      priority: "high", // (optional) set notification priority, default: high
      importance: 4, // (optional) set notification importance, default: high
      /* iOS and Android properties */
      title: data.title, // (optional)
      message: data.message, // remoteMessage.data.message, // (required),
      channelId: remoteMessage.channelId,
      //bigPictureUrl: data.image,
      smallIcon: IMAGES.logo_with_shadow
    });
  };


  return (
    <CommonUtils>
      <LocalizationProvider>
        <AppProvider>
          <NavigationContainer>
            <Navigator
              screenOptions={{
                headerShown: false,
              }}
              initialRouteName={'Splash'}>
              <Screen name="BottomBar" component={BottomBar} />
              <Screen name="Splash" component={Splash} />
              <Screen name="Login" component={Login} />
              <Screen name="Register" component={Register} />
              <Screen name="ForgotPassword" component={ForgotPassword} />
              <Screen name="ResetPassword" component={ResetPassword} />
              <Screen name="EmailOtp" component={EmailOtp} />
              <Screen name="EmailSuccess" component={EmailSuccess} />
              <Screen name="MobileOtp" component={MobileOtp} />
              <Screen name="SuccessScreen" component={SuccessScreen} />
              <Screen name="MyAccount" component={MyAccount} />
              <Screen name="SendSuggestion" component={SendSuggestion} />
              <Screen name="ChatScreen" component={ChatScreen} />
              <Screen name="EditAccount" component={EditAccount} />
              <Screen name="Notification" component={Notification} />
              <Screen name="AddProduct" component={AddProduct} />
              <Screen
                name="AddProductCommision"
                component={AddProductCommision}
              />
              <Screen name="AddProductSummary" component={AddProductSummary} />
              <Screen
                name="SummaryTransaction"
                component={SummaryTransaction}
              />
              <Screen name="RatingReview" component={RatingReview} />
              <Screen
                name="ExchangeSuccessSummary"
                component={ExchangeSuccessSummary}
              />
              <Screen
                name="ProposalChangedDate"
                component={ProposalChangedDate}
              />
              {/* <Screen
            name="DescribePlaceOfDelivery"
            component={DescribePlaceOfDelivery}
          /> */}
              {/* <Screen
            name="RequestsListForPlaces"
            component={RequestsListForPlaces}
          /> */}
              <Screen name="AdSummaryDetails" component={AdSummaryDetails} />
              <Screen
                name="AdModificationProposal"
                component={AdModificationProposal}
              />
              <Screen name="GooglePlacesInput" component={GooglePlacesInput} />
              <Screen name="PublishedAdsDetails" component={PublishedAdsDetails} />
              <Screen name="SendComplain" component={SendComplain} />
            </Navigator>
          </NavigationContainer>
        </AppProvider>
      </LocalizationProvider>
    </CommonUtils>
  );
};

export default App;

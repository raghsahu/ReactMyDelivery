import React, {useState, useEffect, useRef, useContext} from 'react';
import {View, Platform, LogBox, Image} from 'react-native';

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
} from './src/screens';
//TABBAR
import {TabBar} from './src/components';
//PACKAGES
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  LocalizationProvider,
  LocalizationContext,
} from './src/context/LocalizationProvider';
import {APPContext, AppProvider} from './src/context/AppProvider';

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
      <Screen name="DescribePlaceOfDelivery" component={DescribePlaceOfDelivery} />
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
          fontWeight: "600",
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

  return (
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
          <Screen name="EditAccount" component={EditAccount} />
          <Screen name="Notification" component={Notification} />
          <Screen name="AddProduct" component={AddProduct} />
          <Screen name="AddProductCommision" component={AddProductCommision} />
          <Screen name="AddProductSummary" component={AddProductSummary} />
          <Screen name="SummaryTransaction" component={SummaryTransaction} />
          <Screen name="RatingReview" component={RatingReview} />
          <Screen
            name="ExchangeSuccessSummary"
            component={ExchangeSuccessSummary}
          />
          <Screen name="ProposalChangedDate" component={ProposalChangedDate} />
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
        </Navigator>
      </NavigationContainer>
      </AppProvider>
    </LocalizationProvider>
  );
};

export default App;

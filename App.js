import React, {useState, useEffect, useRef, useContext} from 'react';
import {View, Platform, LogBox} from 'react-native';

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
  AdSummaryDetails
} from './src/screens';
//TABBAR
import {TabBar} from './src/components';
//PACKAGES
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {LocalizationProvider} from './src/context/LocalizationProvider';

const {Navigator, Screen} = createStackNavigator();
const Tab = createBottomTabNavigator();

const BottomBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="MyAccount" component={MyAccount} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <LocalizationProvider>
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
          <Screen name="SendSuggestion" component={SendSuggestion} />
          <Screen name="EditAccount" component={EditAccount} />
          <Screen name="Notification" component={Notification} />
          <Screen name="AddProduct" component={AddProduct} />
          <Screen name="AddProductCommision" component={AddProductCommision} />
          <Screen name="AddProductSummary" component={AddProductSummary} />
          <Screen name="SummaryTransaction" component={SummaryTransaction} />
          <Screen name="RatingReview" component={RatingReview} />
          <Screen name="ExchangeSuccessSummary" component={ExchangeSuccessSummary} />
          <Screen name="ProposalChangedDate" component={ProposalChangedDate} />
          <Screen name="DescribePlaceOfDelivery" component={DescribePlaceOfDelivery} />
          <Screen name="RequestsListForPlaces" component={RequestsListForPlaces} />
          <Screen name="AdSummaryDetails" component={AdSummaryDetails} />
        </Navigator>
      </NavigationContainer>
    </LocalizationProvider>
  );
};

export default App;

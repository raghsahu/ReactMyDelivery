import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Platform,
} from 'react-native';

//ASSETS
import {COLORS, IMAGES, DIMENSION} from '../assets';
import {Session} from '../context';
import ActionSheet from 'react-native-actions-sheet';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import {Picker} from '@react-native-picker/picker'; //for dropdown

//COMMON COMPONENT
import {
  Button,
  Text,
  Input,
  RadioButtons,
  CheckBox,
  DropdownPicker,
  DateTimePick,
  ProgressView,
} from '../components';

import moment from 'moment'; // date format

import {LocalizationContext} from '../context/LocalizationProvider';
import {APPContext} from '../context/AppProvider';
//PACKAGES
import {CommonActions} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import CountryPicker from 'rn-country-picker';
import RNCountry from 'react-native-countries';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonUtilsContext} from '../context/CommonUtils';

const options = [
  {
    key: '1',
    text: 'Man',
  },
];

const optionsWomen = [
  {
    key: '2',
    text: 'Women',
  },
];

function Register(props) {
  const [firstName, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedLanguageKey, setSelectedLanguageKey] = useState('1');
  const [pwSecureText, setPwSecureText] = useState(true);
  const [pwSecureText1, setPwSecureText1] = useState(true);
  const {getTranslation, setI18nConfig, saveUserLanguage, optionsLanguage} =
    useContext(LocalizationContext);
  const actionSheetRef = useRef();
  const [images, setImages] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [mCountryCode, setCountryCode] = useState('91');
  const [mCountryName, setCountryName] = useState();
  const [mSelectedCountryName, setSelectedCountryName] = useState('India');

  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [locationStatus, setLocationStatus] = useState('');

  const {webServices, getError} = useContext(APPContext);
  const {checkSpecialChar} = useContext(CommonUtilsContext);

  useEffect(() => {
    let countryNames = RNCountry.getCountryNamesWithCodes;
    countryNames.sort((a, b) => a.name.localeCompare(b.name));
    setCountryName(countryNames);
  }, []);

  const _selectedValue = index => {
    setCountryCode(index);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setSelectDate(moment(currentDate).format('YYYY-MM-DD'));
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const onSelect = item => {
    if (selectedOption && selectedOption.key === item.key) {
      setSelectedOption(null);
    } else {
      setSelectedOption(item);
    }
  };

  const onValueChange = item => {
    setSelectedLanguage(item);
    if (item == 'en') {
      setSelectedLanguageKey('1');
    } else if (item == 'fr') {
      setSelectedLanguageKey('2');
    } else if (item == 'sp') {
      setSelectedLanguageKey('3');
    }
  };

  const onSelectLanguage = () => {
    if (selectedLanguage) {
      setI18nConfig(selectedLanguage);
      saveUserLanguage(selectedLanguage);
    }
  };

  const setCheck = checkStatus => {
    setSelection(checkStatus);
  };

  const onPressUpload = () => {
    actionSheetRef.current?.setModalVisible(true);
  };

  const onPressLibrary = async type => {
    var result = null;
    // if (requestExternalStoreageRead()) {
    if (type == 1) {
      result = await launchCamera();
      actionSheetRef.current?.setModalVisible(false);
    } else {
      result = await launchImageLibrary();
      actionSheetRef.current?.setModalVisible(false);
    }
    console.log(result);
    if (result && result.assets.length > 0) {
      let uri = result.assets[0].uri;
      let items = [...images];
      items.push(uri);
      setImages(uri);
    }
    // }
  };

  const requestExternalStoreageRead = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'My Delivery ...',
          message: 'App needs access to external storage',
        },
      );

      return granted == PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      //Handle this error
      return false;
    }
  };

  const onNext = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!firstName) {
      Toast.show('Please enter first name');
    } else if (!lastName) {
      Toast.show('Please enter last name');
    } else if (!userName) {
      Toast.show('Please enter user name');
    } else if (userName.trim().length < 3) {
      Toast.show('User name must be minimum 3 character');
    } else if (checkSpecialChar(userName)) {
      Toast.show('Special character & number not allowed in username');
    } else if (!selectedOption) {
      Toast.show('Please select gender');
    } else if (!selectDate) {
      Toast.show('Please enter date of birth');
    } else if (!email) {
      Toast.show('Please enter email');
    } else if (reg.test(email) === false) {
      Toast.show('Please enter valid email');
    } else if (!mobile) {
      Toast.show('Please enter mobile number');
    } else if (mobile.trim().length != 10) {
      Toast.show('Please enter 10 digit mobile number');
    } else if (!address) {
      Toast.show('Please enter address');
    } else if (!city) {
      Toast.show('Please enter city');
    } else if (!selectedLanguage) {
      Toast.show('Please select language');
    } else if (!password) {
      Toast.show('Please enter password');
    } else if (!confirmPassword) {
      Toast.show('Please enter confirm password');
    } else if (password != confirmPassword) {
      Toast.show('password & confirm password not match');
    } else if (!isSelected) {
      Toast.show('Please select terms & conditions');
    } else {
      setLoading(true);
      getRegister(
        firstName,
        lastName,
        userName,
        selectedOption.key,
        selectDate,
        email,
        mobile,
        address,
        city,
        mSelectedCountryName,
        selectedLanguageKey,
        password,
        '10.0000',
        '32.11',
        images,
        ' ',
      );
      // setLoading(false);
      // //console.log('RegisterResult', result);
      // if (result.status == true) {
      //   Toast.show(result.error);
      //   onSelectLanguage();
      //   setTimeout(() => {
      //     props.navigation.dispatch(
      //       CommonActions.reset({
      //         index: 0,
      //         routes: [{name: 'EmailOtp', params: {isFromLogin: false,
      //            Email: email,
      //            Mobile: mobile,
      //            CountryCode: mCountryCode,
      //            }}],
      //       }),
      //     );
      //   }, 500);
      // } else {
      //   Toast.show(result.error);
      // }
    }
  };

  const getRegister = (
    user_f_name,
    user_l_name,
    user_name,
    user_gender,
    user_dob,
    user_email,
    user_mb_no,
    user_addr,
    user_city,
    user_country,
    user_language,
    user_password,
    user_lat,
    user_lon,
    user_img,
    user_fcm_key,
  ) => {
    const formData = new FormData();
    formData.append('user_f_name', user_f_name);
    formData.append('user_m_name', user_l_name);
    formData.append('user_l_name', user_l_name);
    formData.append('user_name', user_name);
    formData.append('user_gender', user_gender);
    formData.append('user_dob', user_dob);
    formData.append('user_email', user_email);
    formData.append('user_mb_no', user_mb_no);
    formData.append('user_addr', user_addr);
    formData.append('user_city', user_city);
    formData.append('user_country', user_country);
    formData.append('user_language', user_language);
    formData.append('user_password', user_password);
    formData.append('user_lat', user_lat);
    formData.append('user_lon', user_lon);
    if (user_img) {
      formData.append(
        'user_img',
        user_img
          ? {
              uri:
                Platform.OS === 'android'
                  ? user_img
                  : user_img.replace('file://', ''),
              name: 'userProfile.jpg',
              type: 'image/jpg',
            }
          : '',
      );
    }

    formData.append('user_fcm_key', user_fcm_key);

    return requestMultipart(webServices.register, 'post', formData);
  };

  const requestMultipart = (url, method, params) => {
    try {
      console.log('===================');
      console.log('URL: ', url);
      console.log('METHOD: ', method);
      console.log('PARAMS: ', params);
      console.log('===================');

      const options = {
        method: 'POST',
        body: params,
        // If you add this, upload won't work
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // }
      };
      var response = fetch(url, options)
        .then(response => {
          return response.json();
        })
        .then(data => {
          setLoading(false);
          if (data && data.status == 1) {
            Toast.show(data.msg);

            setTimeout(() => {
              props.navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'EmailOtp',
                      params: {
                        isFromLogin: false,
                        Email: email,
                        Mobile: mobile,
                        CountryCode: mCountryCode,
                      },
                    },
                  ],
                }),
              );
            }, 500);
            onSelectLanguage();
          } else {
            Toast.show(data.msg);
          }
        });
    } catch (e) {
      console.log(e);
      // return getError(e);
      Toast.show('Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <TouchableOpacity
            style={{
              height: 180,
              width: 180,
              alignSelf: 'center',
            }}
            onPress={onPressUpload}>
            <ImageBackground
              source={images ? {uri: images} : IMAGES.signup_placeholder}
              style={{
                height: 160,
                width: 160,
                borderRadius: 160 / 2,
                marginTop: 32,
                alignSelf: 'center',
                justifyContent: 'center',
                resizeMode: 'contain',
                overflow: 'hidden',
                borderWidth: 0.1,
                alignItems: 'center',
              }}></ImageBackground>
            <View
              style={{
                backgroundColor: COLORS.primaryColor,
                height: 60,
                width: 60,
                borderRadius: 30,
                justifyContent: 'center',
                position: 'absolute', //Here is the trick
                bottom: 0,
                right: 0,
              }}>
              <Image
                source={IMAGES.camera}
                tintColor={COLORS.white}
                style={{
                  height: 24,
                  width: 24,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
              />
            </View>
          </TouchableOpacity>

          <Text
            style={[
              styles.inputView,
              {marginTop: 20, marginBottom: 10, alignSelf: 'center'},
            ]}
            size="24"
            weight="500"
            align="center"
            color={COLORS.textColor}>
            {getTranslation('create_account')}
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('first_name')}
            isLeft={IMAGES.name}
            onChangeText={text => {
              setName(text);
            }}
          />
          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('last_name')}
            isLeft={IMAGES.name}
            onChangeText={text => {
              setLastName(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('user_name')}
            isLeft={IMAGES.user}
            onChangeText={text => {
              setUserName(text);
            }}
          />

          <View
            style={[
              styles.inputView,
              {
                marginTop: 20,
                backgroundColor: COLORS.white,
                padding: 10,
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.5,
                shadowRadius: 2,
                flexDirection: 'row',
              },
            ]}>
            <RadioButtons
              selectedOption={selectedOption}
              onSelect={onSelect}
              options={options}
            />

            <RadioButtons
              style={[{marginLeft: 70}]}
              selectedOption={selectedOption}
              onSelect={onSelect}
              options={optionsWomen}
            />
          </View>

          <TouchableOpacity onPress={showDatepicker} style={styles.inputView}>
            <Input
              style={[{marginTop: 18}]}
              placeholder={getTranslation('date_of_birth')}
              editable={false}
              isLeft={IMAGES.date}
              value={selectDate}
            />
          </TouchableOpacity>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('email_id')}
            isLeft={IMAGES.message_icon}
            //returnKeyType = "next"
            onChangeText={text => {
              setEmail(text);
            }}
          />

          <View
            style={[
              styles.inputView,
              styles.inputContainer,
              {
                flexDirection: 'row',
                flex: 1,
                backgroundColor: COLORS.lightGray,
                borderRadius: 24,
              },
            ]}>
            <CountryPicker
              //style={[{width: 100}]}
              disable={false}
              animationType={'slide'}
              containerStyle={styles.pickerStyle}
              pickerTitleStyle={styles.pickerTitleStyle}
              // dropDownImage={require('./res/ic_drop_down.png')}
              selectedCountryTextStyle={styles.selectedCountryTextStyle}
              countryNameTextStyle={styles.countryNameTextStyle}
              pickerTitle={'Country Code'}
              searchBarPlaceHolder={'Search...'}
              hideCountryFlag={false}
              hideCountryCode={false}
              searchBarStyle={styles.searchBarStyle}
              // backButtonImage={require('./res/ic_back_black.png')}
              //searchButtonImage={require('./res/ic_search.png')}
              countryCode={mCountryCode}
              selectedValue={_selectedValue}
            />

            <Input
              style={[{flex: 1}]}
              placeholder={getTranslation('mobile_no')}
              //textAlign={'center'}
              keyboardType={Platform.OS == 'Android' ? 'numeric' : 'number-pad'}
              onChangeText={text => {
                setMobile(text);
              }}
            />
          </View>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('address')}
            isLeft={IMAGES.home}
            onChangeText={text => {
              setAddress(text);
            }}
          />
          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('city')}
            isLeft={IMAGES.location}
            onChangeText={text => {
              setCity(text);
            }}
          />
          <View
            style={[
              styles.inputView,
              styles.inputContainer,
              {
                backgroundColor: COLORS.lightGray,
                height: 48,
                borderRadius: 24,
              },
            ]}>
            {mCountryName ? (
              <Picker
                selectedValue={mSelectedCountryName}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedCountryName(itemValue)
                }>
                {mCountryName.map(val => {
                  return (
                    <Picker.Item
                      key={'country-item-' + val.code}
                      label={val.name}
                      value={val.name}
                    />
                  );
                })}
              </Picker>
            ) : null}
          </View>

          <DropdownPicker
            //placeholder={'English'}
            isLeft={IMAGES.language}
            selectedValue={selectedLanguage}
            onChange={onValueChange}
            options={optionsLanguage}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('password')}
            secureTextEntry={pwSecureText}
            isLeft={IMAGES.keys_icon}
            onChangeText={text => {
              setPassword(text);
            }}
            isShow={() => {
              setPwSecureText(!pwSecureText);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('confirm_pw')}
            secureTextEntry={pwSecureText1}
            isLeft={IMAGES.keys_icon}
            onChangeText={text => {
              setConfirmPassword(text);
            }}
            isShow={() => {
              setPwSecureText1(!pwSecureText1);
            }}
          />

          <CheckBox
            isSelected={isSelected}
            text={getTranslation('terms_conditions')}
            onChecked={setCheck}
          />
          <Button
            style={[styles.inputView, {marginTop: 30}]}
            title={getTranslation('register')}
            onPress={() => {
              onNext();
            }}
          />

          <View
            style={[
              styles.inputView,
              {
                flexDirection: 'row',
                alignSelf: 'center',
                marginTop: 30,
                marginBottom: 20,
              },
            ]}>
            <Text
              style={{alignSelf: 'center'}}
              size="16"
              weight="600"
              align="center"
              color={COLORS.lightTextColor}
              onPress={() => {}}>
              {getTranslation('already_account')}
            </Text>

            <Text
              style={{alignSelf: 'center', marginLeft: 5}}
              size="18"
              weight="600"
              align="center"
              color={COLORS.primaryColor}
              onPress={() => {
                props.navigation.navigate('Login');
              }}>
              {getTranslation('login')}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>

      {isLoading ? <ProgressView></ProgressView> : null}

      <ActionSheet ref={actionSheetRef}>
        <View style={[styles.bottomView, {}]}>
          <View style={[styles.bottomViewItem, {}]}>
            <TouchableOpacity onPress={() => onPressLibrary(1)}>
              <View style={[styles.bottomViewIcon, {}]}>
                <View
                  style={{
                    backgroundColor: COLORS.primaryColor,
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={IMAGES.camera}
                    tintColor={COLORS.white}
                    style={{
                      height: 24,
                      width: 24,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>
                <Text
                  style={[styles.modalText]}
                  size="16"
                  weight="500"
                  //align="center"
                  color={COLORS.textColor}>
                  {'Camera'}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: 1,
                width: '100%',
                borderColor: COLORS.primaryColor,
                borderWidth: 1,
              }}></View>
            <TouchableOpacity onPress={() => onPressLibrary(2)}>
              <View style={[styles.bottomViewIcon, {}]}>
                <View
                  style={{
                    backgroundColor: COLORS.primaryColor,
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={IMAGES.photos}
                    tintColor={COLORS.white}
                    style={{
                      height: 24,
                      width: 24,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>

                <Text
                  style={[styles.modalText]}
                  size="16"
                  weight="500"
                  //align="center"
                  color={COLORS.textColor}>
                  {'Photo library'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ActionSheet>
      {show && (
        <DateTimePick
          value={date}
          mode={mode}
          onChange={onChange}
          maximumDate={new Date(Date.now() - 86400000)}
        />
      )}
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
  inputContainer: {
    marginTop: 16,
  },
  bottomView: {
    height: 150,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#ffffff',
  },
  bottomViewItem: {
    margin: 25,
    borderColor: COLORS.primaryColor,
    borderWidth: 2,
    borderRadius: 8,
  },
  bottomViewIcon: {
    flexDirection: 'row',
    height: 50,
    marginStart: 20,
    alignItems: 'center',
  },
  modalText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginStart: 20,
  },
  pickerTitleStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  pickerStyle: {
    height: 48,
    width: 100,
    marginLeft: 10,
    justifyContent: 'center',
    //padding: 10,
    //borderWidth: 2,
    //borderColor: '#303030',
    //backgroundColor: 'white',
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    paddingRight: 5,
    color: '#000',
    textAlign: 'right',
  },

  countryNameTextStyle: {
    paddingLeft: 10,
    color: '#000',
    textAlign: 'right',
  },

  searchBarStyle: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 8,
    marginRight: 10,
  },
});

export default Register;

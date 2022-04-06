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
} from 'react-native';

//ASSETS
import {COLORS, IMAGES, DIMENSION} from '../assets';
import {LocalizationContext} from '../context/LocalizationProvider';

//COMMON COMPONENT
import {
  Button,
  Text,
  Input,
  RadioButtons,
  CheckBox,
  DropdownPicker,
  DateTimePick,
  Header,
  ProgressView,
} from '../components';

import moment from 'moment'; // date format
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import {Picker} from '@react-native-picker/picker'; //for dropdown
import RNCountry from 'react-native-countries';
import CountryPicker from 'rn-country-picker';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionSheet from 'react-native-actions-sheet';
import {APPContext} from '../context/AppProvider';
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

function EditAccount(props) {
  const [firstName, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedLanguageKey, setSelectedLanguageKey] = useState('1');
  const [pwSecureTextOld, setPwSecureTextOld] = useState(true);
  const [pwSecureText, setPwSecureText] = useState(true);
  const [pwSecureText1, setPwSecureText1] = useState(true);
  const {
    getTranslation,
    setI18nConfig,
    saveUserLanguage,
    saveUserLoginData,
    optionsLanguage,
  } = useContext(LocalizationContext);
  const actionSheetRef = useRef();
  const [images, setImages] = useState(null);
  const [serverImage, setServerImage] = useState('');
  const [captureImage, setCaptureImages] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [mCountryCode, setCountryCode] = useState('91');
  const [mCountryName, setCountryName] = useState();
  const [mSelectedCountryName, setSelectedCountryName] = useState('India');
  const [userDetails, setUserDetails] = useState({});
  const {user, setUser, imageBaseUrl, webServices, getError} =
    useContext(APPContext);
  const {checkSpecialChar} = useContext(CommonUtilsContext);

  useEffect(() => {
    setName(user.user_f_name);
    setLastName(user.user_l_name);
    setUserName(user.user_name);
    setSelectDate(user.user_dob);
    setAddress(user.user_addr);
    setCity(user.user_city);
    setMobile(user.user_mb_no);
    setEmail(user.user_email);
    setServerImage(user.user_img);
    setGender(user.user_gender == '1' ? options[0] : optionsWomen[0]);
    setSelectedCountryName(user.user_country);
    setSelectedLanguageKey(user.user_language);
    if (user.user_language == '1') {
      setSelectedLanguage('en');
    } else if (user.user_language == '2') {
      setSelectedLanguage('fr');
    } else if (user.user_language == '3') {
      setSelectedLanguage('sp');
    }
  }, []);

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
    if (gender && gender.key === item.key) {
      setGender(null);
    } else {
      setGender(item);
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
      // let items = [...images];
      //items.push(uri);
      setImages(uri);
      setCaptureImages(true);
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

  const onNext = () => {
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
    } else if (!gender) {
      Toast.show('Please select gender');
    } else if (!selectDate) {
      Toast.show('Please enter date of birth');
    }
    // else if (!email) {
    //   Toast.show('Please enter email');
    // } else if (reg.test(email) === false) {
    //   Toast.show('Please enter valid email');
    // }
    else if (!mobile) {
      Toast.show('Please enter mobile number');
    } else if (mobile.trim().length != 10) {
      Toast.show('Please enter 10 digit mobile number');
    } else if (!address) {
      Toast.show('Please enter address');
    } else if (!city) {
      Toast.show('Please enter city');
    } else if (!selectedLanguage) {
      Toast.show('Please select language');
    } else if (oldPassword) {
      if (oldPassword != user.user_password) {
        Toast.show('Old password not match');
      } else if (!password) {
        Toast.show('Please enter password');
      } else if (!confirmPassword) {
        Toast.show('Please enter confirm password');
      } else if (password != confirmPassword) {
        Toast.show('password & confirm password not match');
      } else {
        UpdateUser();
      }
    } else {
      UpdateUser();
    }
  };

  const UpdateUser = async () => {
    setLoading(true);
    await userUpdate(
      user.user_id,
      firstName,
      lastName,
      userName,
      gender.key,
      selectDate,
      user.user_email,
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
    console.log('AAa123 ' + result);
    setLoading(false);
  };

  const userUpdate = async (
    user_id,
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
    formData.append('user_id', user_id);
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

    return await requestMultipart(webServices.userUpdate, 'post', formData);
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
        headers: {
          user_session: user ? user.user_session : '',
          user_id: user ? user.user_id : '',
        },
      };
      var response = fetch(url, options)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log('aaaaa ' + JSON.stringify(data));
          setLoading(false);
          if (data && data.status == 1) {
            Toast.show(data.msg);
            onSelectLanguage();
            setUser(data.result[0]);
            saveUserLoginData(data.result[0]);
            props.navigation.goBack();
          } else {
            Toast.show(data.msg);
          }
        });
    } catch (e) {
      console.log(e);
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
        <Header
          title={getTranslation('edit_account_details')}
          onBack={() => {
            props.navigation.goBack();
          }}
        />
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
              source={
                captureImage == true
                  ? {uri: images}
                  : serverImage
                  ? {uri: imageBaseUrl + serverImage}
                  : IMAGES.signup_placeholder
              }
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
            style={[styles.inputView, {marginTop: 20}]}
            size="18"
            weight="500"
            align="left"
            color={COLORS.textColor}>
            {getTranslation('personal_info')}
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('first_name')}
            isLeft={IMAGES.name}
            value={firstName}
            onChangeText={text => {
              setName(text);
            }}
          />
          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('last_name')}
            isLeft={IMAGES.name}
            value={lastName}
            onChangeText={text => {
              setLastName(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('user_name')}
            isLeft={IMAGES.user}
            value={userName}
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
              selectedOption={gender}
              onSelect={onSelect}
              options={options}
            />

            <RadioButtons
              style={[{marginLeft: 70}]}
              selectedOption={gender}
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

          <View
            style={[
              // styles.inputView,
              styles.inputContainer,
              {flexDirection: 'row', flex: 1},
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
              value={mobile}
              onChangeText={text => {
                setMobile(text);
              }}
            />

            <Button
              style={[
                {
                  width: 60,
                  height: 40,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  marginRight: 5,
                },
              ]}
              title={getTranslation('update')}
              onPress={() => {
                // props.navigation.navigate('EmailOtp')
              }}
            />
          </View>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('address')}
            value={address}
            isLeft={IMAGES.home}
            onChangeText={text => {
              setAddress(text);
            }}
          />
          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('city')}
            value={city}
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

          <Text
            style={[styles.inputView, {marginTop: 20}]}
            size="18"
            weight="500"
            align="left"
            color={COLORS.textColor}>
            {getTranslation('change_pw')}
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('old_pw')}
            secureTextEntry={pwSecureTextOld}
            isLeft={IMAGES.keys_icon}
            onChangeText={text => {
              setOldPassword(text);
            }}
            isShow={() => {
              setPwSecureTextOld(!pwSecureTextOld);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('enter_new_pw')}
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

          <Button
            style={[styles.inputView, {marginTop: 30, marginBottom: 30}]}
            title={getTranslation('save_changes')}
            onPress={() => {
              onNext();
            }}
          />
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
  pickerStyle: {
    height: 48,
    width: 100,
    marginLeft: 10,
    justifyContent: 'center',
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
});

export default EditAccount;

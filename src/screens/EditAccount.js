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

const options = [
  {
    key: '1',
    text: 'Man',
  },
  // {
  //   key: 'Women',
  //   text: 'Women',
  // },
];

const optionsWomen = [
  // {
  //   key: 'Man',
  //   text: 'Man',
  // },
  {
    key: '2',
    text: 'Women',
  },
];

const optionsLanguage = [
  {
    key: '1',
    label: 'English',
    value: 'English',
  },
  {
    key: '2',
    label: 'French',
    value: 'French',
  },
  {
    key: '3',
    label: 'Spanish',
    value: 'Spanish',
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
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  const [selectedLang, setSelectedLang] = useState('English');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedLanguageKey, setSelectedLanguageKey] = useState('1');
  const [pwSecureTextOld, setPwSecureTextOld] = useState(true);
  const [pwSecureText, setPwSecureText] = useState(true);
  const [pwSecureText1, setPwSecureText1] = useState(true);
  const {getTranslation, setI18nConfig, saveUserLanguage,} = useContext(LocalizationContext);
  const actionSheetRef = useRef();
  const [images, setImages] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [mCountryCode, setCountryCode] = useState('91');
  const [mCountryName, setCountryName] = useState();
  const [mSelectedCountryName, setSelectedCountryName] = useState('India');
  const [userDetails, setUserDetails] = useState({});
  const {user, userUpdate, setUser} = useContext(APPContext);

  useEffect(() => {
    setName(user.user_f_name)
    setLastName(user.user_l_name)
    setUserName(user.user_name)
    setSelectDate(user.user_dob)
    setAddress(user.user_addr)
    setCity(user.user_city)
    setMobile(user.user_mb_no)
    //setSelectedOption(user.gender == '1' ? options : optionsWomen)
  }, []);

  useEffect(() => {
   // console.log('user_datttt ' + user.user_f_name);

    let countryNames = RNCountry.getCountryNamesWithCodes;
    countryNames.sort((a, b) => a.name.localeCompare(b.name));
    setCountryName(countryNames);
    //console.log('country_names ' + mSelectedCountryName);
  }, []);

  const _selectedValue = index => {
    setCountryCode(index);
    console.log('country_code ' + index);
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
    setSelectedLang(item);
    if (item == 'English') {
      setSelectedLanguage('en');
    } else if (item == 'French') {
      setSelectedLanguage('fr');
    }
    if (item == 'Spanish') {
      setSelectedLanguage('sp');
    }
    setSelectedLanguageKey(item.key);
  };

  const onSelectLanguage = () => {
    if (selectedLanguage) {
      setI18nConfig(selectedLanguage);
      saveUserLanguage(selectedLanguage);
    }
    // else {
    //   Alert.alert('', 'Please select a language', [
    //     {
    //       text: getTranslation('ok'),
    //       onPress: () => {},
    //     },
    //   ]);
    // }
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
    } else if (!selectedOption) {
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
    } else if (!address) {
      Toast.show('Please enter address');
    } else if (!city) {
      Toast.show('Please enter city');
    } else if (!selectedLanguage) {
      Toast.show('Please select language');
    } else if (oldPassword) {
     // Toast.show('Please select terms & conditions');
     if (oldPassword != user.user_password) {
      Toast.show('Old password not match');
     }else if (!password) {
        Toast.show('Please enter password');
      } else if (!confirmPassword) {
        Toast.show('Please enter confirm password');
      }else if(password != confirmPassword){
        Toast.show('password & confirm password not match');
      }else{
        UpdateUser();
      }
    }
    else {
      UpdateUser();
    }
  };

  const UpdateUser = async () => {
    setLoading(true);
    const result = await userUpdate(
      user.user_id,
      firstName,
      lastName,
      userName,
      selectedOption.key,
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
    setLoading(false);
   // console.log('UpdateResult', result);
    if (result.status == true) {
      Toast.show(result.error);
      onSelectLanguage();
      setUser(result.data[0])
     props.navigation.goBack();
    } else {
      Toast.show(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.primaryColor} />
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
                // alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute', //Here is the trick
                bottom: 0,
                right: 0,
                // marginLeft: 50,
                //alignSelf: 'center',
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
            style={[styles.inputView, {marginTop: 20,}]}
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
                // justifyContent: 'space-between',
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

{/* 
          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('email_id')}
            isLeft={IMAGES.message_icon}
            onChangeText={text => {
              setName(text);
            }}
          /> */}

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
            style={[{width: 60, height: 40, alignSelf: 'center', justifyContent: 'center', marginRight: 5}]}
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
            selectedValue={selectedLang}
            onChange={onValueChange}
            options={optionsLanguage}
          />

          <Text
            style={[styles.inputView, {marginTop: 20,}]}
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

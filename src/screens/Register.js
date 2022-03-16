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
} from 'react-native';

//ASSETS
import {COLORS, IMAGES, DIMENSION} from '../assets';

//COMMON COMPONENT
import {
  Button,
  Text,
  Input,
  RadioButtons,
  CheckBox,
  DropdownPicker,
  DateTimePick,
} from '../components';

import moment from 'moment'; // date format

import {LocalizationContext} from '../context/LocalizationProvider';
//PACKAGES
import {CommonActions} from '@react-navigation/native';

const options = [
  {
    key: 'Man',
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
    key: 'Women',
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

function Register(props) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSelected, setSelection] = useState(false);
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  const [selectedLang, setSelectedLang] = useState('English');
  let [selectedLanguage, setSelectedLanguage] = useState('en');
  const [pwSecureText, setPwSecureText] = useState(true);
  const [pwSecureText1, setPwSecureText1] = useState(true);
  const {getTranslation, setI18nConfig, saveUserLanguage} =
    useContext(LocalizationContext);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setSelectDate(moment(currentDate).format('DD-MM-YYYY'));
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
  };

  const onSelectLanguage = () => {
    if (selectedLanguage) {
      //setLoading(true)
      setI18nConfig(selectedLanguage);
      saveUserLanguage(selectedLanguage);
      //AsyncStorage.setItem('is_first_time_install', 'true')
      // setLoading(false)

      // props.navigation.dispatch(
      //     CommonActions.reset({
      //         index: 0,
      //         routes: [
      //             { name: 'Splash' }
      //         ],
      //     })
      // );
    } else {
      Alert.alert('', 'Please select a language', [
        {
          text: getTranslation('ok'),
          onPress: () => {},
        },
      ]);
    }
  };

  const setCheck = checkStatus => {
    setSelection(checkStatus);
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
          <ImageBackground
            source={IMAGES.signup_placeholder}
            style={{
              height: 160,
              width: 160,
              marginTop: 32,
              alignSelf: 'center',
              justifyContent: 'center',
              resizeMode: 'contain',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryColor,
                height: 60,
                width: 60,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute', //Here is the trick
                bottom: 0,
                alignSelf: 'flex-end',
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
          </ImageBackground>

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
              //setPassword(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('user_name')}
            isLeft={IMAGES.user}
            onChangeText={text => {
              setName(text);
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

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('email_id')}
            isLeft={IMAGES.message_icon}
            onChangeText={text => {
              setName(text);
            }}
          />

          <View
            style={[
              styles.inputView,
              styles.inputContainer,
              {flexDirection: 'row', flex: 1, backgroundColor: COLORS.lightGray, borderRadius: 24,},
            ]}>
            <Input
              style={[{width: 100}]}
              placeholder={'Country'}
              editable={false}
              textAlign={'center'}
              onChangeText={text => {
                //setName(text);
              }}
            />

            <Input
              style={[{flex: 1}]}
              placeholder={getTranslation('mobile_no')}
              textAlign={'center'}
              onChangeText={text => {
                //setName(text);
              }}
            />
          </View>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('address')}
            isLeft={IMAGES.home}
            onChangeText={text => {
              setName(text);
            }}
          />
          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('city')}
            isLeft={IMAGES.location}
            onChangeText={text => {
              setName(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('select_your_country')}
            textAlign={'center'}
            onChangeText={text => {
              setName(text);
            }}
          />

          <DropdownPicker
            //placeholder={'English'}
            isLeft={IMAGES.language}
            selectedValue={selectedLang}
            onChange={onValueChange}
            options={optionsLanguage}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('password')}
            secureTextEntry={pwSecureText}
            isLeft={IMAGES.keys_icon}
            onChangeText={text => {
              //setPassword(text);
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
              //setPassword(text);
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
              onSelectLanguage();
              props.navigation.navigate('EmailOtp');
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

      {show && <DateTimePick value={date} mode={mode} onChange={onChange} />}
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
});

export default Register;

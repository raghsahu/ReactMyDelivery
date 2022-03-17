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
} from '../components';

import moment from 'moment'; // date format

const options = [
  {
    key: 'Man',
    text: 'Man',
  },
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

function EditAccount(props) {
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
  const {getTranslation} =  useContext(LocalizationContext);

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
  };

  const setCheck = checkStatus => {
    setSelection(checkStatus);
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

          <ImageBackground
            source={IMAGES.circle_placeholder}
            style={{
              height: 100,
              width: 100,
              marginTop: 20,
              alignSelf: 'center',
              justifyContent: 'center',
              resizeMode: 'contain',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: COLORS.primaryColor,
                height: 40,
                width: 40,
                borderRadius: 20,
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

          <View style={[styles.inputView, {marginTop: 20}]}>
            <RadioButtons
              selectedOption={selectedOption}
              onSelect={onSelect}
              options={options}
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
              styles.inputView,
              styles.inputContainer,
              {flexDirection: 'row', flex: 1},
            ]}>
            {/* <Input
              style={[{width: 100}]}
              placeholder={'Country'}
              //isLeft={IMAGES.phone}
              onChangeText={text => {
                //setName(text);
              }}
            /> */}

            <Input
              style={[{flex: 1}]}
              placeholder={getTranslation('mobile_no')}
              // isLeft={IMAGES.phone}
              onChangeText={text => {
                //setName(text);
              }}
            />

          <Button
            style={[{width: 80, height: 40, alignSelf: 'center', justifyContent: 'center'}]}
            title={getTranslation('update')}
            onPress={() => {
             // props.navigation.navigate('EmailOtp')
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
            placeholder={getTranslation('select_country')}
            isLeft={IMAGES.location}
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
            secureTextEntry={true}
            isLeft={IMAGES.keys_icon}
            onChangeText={text => {
              //setPassword(text);
            }}
            isShow={() => {
              //props.navigation.navigate('Login')
            }}
          />

           <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('enter_new_pw')}
            secureTextEntry={true}
            isLeft={IMAGES.keys_icon}
            onChangeText={text => {
              //setPassword(text);
            }}
            isShow={() => {
              //props.navigation.navigate('Login')
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('confirm_pw')}
            secureTextEntry={true}
            isLeft={IMAGES.keys_icon}
            onChangeText={text => {
              //setPassword(text);
            }}
            isShow={() => {
              //
            }}
          />

          <Button
            style={[styles.inputView, {marginTop: 30, marginBottom: 30}]}
            title={getTranslation('save_changes')}
            onPress={() => {
             // props.navigation.navigate('EmailOtp')
              }}
          />
        </ScrollView>
      </SafeAreaView>

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
});

export default EditAccount;

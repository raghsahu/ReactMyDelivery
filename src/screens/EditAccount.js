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
import {COLORS, IMAGES} from '../assets';

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
    key: 'Male',
    text: 'Male',
  },
  {
    key: 'Female',
    text: 'Female',
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
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />
      <SafeAreaView style={styles.container}>
      
        <Header
          title={'Edit Account Details'}
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
            {'Personal Info'}
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'First Name'}
            isLeft={IMAGES.name}
            onChangeText={text => {
              setName(text);
            }}
          />
          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Last Name'}
            isLeft={IMAGES.name}
            onChangeText={text => {
              //setPassword(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'User Name'}
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
              placeholder={'Date of Birth'}
              editable={false}
              isLeft={IMAGES.date}
              value={selectDate}
            />
          </TouchableOpacity>


          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Email Id'}
            isLeft={IMAGES.message_icon}
            onChangeText={text => {
              setName(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Mobile Number'}
            isLeft={IMAGES.phone}
            onChangeText={text => {
              //setName(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Address'}
            isLeft={IMAGES.home}
            onChangeText={text => {
              setName(text);
            }}
          />
          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'City'}
            isLeft={IMAGES.location}
            onChangeText={text => {
              setName(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Select Country'}
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
            {'Change Password'}
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Old Password'}
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
            placeholder={'Enter New Password'}
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
            placeholder={'Confirm Password'}
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
            title={'Save Changes'}
            onPress={() => {props.navigation.navigate('EmailOtp')}}
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
    marginHorizontal: 30,
  },
  inputContainer: {
    marginTop: 16,
  },
});

export default EditAccount;

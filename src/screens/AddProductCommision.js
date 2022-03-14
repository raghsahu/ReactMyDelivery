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
  Header,
  BottomBackground,
  RadioButtons,
  DateTimePick,
} from '../components';
import moment from 'moment'; // date format
//CONTEXT
import {LocalizationContext} from '../context/LocalizationProvider';

const options = [
  {
    key: 'Man',
    text: 'Man',
  },
  {
    key: 'Women',
    text: 'Women',
  },
  {
    key: 'Both',
    text: 'Both',
  },
];

function AddProductCommision(props) {
  const [name, setName] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const {getTranslation} = useContext(LocalizationContext);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  const [selectDate1, setSelectDate1] = useState('');
  const [secondDate, setSecondDate] = useState('false');
  const [selectTime, setSelectTime] = useState('');
  const [selectTime1, setSelectTime1] = useState('');
  const [secondTime, setSecondTime] = useState('false');
  const [dateSelected, setDateSelected] = useState(false);

  const onSelect = item => {
    if (selectedOption && selectedOption.key === item.key) {
      setSelectedOption(null);
    } else {
      setSelectedOption(item);
    }
  };

  function showDatepicker(mode) {
    showMode(mode);
  }

  const onChange = (event, selectedDate) => {
    //console.log('time_select ' + selectedDate);
    setShow(Platform.OS === 'ios');

    if (dateSelected) {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      if (secondDate === 'true') {
        setSelectDate1(moment(currentDate).format('DD-MM-YYYY'));
      } else {
        setSelectDate(moment(currentDate).format('DD-MM-YYYY'));
      }
    } else {
      if (secondTime === 'true') {
        setSelectTime1(moment(selectedDate).format('HH:MM'));
      } else {
        setSelectTime(moment(selectedDate).format('HH:MM'));
      }
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />
      <BottomBackground></BottomBackground>
      <SafeAreaView
      //style={styles.container}
      >
        <Header
          title={getTranslation('describe_product_commission')}
          onBack={() => {
            props.navigation.goBack();
          }}
        />
        <ScrollView
          // style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Text
            style={[styles.inputView, {marginTop: 20, alignSelf: 'center'}]}
            size="18"
            weight="500"
            align="center"
            color={COLORS.textColor}>
            {getTranslation('commission_for_having')}
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('global_commission')}
            onChangeText={text => {
              setName(text);
            }}
          />

          <Text
            style={[styles.inputView, {marginTop: 20}]}
            size="16"
            weight="400"
            align="left"
            color={COLORS.textColor}>
            {getTranslation('deliveryman_commission')}
          </Text>

          <View
            style={[
              {
                marginTop: 20,
                backgroundColor: COLORS.lightGray,
                borderWidth: 0.4,
              },
            ]}></View>

          <Text
            style={[styles.inputView, {marginTop: 20, alignSelf: 'center'}]}
            size="18"
            weight="500"
            align="center"
            color={COLORS.textColor}>
            {getTranslation('place_of_delivery')}
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('place_of_delivery')}
            onChangeText={text => {
              setName(text);
            }}
          />

          <View
            style={[
              {
                marginTop: 20,
                backgroundColor: COLORS.lightGray,
                borderWidth: 0.4,
              },
            ]}></View>

          <Text
            style={[styles.inputView, {marginTop: 20, alignSelf: 'center'}]}
            size="18"
            weight="500"
            align="center"
            color={COLORS.textColor}>
            {getTranslation('gender_who_can_access')}
          </Text>

          <View style={[styles.inputView, {marginTop: 20}]}>
            <RadioButtons
              selectedOption={selectedOption}
              onSelect={onSelect}
              options={options}
            />
          </View>

          <View
            style={[
              {
                marginTop: 20,
                backgroundColor: COLORS.lightGray,
                borderWidth: 0.4,
              },
            ]}></View>

          <Text
            style={[styles.inputView, {marginTop: 20, alignSelf: 'center'}]}
            size="18"
            weight="500"
            align="center"
            color={COLORS.textColor}>
            {getTranslation('ad_acceptance_limit')}
          </Text>

          <View
            style={[
              styles.inputView,
              styles.inputContainer,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <TouchableOpacity
              onPress={() => {
                showDatepicker('date');
                setSecondDate('false');
                setDateSelected(true);
              }}
              style={styles.day_hour}>
              <Text
                // style={[ styles.day_hour]}
                size="16"
                weight="400"
                align="center"
                value={selectDate}
                color={COLORS.textColor}>
                {selectDate ? selectDate : getTranslation('day')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                showDatepicker('time');
                setSecondTime('false');
                setDateSelected(false);
              }}
              style={styles.day_hour}>
              <Text
                //style={[styles.day_hour]}
                size="16"
                weight="400"
                align="center"
                color={COLORS.textColor}>
                {selectTime ? selectTime : getTranslation('hour')}
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={[styles.inputView, {marginTop: 20, alignSelf: 'center'}]}
            size="18"
            weight="500"
            align="center"
            color={COLORS.textColor}>
            {getTranslation('limit_delivery')}
          </Text>
          <View
            style={[
              styles.inputView,
              //styles.inputContainer,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <TouchableOpacity
              onPress={() => {
                showDatepicker('date');
                setSecondDate('true');
                setDateSelected(true);
              }}
              style={styles.day_hour}>
              <Text
                //style={[ styles.day_hour]}
                size="16"
                weight="400"
                align="center"
                color={COLORS.textColor}>
                {selectDate1 ? selectDate1 : getTranslation('day')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                showDatepicker('time');
                setSecondTime('true');
                setDateSelected(false);
              }}
              style={styles.day_hour}>
              <Text
                // style={[styles.day_hour]}
                size="16"
                weight="400"
                align="center"
                color={COLORS.textColor}>
                {selectTime1 ? selectTime1 : getTranslation('hour')}
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            style={[styles.inputView, {marginTop: 30, marginBottom: 30}]}
            title={getTranslation('continue')}
            onPress={() => {
              props.navigation.navigate('AddProductSummary');
            }}
          />

          <View style={{marginBottom: 30}}></View>
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
    marginHorizontal: 30,
  },
  inputContainer: {
    marginTop: 16,
  },
  day_hour: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: COLORS.lightGray,
    padding: 10,
    width: 120,
    borderRadius: 20,
  },
});

export default AddProductCommision;

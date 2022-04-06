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
import Toast from 'react-native-simple-toast';

const options = [
  {
    key: '1',
    text: 'Man',
  },
  {
    key: '2',
    text: 'Women',
  },
  {
    key: '3',
    text: 'Both',
  },
];

function AddProductCommision(props) {
  const [globalCommission, setGlobalCommission] = useState(null);
  const [placeOfDelivery, setPlaceOfDelivery] = useState('');
  const [gender, setSelectedGender] = useState(null);
  const [selectDate, setSelectDate] = useState('');
  const [selectDate1, setSelectDate1] = useState('');
  const [selectTime, setSelectTime] = useState('');
  const [selectTime1, setSelectTime1] = useState('');

  const {getTranslation} = useContext(LocalizationContext);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [secondDate, setSecondDate] = useState('false');
  const [secondTime, setSecondTime] = useState('false');
  const [dateSelected, setDateSelected] = useState(false);

  const onSelect = item => {
    if (gender && gender.key === item.key) {
      setSelectedGender(null);
    } else {
      setSelectedGender(item);
    }
  };

  function showDatepicker(mode) {
    showMode(mode);
  }

  const onChange = (event, selectedDate) => {
    setShow(Platform.OS === 'ios');

    if (dateSelected) {
      const currentDate = selectedDate || date;
      setDate(currentDate);

      if (secondDate === 'true') {
        setSelectDate1(moment(currentDate).format('YYYY-MM-DD'));
      } else {
        setSelectDate(moment(currentDate).format('YYYY-MM-DD'));
      }
    } else {
      if (secondTime === 'true') {
        setSelectTime1(moment(selectedDate).format('HH:MM:SS'));
      } else {
        setSelectTime(moment(selectedDate).format('HH:MM:SS'));
      }
    }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const onNext = () => {
    if (!globalCommission) {
      Toast.show('Please enter global commission');
    } else if (!placeOfDelivery) {
      Toast.show('Please enter place of delivery');
    } else if (!gender) {
      Toast.show('Please select gender');
    } else if (!selectDate) {
      Toast.show('Please enter ad acceptance limit day');
    } else if (!selectDate1) {
      Toast.show('Please enter limit delivery day');
    } else if (!selectTime) {
      Toast.show('Please enter ad acceptance limit time');
    } else if (!selectTime1) {
      Toast.show('Please enter limit delivery time');
    } else {
      const CommissionData = {
        globalCommission: globalCommission,
        placeOfDelivery: placeOfDelivery,
        gender: gender.key,
        acceptanceDay: selectDate,
        limitDay: selectDate1,
        acceptanceTime: selectTime,
        deliveryTime: selectTime1,
      };

      props.navigation.navigate('AddProductSummary', {
        CommissionData: CommissionData,
      });
      console.log('summary_gender ' + CommissionData.gender);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />
      <BottomBackground></BottomBackground>
      <SafeAreaView>
        <Header
          title={getTranslation('describe_product_commission')}
          onBack={() => {
            props.navigation.goBack();
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={[styles.inputView, {marginTop: 20, alignSelf: 'center'}]}
            size="18"
            weight="700"
            align="center"
            color={COLORS.textColor}>
            {getTranslation('commission_for_having')}
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('global_commission')}
            keyboardType={Platform.OS == 'Android' ? 'numeric' : 'number-pad'}
            onChangeText={text => {
              setGlobalCommission(text);
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
            style={[styles.inputView, {marginTop: 10, alignSelf: 'center'}]}
            size="18"
            weight="700"
            align="center"
            color={COLORS.textColor}>
            {getTranslation('place_of_delivery')}
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('place_of_delivery')}
            onChangeText={text => {
              setPlaceOfDelivery(text);
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
            style={[styles.inputView, {marginTop: 15, alignSelf: 'center'}]}
            size="18"
            weight="700"
            align="center"
            color={COLORS.textColor}>
            {getTranslation('gender_who_can_access')}
          </Text>

          <View style={[styles.inputView, {marginTop: 20}]}>
            <RadioButtons
              selectedOption={gender}
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
            style={[styles.inputView, {marginTop: 10, alignSelf: 'center'}]}
            size="18"
            weight="700"
            align="center"
            color={COLORS.textColor}>
            {getTranslation('ad_acceptance_limit')}
          </Text>

          <View
            style={[
              styles.inputView,

              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 10,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                showDatepicker('date');
                setSecondDate('false');
                setDateSelected(true);
              }}
              style={styles.day_hour}>
              <Input
                editable={false}
                textAlign={'center'}
                placeholder={getTranslation('day')}
                value={selectDate ? selectDate : ''}
                onChangeText={text => {
                  setSelectDate(text);
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                showDatepicker('time');
                setSecondTime('false');
                setDateSelected(false);
              }}
              style={styles.day_hour}>
              <Input
                editable={false}
                textAlign={'center'}
                placeholder={getTranslation('hour')}
                value={selectTime ? selectTime : ''}
                onChangeText={text => {
                  setSelectTime(text);
                }}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={[styles.inputView, {marginTop: 20, alignSelf: 'center'}]}
            size="18"
            weight="700"
            align="center"
            color={COLORS.textColor}>
            {getTranslation('limit_delivery')}
          </Text>
          <View
            style={[
              styles.inputView,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <TouchableOpacity
              onPress={() => {
                showDatepicker('date');
                setSecondDate('true');
                setDateSelected(true);
              }}
              style={styles.day_hour}>
              <Input
                editable={false}
                textAlign={'center'}
                placeholder={getTranslation('day')}
                value={selectDate1 ? selectDate1 : ''}
                onChangeText={text => {
                  setSelectTime(text);
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                showDatepicker('time');
                setSecondTime('true');
                setDateSelected(false);
              }}
              style={styles.day_hour}>
              <Input
                editable={false}
                textAlign={'center'}
                placeholder={getTranslation('hour')}
                value={selectTime1 ? selectTime1 : ''}
                onChangeText={text => {
                  setSelectTime1(text);
                }}
              />
            </TouchableOpacity>
          </View>

          <Button
            style={[styles.inputView, {marginTop: 30, marginBottom: 30}]}
            title={getTranslation('continue')}
            onPress={() => {
              // props.navigation.navigate('AddProductSummary');
              onNext();
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
    marginHorizontal: DIMENSION.marginHorizontal,
  },
  inputContainer: {
    marginTop: 16,
  },
  day_hour: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: COLORS.lightGray,
    //padding: 10,
    width: 120,
    borderRadius: 20,
  },
});

export default AddProductCommision;

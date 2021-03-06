import React, {useEffect, useContext, useState, useRef} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
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
import {CommonUtilsContext} from '../context/CommonUtils';
import Toast from 'react-native-simple-toast';



function AddProductCommision(props) {
  const [globalCommission, setGlobalCommission] = useState('');
  const [deliveryCommission, setDeliveryCommission] = useState('');
  const [placeOfDelivery, setPlaceOfDelivery] = useState('');
  const [gender, setSelectedGender] = useState(null);
  const [selectDate, setSelectDate] = useState('');
  const [selectDate1, setSelectDate1] = useState('');
  const [selectTime, setSelectTime] = useState('');
  const [selectTime1, setSelectTime1] = useState('');

  const {getTranslation} = useContext(LocalizationContext);
  const {adGender} = useContext(CommonUtilsContext);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [secondDate, setSecondDate] = useState('false');
  const [secondTime, setSecondTime] = useState('false');
  const [dateSelected, setDateSelected] = useState(false);
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  useEffect(() => {
    getCommissionPrice();
  }, [globalCommission]);

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
          setSelectTime1(moment(selectedDate).format('HH:mm'));
        } else {
          setSelectTime(moment(selectedDate).format('HH:mm'));
        }
        
      }
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const onNext = () => {
    if (!globalCommission) {
      Toast.show(getTranslation('pls_enter_global_commission'));
    } else if (!placeOfDelivery) {
      Toast.show(getTranslation('enter_place_of_delivery'));
    } else if (!gender) {
      Toast.show(getTranslation('enter_gender'));
    } else if (!selectDate) {
      Toast.show(getTranslation('enter_ad_acceptance_limit_day'));
    } else if (!selectDate1) {
      Toast.show(getTranslation('enter_ad_limit_delivery_day'));
    } else if (!selectTime) {
      Toast.show(getTranslation('enter_ad_acceptance_time'));
    } else if (!selectTime1) {
      Toast.show(getTranslation('enter_delivery_limit_time'));
    } else {
      const CommissionData = {
        globalCommission: parseFloat(globalCommission).toFixed(2),
        ad_cmsn_delivery: deliveryCommission,
        placeOfDelivery: placeOfDelivery,
        gender: gender.key,
        acceptanceDay: selectDate,
        limitDay: selectDate1,
        acceptanceTime: selectTime + ':00',
        deliveryTime: selectTime1 + ':00',
        ad_lat: lat,
        ad_lon: lng,
      };
      props.navigation.navigate('AddProductSummary', {
        CommissionData: CommissionData,
      });
    }
  };

  const onGooglePlace = () => {
    props.navigation.navigate('GooglePlacesInput', {
      onReturn: item => {
        setPlaceOfDelivery(item.address);
        // setCity(item.city);
        // setCountry(item.country);
        setLat(item.lat);
        setLng(item.lng);
      },
    });
  };

  const getCommissionPrice = () => {
    if (globalCommission) {
      var totalCommission = globalCommission * 0.80  //80% of global commission
        setDeliveryCommission(''+parseFloat(totalCommission).toFixed(2))
    }else{
      setDeliveryCommission('')
    }
  }

  function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

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
              getCommissionPrice();
            }}
          />

          <Text
            style={[styles.inputView, {marginTop: 20}]}
            size="16"
            weight="400"
            align="left"
            color={COLORS.textColor}>
            {getTranslation('deliveryman_commission') + ' : '+ deliveryCommission}
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

          <TouchableOpacity
            onPress={() => {
              onGooglePlace();
            }}
            style={[styles.inputView, styles.inputContainer]}
            >
          <Input
           editable={false}
           value={placeOfDelivery}
            placeholder={getTranslation('place_of_delivery')}
          />
          </TouchableOpacity>

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
              options={adGender}
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
              onNext();
            }}
          />

          <View style={{marginBottom: 30}}></View>
        </ScrollView>
      </SafeAreaView>
      {show && (
        <DateTimePick
          value={date}
          mode={mode}
          onChange={onChange}
          minimumDate={secondDate === 'false' ? new Date() : selectDate ? addDays(selectDate, 1) : new Date()}
          maximumDate={new Date(Date.now() + 86400000*365)}
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
  day_hour: {
    marginTop: 10,
    alignSelf: 'center',
    backgroundColor: COLORS.lightGray,
    width: 120,
    borderRadius: 20,
  },
});

export default AddProductCommision;

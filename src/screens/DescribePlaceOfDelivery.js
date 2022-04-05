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
import {Button, Text, Input, Header, BottomBackground} from '../components';
//CONTEXT
import {LocalizationContext} from '../context/LocalizationProvider';
import Toast from 'react-native-simple-toast';

function DescribePlaceOfDelivery(props) {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [department, setDepartment] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const {getTranslation} = useContext(LocalizationContext);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
     // console.log(props.route.params)
    })
  }, []) 

  const onGooglePlace = () =>{
    props.navigation.navigate('GooglePlacesInput', {onReturn: (item) => {
      console.log('log_item '+ JSON.stringify(item))
        setAddress(item.address)
        setCity(item.city)
        setCountry(item.country);
        setLat(item.lat);
        setLng(item.lng);
    }})
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

      <BottomBackground></BottomBackground>
      <SafeAreaView
      // style={styles.container}
      >
        <Header
          title={getTranslation('describe_place')}
          onBack={() => {
            props.navigation.goBack();
          }}
        />
        <ScrollView
          //style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Text
            style={[styles.inputView, {marginTop: 22, alignSelf: 'flex-start'}]}
            size="20"
            weight="500"
            align="center"
            color={COLORS.titleColor}>
            {getTranslation('describe_place_delivery')}
          </Text>
          <Text
            style={[
              styles.inputView,
              {marginTop: 22, marginBottom: 30, alignSelf: 'flex-start'},
            ]}
            size="20"
            weight="500"
            align="center"
            color={COLORS.primaryColor}>
            {getTranslation('where_you_going')}
          </Text>

          <TouchableOpacity
            onPress={() => {
             onGooglePlace();            
            }}  
            style={[styles.inputView, styles.inputContainer]}>
            <Input
              value={address}
              placeholder={getTranslation('address')}
              editable={false}
              isLeft={IMAGES.home}
              // onChangeText={text => {
              //   setAddress(text);
              // }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              onGooglePlace();
            }}  
            style={[styles.inputView, styles.inputContainer]}>      
          <Input
            //style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('city')}
            editable={false}
            value={city}
            isLeft={IMAGES.location}
            // onChangeText={text => {
            //   setCity(text);
            // }}
          />
        </TouchableOpacity>

        <TouchableOpacity
            onPress={() => {
              onGooglePlace();
            }}  
            style={[styles.inputView, styles.inputContainer]}>
          <Input
            //style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('country')}
            editable={false}
            value={country}
            isLeft={IMAGES.location}
            // onChangeText={text => {
            //   setCountry(text);
            // }}
          />
          </TouchableOpacity>
          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('department')}
            isLeft={IMAGES.department}
            onChangeText={text => {
              setDepartment(text);
            }}
          />

          <Button
            style={[styles.inputView, {marginTop: 40, marginBottom: 80}]}
            title={getTranslation('show_list')}
            onPress={() => {
              if(!address){
                Toast.show('Please select address')
              }else{
                props.navigation.navigate('RequestsListForPlaces', {
                lat: lat,
                lng: lng,
              });
              }
            }}
          />
        </ScrollView>
      </SafeAreaView>
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

export default DescribePlaceOfDelivery;

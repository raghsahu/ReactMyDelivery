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
import {Button, Text, Input, Header, BottomBackground} from '../components';
//CONTEXT
import {LocalizationContext} from '../context/LocalizationProvider';

function DescribePlaceOfDelivery(props) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('');
  const {getTranslation} = useContext(LocalizationContext);

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
            style={[styles.inputView, {marginTop: 22,marginBottom:30, alignSelf: 'flex-start'}]}
            size="20"
            weight="500"
            align="center"
            color={COLORS.primaryColor}>
            {getTranslation('where_you_going')}
          </Text>

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
          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('country')}
            isLeft={IMAGES.location}
            onChangeText={text => {
              setCountry(text);
            }}
          />
          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('department')}
            isLeft={IMAGES.department}
            onChangeText={text => {
              setDepartment(text);
            }}
          />

          <Button
            style={[styles.inputView, { marginTop: 40, marginBottom:80 }]}
            title={getTranslation('show_list')}
            onPress={() => {
              props.navigation.navigate('RequestsListForPlaces')
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
    marginHorizontal: 30,
  },
  inputContainer: {
    marginTop: 16,
  },
});

export default DescribePlaceOfDelivery;

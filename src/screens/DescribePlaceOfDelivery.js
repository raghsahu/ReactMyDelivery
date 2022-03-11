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

function DescribePlaceOfDelivery(props) {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [department, setDepartment] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

      <BottomBackground></BottomBackground>
      <SafeAreaView
      // style={styles.container}
      >
        <Header
          title={'Describe Place'}
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
            {'Describe the place of delivery'}
          </Text>
          <Text
            style={[styles.inputView, {marginTop: 22,marginBottom:30, alignSelf: 'flex-start'}]}
            size="20"
            weight="500"
            align="center"
            color={COLORS.primaryColor}>
            {'Where are you going'}
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Address'}
            isLeft={IMAGES.home}
            onChangeText={text => {
              setAddress(text);
            }}
          />
          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'City'}
            isLeft={IMAGES.location}
            onChangeText={text => {
              setCity(text);
            }}
          />
          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Country'}
            isLeft={IMAGES.location}
            onChangeText={text => {
              setCountry(text);
            }}
          />
          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Department'}
            isLeft={IMAGES.department}
            onChangeText={text => {
              setDepartment(text);
            }}
          />

          <Button
            style={[styles.inputView, { marginTop: 40, marginBottom:80 }]}
            title={'Show List'}
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

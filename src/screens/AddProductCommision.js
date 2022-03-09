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
} from '../components';

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

  const onSelect = item => {
    if (selectedOption && selectedOption.key === item.key) {
      setSelectedOption(null);
    } else {
      setSelectedOption(item);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.primaryColor} />
      <BottomBackground></BottomBackground>
      <SafeAreaView
      //style={styles.container}
      >
        <Header
          title={'Describe Product(s) Commission'}
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
            {'Commission for having'}
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Global Commission'}
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
            {'Deliveryman Commission'}
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
            {'Place of delivery'}
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Place of delivery'}
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
            {'Gender who can see the ad'}
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
            {'Ad acceptance limit'}
          </Text>

          <View
            style={[
              styles.inputView,
              styles.inputContainer,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <Text
              style={[styles.inputView, styles.day_hour]}
              size="16"
              weight="400"
              align="center"
              color={COLORS.textColor}>
              {'Day'}
            </Text>

            <Text
              style={[styles.inputView, styles.day_hour]}
              size="16"
              weight="400"
              align="center"
              color={COLORS.textColor}>
              {'Hour'}
            </Text>
          </View>

          <Text
            style={[styles.inputView, {marginTop: 20, alignSelf: 'center'}]}
            size="18"
            weight="500"
            align="center"
            color={COLORS.textColor}>
            {'Limit Delivery'}
          </Text>
          <View
            style={[
              styles.inputView,
              //styles.inputContainer,
              {flexDirection: 'row', justifyContent: 'space-between'},
            ]}>
            <Text
              style={[styles.inputView, styles.day_hour]}
              size="16"
              weight="400"
              align="center"
              color={COLORS.textColor}>
              {'Day'}
            </Text>

            <Text
              style={[styles.inputView, styles.day_hour]}
              size="16"
              weight="400"
              align="center"
              color={COLORS.textColor}>
              {'Hour'}
            </Text>
          </View>

          <Button
            style={[styles.inputView, {marginTop: 30, marginBottom: 30}]}
            title={'Continue'}
            onPress={() => {
              props.navigation.navigate('AddProductSummary');
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

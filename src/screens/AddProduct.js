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

function AddProduct(props) {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.primaryColor} />
      <BottomBackground></BottomBackground>
      <SafeAreaView
      // style={styles.container}
      >
        <Header
          title={'Describe Product(s)      1/5'}
          onBack={() => {
            props.navigation.goBack();
          }}
        />
        <ScrollView
          //  style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Text
            style={[styles.inputView, {marginTop: 20, alignSelf: 'center'}]}
            size="22"
            weight="500"
            align="center"
            color={COLORS.textColor}>
            {'Describe the product'}
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Product Name'}
            onChangeText={text => {
              setName(text);
            }}
          />

          <ImageBackground
            source={IMAGES.rectangle_gray_border}
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
                // backgroundColor: COLORS.primaryColor,
                // height: 40,
                // width: 40,
                // borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute', //Here is the trick
                // bottom: 0,
                alignSelf: 'center',
              }}>
              <Image
                source={IMAGES.plus}
                //tintColor={COLORS.white}
                style={{
                  height: 24,
                  width: 24,
                  alignSelf: 'center',
                  justifyContent: 'center',
                }}
              />

              <Text
                style={[{marginTop: 10, alignSelf: 'center'}]}
                size="12"
                weight="400"
                align="center"
                color={COLORS.gray}>
                {'Photo'}
              </Text>
            </View>
          </ImageBackground>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Web Link'}
            onChangeText={text => {
              //setPassword(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Place to buy (optional)'}
            onChangeText={text => {
              setName(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Price of product'}
            onChangeText={text => {
              setName(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Quantity'}
            onChangeText={text => {
              //setName(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={'Total Price'}
            onChangeText={text => {
              setName(text);
            }}
          />
          <Input
            style={[styles.inputView, styles.inputContainer]}
            type={1}
            multiline={true}
            placeholder={'Additional product information :'}
            onChangeText={text => {
              setName(text);
            }}
          />

          <View
            style={[
              styles.inputView,
              {
                marginTop: 30,
                marginBottom: 30,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
            ]}>
            <Button
              style={[{width: 130}]}
              title={'Add Product'}
              onPress={() => {
                //props.navigation.navigate('EmailOtp');
              }}
            />

            <Button
              style={[{width: 130}]}
              title={"That's All"}
              onPress={() => {
                props.navigation.navigate('AddProductCommision');
              }}
            />
          </View>
          <View
           style={{marginBottom: 30}}
          ></View>
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

export default AddProduct;

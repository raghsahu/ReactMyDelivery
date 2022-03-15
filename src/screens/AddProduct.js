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
  TextInput,
} from 'react-native';

//ASSETS
import {COLORS, IMAGES} from '../assets';

//COMMON COMPONENT
import {Button, Text, Input, Header, BottomBackground} from '../components';
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';

function AddProduct(props) {
  const [name, setName] = useState('');
  const { getTranslation} = useContext(LocalizationContext);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.primaryColor} />
      <BottomBackground></BottomBackground>
      <SafeAreaView
      // style={styles.container}
      >
        <Header
          title={getTranslation('describe_products') +'      1/5'}
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
            {getTranslation('describe_the_product')}
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('product_name')}
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
                {getTranslation('photo')}
              </Text>
            </View>
          </ImageBackground>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('web_link')}
            onChangeText={text => {
              //setPassword(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('place_to_by')}
            onChangeText={text => {
              setName(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('price_of_product')}
            onChangeText={text => {
              setName(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('quantity')}
            onChangeText={text => {
              //setName(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('total_price')}
            onChangeText={text => {
              setName(text);
            }}
          />
          {/* <Input
            style={[styles.inputView, styles.inputContainer]}
            type={1}
            multiline={true}
            placeholder={getTranslation('additional_product_info')}
            onChangeText={text => {
              setName(text);
            }}
          /> */}
          <TextInput
            style={[styles.inputView, styles.comment]}
            placeholder={getTranslation('additional_product_info')}
            multiline={true}
            //value={''}
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
              title={getTranslation('add_product')}
              onPress={() => {
                //props.navigation.navigate('EmailOtp');
              }}
            />

            <Button
              style={[{width: 130}]}
              title={getTranslation('thats_all')}
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
  comment: {
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    marginTop: 20,
    height: 120,
    backgroundColor: COLORS.lightGray,
    borderRadius: 24,
   // borderColor: COLORS.gray,
    //borderWidth: 1,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 16,
    color: COLORS.black,
  },
});

export default AddProduct;

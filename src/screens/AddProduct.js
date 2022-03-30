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
import {COLORS, IMAGES, DIMENSION} from '../assets';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {PermissionsAndroid} from 'react-native';
import ActionSheet from 'react-native-actions-sheet';

//COMMON COMPONENT
import {Button, Text, Input, Header, BottomBackground} from '../components';
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';

function AddProduct(props) {
  const actionSheetRef = useRef();
  const [productName, setProductName] = useState('');
  const [webLink, setWebLinkName] = useState('');
  const [placeToBuy, setPlaceToBuy] = useState('');
  const [priceOfProduct, setPriceOfProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [prodImg, setProdImg] = useState('');
  const { getTranslation} = useContext(LocalizationContext);

  const onPressUpload = () => {
    actionSheetRef.current?.setModalVisible(true);
  };

  const onPressLibrary = async type => {
    var result = null;
    // if (requestExternalStoreageRead()) {
    if (type == 1) {
      result = await launchCamera();
      actionSheetRef.current?.setModalVisible(false);
    } else {
      result = await launchImageLibrary();
      actionSheetRef.current?.setModalVisible(false);
    }
    console.log(result);
    if (result && result.assets.length > 0) {
      let uri = result.assets[0].uri;
     // let items = [...images];
      //items.push(uri);
      setProdImg(uri);
    }
    // }
  };

  const requestExternalStoreageRead = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'My Delivery ...',
          message: 'App needs access to external storage',
        },
      );

      return granted == PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      //Handle this error
      return false;
    }
  };


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
              setProductName(text);
            }}
          />

          <TouchableOpacity
            style={{
              height: 100,
              width: 100,
              marginTop: 20,
              alignSelf: 'center',
            }}
            onPress={onPressUpload}>
            <ImageBackground
              source={prodImg ? {uri: prodImg} : IMAGES.rectangle_gray_border}
              style={{
                height: 100,
                width: 100,
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
          </TouchableOpacity>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('web_link')}
            onChangeText={text => {
              setWebLinkName(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('place_to_by')}
            onChangeText={text => {
              setPlaceToBuy(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('price_of_product')}
            onChangeText={text => {
              setPriceOfProduct(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('quantity')}
            onChangeText={text => {
              setQuantity(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('total_price')}
            onChangeText={text => {
              setTotalPrice(text);
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
            onChangeText={text => {
              setAdditionalInfo(text);
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
              title={getTranslation('add_product')}
              onPress={() => {
                onNext();
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
      <ActionSheet ref={actionSheetRef}>
        <View style={[styles.bottomView, {}]}>
          <View style={[styles.bottomViewItem, {}]}>
            <TouchableOpacity onPress={() => onPressLibrary(1)}>
              <View style={[styles.bottomViewIcon, {}]}>
                <View
                  style={{
                    backgroundColor: COLORS.primaryColor,
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
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
                <Text
                  style={[styles.modalText]}
                  size="16"
                  weight="500"
                  //align="center"
                  color={COLORS.textColor}>
                  {'Camera'}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                height: 1,
                width: '100%',
                borderColor: COLORS.primaryColor,
                borderWidth: 1,
              }}></View>
            <TouchableOpacity onPress={() => onPressLibrary(2)}>
              <View style={[styles.bottomViewIcon, {}]}>
                <View
                  style={{
                    backgroundColor: COLORS.primaryColor,
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={IMAGES.photos}
                    tintColor={COLORS.white}
                    style={{
                      height: 24,
                      width: 24,
                      alignSelf: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>

                <Text
                  style={[styles.modalText]}
                  size="16"
                  weight="500"
                  //align="center"
                  color={COLORS.textColor}>
                  {'Photo library'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ActionSheet>
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
  bottomView: {
    height: 150,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#ffffff',
  },
  bottomViewItem: {
    margin: 25,
    borderColor: COLORS.primaryColor,
    borderWidth: 2,
    borderRadius: 8,
  },
  bottomViewIcon: {
    flexDirection: 'row',
    height: 50,
    marginStart: 20,
    alignItems: 'center',
  },
  modalText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
    marginStart: 20,
  },
});

export default AddProduct;

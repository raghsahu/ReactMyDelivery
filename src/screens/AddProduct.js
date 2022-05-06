import React, { useEffect, useContext, useState, useRef } from 'react';
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
  Alert,
  BackHandler,
  FlatList,
} from 'react-native';

//ASSETS
import { COLORS, IMAGES, DIMENSION } from '../assets';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import { PermissionsAndroid } from 'react-native';
import ActionSheet from 'react-native-actions-sheet';

//COMMON COMPONENT
import { Button, Text, Input, Header, BottomBackground } from '../components';
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';
import { CommonUtilsContext } from '../context/CommonUtils';
import Toast from 'react-native-simple-toast';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'DescribeProduct.db' });


function AddProduct(props) {
  const scrollRef = useRef();
  const actionSheetRef = useRef();
  const [productName, setProductName] = useState('');
  const [webLink, setWebLinkName] = useState('');
  const [placeToBuy, setPlaceToBuy] = useState('');
  const [priceOfProduct, setPriceOfProduct] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [prodImg, setProdImg] = useState([]);
  const [prodCount, setProdCount] = useState(0);
  const { getTranslation } = useContext(LocalizationContext);
  const { validURL } = useContext(CommonUtilsContext);

  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_product'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_product', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_product( product_id INTEGER PRIMARY KEY AUTOINCREMENT, product_name VARCHAR(100),  web_link VARCHAR(255),  place_to_buy VARCHAR(255), price_of_product VARCHAR(255), quantity VARCHAR(255), total_price VARCHAR(255), additional_info VARCHAR(255), prod_img VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);

  useEffect(() => {
    getSavedProductCount()
  }, []);

  const onPressTouch = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }

  const getSavedProductCount = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_product', [], (tx, results) => {
        if (results.rows.length > 0) {
          setProdCount(results.rows.length)
        }
      });
    });
  }

  const onPressUpload = () => {
    actionSheetRef.current?.setModalVisible(true);
  };

  const onPressLibrary = async type => {
    // var result = null;
    if (type == 1) {
      // result = await launchCamera();
      actionSheetRef.current?.setModalVisible(false);
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
      }).then(image => {
        //do something with the image
        let uri = image.path;
        let items = [...prodImg];
        items.push(uri);
        setProdImg(items);
        // console.log('crop_image ', image);
      })
    } else {
      var result = await launchImageLibrary();
      actionSheetRef.current?.setModalVisible(false);
      console.log(result);
      if (result && result.assets.length > 0) {
        let uri = result.assets[0].uri;
        let items = [...prodImg];
        items.push(uri);
        setProdImg(items);
        // console.log('prodImguri ', uri)
      }
    }
    console.log('prodImggggg ', prodImg.length)
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

  const getTotalPrice = () => {
    if (priceOfProduct && quantity) {
      var totalPriceForProduct = priceOfProduct * quantity
      return '' + totalPriceForProduct.toFixed(2);
    }
    return ''
  }

  const handleInputChange = (text) => {
    const numericRegex = /^([0-9]{0,100})+$/
    if (numericRegex.test(text)) {
      setQuantity(text)
    }
  }

  const onNext = (thatsAllStatus) => {
    if (prodCount < 5) {
      if (!productName) {
        Toast.show('Please enter product name');
      } else if (!webLink) {
        Toast.show('Please enter web link');
      } else if (!validURL(webLink)) {
        Toast.show('Please enter valid web link');
      } else if (!priceOfProduct) {
        Toast.show('Please enter price of product');
      } else if (!quantity) {
        Toast.show('Please enter quantity');
      } else if (prodImg.length < 1) {
        Toast.show('Please capture product image');
      } else {
        // var commaSepImage = prodImg.join(","); 
        // console.log('commaSep ', commaSepImage)

        db.transaction(function (tx) {
          tx.executeSql(
            'INSERT INTO table_product (product_name, web_link, place_to_buy, price_of_product, quantity, total_price, additional_info, prod_img) VALUES (?,?,?,?,?,?,?,?)',
            [
              productName,
              webLink,
              placeToBuy,
              parseFloat(priceOfProduct).toFixed(2),
              quantity,
              getTotalPrice(),
              additionalInfo,
              JSON.stringify(prodImg),
            ],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Toast.show('Product added');
                setProductName('');
                setWebLinkName('');
                setPlaceToBuy('');
                setPriceOfProduct('');
                setQuantity('');
                setTotalPrice('');
                setAdditionalInfo('');
                prodImg.splice(0, prodImg.length);
                prodImg.length = 0;
                setProdImg(prodImg);

                //get all saved product count
                getSavedProductCount()

                if (thatsAllStatus) {
                  moveToNext();
                } else {
                  onPressTouch();
                }
                //*** */
              }
            },
          );
        });
      }
    } else {
      Toast.show('You can add max 5 products')
    }
  };

  const onNextAddCommission = () => {
    if (!productName && !webLink && !priceOfProduct && !quantity && prodImg.length == 0) {
      moveToNext();
    } else {
      onNext(true);
    }
  };

  const moveToNext = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_product', [], (tx, results) => {
        if (results.rows.length > 0) {
          props.navigation.navigate('AddProductCommision');
        } else {
          Toast.show('Please add product');
        }
      });
    });
  }
  const onDiscard = () => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM table_product',
        (tx, results) => {
          try {
            console.log('ResultsDelete', results.rowsAffected);

            if (results.rowsAffected > 0) {

            }
          } catch (ex) {
            console.log(ex)
          }

        },
      );
    });
  };


  return (
    <View
      style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />
      <BottomBackground></BottomBackground>
      <SafeAreaView>
        <Header
          title={getTranslation('describe_products') + '      ' + (prodCount == 5 ? 5 : prodCount + 1) + '/5'}
          onBack={() => {
            props.navigation.goBack();
          }}
        />
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}>
          <Text
            style={[styles.inputView, { marginTop: 20, alignSelf: 'center' }]}
            size="22"
            weight="500"
            align="center"
            color={COLORS.textColor}>
            {getTranslation('describe_the_product')}
          </Text>

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('product_name')}
            value={productName}
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
            onPress={() => {
              if (prodImg.length == 3) {
                Toast.show('you can upload maximum 3 photos')
              } else {
                onPressUpload()
              }
            }}>
            <ImageBackground
              // source={prodImg ? {uri: prodImg} : IMAGES.rectangle_gray_border}
              source={IMAGES.rectangle_gray_border}
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
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute', //Here is the trick
                  alignSelf: 'center',
                }}>
                <Image
                  source={IMAGES.plus}
                  style={{
                    height: 24,
                    width: 24,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                />

                <Text
                  style={[{ marginTop: 10, alignSelf: 'center' }]}
                  size="12"
                  weight="400"
                  align="center"
                  color={COLORS.gray}>
                  {getTranslation('photo')}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>

          <FlatList
            data={prodImg}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            ListHeaderComponent={() => {
              return (
                <View style={styles.common} />
              )
            }}
            ListFooterComponent={() => {
              return (
                <View style={styles.common} />
              )
            }}
            renderItem={({ item, index }) => {
              return (
                <ImageBackground style={styles.imageUpload}
                  resizeMode='cover'
                  source={item ? { uri: item } : null}>
                  <TouchableOpacity onPress={() => {
                    var items = [...prodImg]
                    items = items.filter((e) => e != item)
                    setProdImg(items)
                  }}>
                    <Image
                      source={IMAGES.close}
                      style={
                        styles.crossIcon
                      }
                    />
                  </TouchableOpacity>
                </ImageBackground>
              )
            }} />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('web_link')}
            value={webLink}
            onChangeText={text => {
              setWebLinkName(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('place_to_by')}
            value={placeToBuy}
            onChangeText={text => {
              setPlaceToBuy(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('price_of_product')}
            value={priceOfProduct}
            keyboardType={Platform.OS == 'Android' ? 'numeric' : 'number-pad'}
            onChangeText={text => {
              const validated = text.match(/^(\d*\.{0,1}\d{0,2}$)/) //after decimal accept only 2 digits
              if (validated) {
                setPriceOfProduct(text)
              }
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('quantity')}
            value={quantity}
            keyboardType={Platform.OS == 'Android' ? 'numeric' : 'number-pad'}
            textContentType={'telephoneNumber'}
            dataDetectorTypes={'phoneNumber'}
            onChangeText={text => {
              handleInputChange(text);
            }}
          />

          <Input
            style={[styles.inputView, styles.inputContainer]}
            placeholder={getTranslation('total_price')}
            value={getTotalPrice()}
            editable={false}
          />

          <TextInput
            style={[styles.inputView, styles.comment]}
            placeholder={getTranslation('additional_product_info')}
            multiline={true}
            value={additionalInfo}
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

            {prodCount == 5 ?
              <View
                style={[{ width: 130 }]}>
              </View>
              :
              <Button
                style={[{ width: 130 }]}
                title={getTranslation('add_product')}
                onPress={() => {
                  onNext(false);
                }}
              />
            }

            <Button
              style={[{ width: 130 }]}
              title={getTranslation('thats_all')}
              onPress={() => {
                onNextAddCommission();
              }}
            />
          </View>
          <View style={{ marginBottom: 30 }}></View>
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
  imageUpload: {
    height: 70,
    width: 70,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: COLORS.sky,
    marginRight: 8,
    marginTop: 20,
  },
  uploadLice: {
    marginHorizontal: 40,
    marginTop: 26
  },
  common: {
    width: 50
  },
  crossIcon: {
    alignSelf: 'flex-end',
    margin: 6,
    height: 20,
    width: 20,
  },
});

export default AddProduct;

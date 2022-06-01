import React, { useEffect, useContext, useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  FlatList,
  BackHandler,
} from 'react-native';

//ASSETS
import { COLORS, IMAGES, DIMENSION } from '../assets';

//COMMON COMPONENT
import {
  Button,
  Text,
  Header,
  BottomBackground,
  ProductsItemList,
  ProgressView,
  DeleteModal,
  OpenInfoModal,
} from '../components';
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';
import { CommonUtilsContext,changeUTCtoLocal } from '../context/CommonUtils';
import Toast from 'react-native-simple-toast';
import { APPContext } from '../context/AppProvider';
const { height, width } = Dimensions.get('screen');
import { Rating } from 'react-native-ratings';
import moment from 'moment'; // date format

function PublishedAdsDetails(props) {
  const { type } = props.route.params;
  const [item, setItem] = useState({});
  const [products, setItemProducts] = useState([]);
  const [user_y, setUser_Y] = useState([]);
  const { user, del_ads, imageBaseUrl } = useContext(APPContext);
  const { getTranslation } = useContext(LocalizationContext);
  const { getAdGender } = useContext(CommonUtilsContext);
  const [isLoading, setLoading] = useState(false);
  const [prodTotalPrice, setTotalPrice] = useState(0);
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isOpenInfoModal, setOpenInfoModal] = useState(false);

  const dateA = new Date(moment(changeUTCtoLocal(props.route.params.ProdData.ad_accept_limit), 'YYYY-MM-DDTHH:mm:ss.SSSZ').toString().split('GMT')[0]+ ' UTC').toISOString();
  const dateB = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString();

  useEffect(() => {
    const item = props.route.params.ProdData;
    setItem(item);
    setItemProducts(item.products)
    setUser_Y(item.user_y[0])

    var totalPrice = 0;
    for (let i = 0; i < item.products.length; i++) {
      totalPrice = totalPrice + parseInt(item.products[i].prod_price_total)
    }
    setTotalPrice(parseFloat(totalPrice));

  }, []);

  useEffect(() =>{
    function handleBackButton() {
      backAction();
      return true;
  }
  const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  return () => backHandler.remove();
  }, []);
  
  const backAction = () => {
    props.navigation.goBack();
   };

  const openInfoModal = () => {
    setOpenInfoModal(!isOpenInfoModal);
  };

  const checkDecimal = (amount) => {
    return parseFloat(amount).toFixed(2);
  }

  const deleteModalVisibility = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  const getDeleteAd = async () => {
    setLoading(true);
    const result = await del_ads(item.ad_id);
    setLoading(false);
    if (result.status == true) {
      Toast.show(result.error)
      deleteModalVisibility();
      ///props.navigation.goBack();
      props.navigation.navigate('MyAccount', {
        tabIndex: 2,
        subTabIndex: 1,
      });
    } else {
      Toast.show(result.error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />
      <BottomBackground></BottomBackground>
      <SafeAreaView style={styles.container}>
        <Header
          title={type == getTranslation('notification') ? 'Ads Accepted' : getTranslation('summary')}
          onBack={() => {
            backAction();
          }}
        />

        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <Text
            style={[{ backgroundColor: COLORS.white, padding: 10 }]}
            size="18"
            weight="500"
            align="center"
            color={COLORS.textColor}>
            {getTranslation('summary')}
          </Text>

          <View
            style={[
              {
                backgroundColor: COLORS.lightGray,
                height: 10,
              },
            ]}></View>

          {type == 'Notification' ?
            <View>
              <Text
                style={[styles.inputView, { marginTop: 20 }]}
                size="18"
                weight="500"
                align="left"
                color={COLORS.textColor}>
                {getTranslation('deliveryman_details')}
              </Text>

              <View
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  marginTop: 20,
                  width: '90%',
                  //height: 80,
                  shadowColor: 'black',
                  shadowOpacity: 0.26,
                  shadowOffset: { width: 0, height: 2 },
                  shadowRadius: 10,
                  elevation: 3,
                  borderRadius: 12,
                  backgroundColor: 'white',
                  flex: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    margin: 5,
                    backgroundColor: COLORS.white,
                  }}>
                  <Image
                    style={{
                      width: 64,
                      height: 64,
                      margin: 5,
                      borderRadius: 32,
                      resizeMode: 'contain',
                    }}
                    source={user_y.user_img ? { uri: imageBaseUrl + user_y.user_img } : IMAGES.circle_placeholder}

                  />

                  <View
                    style={{
                      flex: 1,
                      margin: 5,
                    }}>
                    <Text color={COLORS.black} size="16" weight="500">
                      {user_y.user_f_name + ' ' + user_y.user_l_name}
                    </Text>

                    <View style={{ marginTop: 10, flexDirection: 'row' }}>
                      <Text
                        style={[{ marginStart: 15 }]}
                        size="18"
                        weight="500"
                        align="left"
                        color={COLORS.black}>
                        {parseFloat(user_y.user_rating).toFixed(2)}
                      </Text>
                      <Rating
                        type="custom"
                        ratingColor="#04D9C5"
                        startingValue={1}
                        ratingBackgroundColor="#04D9C5"
                        ratingCount={1}
                        imageSize={20}
                        // onFinishRating={this.ratingCompleted}
                        style={{
                          marginTop: 1,
                          marginStart: 15,
                          paddingVertical: 1,
                        }}
                      />
                      <Text
                        style={[{ marginStart: 10, marginEnd: 15 }]}
                        size="18"
                        weight="500"
                        align="left"
                        color={COLORS.black}>
                        {user_y.user_rating_count + ' ' + getTranslation('ratings')}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={[{ marginStart: 5, marginBottom: 20 }]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text style={{}} color={COLORS.black} size="16" weight="500">
                      {getTranslation('date_time_recovery') +' : '}
                    </Text>

                    <Text
                      style={{
                        marginLeft: 10,
                        flex: 1,
                      }}
                      color={COLORS.textColor4}
                      size="16"
                      weight="500">
                      {''}
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                    }}>
                    <Text style={{}} color={COLORS.black} size="16" weight="500">
                      {getTranslation('day_time_delivery') +' : '}
                    </Text>

                    <Text
                      style={{
                        marginLeft: 10,
                        flex: 1,
                      }}
                      color={COLORS.textColor4}
                      size="16"
                      weight="500">
                      {changeUTCtoLocal(item.acpt_date + ' ' + item.acpt_time)}
                    </Text>
                  </View>

                </View>
              </View>
            </View>

            : null}

          {type != 'Notification' ?
            <View
              style={{
                flex: 1,
                marginTop: 5,
                alignSelf: 'flex-end',
                marginEnd: 10,
              }}>

              {dateB > dateA ?
                <Button
                  style={[
                    {
                      width: 93,
                      height: 29,
                      borderRadius: 0,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#C2C2C2',
                    },
                  ]}
                  title={getTranslation('expired')}
                  type={2}
                onPress={() => {}}
                />
                :
                null}
            {dateB > dateA ?
              <Button
                style={[
                  {
                    width: 93,
                    height: 29,
                    marginTop: 5,
                    backgroundColor: COLORS.red,
                    borderRadius: 0,
                    //alignSelf: 'center',
                    justifyContent: 'center',
                  },
                ]}
                title={getTranslation('delete')}
                onPress={() => {
                  deleteModalVisibility();
                }}
              />
              :
            null}

            </View>
            : null}

          <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return <ProductsItemList
                item={item} />;
            }}
          />

          <View style={[styles.inputView, { marginTop: 20 }]}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="500">
                {getTranslation('ad_seen_by')}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.textColor4}
                size="16"
                weight="500">
                {getAdGender(item.ad_gender)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="500">
                {getTranslation('acceptance_limit')}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.textColor4}
                size="16"
                weight="500">
                {changeUTCtoLocal(item.ad_accept_limit)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="500">
                {getTranslation('delivery_limit')}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                }}
                color={COLORS.textColor4}
                size="16"
                weight="500">
                {changeUTCtoLocal(item.ad_delivery_limit)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 5,
              }}>
              <Text style={{}} color={COLORS.black} size="16" weight="500">
                {getTranslation('place_of_delivery') + ' :'}
              </Text>

              <Text
                style={{
                  marginLeft: 10,
                  width: 200,
                }}
                color={COLORS.textColor4}
                size="16"
                weight="500">
                {item.ad_delv_addr}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.inputView,
              {
                flexDirection: 'row',
                marginTop: 15,
                justifyContent: 'space-between',
              },
            ]}>
            <Text
              style={{ justifyContent: 'center', alignSelf: 'center' }}
              color={COLORS.textColor4}
              size="14"
              align="center"
              weight="500">
              {getTranslation('total_price')}
            </Text>

            <Text
              style={{ justifyContent: 'center', alignSelf: 'center', marginRight: 10 }}
              color={COLORS.textColor4}
              size="14"
              align="center"
              weight="500">
              {getTranslation('delivery_man_commission')}
            </Text>

            <Text
              style={{ justifyContent: 'center', alignSelf: 'center', marginRight: 20 }}
              color={COLORS.textColor4}
              size="14"
              align="center"
              weight="500">
              {getTranslation('fees')}
            </Text>
          </View>

          <View
            style={[
              styles.inputView,
              {
                flexDirection: 'row',
                marginTop: 5,
                justifyContent: 'space-between',
              },
            ]}>
            <Text
              style={{
                backgroundColor: COLORS.lightGray,
                width: 80,
                padding: 8,
                marginTop: 10,
                borderRadius: 24,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              color={COLORS.black}
              size="16"
              align="center"
              weight="500">
              {parseFloat(prodTotalPrice).toFixed(2)}
            </Text>

            <Image
              tintColor={COLORS.black}
              style={{
                width: 18,
                height: 18,
                marginHorizontal: 5,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              source={IMAGES.plus}></Image>

            <Text
              style={{
                backgroundColor: COLORS.lightGray,
                width: 80,
                padding: 8,
                marginTop: 10,
                borderRadius: 24,
                justifyContent: 'center',
              }}
              color={COLORS.black}
              size="16"
              align="center"
              weight="500">
              {checkDecimal(item.ad_cmsn_delivery)}
            </Text>

            <Image
              tintColor={COLORS.black}
              style={{
                width: 18,
                height: 18,
                marginHorizontal: 5,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
              source={IMAGES.plus}></Image>

            <Text
              style={{
                backgroundColor: COLORS.lightGray,
                width: 80,
                padding: 8,
                marginTop: 10,
                borderRadius: 24,
                justifyContent: 'center',
              }}
              color={COLORS.black}
              size="16"
              align="center"
              weight="500">
              {checkDecimal(item.ad_cmsn_price * 0.20)}
            </Text>
          </View>

          <TouchableOpacity
            style={{ marginRight: 20, marginTop: 10 }}
            onPress={() => {
              openInfoModal();
            }}>
            <Text
              color={COLORS.primaryColor}
              size="16"
              weight="500"
              align={'right'}>
              {getTranslation('info')}
            </Text>
          </TouchableOpacity>

          <View
            style={{ height: 10 }}>
          </View>

        </ScrollView>
      </SafeAreaView>
      {isLoading ? <ProgressView></ProgressView> : null}

      <DeleteModal
        isDeleteModalVisible={isDeleteModalVisible}
        getDeleteAd={() => {
          getDeleteAd();
        }}
        deleteModalVisibility={() => {
          deleteModalVisibility();
        }}
      />

      <OpenInfoModal
        isOpenInfoModal={isOpenInfoModal}
        openInfoModal={() => {
          openInfoModal();
        }}
      />

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
  viewWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView1: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
    height: 250,
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
});

export default PublishedAdsDetails;

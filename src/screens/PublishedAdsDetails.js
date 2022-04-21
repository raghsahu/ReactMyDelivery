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
} from 'react-native';

//ASSETS
import { COLORS, IMAGES, DIMENSION } from '../assets';

//COMMON COMPONENT
import {
  Button,
  Text,
  Header,
  BottomBackground,
  AddProductsItemList,
  ProgressView,
  DeliveryManSummaryProductsItemList,
} from '../components';
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';
import { CommonUtilsContext } from '../context/CommonUtils';
import Toast from 'react-native-simple-toast';
import { APPContext } from '../context/AppProvider';
const { height, width } = Dimensions.get('screen');

function PublishedAdsDetails(props) {
  const [item, setItem] = useState({});
  const [products, setItemProducts] = useState([]);
  const { getTranslation } = useContext(LocalizationContext);
  const{getAdGender} = useContext(CommonUtilsContext);
  const [isLoading, setLoading] = useState(false);
  const [prodTotalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const item = props.route.params.ProdData;
    setItem(item);
    setItemProducts(item.products)

    var totalPrice = 0;
    for (let i = 0; i < item.products.length; i++) {
      totalPrice = totalPrice + item.products[i].prod_price_total
    }
    setTotalPrice(parseFloat(totalPrice));
    //const totalToPay = parseInt(totalPrice) + parseInt(item.ad_cmsn_price);
   // setTotalToPay(totalToPay.toFixed(2));
    
  }, []);


  const checkDecimal = (amount) => {
    return parseFloat(amount).toFixed(2);
  }


  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />
      <BottomBackground></BottomBackground>
      <SafeAreaView style={styles.container}>
        <Header
          title={getTranslation('summary')}
          onBack={() => {
            props.navigation.goBack();
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

          <FlatList
            showsVerticalScrollIndicator={false}
            data={products}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return <DeliveryManSummaryProductsItemList
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
                {item.ad_accept_limit}
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
                {item.ad_accept_limit}
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

          <Text
            style={{marginRight: 20, marginTop: 10}}
            color={COLORS.primaryColor}
            size="16"
            weight="500"
            align={'right'}>
            {''}
          </Text>

        </ScrollView>
      </SafeAreaView>
      {isLoading ? <ProgressView></ProgressView> : null}
    
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

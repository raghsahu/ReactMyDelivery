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
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';

//ASSETS
import { COLORS, IMAGES, DIMENSION } from '../assets';
import moment from 'moment'; // date format

//COMMON COMPONENT
import {
  Button,
  Text,
  Input,
  Header,
  AdvertiseListItem,
  ProgressView,
  FilterItem,
} from '../components';
import { LocalizationContext } from '../context/LocalizationProvider';
import { CommonUtilsContext, filterList, changeUTCtoLocal } from '../context/CommonUtils';
import { APPContext } from '../context/AppProvider';
import Toast from 'react-native-simple-toast';
const { height, width } = Dimensions.get('screen');

function RequestsListForPlaces(props) {
  const { lat, lng } = props.route.params;
  const { getTranslation } = useContext(LocalizationContext);
  const { optionsFilter, setOptionFilter } = useContext(CommonUtilsContext);
  const { user, getFilterProduct } = useContext(APPContext);
  const [isLoading, setLoading] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [filterKey, setFilterKey] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [maxPrice, setMaximumPrice] = useState('');
  const [minCommission, setMinimumCommission] = useState('');
  const [requestItem, setRequestItem] = useState([]);

  useEffect(() => {
    setOptionFilter(filterList);
    getRequestList();

  }, []);

  const getCurrentDate = () => {

    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return year + '-' + month + '-' + date;//format: dd-mm-yyyy;
  }

  const logoutModalVisibility = () => {
    setLogoutModalVisible(!isLogoutModalVisible);
  };

  const getRequestList = async () => {
    //ad type- purchase & delivery(0), recovery & delivery(1), both(2)
    setLoading(true);
    const result = await getFilterProduct(
      maxPrice ? maxPrice : '10000000',
      '0',
      '10000000',
      minCommission ? minCommission : '0',
      getCurrentDate(),
      lat,
      lng,
    );
    setLoading(false);
    if (result.status == true) {
      //Toast.show(result.error);
      const dateB = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString();
      let todos = []; 
      if(result.data.length > 0){
        for (let i = 0; i < result.data.length; i++) {
          const dateA = new Date(moment(changeUTCtoLocal(result.data[i].ad_accept_limit), 'YYYY-MM-DDTHH:mm:ss.SSSZ').toString().split('GMT')[0]+ ' UTC').toISOString();
          if (dateB < dateA) {
            todos.push(result.data[i])
          }
        }
        setRequestItem(todos);
      }else{
        setRequestItem([]);
      }
      
    } else {
      Toast.show(result.error);
      setRequestItem([]);
    }
  };

  const handleInputChange = (text) => {
    const numericRegex = /^([0-9]{0,100})+$/
    if (numericRegex.test(text)) {
     filterKey == '4'
     ? setMaximumPrice(text)
     : setMinimumCommission(text);
    }
  }

  const filterByPrice = () =>{
    requestItem.sort((a, b) => {
      var priceA = a.ad_pay_amount - a.ad_cmsn_price;
      var priceB = b.ad_pay_amount - b.ad_cmsn_price;
      if (isFilter) {
        if (parseInt(priceA) > parseInt(priceB)) {
          return -1 // return -1 here for DESC order
        }
      } else {
        if (parseInt(priceB) > parseInt(priceA)) {
          return -1 // return -1 here for ASC order
        }
      }
      return 1 // return 1 here for DESC Order
    });
  }

  const filterByCommission = () => {
    requestItem.sort((a, b) => {
      var priceA = a.ad_cmsn_delivery;
      var priceB = b.ad_cmsn_delivery;
      if (isFilter) {
        if (parseInt(priceA) > parseInt(priceB)) {
          return -1 // return -1 here for DESC order
        }
      } else {
        if (parseInt(priceB) > parseInt(priceA)) {
          return -1 // return -1 here for ASC order
        }
      }
      return 1 // return 1 here for DESC Order
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

      <SafeAreaView style={styles.container}>
        <Header
          title={getTranslation('request_list')}
          onBack={() => {
            props.navigation.goBack();
          }}
        />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              paddingVertical: 10,
              justifyContent: 'space-between',
              marginTop: 12,
              flexDirection: 'row',
            }}>
            <Text
              style={[styles.inputView, { alignSelf: 'center' }]}
              size="20"
              weight="500"
              align="center"
              color={COLORS.textColor2}>
              {getTranslation('filter_by')}
            </Text>
            <TouchableOpacity
              style={[styles.inputView, { alignSelf: 'center' }]}
              onPress={() => {
                setIsFilter(!isFilter);
                if(filterKey == '6'){
                 filterByCommission();
                }else {
                 filterByPrice();
                }
              }}>
              <ImageBackground
                source={IMAGES.rectangle_gray_border}
                resizeMode="cover">
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    // borderRadius: 35,
                    margin: 5,
                  }}
                  source={IMAGES.filterby}
                />
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View
            style={[
              { marginTop: 10, flex: 1, marginBottom: 30 },
            ]}>
            <FlatList
              style={[styles.inputView,]}
              showsVerticalScrollIndicator={false}
              data={optionsFilter}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3}
              renderItem={({ item, index }) => {
                return (
                  <FilterItem
                    item={item}
                    onFilter={id => {
                      setFilterKey(id);
                      
                      const data = [...optionsFilter];
                      for (let i = 0; i < data.length; i++) {
                        if (i === index) {
                          data[index].selected = !data[index].selected;
                        } else {
                          data[i].selected = false;
                        }
                      }
                      setOptionFilter(data);

                      if(!data[index].selected){
                        setFilterKey(null);
                      }

                      if (id == '1') {
                        // setMaximumPrice('10000');
                        // setMinimumCommission('1');
                        // getRequestList();
                        requestItem.sort((a, b) => {
                          const dateA = new Date(`${a.ad_create_date}`).valueOf();
                          const dateB = new Date(`${b.ad_create_date}`).valueOf();
                          if (data[index].selected) {
                            if (dateA > dateB) {
                              return -1; // return -1 here for DESC order
                            }
                          } else {
                            if (dateB > dateA) {
                              return -1; // return -1 here for DESC order
                            }
                          }

                          return 1 // return 1 here for DESC Order
                        });

                      } else if (id == '2') {
                        // setMaximumPrice('10000');
                        // setMinimumCommission('1');
                        // getRequestList();
                        requestItem.sort((a, b) => {
                          var dateA = a.duration_ad;
                          var dateB = b.duration_ad;
                          if (data[index].selected) {
                            if (parseInt(dateA) > parseInt(dateB)) {
                              return -1 // return -1 here for DESC order
                            }
                          } else {
                            if (parseInt(dateB) > parseInt(dateA)) {
                              return -1 // return -1 here for ASC order
                            }
                          }
                          return 1 // return 1 here for DESC Order
                        });
                      } else if (id == '3') {
                        // setMaximumPrice('10000');
                        // setMinimumCommission('1');
                        // getRequestList();
                        requestItem.sort((a, b) => {
                          const rating1 = a.user_rating;
                          const rating2 = b.user_rating;
                          if (data[index].selected) {
                            if (rating1 > rating2) {
                              return -1; // return -1 here for DESC order
                            }
                          }
                           else {
                            if (rating2 > rating1) {
                              return -1; // return -1 here for DESC order
                            }
                          }

                          return 1 // return 1 here for DESC Order
                        });

                      } else if (id == '4' && data[index].selected) {
                        setMinimumCommission('')
                        setIsFilter(!isFilter)
                        filterByPrice();

                      } else if (id == '5') {
                        // setMaximumPrice('10000');
                        // setMinimumCommission('1');
                        // getRequestList();
                        requestItem.sort((a, b) => {
                          var dateA = new Date(moment(changeUTCtoLocal(a.ad_delivery_limit)).format('YYYY-MM-DD')).valueOf();
                          var dateB = new Date(moment(changeUTCtoLocal(b.ad_delivery_limit)).format('YYYY-MM-DD')).valueOf();
                          if (data[index].selected) {
                            if (dateA > dateB) {
                              return -1; // return -1 here for DESC order
                            }
                          } else {
                            if (dateB > dateA) {
                              return -1; // return -1 here for ASC order
                            }
                          }

                          return 1 // return 1 here for DESC Order
                        });
                      } else if (id == '6' && data[index].selected) {
                        setMaximumPrice('')
                        setIsFilter(!isFilter)
                        filterByCommission();
                      }
                    }}
                  />
                );
              }}
            />

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
              }}>
                {filterKey == '4' ? 
              <TouchableOpacity
                style={[styles.inputView, {
                  alignSelf: 'flex-start',
                   marginLeft: 70,
                  }]}
                onPress={() => {
                  logoutModalVisibility();
                }}>

                <Image
                  style={{
                    width: 12,
                    height: 12,
                    margin: 5,
                  }}
                  source={IMAGES.downArrow}
                />

              </TouchableOpacity>
               : 
               <TouchableOpacity
               style={[styles.inputView, {
                 alignSelf: 'flex-start',
                  marginLeft: 70,
                 }]}
               onPress={() => {
               
               }}>

               <Image
                 style={{
                   width: 0,
                   height: 0,
                   margin: 5,
                 }}
                 source={IMAGES.downArrow}
               />

             </TouchableOpacity>
               } 

            {filterKey == '6' ? 
              <TouchableOpacity
                style={[styles.inputView, { alignSelf: 'flex-end', marginRight: 70 ,
              }]}
                onPress={() => {
                  logoutModalVisibility();
                }}>

                <Image
                  style={{
                    width: 12,
                    height: 12,
                    margin: 5,

                  }}
                  source={IMAGES.downArrow}
                />

              </TouchableOpacity>
              : 
              <TouchableOpacity
              style={[styles.inputView, {
                alignSelf: 'flex-end', marginRight: 70 
                }]}
              onPress={() => {
                
              }}>

              <Image
                style={{
                  width: 0,
                  height: 0,
                  margin: 5,
                }}
                source={IMAGES.downArrow}
              />

            </TouchableOpacity>
              }

            </View>

            <View style={{ height: 5, backgroundColor: '#414141' }}></View>
          </View>

          <View
            style={{
              flex: 1,
              paddingVertical: 10,
              justifyContent: 'space-between',
              marginTop: 12,
              flexDirection: 'row',
            }}>
            <Text
              style={[styles.inputView, { alignSelf: 'center' }]}
              size="18"
              weight="500"
              align="center"
              color={COLORS.textColor2}>
              {getTranslation('advertise_list')}
            </Text>
            <TouchableOpacity style={[styles.inputView, { alignSelf: 'center' }]}>
              <Text
                style={[{ alignSelf: 'center' }]}
                size="18"
                weight="500"
                align="center"
                color={COLORS.textColor2}>
                {getTranslation('total') +': ' + requestItem.length}
              </Text>
            </TouchableOpacity>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={requestItem}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <AdvertiseListItem
                  mainViewStyle={[styles.inputView, { marginBottom: 20 }]}
                  item={item}
                  onSummary={() => {
                    props.navigation.navigate('AdSummaryDetails', {
                      ProdData: item,
                    });
                  }}
                />
              );
            }}
          />
        </ScrollView>
      </SafeAreaView>
      {isLoading ? <ProgressView></ProgressView> : null}

      <Modal
        animationType="slide"
        transparent
        visible={isLogoutModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={logoutModalVisibility}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView1}>
            <Text
              style={{
                alignSelf: 'center',
                justifyContent: 'center',
                padding: 15,
                backgroundColor: COLORS.primaryColor,
                width: '100%',
              }}
              size="18"
              weight="500"
              align="left"
              color={COLORS.white}>
              {getTranslation('filter')}
            </Text>

            <TouchableOpacity
              style={{
                width: 24,
                height: 24,
                position: 'absolute',
                margin: 15,
                justifyContent: 'center',
                right: 0,
              }}
              onPress={() => {
                logoutModalVisibility();
              }}>
              <Image
                style={{
                  width: 24,
                  height: 24,
                }}
                source={IMAGES.close}
              />
            </TouchableOpacity>

            <Input
              style={{ marginHorizontal: 10, marginTop: 30 }}
              placeholder={
                filterKey == '4' ? 'Maximum Price' : 'Minimum Commission'
              }
              isLeft={IMAGES.filterItem}
              keyboardType={Platform.OS == 'Android' ? 'numeric' : 'number-pad'}
              textContentType={'telephoneNumber'}
              dataDetectorTypes={'phoneNumber'}
              value={ filterKey == '4' ? maxPrice : minCommission}
              onChangeText={text => {
                handleInputChange(text);
              }}
            // value={selectDate}
            />

            <Button
              style={[
                styles.inputView,
                {
                  width: 200,
                  marginTop: 20,
                  marginBottom: 20,
                  alignSelf: 'center',
                },
              ]}
              title={'Ok'}
              onPress={() => {
                if (filterKey == '4' ? !maxPrice : !minCommission) {
                  Toast.show(getTranslation('pls_enter_amount'));
                } else {
                  getRequestList();
                  logoutModalVisibility();
                }
              }}
            />
          </View>
        </View>
      </Modal>
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
  filter_item: {
    flex: 1,
    height: 30,
    width: '33%',
    borderRadius: 15,
    margin: 5,
    borderWidth: 1,
    borderColor: COLORS.borderColor,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  viewWrapper: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView1: {
    left: '40%',
    top: '40%',
    margin: 20,
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
    backgroundColor: '#fff',
    borderRadius: 7,
  },
});

export default RequestsListForPlaces;

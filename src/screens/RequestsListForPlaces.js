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
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';

//ASSETS
import {COLORS, IMAGES, DIMENSION} from '../assets';

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
import {LocalizationContext} from '../context/LocalizationProvider';
import {CommonUtilsContext, filterList} from '../context/CommonUtils';
import {APPContext} from '../context/AppProvider';
import Toast from 'react-native-simple-toast';
const {height, width} = Dimensions.get('screen');

function RequestsListForPlaces(props) {
  const {lat, lng} = props.route.params;
  const {getTranslation} = useContext(LocalizationContext);
  const {optionsFilter, setOptionFilter} = useContext(CommonUtilsContext);
  const {user, getFilterProduct} = useContext(APPContext);
  const [isLoading, setLoading] = useState(false);
  const [isFilter, setIsFilter] = useState(false);
  const [filterKey, setFilterKey] = useState(false);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [maxPrice, setMaximumPrice] = useState('');
  const [minCommission, setMinimumCommission] = useState('');

  useEffect(() => {
    setOptionFilter(filterList);
    getRequestList();
  }, []);

  const logoutModalVisibility = () => {
    setLogoutModalVisible(!isLogoutModalVisible);
  };

  const getRequestList = async () => {
    //ad type- purchase & delivery(0), recovery & delivery(1), both(2)
    setLoading(true);
    const result = await getFilterProduct(
      null,
      null,
      null,
      maxPrice,
      '1',
      null,
      minCommission,
      null,
      '2',
      lat,
      lng,
    );
    setLoading(false);
    if (result.status == true) {
      //Toast.show(result.error);
    } else {
      Toast.show(result.error);
    }
  };

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
              style={[styles.inputView, {alignSelf: 'center'}]}
              size="20"
              weight="500"
              align="center"
              color={COLORS.textColor2}>
              {getTranslation('filter_by')}
            </Text>
            <TouchableOpacity
              style={[styles.inputView, {alignSelf: 'center'}]}
              onPress={() => {
                setIsFilter(!isFilter);
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

          {isFilter ? (
            <View
              style={[
                styles.inputView,
                {marginTop: 10, flex: 1, marginBottom: 30},
              ]}>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={optionsFilter}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}
                renderItem={({item, index}) => {
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

                        if (id == '4' && data[index].selected) {
                          setMaximumPrice('');
                          logoutModalVisibility();
                        } else if (id == '6' && data[index].selected) {
                          setMinimumCommission('');
                          logoutModalVisibility();
                        }
                      }}
                    />
                  );
                }}
              />
            </View>
          ) : null}

          <View style={{height: 5, backgroundColor: '#414141'}}></View>

          <View
            style={{
              flex: 1,
              paddingVertical: 10,
              justifyContent: 'space-between',
              marginTop: 12,
              flexDirection: 'row',
            }}>
            <Text
              style={[styles.inputView, {alignSelf: 'center'}]}
              size="18"
              weight="500"
              align="center"
              color={COLORS.textColor2}>
              {'Advertise List'}
            </Text>
            <TouchableOpacity style={[styles.inputView, {alignSelf: 'center'}]}>
              <Text
                style={[{alignSelf: 'center'}]}
                size="18"
                weight="500"
                align="center"
                color={COLORS.textColor2}>
                {'Total: 1'}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={['']}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              return (
                <AdvertiseListItem
                  mainViewStyle={[styles.inputView, {marginBottom: 20}]}
                  onSummary={() => {
                    // navigation.navigate('SummaryTransaction')
                    props.navigation.navigate('AdSummaryDetails');
                    // props.onSummary()
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
              {'Filter'}
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
              style={{marginHorizontal: 10, marginTop: 30}}
              placeholder={
                filterKey == '4' ? 'Maximum Price' : 'Minimum Commission'
              }
              isLeft={IMAGES.filterItem}
              keyboardType={Platform.OS == 'Android' ? 'numeric' : 'number-pad'}
              onChangeText={text => {
                filterKey == '4'
                  ? setMaximumPrice(text)
                  : setMinimumCommission(text);
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
                  Toast.show('Please enter amount');
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
    transform: [{translateX: -(width * 0.4)}, {translateY: -90}],
    backgroundColor: '#fff',
    borderRadius: 7,
  },
});

export default RequestsListForPlaces;

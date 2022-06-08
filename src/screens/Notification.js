import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';

//ASSETS
import { COLORS, IMAGES, DIMENSION } from '../assets';
const { height, width } = Dimensions.get('screen');
//COMMON COMPONENT
import {
  Header,
  NotificationItemList,
  BottomBackground,
  ProgressView,
} from '../components';
import { LocalizationContext } from '../context/LocalizationProvider';
import { APPContext } from '../context/AppProvider';
import Toast from 'react-native-simple-toast';

function Notification(props) {
  const { getTranslation } = useContext(LocalizationContext);
  const { getNotifications, user, getProducts } = useContext(APPContext);
  const [isLoading, setLoading] = useState(false);
  const [notificationData, setNotifications] = useState([]);

  useEffect(() => {
    getAllNotifications();
    const willFocusSubscription = props.navigation.addListener('focus', () => {
      getAllNotifications();
    });

    return willFocusSubscription;
  }, []);

  const getAllNotifications = async () => {
    setLoading(true);
    const result = await getNotifications(user.user_id);
    setLoading(false);
    if (result.status == true) {
      setNotifications(result.data.reverse());
      
    } else {
      Toast.show(result.error);
    }
  };

  const getAdsData = async (ad_id, noti_type, notn_id) => {
    setLoading(true);
    const result = await getProducts(ad_id);
    setLoading(false);
    if (result.status == true) {
      if (noti_type == '5') {
        props.navigation.navigate('PublishedAdsDetails', {
          ProdData: result.data[0],
          type: 'Notification'
        });
      } else if (noti_type == '9') {
        props.navigation.navigate('ProposalChangedDate', {
          ProdData: result.data[0],
          notn_id: notn_id,
        })
      }
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
          title={getTranslation('notifications')}
          onBack={() => {
            props.navigation.goBack();
          }}
        />

        <FlatList
          showsVerticalScrollIndicator={false}
          data={notificationData}
          //inverted
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return <NotificationItemList
              item={item}
              onPress={(item) => {
                /** Notifictions type
                  0- Nothing,
                  1- Y deliveryman change parameter ,
                  2- Z Accept ad ,
                  3- X Accept ad,
                  4- Y recovers the item from Z,
                  5- Y accepts the ads notify the X & Z
                  6- X send proposal to Z
                  7- Z send proposal to X
                  8- Y delivered to X
                  9- Y change the date*/
                if (item.notn_type == '1') {//for change request
                  props.navigation.navigate('AdModificationProposal', {
                    ads_id: item.ad_id,
                    notn_id: item.notn_id,
                  })
                  //getNewOldAllData(item.ad_id)
                } else if (item.notn_type == '2') {

                } else if (item.notn_type == '3') {//for date time change request accepted
                  Toast.show('You have already taken action on this ads')
                } else if (item.notn_type == '4') {

                } else if (item.notn_type == '5') {//for accept ads by delivery man
                  getAdsData(item.ad_id, item.notn_type, '')
                } else if (item.notn_type == '6') {

                } else if (item.notn_type == '7') {

                } else if (item.notn_type == '8') {

                } else if (item.notn_type == '9') {//for date time change request
                  getAdsData(item.ad_id, item.notn_type, item.notn_id)
                }
              }}
            />;
          }}
        />
      </SafeAreaView>
      {isLoading ? <ProgressView></ProgressView> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLORS.lightGray,
  },
  inputView: {
    marginHorizontal: DIMENSION.marginHorizontal,
  },
  inputContainer: {
    marginTop: 16,
  },
});

export default Notification;

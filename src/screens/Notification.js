import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';

//ASSETS
import {COLORS, IMAGES, DIMENSION} from '../assets';
const {height, width} = Dimensions.get('screen');
//COMMON COMPONENT
import {
  Button,
  Header,
  Text,
  Input,
  NotificationItemList,
  BottomBackground,
  ProgressView,
} from '../components';
import {LocalizationContext} from '../context/LocalizationProvider';
import {APPContext} from '../context/AppProvider';
import Toast from 'react-native-simple-toast';

function Notification(props) {
  const {getTranslation} = useContext(LocalizationContext);
  const {getNotifications, user} = useContext(APPContext);
  const [isLoading, setLoading] = useState(false);
  const [notificationData, setNotifications] = useState([]);

  useEffect(() => {
    getAllNotifications();
  }, []);

  const getAllNotifications = async () => {
    setLoading(true);
    const result = await getNotifications('1');
    setLoading(false);
    if (result.status == true) {
      setNotifications(result.data);
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
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return <NotificationItemList item={item} />;
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

import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Dimensions,
} from 'react-native';

//ASSETS
import {COLORS, IMAGES, DIMENSION} from '../assets';
const {height, width} = Dimensions.get('screen');
//COMMON COMPONENT
import {
  PublishedItemList,
  ProgressView,
  DeleteModal,
} from '../components';
//CONTEXT
import {LocalizationContext} from '../context/LocalizationProvider';
import {APPContext} from '../context/AppProvider';
import Toast from 'react-native-simple-toast';

function Published(props) {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const {user, del_ads, publishedProduct} = useContext(APPContext);
  const {getTranslation} = useContext(LocalizationContext);
  const [publishedItem, setPublishedItem] = useState([]);
  const [deletedAdId, setDeletedAdId] = useState('');

  useEffect(() => {
    getPublishedProduct();
  }, []);

  const getPublishedProduct = async () => {
    setLoading(true);
    const result = await publishedProduct(user.user_id, '0');
    setLoading(false);
    if (result.status == true) {
      setPublishedItem(result.data);
    } else {
      Toast.show(result.error);
    }
  };

  const getDeleteAd = async () => {
    setLoading(true);
    const result = await del_ads(deletedAdId);
    //setLoading(false);
    if (result.status == true) {
      deleteModalVisibility();
      getPublishedProduct();
    } else {
      Toast.show(result.error);
    }
  };

  const deleteModalVisibility = () => {
    setDeleteModalVisible(!isDeleteModalVisible);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />

      <SafeAreaView style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={publishedItem}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <PublishedItemList
                item={item}
                onDelete={(ad_id) => {
                  setDeletedAdId(item.ad_id)
                  deleteModalVisibility();
                }}
                onPublishedAdsDetails={() => {
                  props.onPublishedAdsDetails(item);
                }}
              />
            );
          }}
        />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: '#FAFAFA',
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
    transform: [{translateX: -(width * 0.4)}, {translateY: -90}],
    height: 140,
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
});

export default Published;

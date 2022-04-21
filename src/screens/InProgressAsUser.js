import React, { useEffect, useContext, useState } from 'react';
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
import { COLORS, IMAGES, DIMENSION } from '../assets';
const { height, width } = Dimensions.get('screen');
//COMMON COMPONENT
import {
  Button,
  Text,
  InProgressItemList,
  ProgressView,
  ProductsItemList,
} from '../components';
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';
import { APPContext } from '../context/AppProvider';
import Toast from 'react-native-simple-toast';

function InProgressAsUser(props) {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { user, imageBaseUrl, publishedProduct } = useContext(APPContext);
  const { getTranslation } = useContext(LocalizationContext);
  const [inProgressItem, setInProgressItem] = useState([]);

  useEffect(() => {
    //console.log('indexxxx ', props.subTabIndex + ' ' + props.tabStatus)
    if (props.tabStatus === 'inProgress') {
      getInProgressItemList('1,2,3,4,5');
    }else{
      getInProgressItemList('6');
    }
  }, []);

  const getInProgressItemList = async (status) => {
    setLoading(true);
    const result = await publishedProduct(user.user_id, status);
    setLoading(false);
    if (result.status == true) {
      if(result.data.length > 0){

      setInProgressItem([]);
      if (props.subTabIndex === 1) {
         setInProgressItem(result.data);
        //old native code logic
        //   for (Result adws : acceptedAdsList) {
        //     if (adws.getUserX().size()!=0 &&
        //             adws.getUserX().get(0) != null &&
        //             adws.getUserX().get(0).getUserId().equals(Constants.userDetails.getUserId())
        //             && !adws.getAdUserId().equals(Constants.userDetails.getUserId())) {
        //         u_AcceptsList.add(adws);


        //     }
        // }****************************
    
        let todos = [...inProgressItem]; 
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].user_x.length != 0
            &&
            result.data[i].user_x[0].user_id == user.user_id
          ) {
            todos.push(result.data[i])
          }
        }
        setInProgressItem(todos);
      } else if (props.subTabIndex === 2) {
        let todos = [...inProgressItem]; 
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].user_y.length != 0
            &&
            result.data[i].user_y[0].user_id == user.user_id
          ) {
            todos.push(result.data[i])
          }
        }
        setInProgressItem(todos);

      } else if (props.subTabIndex === 3) {
        // if (adws.getUserZ().size() != 0 &&
        // adws.getUserZ().get(0) != null &&
        // adws.getUserZ().get(0).getUserId().equals(Constants.userDetails.getUserId())
        //   && !Constants.userDetails.getUserId().equals(adws.getAdUserId())) {
        //       s_AcceptsList.add(adws);
        //   }

        let todos = [...inProgressItem]; 
        for (let i = 0; i < result.data.length; i++) {
          if (result.data[i].user_z.length != 0
            &&
            result.data[i].user_z[0].user_id == user.user_id
           // &&
            //result.data[i].user_id != user.user_id
          ) {
            todos.push(result.data[i])
          }
        }
        setInProgressItem(todos);

      }
        
    }else{
      //Toast.show('No record found');
    }
    } else {
      Toast.show(result.error);
      setInProgressItem([]);
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
          data={inProgressItem}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <InProgressItemList
                item={item}
                tabStatus={props.tabStatus}
                onSummary={() => {
                props.onSummary(item);
              }}
              onRating={() => {
                props.onRating(item);
              }}
              />
            );
          }}
        />
      </SafeAreaView>
      {isLoading ? <ProgressView></ProgressView> : null}
      <Modal
        animationType="slide"
        transparent
        visible={isDeleteModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={isDeleteModalVisible}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView1}>
            <Text
              style={{ alignSelf: 'center', marginTop: 15, marginHorizontal: 10 }}
              size="20"
              weight="500"
              align="left"
              color={COLORS.black}>
              {'Are you sure to delete this announcement'}
            </Text>

            <View
              style={{
                marginHorizontal: DIMENSION.marginHorizontal,
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // position: 'absolute',
              }}>
              <Button
                style={[
                  {
                    width: 90,
                    height: 41,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  },
                ]}
                title={'Yes'}
                onPress={() => {
                  // props.navigation.navigate('Market')
                }}
              />

              <Button
                style={[{ width: 90, height: 41, justifyContent: 'center' }]}
                title={'No'}
                onPress={() => {
                  deleteModalVisibility();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
    height: 140,
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
});

export default InProgressAsUser;

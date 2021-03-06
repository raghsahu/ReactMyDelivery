import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Modal,
  Dimensions,
} from 'react-native';

//ASSETS
import {COLORS, IMAGES, DIMENSION} from '../assets';
const {height, width} = Dimensions.get('screen');
//COMMON COMPONENT
import {Button, Header, Text, Input, IncompleteItemList} from '../components';
import {LocalizationContext} from '../context/LocalizationProvider';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'DescribeProduct.db'});

function Incomplete(props) {
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);
  const [productListItems, setProductListItems] = useState([]);
  const [deleteProductId, setDeleteProductId] = useState('');
  const {getTranslation} = useContext(LocalizationContext);

  useEffect(() => {
    getAllDbProducts();
  }, []);

  const getAllDbProducts = () =>{
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM table_product', [], (tx, results) => {
        var temp = [];
        //console.log('productListItems222 ', results.rows.item.length)
        if(results.rows.length > 0){
        // for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(0));
          // }
        }
        setProductListItems(temp);
      });
    });
  }

  const onDeleteProduct = () => {
    // db.transaction(tx => {
    //   tx.executeSql(
    //     'DELETE FROM table_product where product_id=?',
    //     [deleteProductId],
    //     (tx, results) => {
    //       try {
    //         // console.log('ResultsDelete', results.rowsAffected);
    //         setProductListItems(
    //           productListItems.filter(item => item.id === deleteProductId),
    //         );
    //         if (results.rowsAffected == 0) {
    //         }
    //       } catch (ex) {
    //         console.log(ex);
    //       }
    //     },
    //   );
    // });

    //***delete all table data */
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM table_product',
        (tx, results) => {
          try {
            getAllDbProducts()
            console.log('ResultsDelete', results.rowsAffected);
            //if (results.rowsAffected > 0) {
              setProductListItems([])
             // props.onDelete()
            //}
          } catch (ex) {
            console.log(ex)
          }

        },
      );
    });

    setProductListItems([])
  };

  const deleteModalVisibility = id => {
    setDeleteModalVisible(!isDeleteModalVisible);
    setDeleteProductId(id);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />

      <SafeAreaView style={styles.container}>
        {productListItems.length > 0 && productListItems!=null && productListItems!=undefined ?
        <FlatList
        showsVerticalScrollIndicator={false}
        data={productListItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <IncompleteItemList
              item={item}
              onDelete={() => {
                deleteModalVisibility(item.product_id);
              }}
              onModify={() => {
                props.onModify();
              }}
            />
          );
        }}
      />
      :
      null
        }
        
      </SafeAreaView>

      <Modal
        animationType="slide"
        transparent
        visible={isDeleteModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={isDeleteModalVisible}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView1}>
            <Text
              style={{alignSelf: 'center', marginTop: 15, marginHorizontal: 10}}
              size="20"
              weight="500"
              align="left"
              color={COLORS.black}>
              {getTranslation('are_you_sure_delete_ad')}
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
                  setDeleteModalVisible(!isDeleteModalVisible);
                  onDeleteProduct();
                }}
              />

              <Button
                style={[{width: 90, height: 41, justifyContent: 'center'}]}
                title={'No'}
                onPress={() => {
                  setDeleteModalVisible(!isDeleteModalVisible);
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
    backgroundColor: COLORS.lightGray,
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
    height: 120,
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
});

export default Incomplete;

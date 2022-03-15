import React, {useContext} from 'react';
import {View, Dimensions, Image, TouchableOpacity} from 'react-native';
const {height, width} = Dimensions.get('screen');
//ASSETS
import {COLORS, IMAGES} from '../assets';
//COMMON COMPONENT
import {Text, Button} from '../components';

const AsSenderItemList = props => {
  //const item = props.item;

  return (
     <TouchableOpacity
     onPress={() => {props.onSummary()}}
     >
    <View
      style={{
        padding: 5,
        margin: 5,
        backgroundColor: COLORS.white,
      }}
      >
      <View
        style={{
          flex: 1.0,
          // justifyContent: 'space-between',
          alignSelf: 'center',
          justifyContent: 'center',
          position: 'absolute',
          right: 0,
          marginTop: 5,
        }}>
     
        {props.onRating? 
          <Button
          style={[
            {
              width: 100,
              height: 29,
              borderRadius: 0,
              alignSelf: 'center',
              justifyContent: 'center',
              padding: 5,
              //backgroundColor: COLORS.primaryColor,
            },
          ]}
          title={'Rating'}
          //type={1}
          onPress={() => {props.onRating()}}
        />
        :
        null
    
        }
       
      </View>
          {/* <Button
          style={[
            {
             // width: 88,
              height: 29,
              borderRadius: 0,
              alignSelf: 'center',
              justifyContent: 'center',
              padding: 5,
              backgroundColor: COLORS.gray,
            },
          ]}
          title={'Evaluation done'}
          type={2}
          onPress={() => {props.onSummary()}}
        /> */}

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 20,
        }}>
        <Image
          style={{
            width: 70,
            height: 70,
            borderRadius: 35,
            margin: 5,
          }}
          source={IMAGES.circle_placeholder}
        />

        <View
          style={{
            margin: 5,
          }}>
          <Text style={{}} color={COLORS.black} size="18" weight="500">
            {'souris'}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 5,
            }}>
            <Image
              tintColor={COLORS.primaryColor}
              style={{
                width: 20,
                height: 20,
                //borderRadius: 35,
              }}
              source={IMAGES.location}
            />

            <Text
              style={{
                marginLeft: 5,
              }}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {'Constantine Constantine, Algerie '}
            </Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginLeft: 5,
        }}>
        <Text style={{}} color={COLORS.black} size="16" weight="600">
          {'Acceptance Limit:'}
        </Text>

        <Text
          style={{
            marginLeft: 10,
          }}
          color={COLORS.darkGray}
          size="16"
          weight="500">
          {'2021-11-07 14:42'}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginLeft: 5,
          marginTop: 5,
        }}>
        <Text style={{}} color={COLORS.black} size="16" weight="600">
          {'Delivery Limit:'}
        </Text>

        <Text
          style={{
            marginLeft: 10,
          }}
          color={COLORS.darkGray}
          size="16"
          weight="500">
          {'2021-11-07 14:42'}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          marginTop: 5,
          marginBottom: 5,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 5,
          }}>
          <Text style={{}} color={COLORS.black} size="16" weight="600">
            {'Price:'}
          </Text>

          <Text
            style={{
              marginLeft: 10,
            }}
            color={COLORS.primaryColor}
            size="16"
            weight="500">
            {'€6.00'}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginLeft: 5,
          }}>
          <Text style={{}} color={COLORS.black} size="16" weight="600">
            {'Deliveryman Commission:'}
          </Text>

          <Text
            style={{
              marginLeft: 10,
            }}
            color={COLORS.primaryColor}
            size="16"
            weight="500">
            {'€6.00'}
          </Text>
        </View>
      </View>
    </View>
     </TouchableOpacity>
  );
};

export default AsSenderItemList;

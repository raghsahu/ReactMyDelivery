import React, {useContext} from 'react';
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
const {height, width} = Dimensions.get('screen');
//ASSETS
import {COLORS, IMAGES} from '../assets';
//COMMON COMPONENT
import {Text, Button} from '../components';
//CONTEXT
import {LocalizationContext} from '../context/LocalizationProvider';

const AsSenderItemList = props => {
  //const item = props.item;
  const {getTranslation} = useContext(LocalizationContext);

  return (
    <TouchableOpacity
      onPress={() => {
        props.onSummary();
      }}>
      <View style={styles.mainView}>
        <View style={styles.buttonView}>
          {props.onRating ? (
            <Button
              style={[styles.button]}
              title={getTranslation('rating')}
              //type={1}
              onPress={() => {
                props.onRating();
              }}
            />
          ) : null}
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginTop: 20,
          }}>
          <Image style={styles.image} source={IMAGES.circle_placeholder} />

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

        <View style={styles.viewText}>
          <Text style={{}} color={COLORS.black} size="16" weight="600">
            {getTranslation('acceptance_limit')}
          </Text>

          <Text
            style={styles.text_right}
            color={COLORS.darkGray}
            size="16"
            weight="500">
            {'2021-11-07 14:42'}
          </Text>
        </View>

        <View style={[styles.viewText, {marginTop: 5}]}>
          <Text style={{}} color={COLORS.black} size="16" weight="600">
            {getTranslation('delivery_limit')}
          </Text>

          <Text
            style={styles.text_right}
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
          <View style={styles.viewText}>
            <Text style={{}} color={COLORS.black} size="16" weight="600">
              {getTranslation('price') + ' :'}
            </Text>

            <Text
              style={styles.text_right}
              color={COLORS.primaryColor}
              size="16"
              weight="500">
              {'€6.00'}
            </Text>
          </View>

          <View style={styles.viewText}>
            <Text style={{}} color={COLORS.black} size="16" weight="600">
              {getTranslation('deliveryman_commission') + ' :'}
            </Text>

            <Text
              style={styles.text_right}
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

const styles = StyleSheet.create({
  mainView: {
    padding: 5,
    margin: 5,
    backgroundColor: COLORS.white,
  },
  buttonView: {
    flex: 1.0,
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    marginTop: 5,
  },
  button: {
    width: 100,
    height: 29,
    borderRadius: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 5,
  },
  viewText: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  text_right: {
    marginLeft: 10,
  },
});

export default AsSenderItemList;

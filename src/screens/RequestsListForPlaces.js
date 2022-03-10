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
  FlatList
} from 'react-native';


//ASSETS
import { COLORS, IMAGES } from '../assets';

//COMMON COMPONENT
import { Button, Text, Input, Header, AdvertiseListItem } from '../components';

function RequestsListForPlaces(props) {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={COLORS.white} />

      <SafeAreaView style={styles.container}>
        <Header
          title={'Requests List'}
          onBack={() => {
            props.navigation.goBack();
          }}
        />
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>

          <View style={{ flex: 1, paddingVertical: 10, justifyContent: 'space-between', marginTop: 12, flexDirection: 'row' }}>
            <Text
              style={[styles.inputView, { alignSelf: 'center' }]}
              size="20"
              weight="500"
              align="center"
              color={COLORS.textColor2}>
              {'Filter By'}
            </Text>
            <TouchableOpacity style={[styles.inputView, { alignSelf: 'center' }]}>
              <ImageBackground source={IMAGES.rectangle_gray_border} resizeMode="cover" >
                <Image
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 35,
                    margin: 5,
                  }}
                  source={IMAGES.filterby}
                />
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <View style={[styles.inputView, { marginTop: 22, flex: 1, marginBottom: 30, }]}>
            <View style={{ justifyContent: 'space-evenly', flex: 1, flexDirection: 'row' }}>
              <TouchableOpacity style={{ borderRadius: 30, width: '33%', borderWidth: 1, borderColor: COLORS.borderColor, paddingVertical: 5, paddingHorizontal: 12 }}>
                <Text
                  style={{ textAlignVertical: "center" }}
                  size="10"
                  weight="500"
                  align="center"
                  color={COLORS.textColor3}>
                  {'Publication Date'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ borderRadius: 30, marginStart: 10, width: '33%', borderWidth: 1, borderColor: COLORS.borderColor, paddingVertical: 5, paddingHorizontal: 12 }}>
                <Text
                  style={{ textAlignVertical: "center" }}
                  size="10"
                  weight="500"
                  align="center"
                  color={COLORS.textColor3}>
                  {'Duration of Ad'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ borderRadius: 30, marginStart: 10, width: '33%', borderWidth: 1, borderColor: COLORS.borderColor, paddingVertical: 5, paddingHorizontal: 12 }}>
                <Text
                  style={{ textAlignVertical: "center" }}
                  size="10"
                  weight="500"
                  align="center"
                  color={COLORS.textColor3}>
                  {'User Rating'}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'space-evenly', flex: 1, flexDirection: 'row', marginTop: 12 }}>
              <TouchableOpacity
                style={{ justifyContent: 'center', borderRadius: 30, width: '33%', borderWidth: 1, borderColor: COLORS.borderColor, paddingVertical: 5, paddingHorizontal: 12 }}>
                <Text
                  style={{ textAlignVertical: "center" }}
                  size="10"
                  weight="500"
                  align="center"
                  color={COLORS.textColor3}>
                  {'Price'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ justifyContent: 'center', borderRadius: 30, marginStart: 10, width: '33%', borderWidth: 1, borderColor: COLORS.borderColor, paddingVertical: 5, paddingHorizontal: 12 }}>
                <Text
                  style={{ textAlignVertical: "center" }}
                  size="10"
                  weight="500"
                  align="center"
                  color={COLORS.textColor3}>
                  {'Limit Delivery Date'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ justifyContent: 'center', borderRadius: 30, marginStart: 10, width: '33%', borderWidth: 1, borderColor: COLORS.borderColor, paddingVertical: 5, paddingHorizontal: 12 }}>
                <Text
                  style={{ textAlignVertical: "center" }}
                  size="10"
                  weight="500"
                  align="center"
                  color={COLORS.textColor3}>
                  {'Commission'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ height: 5, backgroundColor: "#414141" }}></View>

          <View style={{ flex: 1, paddingVertical: 10, justifyContent: 'space-between', marginTop: 12, flexDirection: 'row' }}>
            <Text
              style={[styles.inputView, { alignSelf: 'center' }]}
              size="18"
              weight="500"
              align="center"
              color={COLORS.textColor2}>
              {'Advertise List'}
            </Text>
            <TouchableOpacity style={[styles.inputView, { alignSelf: 'center' }]}>
              <Text
                style={[{ alignSelf: 'center' }]}
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
            data={['', '', '', '', '']}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <AdvertiseListItem
                  mainViewStyle={[styles.inputView, { marginBottom: 20 }]}
                  onSummary={() => {
                    // navigation.navigate('SummaryTransaction')
                    props.navigation.navigate('AdSummaryDetails')
                        // props.onSummary()
                  }}

                />
              );
                      }}
          />

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLORS.white,
  },
  inputView: {
    marginHorizontal: 30,
  },
  inputContainer: {
    marginTop: 16,
  },
});

export default RequestsListForPlaces;

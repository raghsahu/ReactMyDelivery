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
  Dimensions,
} from 'react-native';

//ASSETS
import {COLORS, IMAGES, DIMENSION} from '../assets';

//COMMON COMPONENT
import {Button, Header, Text, Input, BottomBackground} from '../components';
const {height, width} = Dimensions.get('screen');

function SendSuggestion(props) {
  const {headerTitle} = props.route.params;
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={COLORS.primaryColor}
      />

      <SafeAreaView>
        <Header
          title={headerTitle}
          onBack={() => {
            props.navigation.goBack();
          }}
        />
      </SafeAreaView>

      <View style={styles.inputView}>
        <Input
          style={styles.input}
          // value={message}
          border={{borderColor: COLORS.gray, borderWidth: 1}}
          placeholder="Type a message"
          onChangeText={text => {
            //setMessage(text);
          }}
        />

        <TouchableOpacity
          onPress={() => {
            //sendMessages(message);
          }}>
          <View
            style={{
              backgroundColor: COLORS.primaryColor,
              height: 40,
              width: 40,
              borderRadius: 20,
              alignSelf: 'center',
              justifyContent: 'center',
              marginRight: 5,
            }}>
            <Image
              source={IMAGES.send}
              tintColor={COLORS.white}
              style={{
                height: 24,
                width: 24,
                alignSelf: 'center',
                justifyContent: 'center',
                resizeMode: 'contain',
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1.0,
    backgroundColor: COLORS.white,
  },
  inputView: {
    position: 'absolute',
    bottom: 0,
    marginBottom: 20,
    width: width,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  input: {
    width: width - 80,
    marginRight: 10,
  },
  back: {
    height: 24,
    width: 24,
    alignSelf: 'center',
  },
});

export default SendSuggestion;

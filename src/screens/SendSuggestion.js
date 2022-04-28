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
  Dimensions,
  TextInput,
} from 'react-native';

//ASSETS
import { COLORS, IMAGES, DIMENSION } from '../assets';

//COMMON COMPONENT
import { Header,ProgressView } from '../components';
const { height, width } = Dimensions.get('screen');
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';
import { APPContext } from '../context/AppProvider';
import Toast from 'react-native-simple-toast';

function SendSuggestion(props) {
  const { headerTitle} = props.route.params;
  const[message, setMessage] = useState('');
  const {user, SendSuggession} = useContext(APPContext);
  const [isLoading, setLoading] = useState(false);

  const sendMessages = async () => {
    if(!message){
      Toast.show('Please enter message')
    }else{
      setLoading(true);
      // sugsn_type
      // * 1 - Suggestion, 2 - Complaint
      const result = await SendSuggession(user.user_id, '1', message);
      setLoading(false);
      if (result.status == true) {
        setMessage('')
        //setNotifications(result.data);
      } else {
        Toast.show(result.error);
      }
    }

  }

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
     
         <View style={{borderColor: COLORS.gray, borderWidth: 1, borderRadius: 24, marginEnd: 5, backgroundColor: COLORS.lightGray,}}>
         <TextInput
          style={[styles.input]}
          //placeholderTextColor={COLORS.placeHolderTextColor}
          placeholder="Type a message"
          multiline={true}
          border={{borderColor: COLORS.gray, borderWidth: 1}}
          autoCapitalize="none"
          autoCorrect={false}
          //onContentSizeChange={e => setHeight(e.nativeEvent.contentSize.height)}
          onChangeText={text => {
            setMessage(text);
          }}
        />
        </View>

        <TouchableOpacity
          onPress={() => {
            sendMessages();
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
      {isLoading ? <ProgressView></ProgressView> : null}
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
    flex: 1.0,
    fontFamily: 'Poppins-Regular',
    fontWeight: '400',
    fontSize: 16,
    color: COLORS.black,
  },
  back: {
    height: 24,
    width: 24,
    alignSelf: 'center',
  },
});

export default SendSuggestion;

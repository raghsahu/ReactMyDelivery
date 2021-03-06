import React, { useEffect, useContext, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  BackHandler,
} from 'react-native';

//ASSETS
import { COLORS, IMAGES, DIMENSION } from '../assets';

//COMMON COMPONENT
import { Header, } from '../components';
const { height, width } = Dimensions.get('screen');
import { GiftedChat } from 'react-native-gifted-chat'
import firestore from '@react-native-firebase/firestore'
import moment from 'moment'; // date format
//CONTEXT
import { LocalizationContext } from '../context/LocalizationProvider';
import { APPContext } from '../context/AppProvider';

function ChatScreen(props) {
  const { headerTitle, chatRoomId ,finalNodeId, ad_id, recieverId,fcmKey, prodName } = props.route.params;
  const [messages, setMessages] = useState([]);
  const {user, sendNotification} = useContext(APPContext);

  useEffect(() => {
    //console.log('use_efffeeee '+ chatRoomId + ' '+ finalNodeId)
    const unsubscribeListener = firestore()
      .collection('MESSAGES')
      .doc(chatRoomId)
      .collection(finalNodeId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data()

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData
          }

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.displayName
            }
          }

          return data
        })

        setMessages(messages)
      })

    return () => unsubscribeListener()
  }, [props])

  useEffect(() =>{
    function handleBackButton() {
      backAction();
      return true;
  }
  const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
  return () => backHandler.remove();
  }, []);
  
  const backAction = () => {
    props.navigation.goBack();
   };

  async function handleSend(newMessage = []) {
    const text = newMessage[0].text
    setMessages(GiftedChat.append(messages, newMessage))

    firestore()
      .collection('MESSAGES')
      .doc(chatRoomId)
      .collection(finalNodeId)
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: user.user_id,
          displayName: user.user_f_name + ' ' + user.user_l_name
        }
      }).then(docRef => {
        sendChatNotification(text);
      })
  }

  const sendChatNotification = async (text) => {
    const noti_create_date = new Date(moment(new Date()).format('YYYY-MM-DD'));
    const result = await sendNotification(Date.now(), '111', noti_create_date, ad_id, user.user_f_name, user.user_l_name, prodName, chatRoomId, user.user_id, recieverId, text, finalNodeId, fcmKey);
    if (result.status == true) {
    

    } else {
      //Toast.show(result.error);
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
            backAction();
          }}
        />
      </SafeAreaView>
      <GiftedChat
        messages={messages}
        onSend={newMessage => handleSend(newMessage)}
        user={{
          _id: user.user_id
        }}
      />

      {/* <View style={styles.inputView}>
     
         <View style={{borderColor: COLORS.gray, borderWidth: 1, borderRadius: 24, marginEnd: 5, backgroundColor: COLORS.lightGray,}}>
         <TextInput
          style={[styles.input]}
          //placeholderTextColor={COLORS.placeHolderTextColor}
          placeholder="Type a message"
          multiline={true}
          border={{borderColor: COLORS.gray, borderWidth: 1}}
          autoCapitalize="none"
          autoCorrect={false}
          onContentSizeChange={e => setHeight(e.nativeEvent.contentSize.height)}
          onChangeText={text => {
            //setMessage(text);
          }}
        />
        </View>

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
      </View>  */}
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

export default ChatScreen;

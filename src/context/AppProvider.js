import React, {createContext, useEffect, useState, useContext} from 'react';

//PACKAGES
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import PayPal from 'react-native-paypal-wrapper';
import Toast from 'react-native-simple-toast';
import {changeLocalToUTCTime, changeLocalToUTC } from '../context/CommonUtils';

export const APPContext = createContext();

export const AppProvider = props => {
  const [user, setUser] = useState(null);
  const [fcmToken, setFcmToken] = useState('');

  // mydelivery.sairoses.com
  const googleApiKey = 'AIzaSyATKEYAS_f81eZDlSscXARKanQd-rMYBBI';
  //const paypalClientId = 'ATl0Dqkds4_r6fr-FJf5Fh5gskgjUguhiiWI4TMbDPT3JRoEufwUdrLtj-f-7Xw4n4du5Jruvvpez-xm'; // other testing purpose
  const paypalClientId = 'Aa_Nr3jhlflL2vPjcLk85rgNnkk1jhcJKn6xUF1DkBHm6nPCNGqk82-AakrVdKEuN8JQuhFqVQjhCOGC'; //sandbox client credential
  const baseURL = 'http://mydelivery.prometteur.in/backend/API/';
  const imageBaseUrl = 'http://mydelivery.prometteur.in/backend/application/webroot/';

  const webServices = {
    login: baseURL + 'mLogin',
    register: baseURL + 'madd/register',
    verification_update: baseURL + 'madd/verification_update',
    verification: baseURL + 'verification',
    check_user: baseURL + 'fields/check_user',
    mForgot: baseURL + 'mForgot',
    reset_password: baseURL + 'reset_password',
    delUser: baseURL + 'deluser',
    userUpdate: baseURL + 'madd/user',
    notifications: baseURL + 'fields/notifications',
    addProduct: baseURL + 'madd/product',
    upload_imgs: baseURL + 'upload_imgs',
    ads_by_status: baseURL + 'fields/ads_by_status',
    getProductFilter: baseURL + 'fields/product',
    ad_accept: baseURL + 'madd/ad_accept',
    change_date_time: baseURL + 'madd/change_date_time',
    change_request: baseURL + 'madd/change_request',
    del_ads: baseURL + 'del/ads_by_status',
    rating: baseURL + 'madd/rating',
    check_code: baseURL + 'fields/check_code',
    sendNotification: baseURL + 'send_notification',
    sendSuggession: baseURL + 'madd/suggession',
    getSuggession: baseURL + 'fields/suggession',
    acceptNoti: baseURL + 'madd/notifications',
    new_old_parms: baseURL + 'fields/new_old_parms',
    del_notification: baseURL + 'del/notifications',
  };

  const oneTimePayment = async (amount) => {
    // 3 env available: NO_NETWORK, SANDBOX, PRODUCTION
      PayPal.initialize(PayPal.NO_NETWORK, paypalClientId);
      const result=   PayPal.pay({
          price: amount,
          currency: 'EUR',
          description: 'Product Ads Payment',
        })
        // .then(confirm => {
        //   console.log("PaymentResponse: ", confirm)
        //   return confirm ;
        // }).catch(error => {
        //     Toast.show(error)
        //     console.log("PaymentError: ",error)
        // });
        
        return result;
        //result=== {"client": {"environment": "mock", "paypal_sdk_version": "2.15.1", "platform": "Android", "product_name": "PayPal-Android-SDK"}, 
        // "response": {"create_time": "2014-07-18T18:46:55Z", "id": "PAY-18X32451H0459092JKO7KFUI", "intent": "sale", "state": "approved"},
        //  "response_type": "payment"}
    }

  const getLogin = async (email, pw, user_fcm_key) => {
    let params = {
      user_name: email,
      user_password: pw,
      user_fcm_key, user_fcm_key,
    };

    return await request(webServices.login, 'post', params);
  };

  const verification_update = async (email, otp, mobile) => {
    let params = {
      user_mb_no: mobile,
      user_email: email,
      user_otp: otp,
    };

    return await request(webServices.verification_update, 'post', params);
  };

  const verification = async (email, mobile) => {
    let params ;
    if(email){
       params = {
       // user_mb_no: mobile,
         user_email: email,
      };
    }else{
       params = {
        user_mb_no: mobile,
       // user_email: email,
      };
    }
    return await request(webServices.verification, 'post', params);
  };

  const check_user = async (email) => {
    let params = {
      //user_mb_no: mobile,
      user_email: email,
    };

    return await request(webServices.check_user, 'post', params);
  };

  const mForgot = async (emailMobile, isMobile) => {
    let params;
    if (isMobile) {
      params = {
        user_mb_no: emailMobile,
      };
    } else {
      params = {
        user_email: emailMobile,
      };
    }
    return await request(webServices.mForgot, 'post', params);
  };

  const reset_password = async (user_id, otp, password) => {
    let params = {
      user_id: user_id,
      user_otp: otp,
      user_password: password,
    };

    return await request(webServices.reset_password, 'post', params);
  };

  const delUser = async user_id => {
    let params = {
      user_id: user_id,
    };
    return await request(webServices.delUser, 'post', params);
  };

  const getNotifications = async user_id => {
    let params = {
      user_id: user_id,
    };
    return await request(webServices.notifications, 'post', params);
  };

  const add_Product = async (product_data, ad_user_id, ad_cmsn_price, ad_cmsn_delivery, placeOfDelivery, ad_gender, ad_accept_limit, ad_delivery_limit,
    ad_type, ad_pay_status, ad_pay_amount, ad_pay_info, ad_lat, ad_lon) => {
    let params = {
      product_data: product_data,
      ad_user_id: ad_user_id,
      ad_cmsn_price: ad_cmsn_price,
      ad_cmsn_delivery: ad_cmsn_delivery,
      ad_delv_addr: placeOfDelivery,
      ad_gender: ad_gender,
      ad_accept_limit: ad_accept_limit,
      ad_delivery_limit: ad_delivery_limit,
      ad_type: ad_type,
      ad_pay_status: ad_pay_status,
      ad_pay_amount: ad_pay_amount,
      ad_pay_info: ad_pay_info,
      ad_lat: ad_lat,
      ad_lon: ad_lon,
    };

    return await request(webServices.addProduct, 'post', params);
  };

  const change_request = async (loggedin_user_id, product_data, ad_id, ad_cmsn_price, ad_cmsn_delivery, ad_gender, ad_accept_limit, ad_delivery_limit,
    ad_type, ad_pay_status, ad_pay_amount, ad_pay_info, ad_why_this_change) => {
    let params = {
      loggedin_user_id: loggedin_user_id,
      product_data: product_data,
      ad_id: ad_id,
      ad_cmsn_price: ad_cmsn_price,
      ad_cmsn_delivery: ad_cmsn_delivery,
      ad_gender: ad_gender,
      ad_accept_limit: ad_accept_limit,
      ad_delivery_limit: ad_delivery_limit,
      ad_type: ad_type,
      ad_pay_status: ad_pay_status,
      ad_pay_amount: ad_pay_amount,
      ad_pay_info: ad_pay_info,
      ad_why_this_change: ad_why_this_change,
    };

    return await request(webServices.change_request, 'post', params);
  };

  const publishedProduct = async (user_id, ad_status) => {
    let params = {
      ad_user_id: user_id,
      ad_status: ad_status,
    };
    return await request(webServices.ads_by_status, 'post', params);
  };

  const getFilterProduct = async ( max_price, min_price,max_cmsn,min_cmsn,last_delv_date,user_lat, user_lon ) => {
    let params = {
      max_price: max_price,
      min_price: min_price,
      max_cmsn: max_cmsn,
      min_cmsn: min_cmsn,
     // last_delv_date: last_delv_date,
      user_lat: user_lat,
      user_lon: user_lon,
 
    };
    return await request(webServices.getProductFilter, 'post', params);
  };

  const getAdAccept = async (user_id, ad_id,selectDate, selectTime, ad_accept_type, acpt_pay_status,acpt_pay_amount,acpt_pay_info ) => {
    let params = {
      loggedin_user_id: user_id,
      acpt_user_id: user_id,
      acpt_ad_id: ad_id,
      acpt_date: selectDate,
      acpt_time: changeLocalToUTCTime(selectDate + ' ' + selectTime),
      acpt_pay_status: acpt_pay_status,
      acpt_pay_amount: acpt_pay_amount,
      acpt_pay_info: acpt_pay_info,
      acpt_type: ad_accept_type, 
    };
    return await request(webServices.ad_accept, 'post', params);
  };
  const putDateTimeChangeRequest = async (loggedin_user_id, ad_id,selectDate, selectTime ) => {
    let params = {
      loggedin_user_id: loggedin_user_id,
      ad_id: ad_id,
      change_date: selectDate,
      change_time: changeLocalToUTCTime(selectDate + ' ' + selectTime),
    };
    return await request(webServices.change_date_time, 'post', params);
  };

  const del_ads = async (ad_id) => {
    let params = {
      delete : ad_id,

    };
    return await request(webServices.del_ads, 'post', params);
  };

  const putRating = async (rate_user_id, rate_rating, rate_comment, rate_ad_id, ratingForApp, commentForApp) => {
    let params = {
      rate_user_id : rate_user_id,
      rate_create_by: rate_user_id,
      rate_rating: rate_rating,
      rate_comment: rate_comment,
      app_rating: ratingForApp,
      app_comment: commentForApp,
      rate_ad_id: rate_ad_id

    };
    return await request(webServices.rating, 'post', params);
  };
  const check_code = async (user_id, acpt_ad_id, acpt_code, acpt_type) => {
    let params = {
      loggedin_user_id: user_id,
      acpt_ad_id : acpt_ad_id,
      acpt_code: acpt_code,
      acpt_type: acpt_type,

    };
    return await request(webServices.check_code, 'post', params);
  };

  const sendNotification = async (notn_id, notn_type, notn_create_date, ad_id,user_f_name, user_l_name , prod_name, senderIMG,senderID, receiverID,massage,nodeID, user_fcm_key) => {
    let params = {
      notn_id : notn_id,
      notn_type: notn_type,
      notn_create_date: notn_create_date,
      ad_id: ad_id,
      user_f_name: user_f_name,
      user_l_name: user_l_name,
      prod_name: prod_name,
      senderIMG: senderIMG, // I have sent firestore Doc Id
      senderID: senderID,
      receiverID: receiverID,
      massage: massage,
      nodeID: nodeID,
      user_fcm_key: user_fcm_key,

    };
    return await request(webServices.sendNotification, 'post', params);
  };

  const getProducts = async (ad_id) => {
    let params = {
      ad_id : ad_id,

    };
    return await request(webServices.getProductFilter, 'post', params);
  };

  
  const SendSuggession = async (sugsn_user_id, sugsn_type, sugsn_message) => {
    let params = {
      sugsn_user_id : sugsn_user_id,
      sugsn_type: sugsn_type,
      sugsn_message: sugsn_message,
    };
    return await request(webServices.sendSuggession, 'post', params);
  };

  const getSuggession = async (sugsn_user_id) => {
    let params = {
      sugsn_user_id : sugsn_user_id,
    };
    return await request(webServices.getSuggession, 'post', params);
  };

  const notiAcceptRefuseRequest = async (notn_id, notn_acept_rejct) => {
    let params = {
      notn_id : notn_id,
      notn_acept_rejct : notn_acept_rejct,
    };
    return await request(webServices.acceptNoti, 'post', params);
  };

  const getNewOldProductData = async (ads_id) => {
    let params = {
      ad_id : ads_id,
    };
    return await request(webServices.new_old_parms, 'post', params);
  };

  const notiDeleted = async (noti_id) => {
    //let deleted_id = '[' + noti_id + ']'
    let params = {
      //delete_id : noti_id, // noti inactive 
      delete : noti_id
    };
    return await request(webServices.del_notification, 'post', params);
  };

  const request = async (url, method, params) => {
    try {
      console.log('===================');
      console.log('URL: ', url);
      console.log('METHOD: ', method);
      console.log('headers: user_session: ', user ? user.user_session : '');
      console.log('headers: user_id: ', user ? user.user_id : '');
      console.log('PARAMS: ', params);
      console.log('===================');

      if (method == 'get') {
        const response = await axios.get(url, {
          params: params,
          headers: {
            //'Authorization': user ? `Bearer ${user.user_session}` : ''
            user_session: user ? user.user_session : '',
            user_id: user ? user.user_id : '',
          },
          
        });

        return getResponse(response);
      } else if (method == 'put') {
        const response = await axios.put(url, params, {
          headers: {
            //'Authorization': user ? `Bearer ${user.user_session}` : ''
            user_session: user ? user.user_session : '',
            user_id: user ? user.user_id : '',
          },
        });

        return getResponse(response);
      } else if (method == 'post') {
        var response = await axios.post(url, params, {
          headers: {
            //'Authorization': user ? `Bearer ${user.user_session}` : ''
            user_session: user ? user.user_session : '',
            user_id: user ? user.user_id : '',
          },
        });

        return getResponse(response);
      } else {
        var response = await axios({
          method: method,
          url: url,
          data: params,
          headers: {
            //'Authorization': user ? `Bearer ${user.user_session}` : ''
            user_session: user ? user.user_session : '',
            user_id: user ? user.user_id : '',
          },
        });

        return getResponse(response);
      }
    } catch (e) {
      console.log(e);
      return getError(e);
      //return 'Something went wrong'
    }
  };

  const getResponse = response => {
    console.log(JSON.stringify(response.data));

    if (response.data && response.data.status == 0) {
      let result = {
        status: false,
        data: response.data.result,
        error: response.data.msg,
      };
      return result;
    } else {
      let data = response.data;
      if (data && data.status == 1) {
        let result = {
          status: true,
          data: data.result,
          error: data.msg,
        };
        return result;
      } else if (data && (data.status == '401' || data.status == '400')) {
        // clearDatabase();
        let result = {
          status: false,
          data: data,
          error: data.msg,
        };
        return result;
      } else {
        let result = {
          status: false,
          data: '',
          error: data.msg,
        };
        return result;
      }
    }
  };

  async function clearDatabase() {
    AsyncStorage.clear();
  }

  const getError = error => {
    console.log('ERROR========>', JSON.stringify(error));
    var message = '';
    if (error.response) {
      if (error.response.data) {
        console.log(error.response.data);
        if (error.response.data.msg) {
          message = error.response.data.msg;
        } else {
          message = JSON.stringify(error.response.data);
        }
      } else {
        console.log(error.response);
        message = 'Something went wrong';
      }
    } else {
      console.log(error);
      if (error.message === 'Network Error') {
        message = 'No internet connection';
      } else {
        message = error.message;
      }
    }

    let data = {
      status: false,
      result: null,
      error: message,
    };
    return data;
  };

  return (
    <APPContext.Provider
      value={{
        imageBaseUrl,
        webServices,
        oneTimePayment,
        getError,
        setUser,
        user,
        fcmToken,
        setFcmToken,
        googleApiKey,
        baseURL,
        getLogin,
        verification_update,
        verification,
        check_user,
        mForgot,
        reset_password,
        delUser,
        getNotifications,
        add_Product,
        publishedProduct,
        getFilterProduct,
        getAdAccept,
        putDateTimeChangeRequest,
        change_request,
        del_ads,
        putRating,
        check_code,
        sendNotification,
        getProducts,
        SendSuggession,
        getSuggession,
        notiAcceptRefuseRequest,
        getNewOldProductData,
        notiDeleted,
      }}>
      {props.children}
    </APPContext.Provider>
  );
};

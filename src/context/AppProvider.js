import React, {createContext, useEffect, useState, useContext} from 'react';

//PACKAGES
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

export const APPContext = createContext();

export const AppProvider = props => {
  const [user, setUser] = useState(null);
  const [fcmToken, setFcmToken] = useState('');

  // mydelivery.sairoses.com
  const googleApiKey = 'AIzaSyATKEYAS_f81eZDlSscXARKanQd-rMYBBI';
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
  };

  const getLogin = async (email, pw) => {
    let params = {
      user_name: email,
      user_password: pw,
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
      acpt_user_id: user_id,
      acpt_ad_id: ad_id,
      acpt_date: selectDate,
      acpt_time: selectTime,
      acpt_pay_status: acpt_pay_status,
      acpt_pay_amount: acpt_pay_amount,
      acpt_pay_info: acpt_pay_info,
      acpt_type: ad_accept_type, 
    };
    return await request(webServices.ad_accept, 'post', params);
  };
  const putDateTimeChangeRequest = async (ad_id,selectDate, selectTime ) => {
    let params = {
      ad_id: ad_id,
      change_date: selectDate,
      change_time: selectTime,
    };
    return await request(webServices.change_date_time, 'post', params);
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
          //subscription: data && data.subscription ? data.subscription : null,
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
      }}>
      {props.children}
    </APPContext.Provider>
  );
};

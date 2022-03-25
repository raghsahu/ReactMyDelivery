import React, {createContext, useEffect, useState, useContext} from 'react';

//PACKAGES
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

export const APPContext = createContext();

export const AppProvider = props => {
  // mydelivery.sairoses.com
  const baseURL = 'http://mydelivery.prometteur.in/backend/API/';

  const webServices = {
    login: baseURL + 'mLogin',
    register: baseURL + 'madd/register',
  };

  const getLogin = async (email, pw) => {
    let params = {
      user_name: email,
      user_password: pw,
    };

    return await request(webServices.login, 'post', params);
  };

  const getRegister = async (user_f_name, user_l_name, user_name, user_gender, user_dob, user_email, user_mb_no,user_addr,
    user_city, user_country,user_language,user_password, user_lat, user_lon,user_img, user_fcm_key ) => {
    let params = {
      user_f_name: user_f_name,
      user_m_name: user_l_name,
      user_l_name: user_l_name,
      user_name: user_name,
      user_gender: user_gender,
      user_dob: user_dob,
      user_email: user_email,
      user_mb_no: user_mb_no,
      user_addr: user_addr,
      user_city: user_city,
      user_country: user_country,
      user_language: user_language,
      user_password: user_password,
      user_lat: user_lat,
      user_lon: user_lon,
      user_img: user_img,
       // user_img ? {
      //   uri: user_img,
      //   name:'userProfile.jpg',
      //   type:'image/jpg'
      // } : '',
      user_fcm_key: user_fcm_key,
    };
    // const formData = new FormData();
    // formData.append('user_f_name', user_f_name);
    // formData.append('user_m_name', user_l_name);
    // formData.append('user_l_name', user_l_name);
    // formData.append('user_name', user_name);
    // formData.append('user_gender', user_gender);
    // formData.append('user_dob', user_dob);
    // formData.append('user_email', user_email);
    // formData.append('user_mb_no', user_mb_no);
    // formData.append('user_addr', user_addr);
    // formData.append('user_city', user_city);
    // formData.append('user_country', user_country);
    // formData.append('user_language', user_language);
    // formData.append('user_password', user_password);
    // formData.append('user_lat', user_lat);
    // formData.append('user_lon', user_lon);
    // formData.append(
    //   'user_img',
    //   user_img
    //     ? {
    //         uri:
    //           Platform.OS === 'android'
    //             ? user_img.uri
    //             : user_img.uri.replace('file://', ''),
    //         name: 'userProfile.jpg',
    //         type: 'image/jpg',
    //       }
    //     : '',
    // );
    // formData.append('user_fcm_key', user_fcm_key);

    return await request(webServices.register, 'post', params);
  };

  const request = async (url, method, params) => {
    try {
      console.log('===================');
      console.log('URL: ', url);
      console.log('METHOD: ', method);
      console.log('PARAMS: ', params);
      // console.log('Authorization', (user ? `Bearer ${user.access_token}` : ''))
      console.log('===================');

      if (method == 'get') {
        const response = await axios.get(url, {
          params: params,
          // headers: {
          //     'Authorization': user ? `Bearer ${user.access_token}` : ''
          // },
        });

        return getResponse(response);
      } else if (method == 'put') {
        const response = await axios.put(
          url,
          params,
          // {
          // headers: {
          //     'Authorization': user ? `Bearer ${user.access_token}` : ''
          // },
          // }
        );

        return getResponse(response);
      } else {
        var response = await axios({
          method: method,
          url: url,
          data: params,
          // headers: {
          //     'Authorization': user ? `Bearer ${user.access_token}` : ''
          // },
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
      }else if (data && (data.status == '401' || data.status == '400')) {
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
        baseURL,
        getLogin,
        getRegister,
      }}>
      {props.children}
    </APPContext.Provider>
  );
};

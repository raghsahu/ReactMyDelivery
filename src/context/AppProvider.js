import React, {createContext, useEffect, useState, useContext} from 'react';

//PACKAGES
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import moment from 'moment'; // date format

export const APPContext = createContext();

export const AppProvider = props => {

  const [user, setUser] = useState(null);

  const changeDateFormat = (date, format) => {
    return moment(date).format(format);
  };

  const checkSpecialChar = (string) => {
    var format = /[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
    if(format.test(string)){
      return true;
    } else{
      return false;
    }
   
  }

  // mydelivery.sairoses.com
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
  };

  const getLogin = async (email, pw) => {
    let params = {
      user_name: email,
      user_password: pw,
    };

    return await request(webServices.login, 'post', params);
  };

  const getRegister = async (
    user_f_name,
    user_l_name,
    user_name,
    user_gender,
    user_dob,
    user_email,
    user_mb_no,
    user_addr,
    user_city,
    user_country,
    user_language,
    user_password,
    user_lat,
    user_lon,
    user_img,
    user_fcm_key,
  ) => {
    let params = {
      user_f_name: user_f_name,
      user_m_name: '',
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

  const userUpdate = async (
    user_id,
    user_f_name,
    user_l_name,
    user_name,
    user_gender,
    user_dob,
    user_email,
    user_mb_no,
    user_addr,
    user_city,
    user_country,
    user_language,
    user_password,
    user_lat,
    user_lon,
    user_img,
    user_fcm_key,
  ) => {
    // let params = {
    //   user_id: user_id,
    //   user_f_name: user_f_name,
    //   user_m_name: '',
    //   user_l_name: user_l_name,
    //   user_name: user_name,
    //   user_gender: user_gender,
    //   user_dob: user_dob,
    //   user_email: user_email,
    //   user_mb_no: user_mb_no,
    //   user_addr: user_addr,
    //   user_city: user_city,
    //   user_country: user_country,
    //   user_language: user_language,
    //   user_password: user_password,
    //   user_lat: user_lat,
    //   user_lon: user_lon,
    //   user_img: user_img,
    //   user_fcm_key: user_fcm_key,
    //   // user_img: user_img ? {
    //   //   uri: user_img,
    //   //   name:'userProfile.jpg',
    //   //   type:'image/jpg'
    //   // } : '',
    // };
    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('user_f_name', user_f_name);
    formData.append('user_m_name', user_l_name);
    formData.append('user_l_name', user_l_name);
    formData.append('user_name', user_name);
    formData.append('user_gender', user_gender);
    formData.append('user_dob', user_dob);
    formData.append('user_email', user_email);
    formData.append('user_mb_no', user_mb_no);
    formData.append('user_addr', user_addr);
    formData.append('user_city', user_city);
    formData.append('user_country', user_country);
    formData.append('user_language', user_language);
    formData.append('user_password', user_password);
    formData.append('user_lat', user_lat);
    formData.append('user_lon', user_lon);
    formData.append(
      'user_img',
      user_img
        ? {
            uri:
              Platform.OS === 'android'
                ? user_img
                : user_img.replace('file://', ''),
            name: 'userProfile.jpg',
            type: 'image/jpg',
          }
        : '',
    );
    formData.append('user_fcm_key', user_fcm_key);

    return await requestMultipart(webServices.userUpdate, 'post', formData);
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
    let params = {
        user_mb_no: mobile,
        user_email: email,  
    };

    return await request(webServices.verification, 'post', params);
  };

  const check_user = async (email, mobile) => {
    let params = {
        user_mb_no: mobile,
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
    }else{
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

  const delUser = async (user_id) => {
    let params = {
      user_id: user_id,
    };
    return await request(webServices.delUser, 'post', params);
  };

  
  const getNotifications = async (user_id) => {
    let params = {
      user_id: user_id,
    };
    return await request(webServices.notifications, 'post', params);
  };

  const request = async (url, method, params) => {
    try {
      console.log('===================');
      console.log('URL: ', url);
      console.log('METHOD: ', method);
      console.log('PARAMS: ', params);
      //console.log('Authorization', (user ? `Bearer ${user.user_session}` : ''))
      console.log('===================');

      if (method == 'get') {
        const response = await axios.get(url, {
          params: params,
          headers: {
              'Authorization': user ? `Bearer ${user.user_session}` : ''
          },
        });

        return getResponse(response);
      } else if (method == 'put') {
        const response = await axios.put(
          url,
          params,
          {
          headers: {
              'Authorization': user ? `Bearer ${user.user_session}` : ''
          },
          }
        );

        return getResponse(response);
      } else if (method == 'post') {
        var response = await axios.post(
           url,
           params,
          // headers: {
          //     'Authorization': user ? `Bearer ${user.user_session}` : ''
          // },
        );

        return getResponse(response);
      } else {
        var response = await axios({
          method: method,
          url: url,
          data: params,
          // headers: {
          //     'Authorization': user ? `Bearer ${user.user_session}` : ''
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

  const requestMultipart = async (url, method, params) => {
    try {
      console.log('===================');
      console.log('URL: ', url);
      console.log('METHOD: ', method);
      console.log('PARAMS: ', params);
      //console.log('Authorization', (user ? `Bearer ${user.user_session}` : ''))
      console.log('===================');
      
      const options = {
        method: 'POST',
        body: params,
        // If you add this, upload won't work
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // }
      };
      var response = fetch(url, options)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('aaaaa '+ JSON.stringify(data));
        //if (data && data.status == 1) {
          let result = {
            status: true,
            data: data.result,
            error: data.msg,
          };
          return result;
        //}
      });
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
        changeDateFormat,
        checkSpecialChar,
        imageBaseUrl,
        webServices,
        setUser,
        user,
        baseURL,
        getLogin,
        getRegister,
        verification_update,
        verification,
        check_user,
        mForgot,
        reset_password,
        delUser,
        userUpdate,
        getNotifications,
      }}>
      {props.children}
    </APPContext.Provider>
  );
};

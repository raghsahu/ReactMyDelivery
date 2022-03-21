import React, {createContext, useEffect, useState, useContext} from 'react';

//PACKAGES
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

export const APPContext = createContext();

export const AppProvider = props => {
  const baseURL = 'http://mydelivery.sairoses.com/backend/API/';

  const webServices = {
    login: baseURL + 'mLogin',
  };

  const getProducts = async (sort, order, page, perPage) => {
    let url =
      baseURL +
      '&' +
      'sort=' +
      sort +
      '&' +
      'order=' +
      order +
      '&' +
      'page=' +
      page +
      '&' +
      'per_page=' +
      perPage;
    return await request(url, 'get', {});
  };

  const getLogin = async (email, pw) => {
    let params = {
      user_name: email,
      user_password: pw,
    };

    return await request(webServices.login, 'post', params);
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

    if (response.data && response.data.success == false) {
      let result = {
        status: false,
        data: response.data.message,
        error: response.data.message,
      };
      return result;
    } else {
      let data = response.data;
      if (data && data.status == '200') {
        let result = {
          status: true,
          data: data.data,
          subscription: data && data.subscription ? data.subscription : null,
          error: data.message,
        };
        return result;
      } else if (data && data.status == 'OK') {
        let result = {
          status: true,
          data: data.data,
          subscription: data && data.subscription ? data.subscription : null,
          error: data.message,
        };
        return result;
      } else if (data && (data.status == '401' || data.status == '400')) {
        clearDatabase();
        let result = {
          status: false,
          data: data,
          error: data.message,
        };
        return result;
      } else {
        let result = {
          status: false,
          data: '',
          error: data.message,
        };
        return result;
      }
    }
  };

  async function clearDatabase() {
    const email = await AsyncStorage.getItem('apple_email_first_time');
    const givenName = await AsyncStorage.getItem('apple_givenName_first_time');
    const familyName = await AsyncStorage.getItem(
      'apple_familyName_first_time',
    );

    AsyncStorage.clear();

    AsyncStorage.setItem('apple_email_first_time', email);
    AsyncStorage.setItem('apple_givenName_first_time', givenName);
    AsyncStorage.setItem('apple_familyName_first_time', familyName);
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
      }}>
      {props.children}
    </APPContext.Provider>
  );
};

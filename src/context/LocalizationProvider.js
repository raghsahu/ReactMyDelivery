import React, {createContext, useState, useEffect} from 'react';

import I18n from 'i18n-js';
import {memoize} from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LocalizationContext = createContext();

export const LocalizationProvider = props => {
  const [currentLanguage, setLanguage] = useState('');

  const translationGetters = {
    en: () => require('../localize/en.json'),
    fr: () => require('../localize/fr.json'),
    sp: () => require('../localize/sp.json'),
  };

  const translate = memoize(
    (key, config) => I18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key),
  );

  const setI18nConfig = language => {
    I18n.translations = {[language]: translationGetters[language]()};
    I18n.locale = language;
  };

  const getTranslation = text => {
    return translate(text);
  };

  const getLanguageName = language => {
    if (language == 'en') {
      return 'English';
    } else if (language == 'fr') {
      return 'French';
    } else if (language == 'sp') {
      return 'Spanish';
    }
  };

  const optionsLanguage = [
    {
      key: '1',
      label: 'English',
      value: 'en',
    },
    {
      key: '2',
      label: 'French',
      value: 'fr',
    },
    {
      key: '3',
      label: 'Spanish',
      value: 'sp',
    },
  ];

  const getUserLanguage = callback => {
    AsyncStorage.getItem('user_current_selected_language', (error, result) => {
      let lan = result ? result : 'en';
      global.language = lan;
      global.languageName = getLanguageName(lan);
      setLanguage(lan);
      callback(lan);
    });
  };

  const saveUserLanguage = language => {
    global.language = getLanguageName(language);
    AsyncStorage.setItem('user_current_selected_language', language);
  };

  const saveUserLoginData = all_data => {
    AsyncStorage.setItem('user_login_data', JSON.stringify(all_data));
  };

  const getUserLoginData = callback => {
    AsyncStorage.getItem('user_login_data', (error, result) => {
      if (result !== null) {
        // We have data!!
        callback(JSON.parse(result));
        // console.log(JSON.parse(value));
      }
    });
  };

  const clearAllData = () => {
    AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
    //.then(() => );
  };

  return (
    <LocalizationContext.Provider
      value={{
        currentLanguage,
        setI18nConfig,
        getTranslation,
        getUserLanguage,
        saveUserLanguage,
        saveUserLoginData,
        getUserLoginData,
        clearAllData,
        optionsLanguage,
      }}>
      {props.children}
    </LocalizationContext.Provider>
  );
};

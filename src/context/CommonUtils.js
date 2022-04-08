import React, {createContext, useState, useEffect} from 'react';
import moment from 'moment'; // date format
import Geolocation from '@react-native-community/geolocation';

export const filterList = [
  {
    key: '1',
    label: 'Publication Date',
    value: 'Publication Date',
    selected: false,
  },
  {
    key: '2',
    label: 'Duration of Ad',
    value: 'Duration of Ad',
    selected: false,
  },
  {
    key: '3',
    label: 'User Rating',
    value: 'User Rating',
    selected: false,
  },
  {
    key: '4',
    label: 'Price',
    value: 'Price',
    selected: false,
  },
  {
    key: '5',
    label: 'Limit Delivery Date',
    value: 'Limit Delivery Date',
    selected: false,
  },
  {
    key: '6',
    label: 'Commission',
    value: 'Commission',
    selected: false,
  },
];

export const CommonUtilsContext = createContext();

export const CommonUtils = props => {
  const [optionsFilter, setOptionFilter] = useState([]);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const changeDateFormat = (date, format) => {
    return moment(date).format(format);
  };

  const checkSpecialChar = string => {
    var format = /[`~0-9!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
    if (format.test(string)) {
      return true;
    } else {
      return false;
    }
  };

  function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  const getUserCurrentLocation = () => {
    let latitude, longitude;

    const config = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 3600000,
    };

    Geolocation.getCurrentPosition(
      info => {
        const {coords} = info;
        latitude = coords.latitude;
        longitude = coords.longitude;
        setLat(latitude);
        setLng(longitude);
        //console.log("INFO ", latitude);
        // getUserCurrentAddress(latitude, longitude)A
      },
      error => console.log(error),
      config,
    );
  };

  return (
    <CommonUtilsContext.Provider
      value={{
        optionsFilter,
        setOptionFilter,
        changeDateFormat,
        checkSpecialChar,
        getUserCurrentLocation,
        lat,
        lng,
        validURL,
      }}>
      {props.children}
    </CommonUtilsContext.Provider>
  );
};

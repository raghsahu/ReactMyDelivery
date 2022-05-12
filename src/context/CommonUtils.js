import React, { createContext, useState, useEffect } from 'react';
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

export const validateURL = link => {
  if (link.indexOf("http://") == 0 || link.indexOf("https://") == 0) {
    // console.log("The link has http or https.");
    return link
  }
  else {
    //console.log("The link doesn't have http or https.");
    return "http://" + link
  }
}

export const changeUTCtoLocal = date => {
  var utcChangeFormatDate = moment(date).format('YYYY-MM-DDTHH:mm:ss.000');
  var localDate = new Date(utcChangeFormatDate + 'Z');
  return moment(localDate).format('YYYY-MM-DD HH:mm')
}

export const changeLocalToUTC = date => {
  var utcChangeFormatDate = new Date(moment(date).format('YYYY/MM/DD HH:mm:ss'))
  var utcTime =  moment.utc(utcChangeFormatDate).format('YYYY-MM-DD HH:mm')
  return utcTime
}

export const changeLocalToUTCTime = date => {
  var utcChangeFormatDate = new Date(moment(date).format('YYYY/MM/DD HH:mm:ss'))
  var utcTime =  moment.utc(utcChangeFormatDate).format('HH:mm')
  return utcTime
}

export const changeUTCtoLocalTime = date => {
  var utcChangeFormatDate = moment(date).format('YYYY-MM-DDTHH:mm:ss.000');
  var localDate = new Date(utcChangeFormatDate + 'Z');
  return moment(localDate).format('HH:mm')
}

export const CommonUtilsContext = createContext();

export const CommonUtils = props => {
  const [optionsFilter, setOptionFilter] = useState([]);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  const adGender = [
    {
      key: '1',
      text: 'Man',
    },
    {
      key: '2',
      text: 'Women',
    },
    {
      key: '3',
      text: 'Both',
    },
  ];

  const getAdGender = genderKey => {
    if (genderKey == '1') {
      return 'Man';
    } else if (genderKey == '2') {
      return 'Women';
    } else if (genderKey == '3') {
      return 'Both';
    }

    return '';
  };

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
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
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
        const { coords } = info;
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
        adGender,
        getAdGender,
      }}>
      {props.children}
    </CommonUtilsContext.Provider>
  );
};

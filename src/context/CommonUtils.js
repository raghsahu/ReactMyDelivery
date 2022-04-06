import React, {createContext, useState, useEffect} from 'react';
import moment from 'moment'; // date format

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

  return (
    <CommonUtilsContext.Provider
      value={{
        optionsFilter,
        setOptionFilter,
        changeDateFormat,
        checkSpecialChar,
      }}>
      {props.children}
    </CommonUtilsContext.Provider>
  );
};

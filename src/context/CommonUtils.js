import React, {createContext, useState, useEffect} from 'react';



export const CommonUtilsContext = createContext();

export const CommonUtils = props => {
  const [optionsFilter, setOptionFilter] = useState([]);
   




    return (
        <CommonUtilsContext.Provider
          value={{
            optionsFilter,
            setOptionFilter
          }}>
          {props.children}
        </CommonUtilsContext.Provider>
      );
    }; 
import React, {useEffect, useContext} from 'react';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {APPContext} from '../context/AppProvider';

const GooglePlacesInput = props => {
  const {googleApiKey} = useContext(APPContext);

  useEffect(() => {
    props.navigation.addListener('focus', () => {
      //console.log(props.route.params)
    });
  }, []);

  return (
    <GooglePlacesAutocomplete
      GooglePlacesDetailsQuery={{fields: 'geometry'}}
      fetchDetails={true}
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log('place_data ' + JSON.stringify(data));
        // console.log('place_details ' + JSON.stringify(details));
        // console.log('location ' + JSON.stringify(details?.geometry?.location));

        fetch(
          'https://maps.googleapis.com/maps/api/geocode/json?address=' +
            details?.geometry?.location.lat +
            ',' +
            details?.geometry?.location.lng +
            '&key=' +
            googleApiKey,
        )
          .then(response => response.json())
          .then(responseJson => {
            // console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson));
            var add = responseJson.results[0].formatted_address;
            var value = add.split(',');

            var count = value.length;
            var country = value[count - 1];
            var states = value[count - 2];
            var city = value[count - 3];
            const AddressData = {
              country: country,
              city: city,
              address: add,
              lat: details?.geometry?.location.lat,
              lng: details?.geometry?.location.lng,
            };
            props.route.params.onReturn(AddressData);
            props.navigation.goBack();
          });
      }}
      query={{
        key: googleApiKey,
        language: 'en',
      }}
      onFail={error => console.error(error)}
    />
  );
};

export default GooglePlacesInput;

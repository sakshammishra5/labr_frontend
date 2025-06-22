import React, { useState } from 'react';
import { LocateFixed } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentLocation } from '@/store/Slices/app.slice';
import LabourDropDown from './LabourDropDown';

const Search = () => {
  const User = useSelector((state) => state.app.User);
  const { labourType } = useSelector((state) => state.labour.LabourConfig);
  const { location, pincode } = User.currentLocation;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Sample city and pincode mapping
  const cityPincodeMap = {
    Mumbai: ['400001', '400002', '400003', '400004'],
    Delhi: ['110001', '110002', '110003', '110004','110084'],
    Bangalore: ['560001', '560002', '560003', '560004'],
    Chennai: ['600001', '600002', '600003', '600004'],
    Kolkata: ['700001', '700002', '700003', '700004'],
  };

  // State for selected city and pincode
  const [selectedCity, setSelectedCity] = useState(location || '');
  const [selectedPincode, setSelectedPincode] = useState(pincode || '');

  // Function to handle fetching the current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(latitude, longitude);
          reverseGeocode(latitude, longitude);
        },
        (error) => {
          console.error('Error getting location:', error.message);
          alert('Unable to retrieve your location. Please select a city and pincode.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser. Please select a city and pincode.');
    }
  };

  // Function for reverse geocoding (converting lat/lng to address)
  const reverseGeocode = async (latitude, longitude) => {
    const apiKey = 'AIzaSyBCb1wOz_vmYBJb-YgNWjpDUsk4wcgUF4Q';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    const extractPincode = (addressComponents) => {
      for (const component of addressComponents) {
        if (component.types.includes('postal_code')) {
          return component.long_name;
        }
      }
      return null;
    };

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      if (data.status === 'OK' && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        const newPincode = extractPincode(data.results[0].address_components);
        console.log("pincode", newPincode);
        dispatch(changeCurrentLocation({ location: address, pincode: newPincode }));
        setSelectedCity(address);
        setSelectedPincode(newPincode || '');
      } else {
        alert('Could not find an address for this location. Please select a city and pincode.');
      }
    } catch (error) {
      console.error('Error with reverse geocoding:', error);
      alert('Error fetching address. Please select a city and pincode.');
    }
  };

  const handleSearch = async () => {
    if (labourType === "") {
      alert('Please select a labor type.');
      return;
    }

    if (!selectedCity) {
      alert('Please select a city.');
      return;
    }

    if (!selectedPincode) {
      alert('Please select a pincode.');
      return;
    }

    dispatch(changeCurrentLocation({ location: selectedCity, pincode: selectedPincode }));
    navigate(`/services?worktype=${labourType}&isAvailable=true&pincode=${selectedPincode}`, {
      state: { address: selectedCity }
    });
  };

  // Handle city selection and reset pincode
  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setSelectedPincode(''); // Reset pincode when city changes
  };

  return (
    <>
      <div className="max-w-lg flex items-center">
        <LabourDropDown />
        <select
          className="w-1/2 p-3 border border-gray-300 focus:outline-none"
          value={selectedCity}
          onChange={handleCityChange}
        >
          <option value="" disabled>Select a city</option>
          {Object.keys(cityPincodeMap).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        <select
          className="w-1/2 p-3  border border-gray-300 focus:outline-none"
          value={selectedPincode}
          onChange={(e) => setSelectedPincode(e.target.value)}
          disabled={!selectedCity} // Disable until a city is selected
        >
          <option value="" disabled>Select a pincode</option>
          {selectedCity &&
            cityPincodeMap[selectedCity].map((pin) => (
              <option key={pin} value={pin}>
                {pin}
              </option>
            ))}
        </select>
        <button
          className="bg-green-500 text-white p-3 rounded-r-md font-semibold cursor-pointer"
          onClick={handleSearch}
        >
          Search
        </button>
        <div
          className="flex items-center justify-center ml-3 text-green-500 p-3 cursor-pointer border-2 border-gray-300 rounded-md"
          onClick={() => getCurrentLocation()}
        >
          <LocateFixed />
        </div>
      </div>
      <div></div>
    </>
  );
};

export default Search;
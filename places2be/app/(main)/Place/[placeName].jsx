import React, { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';
import Place from '../Place';  // Adjust the path as necessary
import data from '../../../data.json';  // Adjust the path to your data.json file

function PlaceScreen() {
  const route = useRoute();
  const { placeName } = route.params;  // Get the dynamic placeName from the route
  
  // State to store the place data
  const [placeData, setPlaceData] = useState(null);

  useEffect(() => {
    // Fetch the place data based on placeName
    const place = data.find(item => item.placeName === placeName);
    
    if (place) {
      setPlaceData(place);  // Set place data if found
    }

  }, [placeName]);  // Run the effect when placeName changes

  return placeData ? <Place {...placeData} /> : null;  // Pass placeData to Place component if available
}

export default PlaceScreen;

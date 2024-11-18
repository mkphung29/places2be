import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Place from '../Place';  // Adjust the path as necessary
import data from '../../../data.json';  // Adjust the path to your data.json file

function PlaceScreen() {
  const route = useRouter();
  const { objectId } = useLocalSearchParams();  // Get the dynamic placeName from the route
  
  // State to store the place data
  const [placeData, setPlaceData] = useState(null);

  useEffect(() => {
    // Fetch the place data based on placeName
    const place = data.find(item => item.objectId === objectId);
    
    if (place) {
      setPlaceData(place);  // Set place data if found
    }

  }, [objectId]);  // Run the effect when placeName changes

  return placeData ? <Place {...placeData} /> : null;  // Pass placeData to Place component if available
}

export default PlaceScreen;

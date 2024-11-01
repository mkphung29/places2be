import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { UrlTile } from 'react-native-maps';
import { MAPTILER_API_KEY } from '@env';

export default function HomeScreen() {
  // MapLibreGL.setWellKnownTileServer(MapLibreGL.TileServers.MapLibre);
  // MapLibreGL.setAccessToken(null);

  const initRegion={
    latitude: 40.7291,
    longitude: -73.9965,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,

  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        styleUrl={`https://api.maptiler.com/maps/6a951fa4-273a-41d2-a3ec-8474e9eaabd6/style.json?key=${MAPTILER_API_KEY}`}
        initialRegion={initRegion}
        zoomEnabled={true}
        scrollEnabled={true}

      >
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});


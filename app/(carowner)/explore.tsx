import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function Explore() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map}
      provider={PROVIDER_GOOGLE} 
      // showsUserLocation={true}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

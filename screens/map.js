// Import React Native
import React, {useState, useEffect, useContext} from 'react';
import {
  PermissionsAndroid,
  StyleSheet,
  Appearance,
  View,
  SafeAreaView,
  Text,
  Image,
} from 'react-native';

// Import React Native Maps
import MapView, {Marker, Circle} from 'react-native-maps';

// Import React Native Geolocation
import Geolocation from '@react-native-community/geolocation';
import {getDistance} from 'geolib';

// Import Locations Data
//import {locations} from '../data/locations';
import {remoteLocations} from '../data/api';
import {
  DistanceContext,
  LocationContext,
  LocationIdContext,
  LocationToSampleContext,
  NearContext,
  SampleIdContext,
} from '../data/global';
import {locationss} from '../data/locations';

// Define Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nearbyLocationSafeAreaView: {
    backgroundColor: 'black',
  },
  nearbyLocationView: {
    padding: 20,
  },
  nearbyLocationText: {
    color: 'white',
    lineHeight: 25,
  },
});
const colorScheme = Appearance.getColorScheme();

// Component for displaying nearest location and whether it's within 100 metres
function NearbyLocation(props) {
  const [near, setNear] = useContext(NearContext);
  const [distance, setDistance] = useContext(DistanceContext);
  const [locationID, setLocationID] = useContext(LocationIdContext);
  const [sampleID, setSampleID] = useContext(SampleIdContext);
  const [LocationToSample, setLocationToSample] = useContext(
    LocationToSampleContext,
  );

  console.log(props);
  if (typeof props._j != 'undefined') {
    setNear(props._j.location);
    console.log('Nearest Location:', near);
    setDistance(props._j.distance.nearby);
    console.log('near or nah: ', distance);
    setLocationID(props._j.id);
    console.log('location ID:', locationID);
  }
}

// Main component for displaying the map and markers
/**The main function used to display the map in the application.
 * Fetches data from the API called in app.js
 * Then updates the map based on the API on the locations of the musics
 * @returns the MapView
 */
export default function ShowMap() {
  //const [locations, setLocation] = useState([]);

  //console.log(locations)
  const [locations, setLocation] = useContext(LocationContext);
  //let locations = remoteLocations()

  //Sets the longitude and latitude
  const updatedLocations = locations.map(location => {
    const latlong = location.latlong.split(', ');
    location.coordinates = {
      latitude: parseFloat(latlong[0]),
      longitude: parseFloat(latlong[1]),
    };
    //console.log(location)
    return location;
  });

  // Setup state for map data
  //-27.499896755131353, 153.0148290862863
  const initialMapState = {
    locationPermission: false,
    locations: updatedLocations,
    userLocation: {
      latitude: -27.499526188402154,
      //longitude: 153.0148290862863,
      longitude: 153.0282,
      // Starts at "Botanic Gardens"
    },
    nearbyLocation: {},
  };
  //Declares the map state
  const [mapState, setMapState] = useState(initialMapState);

  // Run location permissions check after render due to side effects
  // Only Android needs extra code to check for permissions (in addition to android/app/src/main/AndroidManifest.xml)
  // iOS relies on ios/mapApp/Info.plist
  useEffect(() => {
    async function requestAndroidLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app will put your location on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setMapState({
            ...mapState,
            locationPermission: true,
          });
        }
      } catch (error) {
        console.warn(error);
      }
    }

    if (Platform.OS === 'android') {
      requestAndroidLocationPermission();
    } else {
      setMapState({
        ...mapState,
        locationPermission: true,
      });
    }
  }, []);

  // Function to retrieve location nearest to current user location
  async function calculateDistance(userLocation) {
    const nearestLocations = mapState.locations
      .map(location => {
        const metres = getDistance(userLocation, location.coordinates);
        location['distance'] = {
          metres: metres,
          nearby: metres <= 100 ? true : false,
        };
        return location;
      })
      .sort((previousLocation, thisLocation) => {
        return previousLocation.distance.metres - thisLocation.distance.metres;
      });
    return nearestLocations.shift();
  }

  // Only watch the user's current location when device permission granted
  if (mapState.locationPermission) {
    Geolocation.watchPosition(
      position => {
        const userLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        const nearbyLocation = calculateDistance(userLocation);
        setMapState({
          ...mapState,
          userLocation,
          nearbyLocation: nearbyLocation,
        });
      },
      error => console.log(error),
    );
  }
  //console.log(locations[1].id)
  {
    return (
      <>
        <MapView
          camera={{
            center: mapState.userLocation,
            pitch: 0, // Angle of 3D map
            heading: 0, // Compass direction
            altitude: 3000, // Zoom level for iOS
            zoom: 15, // Zoom level For Android
          }}
          showsUserLocation={mapState.locationPermission}
          style={styles.container}>
          {mapState.locations.map(location => (
            <Circle
              key={location.id}
              center={location.coordinates}
              radius={100}
              strokeWidth={3}
              strokeColor="#A42DE8"
              fillColor={
                colorScheme == 'dark'
                  ? 'rgba(128,0,128,0.5)'
                  : 'rgba(210,169,210,0.5)'
              }
            />
          ))}
        </MapView>
        <NearbyLocation {...mapState.nearbyLocation} />
      </>
    );
  }
}

/**
/</>
          <MapView
          camera={{
            center: mapState.userLocation,
            pitch: 0, // Angle of 3D map
            heading: 0, // Compass direction
            altitude: 3000, // Zoom level for iOS
            zoom: 15, // Zoom level For Android
          }}
          showsUserLocation={mapState.locationPermission}
          style={styles.container}>
          {mapState.locations.map(location => (
            <Circle
              key={location.id}
              center={location.coordinates}
              radius={100}
              strokeWidth={3}
              strokeColor="#A42DE8"
              fillColor={
                colorScheme == 'dark'
                  ? 'rgba(128,0,128,0.5)'
                  : 'rgba(210,169,210,0.5)'
              }
            />
          ))}
        </MapView>
        
 */

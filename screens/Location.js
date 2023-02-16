import React, {
  useState,
  useRef,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Dimensions,
  Text,
  Button,
  TextComponent,
  DevSettings,
  TouchableOpacity,
} from 'react-native';

import {WebView} from 'react-native-webview';
import {
  Context,
  LocationContext,
  TextContext,
  NearContext,
  DistanceContext,
  LocationIdContext,
  SampleIdContext,
  LocationToSampleContext,
} from '../data/global';
import {remoteSamples, remoteLocations} from '../data/api';
import {Theme, color, font} from '@react-navigation/native';
import {icon_smiley_darkpurple} from '../data/icons';
import {colors, sizes} from '../data/theme';
import {BorderlessButton} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

// the stylesheet
const styles = {
  container: {
    padding: 20,
  },
  locationContainer: {
    marginLeft: 20,
    flexDirection: 'row',
  },
  webViewContainer: {
    height: height / 2.5,
    borderWidth: 3,
    marginBottom: 20,
  },
  webView: {
    opacity: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    top: 0,
    color: 'purple',
  },
  profileContainer: {
    padding: 5,
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'purple',
    top: 100,
    marginBottom: 20,
  },
  emptyLogo: {
    width: 50,
    height: 50,
    borderRadius: 80,
    backgroundColor: 'black',
    top: 20,
  },
  profileLogo: {
    width: 60,
    height: 60,
    marginLeft: 20,
    flexDirection: 'row',
    borderRadius: 80,
    top: 20,
  },
  profileText: {
    marginTop: 20,
    marginLeft: 50,
    fontWeight: 'bold',
    color: 'purple',
    top: 20,
  },
  locationIcon: {
    width: 90,
    height: 90,
    top: 30,
    justifyContent: 'space-around',
    resizeMode: 'contain',
  },
  locationText: {
    fontSize: sizes.body1,
    color: 'purple',
    fontWeight: 'bold',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    bottom: 70,
    right: 100,
  },
  districtText: {
    fontSize: sizes.body2,
    color: 'purple',
    fontWeight: 'bold',
    flexDirection: 'row',
    left: 115,
    bottom: 70,
  },
  roundButton1: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    right: 20,
    marginLeft: 50,
    width: 300,
    height: 40,
    borderRadius: 10,
    backgroundColor: 'purple',
  },
};

/**
 * The main function for the location-map screen
 * fetch data from the required APIs, then store them inside the respective useContext& UseState
 * Runs a list of functionalities to get the WebView functionalities running
 * To display the correct data on the screen
 * @returns the view of the locations screen.
 */
export default function Map() {
  //A list of useContext/ UseStates summoned to fetch/ pass data across various screens
  const [locations, setLocations] = useContext(LocationContext);
  const [photo, setPhoto] = useContext(Context);
  const [UseText, textState] = useContext(TextContext);

  const [near, setNear] = useContext(NearContext);
  const [distance, setDistance] = useContext(DistanceContext);
  const [locationID, setLocationID] = useContext(LocationIdContext);
  const [sampleID, setSampleID] = useContext(SampleIdContext);
  const [currentLocation, setCurrent] = useState(null);
  const [currentDistrict, setDistrict] = useState(null);
  const [LocationToSample, setLocationToSample] = useContext(
    LocationToSampleContext,
  );
  const [webViewState, setWebViewState] = useState({
    loaded: false,
    actioned: false,
  });

  /**
   * A function to call& fetch data from the samples_to_locations and samples API
   * Check if the data is the one we are looking for first before storing it in the useState
   * By checking if the location ID are the same.
   */
  const getSampleID = async () => {
    try {
      const response = await fetch(
        'http://wmp.interaction.courses/api/v1/?apiKey=MwyQVwvP&mode=read&endpoint=samples_to_locations',
      );
      let responseJson = await response.json();
      for (let i = 0; i <= responseJson.samples_to_locations.length; i++) {
        console.log(
          responseJson.samples_to_locations[i].locations_id,
          'JSON-location',
        );
        if (responseJson.samples_to_locations[i].locations_id === locationID) {
          //console.log(responseJson.samples_to_locations[i].samples_id)
          console.log('test sample to location');
          setLocationToSample(responseJson.samples_to_locations[i].samples_id);

          const response2 = await fetch(
            'http://wmp.interaction.courses/api/v1/?apiKey=MwyQVwvP&mode=read&endpoint=samples',
          );
          let responseJson2 = await response2.json();
          for (let i = 0; i < responseJson2.samples.length; i++) {
            console.log(
              responseJson2.samples[i].type,
              'Sample Id Location Page',
            );
            if (responseJson2.samples[i].id === LocationToSample) {
              setSampleID(
                '[{"type": "' +
                  responseJson2.samples[i].type +
                  '","recording_data": ' +
                  responseJson2.samples[i].recording_data +
                  '}]',
              );
            }
          }
        }
      }
      //console.log(responseJson.samples_to_locations);
    } catch (error) {
      console.log(error);
    }
  };

  const getLocationData = () => {
    for (let i = 0; i < locations.length; i++) {
      if (locationID === locations[i].id) {
        setCurrent(locations[i].location);
        setDistrict(locations[i].suburb);
      }
    }
  };

  //Summon the functions to update the useStates
  useEffect(() => {
    getSampleID();
    getLocationData();
    //getSample();
  }, []);
  if (sampleID === null) {
    getSampleID();
  }

  //A list of console logs used for testing purposes
  console.log(currentLocation, '+ current location');
  console.log(currentDistrict, '+ current district');
  console.log('sample ID Locations:', sampleID);
  console.log(near + 'Nearest location');
  console.log(distance + 'is distance near?');
  console.log(locationID, 'location id test');
  console.log(LocationToSample, 'location to sample test');
  //console.log(sampleID)

  const webViewRef = useRef();
  /**
   * Setting up the loaded webView
   */
  function webViewLoaded() {
    setWebViewState({
      ...webViewState,
      loaded: true,
    });
  }
  /**
   * Handle the reloading function of the webview
   */
  function handleReloadPress() {
    webViewRef.current.reload();
  }
  /**
   * A simple function used to handle injecting of Javascript into webViews when called.
   */
  function handleActionPress() {
    if (!webViewState.actioned) {
      //webViewRef.current.injectJavaScript(`setupParts(sample)`);
      webViewRef.current.injectJavaScript(sampleID);
      webViewRef.current.injectJavaScript(`setupParts(${sampleID})`);
      webViewRef.current.injectJavaScript('startPlayback()');
    } else {
      webViewRef.current.injectJavaScript('stopPlayback()');
    }
    setWebViewState({
      ...webViewState,
      actioned: !webViewState.actioned,
    });
  }
  if (distance === true) {
    return (
      <SafeAreaView>
        <View>
          <View>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../assets/logos/icon-pin-darkpurple.png')}
                style={styles.locationIcon}></Image>
            </View>
            <View style={styles.locationContainer}>
              <WebView
                ref={ref => (webViewRef.current = ref)}
                originWhitelist={['*']}
                source={{
                  uri: 'https://wmp.interaction.courses/playback-webview/',
                }}
                pullToRefreshEnabled={true}
                onLoad={webViewLoaded}
                style={styles.webView}
              />

              <Text style={styles.locationText}>{currentLocation}</Text>
            </View>
            <Text style={styles.districtText}>{currentDistrict}</Text>
          </View>
          {webViewState && (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={handleActionPress}
                style={styles.roundButton1}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  {!webViewState.actioned ? 'Start Playback' : 'Stop Playback'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.profileContainer}>
          <View>
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: 'purple',
                left: 20,
              }}>
              Currently At This Location
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            {!photo.hasOwnProperty('fileName') ? (
              <View>
                <Image
                  source={require('../assets/logos/icon-smiley-darkpurple.png')}
                  style={styles.profileLogo}></Image>
              </View>
            ) : (
              <View>
                <Image source={photo} style={styles.profileLogo}></Image>
              </View>
            )}

            {UseText === null ? (
              <Text style={styles.profileText}>Please Enter Your Name...</Text>
            ) : (
              <Text style={styles.profileText}>{UseText}</Text>
            )}
          </View>
          <View style={{flexDirection: 'row', marginTop: 20}}>
            {Context === {} || [] ? (
              <View>
                <Image
                  source={require('../assets/logos/icon-smiley-darkpurple.png')}
                  style={styles.profileLogo}></Image>
              </View>
            ) : (
              <View>
                <Image source={photo} style={styles.profileLogo}></Image>
              </View>
            )}

            {TextContext === [] || {} ? (
              <Text style={styles.profileText}>And Others...</Text>
            ) : (
              <Text>{UseText}</Text>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView>
        <View>
          <Text
            style={{
              fontSize: sizes.body1,
              fontWeight: 'bold',
              color: 'purple',
              left: 20,
              top: 20,
            }}>
            No Music Nearby
          </Text>
          <Text
            style={{
              fontSize: sizes.body2,
              fontWeight: 'bold',
              color: 'purple',
              left: 20,
              top: 10,
            }}>
            it's Oh So Quiet...
          </Text>
        </View>
      </SafeAreaView>
    );
  }
}

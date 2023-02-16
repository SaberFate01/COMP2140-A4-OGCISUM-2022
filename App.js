//Importing core React components
import React, {Fragment, useContext, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {LinearGradient} from 'react-native-linear-gradient';
//Importing the other components
import Tabs from './components/Tabs';
import Map from './screens/map';
import {colors} from './data/theme';
//Importing the useContexts
import {
  Context,
  LocationContext,
  TextContext,
  NearContext,
  DistanceContext,
  LocationIdContext,
  SampleIdContext,
  LocationToSampleContext,
} from './data/global';
//Creating the stack navigator
const Stack = createStackNavigator();

/**
 * The main function that lays the base of all other things in this application
 * First declares a bunch of useContext,
 * Then calls & fetch data from the locations API to be displayed on the maps
 * @returns the View and the navigators
 */
function App() {
  //A list of useStates declared through useContext, used to pass down the hierachy of files to other components
  const [photo, setPhoto] = useState({});
  const [textState, setTextState] = useState(null);
  const [locations, setLocation] = useState(null);
  const [Locationname, setLocationName] = useState(null);
  const [DistrictName, setDistrict] = useState(null);
  const [near, setNear] = useState(null);
  const [distance, setDistance] = useState(false);
  const [locationID, setLocationID] = useState(null);
  const [LocationToSample, setLocationToSample] = useState(null);
  const [sampleID, setSampleID] = useState(null);

  /**
   * The function to call& fetch data from the locations api
   * The mother of all subsequent API calls
   */
  const getLocation = async () => {
    try {
      const response = await fetch(
        'http://wmp.interaction.courses/api/v1/?apiKey=MwyQVwvP&mode=read&endpoint=locations',
      );
      let responseJson = await response.json();
      //console.log(locations)
      setLocation(responseJson.locations);

      //return isloading(false)
    } catch (error) {
      console.log(error);
    }
  };
  /**
   * UseEffect to call the location API
   */
  useEffect(() => {
    getLocation();
  }, []);

  return locations !== null ? (
    //This looks like two pyramids attached together!
    //To be honest here, I have tried storing multiple objects in one useState
    //But Idk why it isn't working, so I kept it like this.
    <>
      <Context.Provider value={[photo, setPhoto]}>
        <TextContext.Provider value={[textState, setTextState]}>
          <DistanceContext.Provider value={[distance, setDistance]}>
            <LocationContext.Provider value={[locations, setLocation]}>
              <NearContext.Provider value={[near, setNear]}>
                <LocationIdContext.Provider value={[locationID, setLocationID]}>
                  <LocationToSampleContext.Provider
                    value={[LocationToSample, setLocationToSample]}>
                    <SampleIdContext.Provider value={[sampleID, setSampleID]}>
                      <SafeAreaView style={{flex: 1}}>
                        <Fragment>
                          <NavigationContainer>
                            <Stack.Navigator
                              screenOptions={{
                                headerShown: false,
                                header: false,
                              }}
                              initialRouteName={'Tabs'}>
                              <Stack.Screen
                                name="Tabs"
                                children={props => <Tabs {...props} />}
                              />
                            </Stack.Navigator>
                          </NavigationContainer>
                        </Fragment>
                      </SafeAreaView>
                    </SampleIdContext.Provider>
                  </LocationToSampleContext.Provider>
                </LocationIdContext.Provider>
              </NearContext.Provider>
            </LocationContext.Provider>
          </DistanceContext.Provider>
        </TextContext.Provider>
      </Context.Provider>
    </>
  ) : null;
}

//Export the main app
export default App;

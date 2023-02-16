//importing sys dependencies
import React, {useContext, useState, createContext} from 'react';
import {Context, TextContext} from '../data/global';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Dimensions,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
//Importing custom dependencies
import {useNavigation} from '@react-navigation/native';
import {colors, sizes} from '../data/theme';
import {launchImageLibrary} from 'react-native-image-picker';

//setting the dimensions of the user's device
const {width, height} = Dimensions.get('window');

/**
 * Access the user's camera, stores an image, and ask
 * the user to input his desired username
 * then pass the data by the user to the locations screen
 * @returns the view of the profile screen, including
 * an image picker and an input box
 */
export default function photo() {
  //const [photoState, setPhotoState] = useState({});
  const [photoState, setPhotoState] = useContext(Context);
  //console.log(photoState);
  //const [textState, setTextState] = useState({});
  const [textState, setTextState] = useContext(TextContext);
  //const usetext = useContext(TextContext);
  //console.log(textState);

  /**
   * An async function used to handle the change pic button
   */
  async function handleChangePress() {
    const result = await launchImageLibrary();
    //console.log(result);
    if (typeof result.assets[0] == 'object') {
      setPhotoState(result.assets[0]);
    }
  }

  const hasPhoto = typeof photoState.uri != 'undefined';
  /**A function called to check if the user has uploaded a photo
   * Determines the style of the view depending on the result
   * @param {*} props the props of the segment
   * @returns the view based on the result
   */
  function Photo(props) {
    if (hasPhoto) {
      return (
        <View style={styles.photoFullView}>
          <Image
            style={styles.photoFullImage}
            resizeMode="cover"
            source={{
              uri: photoState.uri,
              width: width,
              height: height / 2,
            }}
          />
        </View>
      );
    } else {
      return <View style={styles.photoEmptyView} />;
    }
  }
  //Create the stylesheet
  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    photoFullView: {
      marginBottom: 20,
    },
    photoEmptyView: {
      borderWidth: 3,
      borderRadius: 10,
      borderColor: '#999',
      borderStyle: 'dashed',
      height: height / 1.8,
      marginBottom: 20,
    },
    photoFullImage: {
      width: '100%',
      height: height / 1.8,
      borderRadius: 10,
    },
    buttonView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      position: 'absolute',
      top: 300,
      right: '36%',
      borderRadus: 100,
      backgroundColor: colors.purpleColorLighter,
    },
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    roundButton1: {
      flexDirection: 'row',
      justifyContent: 'center',
      //alignItems:'center',
      position: 'absolute',
      top: 300,
      //right: '36%',
      marginLeft: Dimensions.get('window').width / 3,
      //marginTop: Dimensions.get('window').height/200,
      width: 150,
      height: 40,
      padding: 10,
      borderRadius: 10,
      backgroundColor: colors.purpleColorLighter,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      backgroundColor: colors.purpleColorLighter,
      color: 'white',
      textAlign: 'center',
    },
  });
  return (
    <SafeAreaView>
      <View>
        <Text
          style={{
            fontSize: sizes.body1,
            fontWeight: 'bold',
            color: colors.purpleColorLighter,
          }}>
          Edit Profile
        </Text>
        <Text
          style={{
            fontSize: sizes.body2,
            fontWeight: 'bold',
            color: colors.purpleColorLighter,
          }}>
          Mirror, Mirror On The Wall...
        </Text>
      </View>
      <View style={styles.container}>
        <Photo />
        <TouchableOpacity
          onPress={handleChangePress}
          style={styles.roundButton1}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>
            {hasPhoto ? 'Change Photo' : 'Add Photo'}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={setTextState}
          value={textState}
          placeholder={'Enter your name'}
          placeholderTextColor={'white'}
          onPress={() => {
            navigation.navigate({
              name: 'Home',
              params: {post: postText},
              merge: true,
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
}

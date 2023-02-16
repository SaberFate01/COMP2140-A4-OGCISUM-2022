//Import essential components
import React, {useContext} from 'react';
import {View, Image, TouchableOpacity, Text, useState} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Import other components
import Profile from '../screens/profile';
import Map from '../screens/map';
import Locations from '../screens/Location';
import {colors, sizes} from '../data/theme';
import icons from '../data/icons';
import Icons from '../data/icons';
import photo from '../screens/profile';
import {DistanceContext} from '../data/global';

/**
 * The function used to determine the style of the icons
 * @param {*} focused - if the icon is clicked or not, icon - the icon
 * @returns the view of the icons
 * if the icon id is equals to 11 (OgCiSum), a different sizing is applied
 */
function TabIcon({focused, icon}) {
  if (icon === 11) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 70,
          width: 70,
        }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 100,
            height: 100,
            opacity: focused ? 1 : 0.5,
          }}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          resizeMode: 'contain',
          height: 7,
          width: 7,
        }}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 30,
            height: 60,
            opacity: focused ? 1 : 0.5,
          }}
        />
      </View>
    );
  }
}

//Create a bottom tab navigator
const Tab = createBottomTabNavigator();

/**
 *The styles for the entire tab bar
 *Will check if the icon is the Ogcisum logo, and if it is in the radius of any stored locations
 * @param {*} icon - the icon of tab
 * @returns the style of the tab
 * I know the code here is... a bit lengthy, but that is the best way I can do for now in a short duration.
 */
function tabOptions(icon) {
  const [distance, setDistance] = useContext(DistanceContext);
  if (icon === 11) {
    if (distance === false) {
      return {
        tabBarIcon: ({focused}) => <TabIcon focused={focused} icon={icon} />,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.light,
        tabBarActiveBackgroundColor: colors.blackColorTranslucentLess,

        tabBarStyle: {
          height: 70,
          padding: 0,
          position: 'relative',
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          marginHorizontal: 50,
          flex: 5,
        },
        tabBarLabelOptions: {
          tabBarInactiveTintColor: colors.light,
        },
      };
    } else {
      return {
        tabBarIcon: ({focused}) => <TabIcon focused={focused} icon={icon} />,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.light,
        tabBarActiveBackgroundColor: colors.blackColorTranslucentLess,

        tabBarStyle: {
          height: 70,
          padding: 0,
          position: 'relative',
        },
        tabBarItemStyle: {
          flex: 5,
        },
        tabBarLabelOptions: {
          tabBarInactiveTintColor: colors.light,
        },
        tabBarLabel: 'There Is Music Nearby',
      };
    }
  } else {
    return {
      tabBarIcon: ({focused}) => <TabIcon focused={focused} icon={icon} />,
      tabBarActiveTintColor: colors.white,
      tabBarInactiveTintColor: colors.light,
      tabBarActiveBackgroundColor: colors.blackColorTranslucentLess,

      tabBarStyle: {
        height: 70,
        padding: 0,
        position: 'relative',
      },
      tabBarItemStyle: {
        justifyContent: 'center',
        marginHorizontal: 50,
        flex: 2,
      },
      tabBarLabelOptions: {
        tabBarInactiveTintColor: colors.light,
      },
    };
  }
}

/**
 * Creates the bottom tab navigation bar
 * @param {navigation} navigation: The screen that is being navigated to
 * @returns the bottom navigation bar, inclusive of all the styles, the icons and the functionalities.
 */
function Tabs({navigation}) {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarLabel: () => {
          return;
        },
        tabBarIndicatorStyle: {},
        tabBarLabelStyle: {
          fontSize: 15,
          color: 'white',
          tabBarActiveTintColor: colors.light,
          width: 200,
          marginTop: -20,
          tabBarInactiveTintColor: colors.light,
        },

        headerShown: false,
        tabBarBackground: () => (
          <View style={{flex: 1}}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 0, y: 1}}
              colors={[colors.purpleColorLighter, colors.blueColorDarker]}
              style={{height: 70}}
            />
          </View>
        ),
      })}>
      <Tab.Screen
        name="map"
        children={() => <Map navigation={navigation} />}
        options={() => tabOptions(icons.tab_map_white)}
      />
      <Tab.Screen
        name="ogcisum"
        title="There are music"
        children={() => <Locations navigation={navigation} />}
        options={() => tabOptions(icons.logo_white)}
      />

      <Tab.Screen
        name="user"
        children={() => <Profile navigation={navigation} />}
        options={() => tabOptions(icons.tab_profile_white)}
      />
    </Tab.Navigator>
  );
}

export default Tabs;

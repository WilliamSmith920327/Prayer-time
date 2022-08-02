import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useEffect, useRef} from 'react';
import Octicons from 'react-native-vector-icons/Octicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Fonts from '../styles/Fonts';
import {colors} from '../styles/colors';
import { Shadow } from 'react-native-shadow-2';
import HomeScreen from '../screens/home';
import PrayerScreen from '../screens/prayer';
import QiblaScreen from '../screens/qibla';
import TaqibaatScreen from '../screens/taqibaat';
import TaqibaatDetailScreen from '../screens/taqibaatDetail/Index';
import LibraryScreen from '../screens/Library/Index';
import LibraryDetailScreen from '../screens/LibraryDetail/Index';
import PrayerDetailScreen from '../screens/PrayerDetail/index';
import DuaScreen from '../screens/Dua/Index';
import DuaDetailScreen from '../screens/DuaDetail/Index';
import AboutUsScreen from '../screens/AboutUs/Index';

const Tab = createBottomTabNavigator();

const {RalewaySemiBold} = Fonts;

const animate1 = {
  0: {scale: 0.5, translateY: 0},
  1: {scale: 1.2, translateY: -24},
};
const animate2 = {
  0: {scale: 1.2, translateY: -24},
  1: {scale: 1, translateY: 6},
};

const circle1 = {
  0: {scale: 0},
  0.3: {scale: 0.9},
  0.5: {scale: 0.3},
  0.8: {scale: 0.7},
  1: {scale: 1},
};
const circle2 = {0: {scale: 1}, 1: {scale: 0}};

const TabButton = ({state, descriptors, navigation}) => {
  const tab_index = state.index == 4 ? 1: state.index == 5 ? 3: state.index;
  
  return (
    <View>
      <Shadow>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            elevation: 10,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            height: 80,
            paddingBottom: 0,
            backgroundColor: colors.orangeLight,
          }}>
          {TabArr.map((item, index) => {
            const isFocused = tab_index === index;
            const textRef = useRef(null);
            const viewRef = useRef(null);
            const circleRef = useRef(null);
            useEffect(() => {
              if (isFocused) {
                viewRef.current.animate(animate1);
                circleRef.current.animate(circle1);
                textRef.current.transitionTo({scale: 1});
              } else {
                viewRef.current.animate(animate2);
                circleRef.current.animate(circle2);
                textRef.current.transitionTo({scale: 1});
              }
            }, [isFocused]);
            return (
                <TouchableOpacity
                  key={index}
                  activeOpacity={1}
                  style={tabStyle.container}
                  onPress={() => {
                    navigation.navigate(item.route);
                  }}>
                  <Animatable.View
                    duration={700}
                    ref={viewRef}
                    style={tabStyle.container}>
                    <View style={isFocused ? tabStyle.btn : null}>
                      <Animatable.View
                        duration={700}
                        ref={circleRef}
                        style={{
                          ...StyleSheet.absoluteFillObject,
                          backgroundColor: colors.orangeDark,
                          borderRadius: 25,
                        }}
                      />
                      <FontAwesome
                        color={isFocused ? 'white' : colors.orangeDark}
                        size={25}
                        origin={item.origin}
                        name={item.name}
                      />
                    </View>
                    <Animatable.Text
                      style={[
                        {
                          fontSize: 12,
                          textAlign: 'center',
                          marginTop: 4,
                          marginBottom: 0,
                        },
                        {color: isFocused ? '#262444' : colors.orangeDark},
                        RalewaySemiBold,
                      ]}
                      ref={textRef}>
                      {item.label}
                    </Animatable.Text>
                  </Animatable.View>
                </TouchableOpacity>
            );
          })}
        </View>
      </Shadow>
    </View>
  );
};

const TabArr = [
  {
    route: 'HomeScreen',
    id: 1,
    label: 'Home',
    //   origin: ICON_TYPE.OCTICONS,
    name: 'home',
    component: HomeScreen,
  },
  {
    route: 'PrayerScreen',
    id: 2,
    //   origin: ICON_TYPE.TABLE,
    name: 'table',
    label: 'Prayer Table',
    component: PrayerScreen,
  },
  {
    route: 'QiblaScreen',
    label: 'Qibla',
    id: 3,
    //   origin: ICON_TYPE.COMPASS,
    name: 'compass',
    component: QiblaScreen,
  },
  {
    route: 'TaqibaatScreen',
    id: 4,
    label: 'Taqibaat',
    //   origin: ICON_TYPE.TEXT,
    name: 'file-text-o',
    component: TaqibaatScreen,
  },
];

const screenArr = [
  {
    route: 'HomeScreen',
    component: HomeScreen,
  },
  {
    route: 'PrayerScreen',
    component: PrayerScreen,
  },
  {
    route: 'QiblaScreen',
    component: QiblaScreen,
  },
  {
    route: 'TaqibaatScreen',
    component: TaqibaatScreen,
  },
  {
    route: 'PrayerDetailScreen',
    component: PrayerDetailScreen,
  },
  {
    route: 'TaqibaatDetailScreen',
    component: TaqibaatDetailScreen,
  },
  {
    route: 'LibraryScreen',
    component: LibraryScreen,
  },
  {
    route: 'LibraryDetailScreen',
    component: LibraryDetailScreen,
  },
  {
    route: 'AboutUsScreen',
    component: AboutUsScreen,
  },
  {
    route: 'DuaScreen',
    component: DuaScreen,
  },
  {
    route: 'DuaDetailScreen',
    component: DuaDetailScreen,
  },
];

const BottomTabs = () => {
  return (
    <Tab.Navigator
      tabBar={props => (
        <View style={{backgroundColor: colors.orangeExtraLight, elevation: 3}}>
          <TabButton {...props} />
        </View>
      )}
      screenOptions={{}}>
      {screenArr.map((item, index) => {
        return (
          <Tab.Screen
            key={index}
            name={item.route}
            component={item.component}
            options={({navigation}) => ({
              headerShown: false,
              // headerStyle: {backgroundColor: colors.orangeMedium},
              // headerLeft: () => (
              //   <TouchableOpacity onPress={navigation.openDrawer}>
              //     <Ionicons name="menu" size={25} color={'#fff'} />
              //   </TouchableOpacity>
              // ),
              // headerRight: props => {
              //   return (
              //     <TouchableOpacity
              //       style={{marginRight: 15}}
              //       onPress={() => navigation.goBack()}>
              //       <Ionicons name="arrow-back-outline" size={25} color={'#fff'} />
              //     </TouchableOpacity>
              //   );
              // },
              // tabBarButton: props => <TabButton {...props} item={item} />,
            })}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const tabStyle = StyleSheet.create({
  btn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: colors.orangeExtraLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomTabs;

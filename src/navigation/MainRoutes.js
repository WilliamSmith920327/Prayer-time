import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/home';
import BottomTabs from './BottomTab';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  useDrawerProgress,
} from '@react-navigation/drawer';
import {StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {colors} from '../styles/colors';
import Fonts from '../styles/Fonts';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerContent = props => {
  const progress = useDrawerProgress();
  const status = props.state.history[1] ? true: false;
  
  const bubbleStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [1, 0], [1, 0])
    return { opacity: opacity};
  });

  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: colors.Blue,
        width: '100%',
        marginTop: '40%',
        position:'relative'
      }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <DrawerItem
          label="Om oss"
          icon={() =>
            <FontAwesome name="user-o" size={20} color={'#fff'} />
          }
          labelStyle={[styles.drawerLblStyle]}
          onPress={() => props.navigation.navigate('AboutUsScreen')}
        />
        <DrawerItem
          label="b¢nnetabell"
          icon={() =>
            <FontAwesome name="table" size={20} color={'#fff'}/>
          }
          labelStyle={[styles.drawerLblStyle]}
          style={{width: '100%'}}
          onPress={() => props.navigation.navigate('PrayerScreen')}
        />
        <DrawerItem
          label="Qibla"
          icon={() =>
            <FontAwesome name="compass" size={20} color={'#fff'} />
          }
          labelStyle={styles.drawerLblStyle}
          onPress={() => props.navigation.navigate('QiblaScreen')}
        />
        <DrawerItem
          label="Taqibaat"
          icon={() =>
            <FontAwesome name="file-text-o" size={20} color={'#fff'} />
          }
          labelStyle={styles.drawerLblStyle}
          onPress={() => props.navigation.navigate('TaqibaatScreen')}
        />
        <DrawerItem
          label="bibliotek"
          icon={() =>
            <Ionicons name="library-outline" size={20} color={'#fff'} />
          }
          labelStyle={styles.drawerLblStyle}
          onPress={() => props.navigation.navigate('LibraryScreen')}
        />
        <DrawerItem
          label="Dua"
          icon={() =>
            <Ionicons name="book-outline" size={20} color={'#fff'} />
          }
          labelStyle={styles.drawerLblStyle}
          onPress={() => props.navigation.navigate('DuaScreen')}
        />
      </DrawerContentScrollView>
      <Animated.View style={[bubbleStyle, {display: status ? 'flex': 'none'}]}>
        <TouchableOpacity
          onPress={() => {Linking.openURL('https://2022.veientilallah.no/')}}
          >
          <Text
            style={{
                color: '#fff', 
                textAlign: 'center', 
                fontSize: 20, 
                marginBottom: 20, 
                marginRight: -200, 
                display: status ? 'flex': 'none'
              }}>
            www.veientilallah.no
          </Text>
        </TouchableOpacity>
        <View style={{
          borderRadius: 70,
          width: 120,
          height: 120,
          position: 'absolute',
          left: 200,
          top: -760,
          backgroundColor: colors.red,
          }}></View>
        <View style={{
          borderRadius: 50,
          width: 25,
          height: 25,
          position: 'absolute',
          left: 320,
          top: -650,
          borderWidth: 5,
          borderColor: colors.red,
          }}></View>
        <View style={{
          borderRadius: 50,
          width: 25,
          height: 25,
          position: 'absolute',
          left: 170,
          top: -240,
          borderWidth: 5,
          borderColor: colors.red,
          }}></View>
          <View style={{
          borderRadius: 50,
          width: 100,
          height: 100,
          position: 'absolute',
          left: 50,
          top: -150,
          backgroundColor: colors.red,
        }}></View>
      </Animated.View>
    </Animated.View>
  );
};

export const Screens = ({navigation, style}) => {
  const progress = useDrawerProgress();

  const ourStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.7]);
    const borderRadius = interpolate(progress.value, [0, 1], [0, 20]);
    return {transform: [{scale}], borderRadius};
  });
  return (
    <Animated.View style={[ourStyle, {flex: 1, overflow: 'hidden'}]}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          options={{headerTitle: ''}}
          name="BottomTab"
          component={BottomTabs}
        />
      </Stack.Navigator>
    </Animated.View>
  );
};

export default () => {
  return (
    <View style={{flex: 1, backgroundColor: colors.Blue}}>
      <Drawer.Navigator
        screenOptions={{
          drawerType: 'slide',
          overlayColor: 'transparent',
          drawerStyle: {
            width: '50%',
            flex: 1,
            backgroundColor: colors.Blue,
          },
          headerTransparent: true,
          sceneContainerStyle: {backgroundColor: 'transparent'},
        }}
        drawerContent={props => {
          return <DrawerContent {...props} />;
        }}>
        <Drawer.Screen options={{headerShown: false}} name="Screens">
          {props => <Screens {...props} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerLblStyle: {
    fontWeight: '500',
    fontSize: 18,
    color: '#fff',
    marginVertical: 6
  },
  bubble: {
    borderRadius: 50,
    width: 100,
    height: 100,
    position: 'absolute',
    left: 200,
    top: -130,
    backgroundColor: colors.red
  }
});

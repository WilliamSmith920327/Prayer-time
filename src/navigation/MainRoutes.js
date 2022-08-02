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
const {Lucida} = Fonts;
const status = props.state.history[1] ? true: false;
  return (
    <Animated.View
      style={{
        flex: 1,
        backgroundColor: colors.darkBlue,
        width: '100%',
        marginTop: '40%',
        // marginVertical:'50%'
      }}>
      <DrawerContentScrollView {...props} scrollEnabled={false}>
        <DrawerItem
          label="Om oss"
          icon={() =>
            <FontAwesome name="user-o" size={20} color={'#fff'} />
          }
          labelStyle={[styles.drawerLblStyle, Lucida]}
          onPress={() => props.navigation.navigate('AboutUsScreen')}
        />
        <DrawerItem
          label="b¢nnetabell"
          icon={() =>
            <FontAwesome name="table" size={20} color={'#fff'}/>
          }
          labelStyle={[styles.drawerLblStyle, Lucida]}
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
      <TouchableOpacity
        onPress={() => {Linking.openURL('https://2022.veientilallah.no/')}}
        >
        <Text
          style={[
            {
              color: '#fff', 
              textAlign: 'center', 
              fontSize: 20, 
              marginBottom: 20, 
              marginRight: -200, 
              display: status ? 'flex': 'none'
            }, 
              Lucida
          ]}>
          www.veientilallah.no
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export const Screens = ({navigation, style}) => {
  const progress = useDrawerProgress();

  const ourStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 0.8]);
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
    <View style={{flex: 1, backgroundColor: colors.darkBlue}}>
      <Drawer.Navigator
        screenOptions={{
          drawerType: 'slide',
          overlayColor: 'transparent',
          drawerStyle: {
            width: '50%',
            // flex: 1,
            backgroundColor: colors.darkBlue,
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
  container: {
    flex: 1,
  },
  scene: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    backgroundColor: 'transparent',
  },
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
    overflow: 'hidden',
  },

  drawerLblStyle: {
    fontWeight: '500',
    fontSize: 18,
    color: '#fff',
    marginVertical: 6
    // marginLeft: -15
  },
});

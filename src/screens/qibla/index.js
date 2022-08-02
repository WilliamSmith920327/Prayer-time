import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View, ImageBackground, Animated, Easing} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../styles/colors';
import CompassHeading from 'react-native-compass-heading';
import Header from '../../components/Header';
import asturlab from 'asturlab';
import { Shadow } from 'react-native-shadow-2';
import timezoneData from '../../components/PrayerTableData';


const QiblaScreen = props => {
  const spinValue = new Animated.Value(0);
  const {container} = styles;
  const qibla = asturlab('59.9167', '10.75');

  React.useEffect(() => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: [`${-114}deg`, `${-114 + qibla}deg`],
  });

  return (
    <View style={container}>
      <Header title={'Prayer'} navigation={props.navigation} />
      <View
        style={{
          backgroundColor: colors.orangeExtraLight,
          flex: 1,
          justifyContent: "center",
          marginTop: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          elevation: 30,
          padding: 35,
        }}>
          <Shadow
            distance={10}  
            radius={200}
            >
            <ImageBackground 
              source={require('../../assets/images/compass_background.png')} 
              resizeMode="contain"
              style={styles.imageBackground}
            >
              <Animated.Image
                  style={[
                    styles.direction,
                    {transform: [{rotate: spin}]},
                  ]}
                  resizeMode="contain"
                  source={require('../../assets/images/compass_direction.png')}
                />
          </ImageBackground>
        </Shadow>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.orangeMedium,
  },
  imageBackground: {
    width: "100%",
    aspectRatio: 1,
  },
  direction: {
    height: '100%',
    aspectRatio: 1,
  }
});

export default QiblaScreen;

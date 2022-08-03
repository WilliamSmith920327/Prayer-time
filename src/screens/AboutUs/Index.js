import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../styles/colors';
import {getByDay, getByMonth} from 'prayertiming';
import Geolocation from '@react-native-community/geolocation';
import Header from '../../components/Header';
import Fonts from '../../styles/Fonts';

const AboutUsScreen = props => {
  const {
    container,
    innerContainer,
    headerContainer,
    headerTitle,
    aboutText,
    socialText,
  } = styles;
  const {RalewaySemiBold, RalewayMedium, RalewayBold} = Fonts;

  return (
    <View style={container}>
      <Header title={'HomeScreen'} navigation={props.navigation} />
      <View style={innerContainer}>
        <View
          style={{
            marginHorizontal: 39,
            marginTop: 10,
            height: '80%',
            borderColor: colors.orangeDark,
            borderWidth: 1,
            borderRadius: 15,
            backgroundColor: colors.lightgrey,
            elevation: 4,
            margin: 5,
            paddingBottom: 10
          }}>
          <View style={headerContainer}>
            <Text style={headerTitle}>Om oss</Text>
          </View>
          <Text style={[aboutText, RalewayMedium]}>
            Veien til Allah-prosjektet har et mål er å gjøre stoff om islam og
            muslimer lett tilgjengelig ved bruk av forskjellige typer medier. Vi
            ønsker å spre det riktige islamske budskapet samtidig som vi ønsker at
            islam skal bli forstått slik den bør forstås. Vi vil vise frem
            religionen som profeten Mohammad (fvmh) og hans Ahlulbayt (fvmh) holdt
            fast ved. I det offentlige rom er det et voksende behov for kjennskap
            til islam. Vi håper at alle sammen, muslimer som ikke-muslimer, har
            gleden av å bruke kunnskapen «Veien til Allah»-prosjektet tilbyr. Følg
            oss gjerne på:
          </Text>
          <View
            style={{
              alignItems: 'center',
              marginTop: 30,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons
                style={{marginRight: 5}}
                name="logo-facebook"
                size={20}
                color={colors.Blue}
              />
              <Text style={[socialText, RalewaySemiBold]}>veientilallah</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Ionicons
                style={{marginLeft: 20, marginRight: 5}}
                name="logo-instagram"
                size={20}
                color={colors.Blue}
              />
              <Text style={[socialText, RalewaySemiBold]}>veientilallah</Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 30,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons
                style={{marginRight: 5}}
                name="logo-youtube"
                size={20}
                color={colors.Blue}
              />
              <Text style={[socialText, RalewaySemiBold]}>veientilallah</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Ionicons
                style={{marginLeft: 20, marginRight: 5}}
                name="logo-twitter"
                size={20}
                color={colors.Blue}
              />
              <Text style={[socialText, RalewaySemiBold]}>veientilallah</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.orangeDark,
  },
  innerContainer: {
    backgroundColor: colors.orangeLight,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '100%'
  },
  socialText: {
    color: colors.Blue,
  },
  aboutText: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },
  headerTitle: {
    textAlign: 'center',
    paddingVertical: 12,
    color: colors.red,
    fontWeight: 'bold',
    fontSize: 17,
  },
  headerContainer: {
    backgroundColor: colors.orangeLight,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
});

export default AboutUsScreen;

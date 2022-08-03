import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../../components/Header';
import Fonts from '../../styles/Fonts';
import {colors} from '../../styles/colors';

const TaqibaatScreen = ({navigation}) => {
  const {container, innerContainer, titleContainer, titleText} = styles;
  const data = [
    {title: 'DUA FAJR', id: 1, header: 'Dua Fajr', data: 'Fajr'},
    {title: 'DUA DHUR', id: 2, header: 'Dua Dhur', data: 'Dhur'},
    {title: 'DUA ASR', id: 3, header: 'Dua Asr', data: 'Asr'},
    {title: 'DUA MAGHRIB', id: 4, header: 'Dua Maghrib', data: 'Maghrib'},
    {title: 'DUA ISHA', id: 5, header: 'Dua Isha', data: 'Isha'},
  ];
  const {RalewaySemiBold, RalewayBold} = Fonts;
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('TaqibaatDetailScreen', {
            title: item.header,
            data: item.data,
          })
        }
        style={titleContainer}
        activeOpacity={0.7}>
        <Text style={[titleText, RalewayBold]}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={container}>
      <Header title={'Prayer'} navigation={navigation} />
      <View style={innerContainer}>
        <FlatList
          data={data}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 30,
            paddingTop: 30,
          }}
          renderItem={renderItem}
        />
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
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
  },
  titleContainer: {
    alignItems: 'center',
    borderRadius: 30,
    padding: 15,
    backgroundColor: colors.lightgrey,
    marginBottom: 25,
    elevation: 4,
  },
  titleText: {
    fontSize: 20,
    color: colors.orangeDark,
  },
});

export default TaqibaatScreen;

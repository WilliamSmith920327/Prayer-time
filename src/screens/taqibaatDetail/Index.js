import React, {useLayoutEffect} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Dua} from '../../components/Data';
import Header from '../../components/Header';
import {colors} from '../../styles/colors';

const TaqibaatDetailScreen = props => {
  const {
    container,
    headerTitle,
    titleContainer,
    headerContainer,
    titleText,
    containerStyle,
    innerContainer,
  } = styles;
  //   useLayoutEffect(() => {
  //     props.navigation.setOptions({
  //       headerTitle: props.route.params.title,
  //     });
  //   }, []);

  const data = props.route.params.data;

  const renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity style={titleContainer} activeOpacity={0.7}>
          <Text style={[titleText]}>{item.arabic}</Text>
          <Text style={[titleText, {marginBottom: 20}]}>{item.nor}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={container}>
      <Header title={'TaqibaatScreen'} navigation={props.navigation} />
        <View style={innerContainer}>
          <View
            style={{
              marginHorizontal: 39,
              marginTop: 10,
              height: '80%',
              borderColor: colors.orangeMedium,
              borderWidth: 1,
              borderRadius: 15,
              backgroundColor: '#fff',
              elevation: 4,
              margin: 5,
              paddingBottom: 10
            }}>
            <View style={headerContainer}>
              <Text style={headerTitle}>{props.route.params.title}</Text>
            </View>
            <FlatList
              data={
                data === 'Fajr'
                  ? Dua.Fajr
                  : data === 'Dhur'
                  ? Dua.Dhur
                  : data === 'Asr'
                  ? Dua.Asr
                  : data === 'Maghrib'
                  ? Dua.Maghrib
                  : Dua.Isha
              }
              contentContainerStyle={containerStyle}
              renderItem={renderItem}
            />
          </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.orangeMedium,
  },
  innerContainer: {
    backgroundColor: colors.orangeExtraLight,
    marginTop: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 3,
    height: '100%'
  },
  titleContainer: {
    justifyContent: 'space-between',
  },
  titleContainer1: {
    backgroundColor: colors.orangeMedium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  titleText: {
    fontSize: 17,
    paddingBottom: 12,
    paddingHorizontal: 20,
    color: '#000000',
    textAlign: 'center',
  },
  containerStyle: {
    borderColor: colors.orangeMedium,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: colors.orangeLight,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    borderColor: colors.orangeMedium,
  },
  headerTitle: {
    textAlign: 'center',
    paddingVertical: 12,
    color: colors.orangeDark,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default TaqibaatDetailScreen;

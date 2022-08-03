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
import Fonts from '../../styles/Fonts';

const DuaDetailScreen = props => {
  const {
    container,
    headerTitle,
    titleContainer,
    headerContainer,
    titleText,
    containerStyle,
    innerContainer,
  } = styles;

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerTitle: props.route.params.title,
    });
  }, []);

  const {RalewayMedium} = Fonts;

  const data = props.route.params.data;

  const renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity style={titleContainer} activeOpacity={0.7}>
          <Text style={[titleText, RalewayMedium]}>{item.arabic}</Text>
          <Text style={[titleText, {marginBottom: 20}, RalewayMedium]}>{item.nor}</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={container}>
      <Header title={'DuaScreen'} navigation={props.navigation} />
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
            <Text style={[headerTitle , RalewayMedium]}>{props.route.params.title}</Text>
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
    backgroundColor: colors.orangeDark,
  },
  innerContainer: {
    backgroundColor: colors.orangeLight,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 3,
    height: '100%'
  },
  titleContainer: {
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 17,
    paddingBottom: 12,
    paddingHorizontal: 20,
    color: colors.Blue,
    textAlign: 'center',
  },
  containerStyle: {
    paddingTop: 10,
  },
  headerContainer: {
    backgroundColor: colors.orangeLight,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  headerTitle: {
    textAlign: 'center',
    paddingVertical: 12,
    color: colors.red,
    fontWeight: 'bold',
    fontSize: 17,
  },
});

export default DuaDetailScreen;

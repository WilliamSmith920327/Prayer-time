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
import {colors} from '../../styles/colors';
import Header from '../../components/Header';

const PrayerScreen = ({navigation}) => {
  // const [page, setPage] = useState('main');

  const {container, innerContainer, titleContainer, titleText} = styles;
  const mian_data = [
    {title: 'BERGEN', id: 1},
    {title: 'KRISTIANSAND', id: 2},
    {title: 'OSLO', id: 3},
    {title: 'STAVANGER', id: 4},
    {title: 'TRONDHEIM', id: 5},
  ];
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('PrayerDetailScreen', {title: item.title})
        }
        style={titleContainer}
        activeOpacity={0.7}>
        <Text style={titleText}>{item.title}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={container}>
      <Header title={'Prayer'} navigation={navigation} />
      <View style={innerContainer}>
        <FlatList
          data={mian_data}
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
    fontWeight: 'bold',
    color: colors.orangeDark,
  },
});

export default PrayerScreen;

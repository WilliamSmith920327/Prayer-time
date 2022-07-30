import React, { useEffect } from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getMonth} from '../../components/PrayerTableData';
import {colors} from '../../styles/colors';
import Header from '../../components/Header';

const PrayerDetailScreen = props => {
  const city = props.route.params.title;
  const date = new Date();
  const month = date.getMonth();
  const data = getMonth(city, month);
  const {container, headerText, tableHeader, itemText, tableContainer, innerContainer} = styles;

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginHorizontal: 10,
        }}>

        <Text numberOfLines={1} style={[itemText]}>
          {item.date.getUTCDate() +'.'+ (item.date.getUTCMonth() + 1)}
        </Text>
        <Text style={[itemText]}>{item.imsak}</Text>
        <Text style={[itemText]}>{item.fajr}</Text>
        <Text style={[itemText]}>{item.sunrise}</Text>
        <Text style={[itemText]}>{item.dhuhr}</Text>
        <Text style={[itemText]}>{item.sunset}</Text>
        <Text style={[itemText]}>{item.maghrib}</Text>
      </View>
    );
  };

  return (
    <View style={container}>
        <Header title={'Prayer'} navigation={props.navigation} />
        <View style={innerContainer}>
          {/* <Text style={headerText}>{props.route.params.title}</Text> */}
          <View
            style={{
              // height: '80%',
              marginHorizontal: 39,
              marginTop: 30,
              marginBottom: 80,
              borderColor: colors.orangeMedium,
              borderWidth: 1,
              borderRadius: 15,
              backgroundColor: '#fff',
              elevation: 4,
              margin: 5,
              paddingBottom: 10
            }}>
            <View style={tableContainer}>
              <Text style={[tableHeader]}>Dato</Text>
              <Text style={[tableHeader]}>Imsak</Text>
              <Text style={[tableHeader]}>Fajr</Text>
              <Text style={[tableHeader]}>Solopp</Text>
              <Text style={[tableHeader]}>Dhur</Text>
              <Text style={[tableHeader]}>Solned</Text>
              <Text style={[tableHeader]}>Maghrib</Text>
            </View>
            <FlatList
              data={data}
              contentContainerStyle={{
                backgroundColor: '#fff',
                borderRadius: 15,
              }}
              renderItem={renderItem}
              keyExtractor={item => item.date}
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
    flex: 1,
    marginTop: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
  },
  headerText: {
    fontSize: 18,
    color: 'grey',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  tableHeader: {
    color: colors.orangeDark,
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: -0.7
  },
  itemText: {
    color: '#000000',
    flex: 1,
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
    letterSpacing: -0.7
  },
  tableContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    backgroundColor: colors.orangeLight,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 10,
  },
});

export default PrayerDetailScreen;

import React, { useEffect, useState } from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import {getMonthdata} from '../../components/PrayerTableData';
import {colors} from '../../styles/colors';
import Header from '../../components/Header';
import SunCalc from 'suncalc';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const times = SunCalc.getTimes(new Date(), 59.9167, 10.75);
var sunriseStr = times.sunrise.getHours() + ':' + times.sunrise.getMinutes();
console.log(times);

const PrayerDetailScreen = props => {
  const city = props.route.params.title;
  const date = new Date();
  const [month, setMonth] = useState(date.getMonth());
  const data = getMonthdata(city, month);
  const {container, tableHeader, itemText, tableContainer, innerContainer} = styles;
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const renderItem = ({item}) => {
    const item_month = item.date.getUTCMonth();
    const item_date = item.date.getUTCDate();
    const item_fajr = item.fajr.split(':');
    if((item_month == 3 && item_date >= 28) || (item_month == 7 && item_date <= 15) || (item_month >= 4 && item_month <= 6)) {
      const fajr_min = Number(item_fajr[1]) + 30;
      if(fajr_min >= 60){
        item_fajr[0] = (Number(item_fajr[0]) + 1).toString();
        item_fajr[1] = (fajr_min - 60).toString();
      }
      item_fajr[1] = fajr_min.toString();
    }

    return (
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginHorizontal: 10,
        }}>

        <Text numberOfLines={1} style={[itemText]}>
          {item_date +'.'+ (item_month + 1)}
        </Text>
        <Text style={[itemText]}>{item.imsak}</Text>
        <Text style={[itemText]}>{`${(item_fajr[0]/100).toString().substr(2)}:${(item_fajr[1]/100).toString().substr(2)}`}</Text>
        <Text style={[itemText]}>{item.sunrise}</Text>
        <Text style={[itemText]}>{item.dhuhr}</Text>
        <Text style={[itemText]}>{item.sunset}</Text>
        <Text style={[itemText]}>{item.maghrib}</Text>
      </View>
    );
  };

  return (
    <View style={container}>
        <Header title={'PrayerScreen'} navigation={props.navigation} />
        <View style={innerContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', marginHorizontal: 45, marginTop: 30}}>
            <TouchableOpacity onPress={() => {month > 0 ? setMonth(month - 1): ''}}>
              <FontAwesome name="chevron-left" size={22} color={colors.orangeDark}/>
            </TouchableOpacity>
            <TouchableOpacity>
            <Text style={{fontSize: 18, color: colors.Blue}}>{`  ${months[month]}  ${date.getUTCFullYear()}  `}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {month < 11 ? setMonth(month + 1): ''}}>
            <FontAwesome name="chevron-right" size={22} color={colors.orangeDark}/>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginHorizontal: 39,
              marginTop: 10,
              borderColor: colors.orangeDark,
              borderWidth: 1,
              borderRadius: 15,
              backgroundColor: colors.lightgrey,
              elevation: 4,
              margin: 5,
              paddingBottom: 10,
              height: '80%'
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
                backgroundColor: colors.lightgrey,
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
    backgroundColor: colors.orangeDark,
  },
  innerContainer: {
    backgroundColor: colors.orangeLight,
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: 5,
    height: '100%'
  },
  tableHeader: {
    color: colors.red,
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    letterSpacing: -0.7
  },
  itemText: {
    color: colors.Blue,
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

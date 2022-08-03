import React, {useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../../styles/colors';
import Fonts from '../../styles/Fonts';
import {getDay} from '../../components/PrayerTableData';
import SelectDropdown from 'react-native-select-dropdown';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RenderItem from './RenderItem';
import Header from '../../components/Header';
import CountDown from 'react-native-countdown-component';
import { Shadow } from 'react-native-shadow-2';

const HomeScreen = ({navigation}) => {
  const [city, setCity] = useState('OSLO');
  const [alarm, setAlarm] = useState();
  useEffect (() => {
    getDay(city);
  },[city]);
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const DayData = getDay(city);
  const data = [
    {key: 'Imsak', value: DayData.imsak},
    {key: 'Fajr', value: DayData.fajr},
    {key: 'Soloppgang', value: DayData.sunrise},
    {key: 'Dhur', value: DayData.dhuhr},
    {key: 'Asr', value: DayData.asr},
    {key: 'Solnedgang', value: DayData.sunset},
    {key: 'Maghrib', value: DayData.maghrib},
    {key: 'Isha', value: DayData.isha},
    {key: 'Midnatt', value: DayData.midnight}];

  const {
    container,
    innerContainer,
    titleContainer,
    buttonStyle,
    dropdownStyle,
    dateStyle,
    nextStyle,
    buttonTextStyle
  } = styles;
  const {RalewayMedium, RalewayBold} = Fonts;

  const cities = ['BERGEN', 'KRISTIANSAND', 'OSLO', 'STAVANGER', 'TRONDHEIM'];
  const today = new Date();
  const now_seconds = today.getTime();

  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const dataArray = [];

  data.forEach(element => {
    const array_time = element.value.split(":");
    const hr = Number(array_time[0]);
    const min = Number(array_time[1]);
    const element_time = new Date(year, month, date, hr, min);
    const element_seconds = element_time.getTime();
    const near = element_seconds - now_seconds;
    const ele = {key: element.key, sec: near};
    
    if (near > 0) {dataArray.push(ele)};
  });
  const nextAlarm = dataArray.length > 0 ? dataArray[0].key : '';
  dataArray.sort(function(a, b){return a.sec - b.sec});
  const until = dataArray.length > 0 ? dataArray[0].sec : 0;

  const listHeader = () => {
    return (
      <View>
        <TouchableOpacity
          style={titleContainer}
          activeOpacity={0.7}>
          <View style={{width: '60%'}}>
            <SelectDropdown
              data={cities}
              buttonStyle={buttonStyle}
              buttonTextStyle={buttonTextStyle}
              dropdownStyle={dropdownStyle}
              defaultValue={city}
              onSelect={(selectedItem, index) => {
                setCity(selectedItem);
              }}
              renderDropdownIcon={ () =>
                  (<MaterialIcons
                    style={{fontWeight: '900', color: colors.red}}
                    size={20}
                    origin={'arrow-drop-down-circle'}
                    name={'arrow-drop-down-circle'}
                  />)
              }
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
            />
          </View>
          <View style={{width: '40%'}}>
            <Text
              style={[
                RalewayMedium,dateStyle
              ]}>
              {(DayData.date.getUTCDate()/100).toString().substr(2) + " " + months[DayData.date.getMonth()]}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  };
  
  const renderItem = ({item, index}) => {
    return (
      <RenderItem item={item} index={index} nextAlarm={nextAlarm}/>
    );
  };
  return (
    <View style={container}>
      <Header title={'Home'} navigation={navigation} />
      <View style={innerContainer}>
        <FlatList
          ListHeaderComponent={listHeader}
          data={data}
          contentContainerStyle={{
            marginHorizontal: 39,
            marginTop: 30,
            borderColor: colors.orangeDark,
            borderWidth: 1,
            borderRadius: 15,
            backgroundColor: colors.lightgrey,
            elevation: 4,
            margin: 5,
          }}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={[nextStyle, RalewayMedium]}>Next: &nbsp;</Text>
          <Text style={[nextStyle, RalewayMedium]}>{nextAlarm}</Text>
        </View>
        <CountDown
          size={30}
          until={until/1000}
          onFinish={() => alert(nextAlarm)}
          digitStyle={{marginBottom: 0,width: 60}}
          digitTxtStyle={{color: colors.Blue}}
          timeToShow={['H', 'M', 'S']}
          timeLabels={{m: null, s: null}}
          showSeparator
          running={true}
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
    backgroundColor: colors.orangeLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    marginBottom: 5,
    paddingBottom: 5
  },
  buttonStyle: {
    backgroundColor: colors.orangeLight, 
    width: '100%', 
    height:40, 
    padding: 0, 
    borderRadius: 20,
    color: colors.red
  },
  dropdownStyle: {
    backgroundColor: colors.orangeLight, 
    borderRadius: 10,
    color: colors.red
  },
  dateStyle: {
    color: colors.red, 
    textAlign: 'center', 
    fontWeight: 'bold', 
    fontSize: 17, 
    backgroundColor: colors.orangeLight, 
    width: '100%', 
    height: 40, 
    paddingTop: 10, 
    paddingLeft: 20, 
    borderRadius: 20, 
  },
  nextStyle: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: colors.red
  },
  buttonTextStyle: {
    color: colors.red
  }
});

export default HomeScreen;

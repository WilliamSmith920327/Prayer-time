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

const HomeScreen = ({navigation}) => {

  const [city, setCity] = useState('OSLO');
  const [alarm, setAlarm] = useState();
  useEffect (() => {
    getDay(city);
  },[city]);

  const DayData = getDay(city);
  const data = [
    {key: 'Imsak', value: DayData.imsak},
    {key: 'Fire', value: DayData.fajr},
    {key: 'Sunrise', value: DayData.sunrise},
    {key: 'Dhur', value: DayData.dhuhr},
    {key: 'Asr', value: DayData.asr},
    {key: 'Sunset', value: DayData.sunset},
    {key: 'Maghrib', value: DayData.maghrib},
    {key: 'Isha', value: DayData.isha},
    {key: 'Midnight', value: DayData.midnight}];

  const {
    container,
    innerContainer,
    titleContainer1,
    titleHeaderText
  } = styles;
  const {RalewayMedium, RalewayBold} = Fonts;

  const cities = ['BERGEN', 'KRISTIANSAND', 'OSLO', 'STAVANGER', 'TRONDHEIM'];
  const today = new Date();
  const now_seconds = today.getTime();

  const year = today.getFullYear();
  const month = today.getMonth();
  const date = today.getDate();
  const dataArray = [];
  console.log(date);

  data.forEach(element => {
    const array_time = element.value.split(":");
    const hr = Number(array_time[0]);
    const min = Number(array_time[1]);
    const element_time = new Date(year, month, date, hr, min);
    const element_seconds = element_time.getTime();
    const near = element_seconds - now_seconds;
    const ele = {key: element.key, sec: near};
    console.log(element_time, today);
    
    if (near > 0) {dataArray.push(ele)};
  });
  const nextAlarm = dataArray.length > 0 ? dataArray[0].key : '';
  dataArray.sort(function(a, b){return a.sec - b.sec});
  console.log(dataArray);
  const until = dataArray.length > 0 ? dataArray[0].sec : 0;

  const listHeader = () => {
    return (
      <View>
        <TouchableOpacity
          style={
            [titleContainer1, {paddingTop: 10, marginBottom: 6}]
          }
          activeOpacity={0.7}>
          <View style={{width: '60%'}}>
            <SelectDropdown
              data={cities}
              buttonStyle={{backgroundColor: colors.orangeMedium, width: '100%', height:40, padding: 0, borderTopRightRadius: 20 , borderBottomRightRadius: 20, marginBottom: 10}}
              buttonTextStyle={[titleHeaderText, {color: colors.darkBlue, paddingLeft: 0, fontSize: 10}, RalewayBold]}
              dropdownStyle={{backgroundColor: colors.orangeLight, borderRadius: 10}}
              defaultValue={city}
              // dropdownIconPosition={'left'}
              onSelect={(selectedItem, index) => {
                // console.log(selectedItem, index);
                setCity(selectedItem);
              }}
              renderDropdownIcon={ () =>
                  (<MaterialIcons
                    style={{fontWeight: '900'}}
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
                RalewayMedium,
                { fontWeight: 'bold', fontSize: 13, backgroundColor: colors.orangeMedium, width: '100%', height:40, paddingTop: 10, paddingLeft: 20, borderBottomLeftRadius: 20 , borderTopLeftRadius: 20, marginBottom: 10}
              ]}>
              {DayData.date.toDateString()}
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
            borderColor: colors.orangeMedium,
            borderWidth: 1,
            borderRadius: 15,
            backgroundColor: '#fff',
            elevation: 4,
            margin: 5,
          }}
          renderItem={renderItem}
          keyExtractor={item => item.key}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={[{textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: colors.orangeDark}, RalewayMedium]}>Next: &nbsp;</Text>
          <Text style={[{textAlign: 'center', fontWeight: 'bold', fontSize: 20, color: colors.orangeDark}, RalewayMedium]}>{nextAlarm}</Text>
        </View>
        <CountDown
          size={30}
          until={until/1000}
          onFinish={() => alert(nextAlarm)}
          digitStyle={{marginBottom: 40}}
          digitTxtStyle={{color: colors.darkBlue,}}
          timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
          separatorStyle={{marginBottom: 42}}
          timeToShow={['H', 'M', 'S']}
          timeLabels={{m: null, s: null}}
          showSeparator
          running={false}
        />
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginHorizontal: 10,
  },
  titleContainer1: {
    backgroundColor: colors.orangeLight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // paddingHorizontal: 10
  },
  titleText: {
    fontSize: 17,
    paddingBottom: 12,
    paddingHorizontal: 20,
  },
  titleHeaderText: {
    fontSize: 17,
  },
});

export default HomeScreen;

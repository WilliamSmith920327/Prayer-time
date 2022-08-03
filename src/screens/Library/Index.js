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
import Fonts from '../../styles/Fonts';
import Header from '../../components/Header';
const LibraryScreen = ({navigation}) => {
  const {container, innerContainer, titleContainer, titleText} = styles;
  const {RalewaySemiBold, RalewayBold} = Fonts;
  const data = [
    {title: 'Profeten Mohammad', id: 1, data: 'Profeten Mohammad'},
    {title: 'Imam Ali', id: 2, data: 'Imam Ali'},
    {title: 'Fatima Zahra', id: 3, data: 'Fatima Zahra'},
    {title: 'Imam Hassan', id: 4, data: 'Imam Hassan'},
    {title: 'Imam Hussain', id: 5, data: 'Imam Hussain'},
    {title: 'Imam Ali Sajjad', id: 6, data: 'Imam Ali Sajjad'},
    {title: 'Imam Mohammad Baqir', id: 7, data: 'Imam Mohammad Baqir'},
    {title: 'Imam Jafar Sadiq', id: 8, data: 'Imam Jafar Sadiq'},
    {title: 'Imam Musa Kadhim', id: 9, data: 'Imam Musa Kadhim'},
    {title: 'Imam Ali Ridha', id: 10, data: 'Imam Ali Ridha'},
    {title: 'Imam Mohammad Jawad', id: 11, data: 'Imam Mohammad Jawad'},
    {title: 'Imam Ali Hadi', id: 12, data: 'Imam Ali Hadi'},
    {title: 'Imam Hassan Askari', id: 13, data: 'Imam Hassan Askari'},
    {title: 'Imam Mohammad Mahdi', id: 14, data: 'Imam Mohammad Mahdi'},
  ];
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('LibraryDetailScreen', {
            data: item.data,
            id: item.id,
          })
        }
        style={titleContainer}
        activeOpacity={0.7}>
        <Text style={[titleText, RalewayBold]}>{item.title.toUpperCase()}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={container}>
      <Header title={'HomeScreen'} navigation={navigation} />
      <View style={innerContainer}>
        <View style={{marginTop: 30}}>
          <FlatList
            data={data}
            contentContainerStyle={{
              paddingHorizontal: 20,
              paddingBottom: 30,
            }}
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
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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

export default LibraryScreen;

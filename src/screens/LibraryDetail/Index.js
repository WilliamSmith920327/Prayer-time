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
import {LibraryData} from '../../components/LibraryData';
import {colors} from '../../styles/colors';
import Fonts from '../../styles/Fonts';
import Header from '../../components/Header';
import RenderHtml from 'react-native-render-html';

const LibraryDetailScreen = props => {
  const {
    container,
    headerTitle,
    titleContainer,
    headerContainer,
    containerStyle,
    innerContainer,
  } = styles;

  const {data, id} = props.route.params;
  const source = {
    html: LibraryData[id - 1].data,
  };
  const {RalewaySemiBold, RalewayBold} = Fonts;
  return (
    <View style={container}>
      <Header title={'LibraryScreen'} navigation={props.navigation} />
      <View style={innerContainer}>
        <View style={headerContainer}>
          <Text style={[headerTitle, RalewayBold]}>{data}</Text>
        </View>
        <ScrollView style={containerStyle}>
          <TouchableOpacity style={titleContainer} activeOpacity={0.7}>
            <RenderHtml
              source={source}
              baseStyle={{
                marginHorizontal: 15,
                color: colors.grey,
                fontFamily: 'Raleway-Medium',
              }}
              systemFonts={['Raleway-Regular']}
            />
          </TouchableOpacity>
        </ScrollView>
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
    justifyContent: 'space-between',
  },
  containerStyle: {
    marginHorizontal: 20,
    borderColor: colors.orangeMedium,
    borderWidth: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 30,
    backgroundColor: '#fff',
    borderTopWidth: 0,
    elevation: 4,
  },
  headerContainer: {
    backgroundColor: colors.orangeLight,
    marginHorizontal: 20,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginTop: 30,
    borderColor: colors.orangeMedium,
    borderWidth: 1,
    borderBottomWidth: 0,
    elevation: 4,
  },
  headerTitle: {
    textAlign: 'center',
    paddingVertical: 12,
    color: colors.orangeDark,
    fontSize: 16,
  },
});

export default LibraryDetailScreen;

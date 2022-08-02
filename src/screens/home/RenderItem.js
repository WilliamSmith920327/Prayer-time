import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
import {colors} from '../../styles/colors';
import Fonts from '../../styles/Fonts';

const RenderItem = (props) => {
    const {item, index, nextAlarm} = props;
    const {titleContainer, titleText} = styles;
    const {RalewayMedium, RalewayBold} = Fonts;

    return (
        <View>
            <TouchableOpacity
                style={
                    item.key === nextAlarm
                    ? [titleContainer, {backgroundColor: colors.orangeExtraLight, borderRadius: 20}]
                    : titleContainer
                }
                activeOpacity={0.7}>
            <View style={{width: '70%'}}>
                <Text
                style={[
                    titleText,
                    {color: colors.darkBlue,marginTop: 2},
                    RalewayBold,
                ]}>
                {item.key}
                </Text>
            </View>
            <View>
                <Text
                style={[
                    titleText,
                    {color: colors.darkBlue},
                    RalewayMedium,
                ]}>
                {item.value}
                </Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

export default RenderItem;

const styles = StyleSheet.create({
    titleContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginHorizontal: 15,
      marginVertical: 2
    },
    titleText: {
      fontSize: 17,
      paddingBottom: 10,
      paddingHorizontal: 20,
    },
  });
import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNav from './src/navigation/MainRoutes';
import RNBootSplash from "react-native-bootsplash";

const App = () => {
  const {backgroundStyle} = styles;

  return (
    <View style={backgroundStyle}>
      <NavigationContainer onReady={() => RNBootSplash.hide()}>
        <DrawerNav />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  backgroundStyle: {
    flex: 1,
  },
});

export default App;

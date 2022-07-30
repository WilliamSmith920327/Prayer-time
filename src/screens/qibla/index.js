import React, {useState, useEffect} from 'react';
import {Image, StyleSheet, Text, View, ImageBackground} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../../styles/colors';
import CompassHeading from 'react-native-compass-heading';
import Header from '../../components/Header';
import asturlab from 'asturlab';
import { Shadow } from 'react-native-shadow-2';

const QiblaScreen = props => {
  const [compassHeading, setCompassHeading] = useState(0);
  const {container} = styles;
  const qibla = asturlab('59.9167', '10.75');
  // console.log(qibla);

  useEffect(() => {
    const degree_update_rate = 3;

    // accuracy on android will be hardcoded to 1
    // since the value is not available.
    // For iOS, it is in degrees
    CompassHeading.start(degree_update_rate, ({heading, accuracy}) => {
      setCompassHeading(heading);
    });

    return () => {
      CompassHeading.stop();
    };
  }, []);

  return (
    <View style={container}>
      <Header title={'Prayer'} navigation={props.navigation} />
      <View
        style={{
          backgroundColor: colors.orangeExtraLight,
          flex: 1,
          justifyContent: "center",
          marginTop: 30,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          elevation: 30,
          padding: 35,
        }}>
          <Shadow
            distance={10}  
            radius={200}
            >
            <ImageBackground 
              source={require('../../assets/images/compass_background.png')} 
              resizeMode="contain"
              style={styles.imageBackground}
            >
              <Image
                  style={[
                    styles.direction,
                    {transform: [{rotate: `${-51 + 90 }deg`}]},
                  ]}
                  resizeMode="center"
                  source={require('../../assets/images/compass_direction.png')}
                />
        </ImageBackground>
        </Shadow>
        <View>
          <Text style={{textAlign: "center", paddingTop: 40}}>
            Qibla: {qibla.toFixed(0)} degrees from South
          </Text>
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
  imageBackground: {
    width: "100%",
    aspectRatio: 1,
  },
  direction: {
    height: '100%',
    aspectRatio: 1,
  }
});

export default QiblaScreen;

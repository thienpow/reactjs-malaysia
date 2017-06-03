import React from 'react';
import {
  Animated,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';

import {
  NavigationBar
} from '@expo/ex-navigation';
import {
  Constants,
} from 'expo';
import {
  MaterialIcons,
} from '@expo/vector-icons';
import { connect } from 'react-redux';
import TouchableNativeFeedback from '@expo/react-native-touchable-native-feedback-safe';

import Actions from '../state/Actions';
import { BoldText } from '../components/StyledText';

@connect()
export default class SettingsScreen extends React.Component {

  static route = {
    navigationBar: {
      title: 'About',
    },
  }

  render() {
    return (
      <View style={styles.container}>
      <View style={{height: 80,}} />
      <ScrollView style={{width: '80%',}}>
          <BoldText>Hello World, ReactJS Malaysia Meetup!</BoldText>

      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

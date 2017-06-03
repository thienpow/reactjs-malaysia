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
import { RegularText, BoldText } from '../components/StyledText';


class OpenURLButton extends React.Component {
  static propTypes = {
    url: React.PropTypes.string,
    label: React.PropTypes.string,
    imageUri: React.PropTypes.string,
  };

  handleClick = () => {
    Linking.canOpenURL(this.props.url).then(supported => {
      if (supported) {
        Linking.openURL(this.props.url);
      } else {
        console.log('Don\'t know how to open URI: ' + this.props.url);
      }
    });
  };

  render() {
    return (
      <TouchableOpacity
        onPress={this.handleClick}>
        <View style={styles.button}>
          <Image style={{width: 72, height: 72,}} source={{uri: this.props.imageUri}} />
          <RegularText style={styles.text}>{this.props.label}</RegularText>
        </View>
      </TouchableOpacity>
    );
  }
}


@connect()
export default class LinksScreen extends React.Component {

  static route = {
    navigationBar: {
      title: 'Links',
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{width: '80%'}}>
            <OpenURLButton
              label='ReactJS Malaysia Facebook Group'
              url={'https://www.facebook.com/groups/766491493448337/'}
              imageUri={'https://upload.wikimedia.org/wikipedia/en/thumb/9/92/React-native-icon.svg/1280px-React-native-icon.svg.png'}
            />
            <OpenURLButton
              label='Co-Labs Facebook Page'
              url={'https://www.facebook.com/colabs.asia/'}
              imageUri={'https://pbs.twimg.com/profile_images/829219540995362819/f5H03Z-m.jpg'}
            />
        </ScrollView>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    width: '100%',
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 10,
  },
});

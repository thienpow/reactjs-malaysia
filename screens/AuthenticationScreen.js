import React from 'react';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { Facebook } from 'expo';
import {
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import TouchableNativeFeedback from '@expo/react-native-touchable-native-feedback-safe';
import FadeIn from '@expo/react-native-fade-in-image';

import Actions from '../state/Actions';
import Layout from '../constants/Layout';
import { RegularText } from '../components/StyledText';
import { User } from '../state/Records';

@connect()
export default class AuthenticationScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <FadeIn placeholderStyle={{backgroundColor: 'transparent'}}>
          <Image
            style={{width: 192, height: 192, marginBottom: 120,}}
            source={require('../assets/images/logo.png')}
          />
        </FadeIn>
        <TouchableNativeFeedback onPress={this._signInWithFacebook}>
          <View style={styles.facebookButton}>
            <RegularText style={styles.facebookButtonText}>
              <MaterialCommunityIcons name='facebook' size={24} color="#fff" />
              Login with Facebook
            </RegularText>
          </View>
        </TouchableNativeFeedback>
        <View style={{width: 50, height: 150,}} />
      </View>
    );
  }

  _signInWithFacebook = async () => {
    const result = await Facebook.logInWithReadPermissionsAsync('807843306048719', {
      permissions: ['public_profile'],
      behavior: Platform.OS === 'ios' ? 'web' : 'system',
    });

    if (result.type === 'success') {
      let response = await fetch(`https://graph.facebook.com/me?access_token=${result.token}`);
      let info = await response.json();

      this.props.dispatch(Actions.signIn(new User({
        id: info.id,
        authToken: result.token,
        name: info.name,
        isGuest: false,
      })));
    }
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  facebookButton: {
    backgroundColor: '#3b5998',
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 5,
    width: 210,
  },
  facebookButtonText: {
    fontSize: 14,
    color: '#fff',
  },
});

import React from 'react';
import {
  Animated,
  Image,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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

import * as firebase from 'firebase';
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCG5X6BksDPisuH-2Y6VZkDUsvdL4bTwqc",
  authDomain: "reactjs-malaysia.firebaseapp.com",
  databaseURL: "https://reactjs-malaysia.firebaseio.com",
  projectId: "reactjs-malaysia",
  storageBucket: "reactjs-malaysia.appspot.com",
  messagingSenderId: "92912984996"
};


firebase.initializeApp(firebaseConfig);


@connect(data => HomeScreen.getDataProps(data))
export default class HomeScreen extends React.Component {

  static route = {
      navigationBar: {
        title: 'Home',
        visible: false,
      },
  }

  static getDataProps(data) {
    return {
      currentUser: data.currentUser,
    }
  }

  constructor(props){
    super(props);

    this.state = {
      uid: null,
      email: '',
      FBName: '',
      phone: '',
      status: '',
    };

    // Listen for authentication state to change.
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({
          uid: user.uid,
        });
        //console.log("We are authenticated now!");
        this.checkInUser(user);

        this.setupMailingListListener(user.uid);
      }

      // Do other things
    });


    // Build Firebase credential with the Facebook access token.
    const credential = firebase.auth.FacebookAuthProvider.credential(this.props.currentUser.authToken);

    // Sign in with credential from the Facebook user.
    firebase.auth().signInWithCredential(credential).catch((error) => {
      // Handle Errors here.
    });
  }

  checkInUser = (user) => {
    let FBuser = this.props.currentUser;
    if (user != null) {
      firebase.database().ref('checkedIn/' + user.uid).set({
        FBID: FBuser.id,
        name: FBuser.name,
      });
    }
  }

  setupMailingListListener(userId) {
    firebase.database().ref('mailingList/' + userId).on('value', (snapshot) => {
      try {
        if (snapshot != null) {
          if (snapshot.val().email != null) {
            this.setState({
              email: snapshot.val().email,
              FBName: snapshot.val().FBName,
              phone: snapshot.val().phone,
            });
          }
        }
      } catch (e) {

      }


    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{width: '80%'}}>
          <View style={{height: 80,}} />
          <BoldText>Welcome to ReactJS Malaysia Meetup!</BoldText>
          <View style={{height: 20,}} />
          <RegularText>As a courtesy to our venue sponsor Co-Labs, we should subscibe to their mailing list!</RegularText>
          <View style={{height: 20,}} />
          <View style={{flex: 1, flexDirection: 'row'}}>
            <BoldText style={{width: '30%', }}>Email</BoldText>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)'
              multiline={false} autoCorrect={false} autoCapitalize={'none'}
              style={{paddingVertical: 3, paddingHorizontal: 12, height: 40, width: '70%', borderColor: 'gray', borderWidth: 1}}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <BoldText style={{width: '30%', }}>Facebook Username</BoldText>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)'
              multiline={false} autoCorrect={false} autoCapitalize={'none'}
              style={{paddingVertical: 3, paddingHorizontal: 12, height: 40, width: '70%',  borderColor: 'gray', borderWidth: 1}}
              onChangeText={(FBName) => this.setState({FBName})}
              value={this.state.FBName}
            />
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <BoldText style={{width: '30%', }}>Phone #</BoldText>
            <TextInput underlineColorAndroid='rgba(0,0,0,0)'
              multiline={false} autoCorrect={false} autoCapitalize={'none'}
              style={{paddingVertical: 3, paddingHorizontal: 12, height: 40, width: '70%',  borderColor: 'gray', borderWidth: 1}}
              onChangeText={(phone) => this.setState({phone})}
              value={this.state.phone}
            />
          </View>
          <View style={{height: 20,}} />

          <TouchableOpacity onPress={this._updateEmail}>
            <View style={styles.updateButton}>
              <BoldText style={styles.updateButtonText}>
                Update Mailing List
              </BoldText>
            </View>
          </TouchableOpacity>
          <BoldText>
            {this.state.status}
          </BoldText>
        </ScrollView>

      </View>
    );
  }


  _updateEmail = async () => {

    let FBuser = this.props.currentUser;

    if (this.state.email != '') {
      firebase.database().ref('mailingList/' + this.state.uid).set({
        FBID: FBuser.id,
        name: FBuser.name,
        email: this.state.email,
        FBName: this.state.FBName,
        phone: this.state.phone,
      });

      this.setState({
        status: 'Thanks! debug timestamp: ' + Date.now(),
      });

    } else {

      this.setState({
        status: 'At least provide email lah, bro!',
      });

    }


  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  updateButton: {
    borderWidth: 1,
    backgroundColor: '#3b5998',
    paddingVertical: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    borderRadius: 5,
    height: 40,
    width: '100%',
  },
  updateButtonText: {
    fontSize: 14,
    color: '#fff',
  },
});

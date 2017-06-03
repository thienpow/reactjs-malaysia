import Expo, { Font } from 'expo';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NavigationProvider, StackNavigation, withNavigation } from '@expo/ex-navigation';
import { Provider as ReduxProvider, connect } from 'react-redux';
import { List } from 'immutable';

import Actions from './state/Actions';

import LocalStorage from './state/LocalStorage';
import Router from './navigation/Router';
import Store from './state/Store';
import { User } from './state/Records';

//console.ignoredYellowBox = ['Warning: View.propTypes'];
console.disableYellowBox = true;

class AppContainer extends React.Component {
  render() {
    return (
      <ReduxProvider store={Store}>
        <NavigationProvider router={Router}>
          <App {...this.props} />
        </NavigationProvider>
      </ReduxProvider>
    );
  }
}

@withNavigation
@connect(data => App.getDataProps)
class App extends React.Component {
  static getDataProps(data) {
    return {
      currentUser: data.currentUser,
    }
  }

  state = {
    assetsReady: false,
    dataReady: false,
  };

  async componentDidMount() {
    await this._loadAssetsAsync();
    await this._loadCacheAsync();
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.assetsReady || !this.state.dataReady) {
      return;
    }

    const rootNavigator = this.props.navigation.getNavigator('root');
    const previouslySignedIn = isSignedIn(prevProps.currentUser) &&
      prevState.dataReady === this.state.dataReady;
    const currentlySignedIn = isSignedIn(this.props.currentUser);

    if (!previouslySignedIn && currentlySignedIn) {
      rootNavigator.replace('rootNavigation');
    } else if (previouslySignedIn && !currentlySignedIn) {
      rootNavigator.replace('authentication');
    }
  }

  _loadAssetsAsync = async () => {
    await Font.loadAsync({
      ...MaterialIcons.font,
      'OpenSans-Light': require('./assets/fonts/OpenSans-Light.ttf'),
      'OpenSans': require('./assets/fonts/OpenSans-Regular.ttf'),
      'OpenSans-Bold': require('./assets/fonts/OpenSans-Semibold.ttf'),
    });

    this.setState({
      assetsReady: true,
    });
  }

  _loadCacheAsync = async () => {
    let user = new User(await LocalStorage.getUserAsync());
    this.props.dispatch(Actions.setCurrentUser(user));

    this.setState({
      dataReady: true,
    });
  }

  render() {
    if (!this.state.assetsReady || !this.state.dataReady) {
      return <Expo.Components.AppLoading />;
    }

    return (
      <View style={styles.container}>
        <StackNavigation
          id="root"
          defaultRouteConfig={{navigationBar: { backgroundColor: '#000'}}}
          initialRoute={Router.getRoute('authentication')}
        />

      </View>
    );
  }
}

function isSignedIn(userState) {
  return !!userState.authToken || userState.isGuest;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
});

Expo.registerRootComponent(AppContainer);

import { createRouter } from '@expo/ex-navigation';

import AuthenticationScreen from '../screens/AuthenticationScreen';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  authentication: () => AuthenticationScreen,
  home: () => HomeScreen,
  links: () => LinksScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
}), {
  ignoreSerializableWarnings: true,
});

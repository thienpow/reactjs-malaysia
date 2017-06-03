import { AsyncStorage } from 'react-native';

const Keys = {
  User: 'RJMYUser',
};

async function getUserAsync() {
  let results = await AsyncStorage.getItem(Keys.User);

  try {
    if (results != null)
      return JSON.parse(results);
  } catch(e) {
    return null;
  }
}

function saveUserAsync(user) {
  return AsyncStorage.setItem(Keys.User, JSON.stringify(user));
}

function removeUserAsync() {
  return AsyncStorage.removeItem(Keys.User);
}

function clearAllAsync() {
  return AsyncStorage.clear();
}

export default {
  saveUserAsync,
  getUserAsync,
  removeUserAsync,
  clearAllAsync,
};

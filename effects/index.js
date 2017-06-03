import ActionTypes from '../state/ActionTypes';
import signInAsync from './signInAsync';
import signOutAsync from './signOutAsync';

function genericErrorHandler({action, error}) {
  console.log({error, action});
}

export default [
  {action: ActionTypes.SIGN_IN, effect: signInAsync, error: genericErrorHandler},
  {action: ActionTypes.SIGN_OUT, effect: signOutAsync, error: genericErrorHandler},
];

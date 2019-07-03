import { SET_SOCKET, ACCOUNT_CREATED, ACCOUNT_CREATED_FAIL, ACCOUNT_LOGIN, ACCOUNT_LOGIN_FAIL } from '../constants/Action-types';
import { IP } from '../constants/config';

export function setSocket(payload) {
    return { type: SET_SOCKET, payload }
};

export function createAccount(payload) {
    return function(dispatch) {
        return fetch(IP + '/register', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: payload.username,
              password: payload.password,
              isTeacher: payload.teacherAccount
            }),
          })
          .then((response) => response.json())
          .then((responseJson) => {
            dispatch({ type: ACCOUNT_CREATED, payload: responseJson.username })
          })
          .catch((err) => {
            dispatch({ type: ACCOUNT_CREATED_FAIL, payload: err })
          });
    }
};

export function loginAccount(payload) {
  return function(dispatch) {
    return fetch(IP + '/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: payload.username,
        password: payload.password
      }),
    })
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      dispatch({ type: ACCOUNT_LOGIN, payload: responseJson })
    })
    .catch((err) => {
      console.log('47');
      dispatch({ type: ACCOUNT_LOGIN_FAIL, payload: err })
    });
  };
}
import { SET_SOCKET, ACCOUNT_CREATED, ACCOUNT_CREATED_FAIL, ACCOUNT_LOGIN, ACCOUNT_LOGIN_FAIL } from '../constants/Action-types';

const initialState = {
    socket: {},
    createdAccountUsername: '',
    createdAccountError: {},
    loggedInAccountUser: {},
    loggedInAccountError: {}
};

function rootReducer (state = initialState, action) {
    if (action.type === SET_SOCKET){
        return Object.assign({}, state, {
            socket: action.payload
        });
    };

    if (action.type === ACCOUNT_CREATED){
        return {
            ...state,
            createdAccountUsername: action.payload
        };
    }

    if (action.type === ACCOUNT_CREATED_FAIL){
        return Object.assign({}, state, {
            createdAccountError: action.payload
        });
    }

    if (action.type === ACCOUNT_LOGIN){
        return Object.assign({}, state, {
            loggedInAccountUser: action.payload
        });
    }

    if (action.type === ACCOUNT_LOGIN_FAIL){
        return Object.assign({}, state, {
            loggedInAccountError: action.payload
        });
    }

    return state;
};

export default rootReducer;
import { SET_SOCKET } from '../constants/Action-types';

const initialState = {
    socket: {}
};

function rootReducer (state = initialState, action) {
    if (action.type === SET_SOCKET){
        return Object.assign({}, state, {
            socket: action.payload
        });
    };

    return state;
};

export default rootReducer;
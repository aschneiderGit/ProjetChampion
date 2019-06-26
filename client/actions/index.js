import { SET_SOCKET } from '../constants/Action-types';

export function setSocket(payload) {
    return { type: SET_SOCKET, payload }
};
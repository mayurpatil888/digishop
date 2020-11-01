import {SET_USER, REMOVE_USER} from 'src/actions/types';
const initialState = {
  currentUser: null
};

export default function (state=initialState, action ) {
  const { type, payload } = action;
  switch (type) {
  case SET_USER:
    return {...state, currentUser: payload.currentUser };
  case REMOVE_USER:
    return {...state, currentUser: null };
  default:
    return state;
  }
}


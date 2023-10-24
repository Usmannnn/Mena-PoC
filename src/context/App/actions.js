import TYPES from './types';

const actions = {
  setDirection: payload => ({
    type: TYPES.SET_DIRECTION,
    payload,
  }),

  setFocus: payload => ({
    type: TYPES.SET_FOCUS,
    payload,
  }),
};

export default actions;

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

  setRefs: payload => ({
    type: TYPES.SET_REFS,
    payload,
  }),
};

export default actions;

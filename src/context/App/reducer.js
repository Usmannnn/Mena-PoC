import TYPES from './types';

const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.SET_FOCUS:
      return {
        ...state,
        focusKey: action.payload,
      };

    case TYPES.SET_DIRECTION:
      return {
        ...state,
        direction: action.payload,
      };

    default:
      throw new Error();
  }
};

export default reducer;

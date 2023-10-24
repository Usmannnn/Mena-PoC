import {Dimensions} from 'react-native';

export const GetScaledValue = data => {
  return data / (1920 / Dimensions.get('window').width);
};

export const AbstractKeys = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down',
  ENTER_PRESS: 'enterPress',
  PLAY: 'play',
  PAUSE: 'pause',
  PLAY_PAUSE: 'playPause',
  FAST_FORWARD: 'fastForward',
  REWIND: 'rewind',
  STOP: 'stop',
  FOCUS: 'focus',
  BLUR: 'blur',
};

export const NavigationKeys = {
  right: AbstractKeys.RIGHT,
  left: AbstractKeys.LEFT,
  up: AbstractKeys.UP,
  down: AbstractKeys.DOWN,
  select: AbstractKeys.ENTER_PRESS,
  22: AbstractKeys.RIGHT,
  21: AbstractKeys.LEFT,
  19: AbstractKeys.UP,
  20: AbstractKeys.DOWN,
  23: AbstractKeys.ENTER_PRESS,
  66: AbstractKeys.ENTER_PRESS,
  play: AbstractKeys.PLAY,
  pause: AbstractKeys.PAUSE,
  playPause: AbstractKeys.PLAY_PAUSE,
  fastForward: AbstractKeys.FAST_FORWARD,
  rewind: AbstractKeys.REWIND,
  stop: AbstractKeys.STOP,
  focus: AbstractKeys.FOCUS,
  blur: AbstractKeys.BLUR,
};

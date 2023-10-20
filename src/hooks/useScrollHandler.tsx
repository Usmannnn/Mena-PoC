const useScrollHandler = () => {
  const scrollToDirection = (
    direction: 'up' | 'down' | 'left' | 'right' | string,
  ) => {
    switch (direction) {
      case AbstractKeys.DOWN:
        console.log('down');

        break;

      case AbstractKeys.UP:
        console.log('up');

        break;
    }
  };

  return {scrollToDirection};
};

export default useScrollHandler;

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

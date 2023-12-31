import {ImageRequireSource} from 'react-native';
import {GetScaledValue} from '../../methods';

export interface Item {
  focusKey: string;
  uri?: string;
  poster?: ImageRequireSource;
}

export interface IData {
  id: number;
  width: number;
  height: number;
  title: string;
  items: Item[];
}

export interface IState {
  direction: string;
  focusKey: string;
  refs: any[];
  data: IData[];
}

export const initialState: IState = {
  direction: '',
  refs: [],
  focusKey: 'section0_item0',
  data: [
    {
      id: 0,
      width: GetScaledValue(400), // 180,
      height: GetScaledValue(146), //100 ,
      title: 'section0',
      items: [
        {focusKey: 'item0'},
        {focusKey: 'item1'},
        {focusKey: 'item2'},
        {focusKey: 'item3'},
        {focusKey: 'item4'},
        {focusKey: 'item5'},
        {focusKey: 'item6'},
        {focusKey: 'item7'},
        {focusKey: 'item8'},
        {focusKey: 'item9'},
      ],
    },
    {
      id: 1,
      width: GetScaledValue(380),
      height: GetScaledValue(220),
      title: 'section1',
      items: [
        {focusKey: 'item0'},
        {focusKey: 'item1'},
        {focusKey: 'item2'},
        {focusKey: 'item3'},
        {focusKey: 'item4'},
        {focusKey: 'item5'},
        {focusKey: 'item6'},
        {focusKey: 'item7'},
        {focusKey: 'item8'},
        {focusKey: 'item9'},
      ],
    },

    {
      id: 2,
      width: GetScaledValue(240),
      height: GetScaledValue(360),
      title: 'section2',
      items: [
        {focusKey: 'item0'},
        {focusKey: 'item1'},
        {focusKey: 'item2'},
        {focusKey: 'item3'},
        {focusKey: 'item4'},
        {focusKey: 'item5'},
        {focusKey: 'item6'},
        {focusKey: 'item7'},
        {focusKey: 'item8'},
        {focusKey: 'item9'},
      ],
    },

    {
      id: 3,
      width: GetScaledValue(170),
      height: GetScaledValue(340),
      title: 'section3',
      items: [
        {focusKey: 'item0'},
        {focusKey: 'item1'},
        {focusKey: 'item2'},
        {focusKey: 'item3'},
        {focusKey: 'item4'},
        {focusKey: 'item5'},
        {focusKey: 'item6'},
        {focusKey: 'item7'},
        {focusKey: 'item8'},
        {focusKey: 'item9'},
      ],
    },
    {
      id: 4,
      width: GetScaledValue(380),
      height: GetScaledValue(760),
      title: 'section4',
      items: [
        {
          focusKey: 'item0',
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: require('../../../assets/HeroBg.png'),
        },
        {
          focusKey: 'item1',
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: {
            uri: 'https://postercim.net/wp-content/uploads/2019/01/braveheart-film-posteri-600x750.jpg',
          },
        },
        {
          focusKey: 'item2',
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: {
            uri: 'https://postercim.net/wp-content/uploads/2019/01/braveheart-film-posteri-600x750.jpg',
          },
        },
        {
          focusKey: 'item3',

          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: require('../../../assets/image.jpg'),
        },
        {
          focusKey: 'item4',

          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: require('../../../assets/image.jpg'),
        },
        {
          focusKey: 'item5',

          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: require('../../../assets/image.jpg'),
        },
        {
          focusKey: 'item6',

          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: require('../../../assets/image.jpg'),
        },
        {
          focusKey: 'item7',

          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: require('../../../assets/image.jpg'),
        },
      ],
    },
    {
      id: 5,
      width: GetScaledValue(240),
      height: GetScaledValue(240),
      title: 'section5',
      items: [
        {focusKey: 'item0'},
        {focusKey: 'item1'},
        {focusKey: 'item2'},
        {focusKey: 'item3'},
        {focusKey: 'item4'},
        {focusKey: 'item5'},
        {focusKey: 'item6'},
        {focusKey: 'item7'},
        {focusKey: 'item8'},
        {focusKey: 'item9'},
      ],
    },
    {
      id: 6,
      width: 200,
      height: 350,
      title: 'section6',
      items: [
        {focusKey: 'item0'},
        {focusKey: 'item1'},
        {focusKey: 'item2'},
        {focusKey: 'item3'},
        {focusKey: 'item4'},
        {focusKey: 'item5'},
        {focusKey: 'item6'},
        {focusKey: 'item7'},
        {focusKey: 'item8'},
        {focusKey: 'item9'},
      ],
    },
    {
      id: 7,
      width: GetScaledValue(200),
      height: GetScaledValue(350),
      title: 'section7',
      items: [
        {focusKey: 'item0'},
        {focusKey: 'item1'},
        {focusKey: 'item2'},
        {focusKey: 'item3'},
        {focusKey: 'item4'},
        {focusKey: 'item5'},
        {focusKey: 'item6'},
        {focusKey: 'item7'},
        {focusKey: 'item8'},
        {focusKey: 'item9'},
      ],
    },
  ],
};

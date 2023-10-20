import {
  FlatList,
  ImageRequireSource,
  StyleSheet,
  useTVEventHandler,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import Series from './Series';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import useScrollHandler from '../hooks/useScrollHandler';

export interface Data {
  number: number;
  uri: string;
  poster: ImageRequireSource;
}

export interface IData {
  id: number;
  width: number;
  height: number;
  title: string;
  data: Data[];
}

const AnimatedSection = () => {
  const {height} = useWindowDimensions();
  const contentY = useSharedValue(height / 2);
  const {scrollToDirection} = useScrollHandler();

  // for now
  useTVEventHandler(evt => scrollToDirection(evt.eventType));

  const data: IData[] = [
    {
      id: 0,
      width: 500, // 180,
      height: 200, //100 ,
      title: 'section0',
      data: [...new Array(10).fill(0)],
    },
    {
      id: 1,
      width: 400,
      height: 400,
      title: 'section1',
      data: [...new Array(10).fill(0)],
    },
    {
      id: 2,
      width: 200,
      height: 350,
      title: 'section1',
      data: [...new Array(10).fill(0)],
    },
    {
      id: 3,
      width: 250,
      height: 250,
      title: 'section1',
      data: [...new Array(10).fill(0)],
    },
    {
      id: 4,
      width: 400,
      height: 850,
      title: 'section1',
      data: [
        {
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: require('../../assets/image.jpg'),
        },
        {
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: {
            uri: 'https://postercim.net/wp-content/uploads/2019/01/braveheart-film-posteri-600x750.jpg',
          },
        },
        {
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: {
            uri: 'https://postercim.net/wp-content/uploads/2019/01/braveheart-film-posteri-600x750.jpg',
          },
        },
        {
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: require('../../assets/image.jpg'),
        },
        {
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: require('../../assets/image.jpg'),
        },
        {
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: require('../../assets/image.jpg'),
        },
        {
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: require('../../assets/image.jpg'),
        },
        {
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: require('../../assets/image.jpg'),
        },
        {
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: require('../../assets/image.jpg'),
        },
        {
          uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
          poster: require('../../assets/image.jpg'),
        },
      ],
    },
    {
      id: 5,
      width: 180,
      height: 110,
      title: 'section0',
      data: [...new Array(10).fill(0)],
    },
  ];

  const animatedContainer = useAnimatedStyle(() => {
    return {
      top: withTiming(contentY.value, {duration: 600}),
    };
  });

  return (
    <Animated.View style={[styles.container, animatedContainer]}>
      <FlatList
        data={data}
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={Series}
      />
    </Animated.View>
  );
};

export default AnimatedSection;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: 'red',
  },
});

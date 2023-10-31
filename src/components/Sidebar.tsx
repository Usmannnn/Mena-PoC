import {Image, Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import {GetScaledValue} from '../methods';
import FocusableItem from './FocusableItem';
import SidebarOverlay from './SidebarOverlay';
import {useApp} from '../context';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

const refs: any[] = [];
const isAndroid = Platform.OS === 'android';

const Sidebar = () => {
  const {focusKey} = useApp();

  const hasFocus = focusKey.startsWith('sidebar');

  const animatedOpacity = useAnimatedStyle(
    () => ({
      opacity: withTiming(hasFocus ? 1 : 0.5, {duration: 1000}),
    }),
    [hasFocus],
  );

  return (
    <Animated.View style={[styles.container, isAndroid && animatedOpacity]}>
      <View style={styles.innerContainer}>
        <View style={{flex: 2}}>
          <Image
            source={require('../../assets/tod-logo.png')}
            style={{width: GetScaledValue(100), height: GetScaledValue(100)}}
          />
        </View>

        <View style={{flex: 3}}>
          {[
            ...new Array(5).fill(0).map((_, index) => (
              <View key={index} ref={el => index === 0 && refs.push(el)}>
                <FocusableItem
                  index={index}
                  style={styles.item}
                  focusKey={`sidebar_${index}`}
                />
              </View>
            )),
          ]}
        </View>
      </View>
      <SidebarOverlay hasFocus={hasFocus} />
    </Animated.View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    position: isAndroid ? 'absolute' : 'relative',
    top: 0,
    left: 0,
    bottom: 0,
    backgroundColor: 'black',
    width: GetScaledValue(200),
    zIndex: 98,
  },
  innerContainer: {
    flex: 1,
    paddingVertical: GetScaledValue(100),
    alignItems: 'center',
  },
  item: {
    width: GetScaledValue(100),
    height: GetScaledValue(60),
    margin: GetScaledValue(10),
  },
});

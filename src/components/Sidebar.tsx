import {Image, StyleSheet, View} from 'react-native';
import React from 'react';
import {GetScaledValue} from '../methods';
import FocusableItem from './FocusableItem';
import SidebarOverlay from './SidebarOverlay';
import {useApp} from '../context';

const refs: any[] = [];

const Sidebar = () => {
  const {focusKey} = useApp();

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/tod-logo.png')}
        style={{width: GetScaledValue(50), aspectRatio: 1}}
      />

      {[
        ...new Array(10).fill(0).map((_, index) => (
          <View key={index} ref={el => index === 0 && refs.push(el)}>
            <FocusableItem
              focusKey={`sidebar_${index}`}
              index={index}
              style={styles.item}
            />
          </View>
        )),
      ]}
      <SidebarOverlay hasFocus={focusKey.startsWith('sidebar')} />
    </View>
  );
};

export default Sidebar;

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: GetScaledValue(200),
    backgroundColor: 'black',
    // opacity: 0.5,
    zIndex: 98,
    paddingVertical: GetScaledValue(20),
    alignItems: 'center',
  },
  item: {
    width: GetScaledValue(100),
    height: GetScaledValue(100),
    margin: GetScaledValue(10),
  },
});

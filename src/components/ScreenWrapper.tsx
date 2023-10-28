import {StyleSheet, View} from 'react-native';
import React, {ReactNode} from 'react';

const ScreenWrapper = ({children}: {children: ReactNode}) => {
  return <View style={styles.container}>{children}</View>;
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {flex: 1},
});

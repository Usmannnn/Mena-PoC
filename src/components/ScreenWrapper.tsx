import {ScrollView, StyleSheet} from 'react-native';
import React, {ReactNode} from 'react';

const ScreenWrapper = ({children}: {children: ReactNode}) => {
  return (
    <ScrollView
      style={styles.contentContainer}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      {children}
    </ScrollView>
  );
};

export default ScreenWrapper;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'red'},
  contentContainer: {flex: 1},
});

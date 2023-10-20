import React from 'react';
import {Touchable} from './Touchable';
import {useNavigation} from '@react-navigation/native';
import Card from './Card';
import {StyleProp, ViewStyle} from 'react-native';

const FocusableCard = ({
  index,
  style,
}: {
  index: string;
  style: StyleProp<ViewStyle>;
}) => {
  const {navigate} = useNavigation();

  return (
    <Touchable onPress={() => navigate('Detail', {index})} style={style}>
      <Card index={index} />
    </Touchable>
  );
};

export default FocusableCard;

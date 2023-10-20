import React from 'react';
import {Touchable} from './Touchable';
import {useNavigation} from '@react-navigation/native';
import Card from './Card';

const FocusableCard = ({index}: {index: number}) => {
  const {navigate} = useNavigation();

  return (
    <Touchable onPress={() => navigate('Detail', {index})}>
      <Card index={index} />
    </Touchable>
  );
};

export default FocusableCard;

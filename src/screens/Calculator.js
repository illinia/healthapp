import React, {useState} from 'react';
import styled from 'styled-components/native';
import {Button, MealBox} from '../components';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  align-items: center;
  padding-top: 20px;
`;

const Calculator = ({navigation}) => {
  const [meals, setMeals] = useState({
    1: {id: '1', name: 'Breakfast', cal: '123cal'},
    2: {id: '2', name: 'Lunch', cal: '333cal'},
    3: {id: '3', name: 'Dinner', cal: '879cal'},
  });

  const _addMeals = () => {
    setMeals([...meals]);
  };

  return (
    <Container>
      {Object.values(meals)
        .reverse()
        .map(item => (
          <MealBox item={item} navigation={navigation} />
        ))}
      <Button
        title="+ Add Meals!"
        containerStyle={{width: '90%', marginTop: 30}}
        onPress={() => navigation.navigate('MealPlanner')}
      />
    </Container>
  );
};

export default Calculator;

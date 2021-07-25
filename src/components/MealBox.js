import React from 'react';
import styled from 'styled-components/native';

const Container = styled.Pressable`
  width: 90%;
  height: 50px;
  margin-vertical: 5px;
  padding-horizontal: 20px;
  padding-vertical: 10px;
  border-radius: 10;
  border: 1px solid ${({theme}) => theme.buttonBorder};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MealText = styled.Text`
  font-size: 18px;
`;

const MealBox = ({navigation, item}) => {
  return (
    <Container key={item.id} onPress={() => navigation.navigate('DetailMeal')}>
      <MealText>{item.name}</MealText>
      <MealText>{item.cal}</MealText>
    </Container>
  );
};

export default MealBox;

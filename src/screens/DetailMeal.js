import React, {useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {MealBox} from '../components';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  align-items: center;
  padding-top: 20px;
`;

const DetailMeal = ({navigation, route}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: ({onPress}) => (
        <FontAwesome
          name="angle-left"
          size={35}
          style={{marginLeft: 15}}
          color="black"
          onPress={onPress}
        />
      ),
      headerRight: () => (
        <AntDesign
          name="plus"
          size={30}
          style={{marginRight: 15}}
          color="black"
          onPress={() => navigation.navigate('MealPlanner', route.params.name)}
        />
      ),
    });
  });
  const foodList = route.params.meal.map(value => Object.keys(value));
  const calList = route.params.meal.map(value => Object.values(value));
  const totalCal =
    calList.reduce((prev, curr) => Number(prev) + Number(curr), 0) + ' cal';

  return (
    <Container>
      <MealBox
        key={0}
        name="Total Calories"
        cal={totalCal}
        style={{
          marginBottom: 50,
        }}
      />
      {foodList.map((value, index) => {
        return (
          <MealBox key={index + 1} name={value} cal={`${calList[index]} cal`} />
        );
      })}
    </Container>
  );
};

export default DetailMeal;

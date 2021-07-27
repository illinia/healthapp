import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Button, MealBox} from '../components';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  align-items: center;
  padding-top: 20px;
`;

const Calculator = ({navigation, route}) => {
  const [meals, setMeals] = useState({
    breakfast: {
      name: 'breakfast',
      meal: [{Apple: 50}, {Banana: 100}, {Orange: 70}],
    },
    lunch: {
      name: 'lunch',
      meal: [{Apple: 50}, {Banana: 100}, {Orange: 70}],
    },
  });

  const _addMeal = (name, meal) => {
    const newMeal = {[name]: {name: name, meal: [meal]}};
    if (meals[name]) {
      const newMeals = meals[name].meal;
      newMeals.push(meal);
      setMeals({
        ...meals,
        ...{
          [name]: {
            name: name,
            meal: [...newMeals],
          },
        },
      });
    } else {
      setMeals({...meals, ...newMeal});
    }
  };

  const _deleteMeal = name => {
    const currentList = {...meals};
    delete currentList[name];
    setMeals(currentList);
  };

  const _deleteFood = (name, index, item) => {
    const currentList = {...meals};
    currentList[name].meal.splice(index, 1);
    setMeals({
      ...currentList,
    });
    navigation.navigate('DetailMeal', {
      item: item,
      deleteFood: _deleteFood,
      updateFood: _updateFood,
    });
  };

  const _updateFood = (name, newName, newCal, index, item) => {
    const currentList = {...meals};
    delete currentList[name].meal[index];
    currentList[name].meal.splice(index, 0, {[newName]: newCal});
    setMeals({
      ...currentList,
    });
    navigation.navigate('DetailMeal', {
      item: item,
      deleteFood: _deleteFood,
      updateFood: _updateFood,
    });
  };

  const _updateMeal = (name, newName) => {
    const currentList = {...meals};
    const newMeal = currentList[name].meal;
    delete currentList[name];
    setMeals({
      ...currentList,
      ...{
        [newName]: {
          name: newName,
          meal: [...newMeal],
        },
      },
    });
  };

  useEffect(() => {
    if (route.params) {
      const mealName = route.params.mealName;
      const foodName = route.params.foodName;
      const calories = +route.params.calories;
      _addMeal(mealName, {[foodName]: calories});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route.params]);

  return (
    <Container>
      {Object.values(meals)
        .reverse()
        .map(item => {
          let cal = 0;
          item.meal.forEach(value => {
            cal += Number(Object.values(value));
          });
          cal += ' cal';
          return (
            <MealBox
              itemName={item.name}
              cal={cal}
              key={item.name}
              deleteMeal={_deleteMeal}
              updateMeal={_updateMeal}
              onPress={() =>
                navigation.navigate('DetailMeal', {
                  item: item,
                  deleteFood: _deleteFood,
                  updateFood: _updateFood,
                })
              }
            />
          );
        })}
      <Button
        title="+ Add Meals!"
        containerStyle={{width: '90%', marginTop: 30}}
        onPress={() => navigation.navigate('MealPlanner')}
      />
    </Container>
  );
};

export default Calculator;

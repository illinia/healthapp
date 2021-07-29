import React, {useEffect, useState, useContext} from 'react';
import styled from 'styled-components/native';
import {Button, MealBox} from '../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ProgressContext} from '../context';
import {createMeal, DB, getCurrentUser} from '../utils/firebase';
import {Alert} from 'react-native';

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${({theme}) => theme.background};
  padding-top: 20px;
`;

const Calculator = ({navigation, route}) => {
  const {spinner} = useContext(ProgressContext);
  const [meals, setMeals] = useState({});

  const _saveMeal = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storageMeals', jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const _loadMeal = async () => {
    try {
      await AsyncStorage.getItem('@storageMeals').then(response => {
        setMeals(JSON.parse(response));
      });
    } catch (e) {
      console.error(e);
    }
  };

  const _addMeal = async (name, meal) => {
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

  const _loadFirestore = () => {
    const {uid} = getCurrentUser();
    DB.collection('meals')
      .doc(uid)
      .get()
      .then(doc => {
        setMeals(doc.data().meals);
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

  useEffect(() => {
    _loadMeal();
    return _saveMeal(meals);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    _saveMeal(meals);
  }, [meals]);

  return (
    <Container
      contentContainerStyle={{
        alignItems: 'center',
      }}>
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
        isFilled={false}
        onPress={() => navigation.navigate('MealPlanner')}
      />
      <Button
        title="Save on Online"
        containerStyle={{width: '90%', borderRadius: 10}}
        isFilled={false}
        isWhite
        onPress={() => {
          try {
            createMeal(meals);
            Alert.alert('Succeed Saving!');
          } catch (e) {
            console.log(e);
            Alert.alert('Check ur Network Connection');
          }
        }}
      />
      <Button
        title="Load from Online"
        containerStyle={{width: '90%', borderRadius: 10}}
        onPress={() => {
          try {
            _loadFirestore();
            Alert.alert('Succeed Loading!');
          } catch (e) {
            console.log(e);
            Alert.alert('Check ur Network Connection');
          }
        }}
      />
    </Container>
  );
};

export default Calculator;

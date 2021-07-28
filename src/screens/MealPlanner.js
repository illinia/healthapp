import React, {useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import {Apple, Beef, Bread, Drink, Cheese, Fish, Burger, Milk} from '../assets';
import FoodImage from '../components/FoodImage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding-top: 20px;
  background-color: ${({theme}) => theme.background};
`;

const ImageView = styled.View`
  flex-direction: row;
  width: 80%;
  justify-content: center;
  justify-content: space-around;
`;

const MealPlanner = ({navigation, route}) => {
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
    });
  });

  const onPress = title => {
    navigation.navigate('DetailFood', {
      mealName: route.params,
      selectedFood: title,
    });
  };
  return (
    <Container
      contentContainerStyle={{
        alignItems: 'center',
      }}>
      <ImageView>
        <FoodImage source={Apple} title="Fruit" onPress={onPress} />
        <FoodImage source={Beef} title="Meat" onPress={onPress} />
      </ImageView>
      <ImageView>
        <FoodImage source={Bread} title="Bread" onPress={onPress} />
        <FoodImage source={Drink} title="Drink" onPress={onPress} />
      </ImageView>
      <ImageView>
        <FoodImage source={Cheese} title="Cheese" onPress={onPress} />
        <FoodImage source={Fish} title="Fish" onPress={onPress} />
      </ImageView>
      <ImageView>
        <FoodImage source={Burger} title="Instant" onPress={onPress} />
        <FoodImage source={Milk} title="Milk" onPress={onPress} />
      </ImageView>
    </Container>
  );
};

export default MealPlanner;

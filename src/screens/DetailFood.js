import React, {useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import FoodImage from '../components/FoodImage';
import {
  Apple,
  Beef,
  Bread,
  Drink,
  Cheese,
  Fish,
  Burger,
  Milk,
  Cake,
  Cherry,
  Chicken,
  Lime,
  Pepper,
  Strawberry,
  Sushi,
  Tomato,
} from '../assets';
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

const DetailFood = ({navigation, route}) => {
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
    navigation.navigate('DetailInfo', {
      mealName: route.params.mealName,
      foodName: title,
    });
  };
  return (
    <Container
      contentContainerStyle={{
        alignItems: 'center',
      }}>
      {route.params.selectedFood === 'Fruit' && (
        <>
          <ImageView>
            <FoodImage source={Apple} title="Apple" onPress={onPress} />
            <FoodImage source={Cherry} title="Cherry" onPress={onPress} />
          </ImageView>
          <ImageView>
            <FoodImage source={Lime} title="Lime" onPress={onPress} />
            <FoodImage source={Pepper} title="Pepper" onPress={onPress} />
          </ImageView>
          <ImageView>
            <FoodImage
              source={Strawberry}
              title="Strawberry"
              onPress={onPress}
            />
            <FoodImage source={Tomato} title="Tomato" onPress={onPress} />
          </ImageView>
        </>
      )}
      {route.params.selectedFood === 'Meat' && (
        <>
          <ImageView>
            <FoodImage source={Beef} title="Beef" onPress={onPress} />
            <FoodImage source={Chicken} title="Chicken" onPress={onPress} />
          </ImageView>
        </>
      )}
      {route.params.selectedFood === 'Bread' && (
        <>
          <ImageView>
            <FoodImage source={Bread} title="Bread" onPress={onPress} />
            <FoodImage source={Burger} title="Burger" onPress={onPress} />
          </ImageView>
        </>
      )}
      {route.params.selectedFood === 'Drink' && (
        <>
          <ImageView>
            <FoodImage source={Drink} title="Tea" onPress={onPress} />
            <FoodImage source={Milk} title="Milk" onPress={onPress} />
          </ImageView>
        </>
      )}
      {route.params.selectedFood === 'Cheese' && (
        <>
          <ImageView>
            <FoodImage source={Cheese} title="Cheese" onPress={onPress} />
          </ImageView>
        </>
      )}
      {route.params.selectedFood === 'Fish' && (
        <>
          <ImageView>
            <FoodImage source={Fish} title="Fish" onPress={onPress} />
            <FoodImage source={Sushi} title="Sushi" onPress={onPress} />
          </ImageView>
        </>
      )}
      {route.params.selectedFood === 'Instant' && (
        <>
          <ImageView>
            <FoodImage source={Burger} title="Burger" onPress={onPress} />
            <FoodImage source={Cake} title="Cake" onPress={onPress} />
          </ImageView>
          <ImageView>
            <FoodImage source={Sushi} title="Sushi" onPress={onPress} />
          </ImageView>
        </>
      )}
      {route.params.selectedFood === 'Milk' && (
        <>
          <ImageView>
            <FoodImage source={Milk} title="Milk" onPress={onPress} />
          </ImageView>
        </>
      )}
    </Container>
  );
};

export default DetailFood;

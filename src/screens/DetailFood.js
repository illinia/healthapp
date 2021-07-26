import React, {useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import FoodImage from '../components/FoodImage';
import Apple from '../assets/Apple.png';
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
      mealName: route.params,
      foodName: title,
    });
  };
  return (
    <Container
      contentContainerStyle={{
        alignItems: 'center',
      }}>
      <ImageView>
        <FoodImage source={Apple} title="Apple" onPress={onPress} />
        <FoodImage source={Apple} title="Banana" onPress={onPress} />
      </ImageView>
      <ImageView>
        <FoodImage source={Apple} title="Fruit" onPress={onPress} />
        <FoodImage source={Apple} title="Fruit" onPress={onPress} />
      </ImageView>
      <ImageView>
        <FoodImage source={Apple} title="Fruit" onPress={onPress} />
        <FoodImage source={Apple} title="Fruit" onPress={onPress} />
      </ImageView>
    </Container>
  );
};

export default DetailFood;

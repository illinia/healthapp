import React, {useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import {Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const DetailMeal = ({navigation}) => {
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
          onPress={() => navigation.navigate('MealPlanner')}
        />
      ),
    });
  });
  return (
    <Container>
      <Text style={{fontSize: 24}}>DetailMeal</Text>
    </Container>
  );
};

export default DetailMeal;

import React, {useState, useRef} from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Alert} from 'react-native';
import {checkNumber, checkTrim} from '../utils/common';

const Container = styled.View`
  width: 90%;
  height: 50px;
  margin-vertical: 5px;
  margin-bottom: ${({error}) => (error ? '50px' : 0)};
`;

const BoxContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid ${({theme}) => theme.buttonBorder};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 10px;
  padding-horizontal: 20px;
`;

const MealText = styled.Text`
  font-size: 18px;
`;

const MealInput = styled.TextInput`
  width: 80%;
  height: 100%;
  font-size: 18px;
`;

const ErrorText = styled.Text`
  width: 100%;
  color: ${({theme}) => theme.errorText};
  margin-top: 10px;
  padding-horizontal: 10px;
`;

const MealBox = ({
  itemName,
  itemCal,
  item,
  cal,
  onPress,
  style,
  deleteMeal,
  deleteFood,
  updateFood,
  foodIndex,
  updateMeal,
  canUpdate,
  inputStyle,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [newName, setNewName] = useState('');
  const [newCal, setNewCal] = useState('');
  const [error, setError] = useState('');

  const calRef = useRef('');

  const _updateFood = () => {
    if (newName && newCal && !error) {
      updateFood(item.name, newName, newCal, foodIndex, item);
      setIsUpdating(false);
      Alert.alert(`${itemName} is updated!`);
    } else {
      Alert.alert('Please check again.');
    }
  };

  const _updateMeal = () => {
    if (newName && !error) {
      updateMeal(itemName, newName);
      setIsUpdating(false);
      Alert.alert(`${itemName} is updated!`);
    } else {
      Alert.alert('Please check again.');
    }
  };

  const _setNewName = name => {
    setNewName(name);
    setError(
      checkTrim(name)
        ? ''
        : 'Please remove whitespace both sides of the name.\nand check is correct name.',
    );
  };

  const _setNewCal = name => {
    setNewCal(name);
    setError(checkNumber(name) ? '' : 'Please put only number in calories.');
  };

  return (
    <Container style={style} error={error}>
      {!isUpdating ? (
        <BoxContainer
          style={style}
          onPress={onPress}
          onLongPress={() => {
            canUpdate ? setIsUpdating(true) : '';
          }}
          delayLongPress={300}>
          <MealText>{itemName}</MealText>
          <MealText>{cal}</MealText>
        </BoxContainer>
      ) : (
        <BoxContainer>
          {updateFood ? (
            <>
              <MealInput
                style={inputStyle}
                onChangeText={_setNewName}
                onSubmitEditing={() => calRef.current.focus()}
                placeholder={itemName.toString()}
                returnKeyType="next"
                autoCorrect={false}
                autoCapitalize="none"
              />
              <MealInput
                ref={calRef}
                style={inputStyle}
                onChangeText={_setNewCal}
                onSubmitEditing={() => _updateFood()}
                placeholder={`${itemCal.toString()} cal`}
                returnKeyType="done"
                autoCorrect={false}
                autoCapitalize="none"
              />
            </>
          ) : (
            <MealInput
              style={inputStyle}
              onChangeText={_setNewName}
              onSubmitEditing={() => _updateMeal()}
              placeholder={itemName.toString()}
              returnKeyType="done"
              autoCorrect={false}
              autoCapitalize="none"
            />
          )}
          <EvilIcons
            name="pencil"
            size={40}
            style={{
              opacity: error ? 0.5 : 1,
            }}
            onPress={() => (updateFood ? _updateFood() : _updateMeal())}
          />
          <Ionicons
            name="ios-trash-outline"
            size={28}
            onPress={() => {
              if (deleteFood) {
                deleteFood(item.name, foodIndex, item);
                setIsUpdating(false);
                Alert.alert(`${itemName} food is removed!`);
              } else {
                deleteMeal(itemName);
                setIsUpdating(false);
                Alert.alert(`${itemName} is removed!`);
              }
            }}
          />
        </BoxContainer>
      )}
      {!!error && <ErrorText>{error}</ErrorText>}
    </Container>
  );
};

MealBox.defaultProps = {
  onPress: () => {},
  style: {},
  canUpdate: true,
};

MealBox.propTypes = {
  cal: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  style: PropTypes.object,
  deleteMeal: PropTypes.func,
  canUpdate: PropTypes.bool,
};

export default MealBox;

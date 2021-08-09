import React, {useContext, useState, useEffect} from 'react';
import {DB, deleteChat} from '../utils/firebase';
import styled, {ThemeContext} from 'styled-components/native';
import {Alert, Text, FlatList} from 'react-native';
import moment from 'moment';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const ItemContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 70;
  padding-horizontal: 15px;
`;

const ItemTextContainer = styled.View`
  flex: 1;
  flex-direction: column;
`;

const ItemTitle = styled.Text`
  font-size: 20px;
  font-weight: 600;
`;

const ItemDescription = styled.Text`
  font-size: 16px;
  margin-top: 5px;
  color: ${({theme}) => theme.label};
`;

const ItemTime = styled.Text`
  font-size: 12px;
  color: ${({theme}) => theme.label};
`;

const DeleteBox = styled.View`
  position: absolute;
  right: 0;
  height: 70;
  width: 80;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.buttonLogout};
`;

const Item = React.memo(
  ({item: {id, title, description, createdAt}, onPress}) => {
    const [modal, setModal] = useState(false);

    const _deleteChat = async chatId => {
      try {
        deleteChat(chatId);
        Alert.alert('Succeed delete chat!');
      } catch (e) {
        console.log('Delete was failed.');
      }
    };
    return (
      <ItemContainer
        onLongPress={() => setModal(!modal)}
        delayLongPress={300}
        onPress={() => {
          setModal(false);
          onPress({id, title});
        }}>
        <ItemTextContainer>
          <ItemTitle>{title}</ItemTitle>
          <ItemDescription>{description}</ItemDescription>
        </ItemTextContainer>
        {modal ? (
          <DeleteBox>
            <Ionicons
              name="ios-trash-outline"
              size={28}
              color="white"
              onPress={() => _deleteChat(id)}
            />
          </DeleteBox>
        ) : (
          <ItemTime>{moment(createdAt).fromNow()}</ItemTime>
        )}
      </ItemContainer>
    );
  },
);

const Chat = ({navigation}) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = DB.collection('chat')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const list = [];
        snapshot.forEach(doc => {
          list.push(doc.data());
        });
        setChats(list);
      });
    return () => unsubscribe();
  }, []);

  const _handleItemPress = params => {
    navigation.navigate('Chat Room', params);
  };

  return (
    <Container>
      <FlatList
        keyExtractor={item => item.id}
        data={chats}
        renderItem={({item}) => <Item item={item} onPress={_handleItemPress} />}
        windowSize={3}
      />
    </Container>
  );
};

export default Chat;

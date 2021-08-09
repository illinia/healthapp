/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useLayoutEffect, useContext} from 'react';
import {DB, createMessage, getCurrentUser} from '../utils/firebase';
import styled, {ThemeContext} from 'styled-components/native';
import {Alert} from 'react-native';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const SendButton = props => {
  const theme = useContext(ThemeContext);

  return (
    <Send
      {...props}
      disabled={!props.text}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
      }}>
      <FontAwesome
        name="send-o"
        size={24}
        color={props.text ? theme.buttonBackground : theme.tabActiveColor}
      />
    </Send>
  );
};

const ChatRoom = ({navigation, route: {params}}) => {
  const theme = useContext(ThemeContext);
  const {uid, name, photoUrl} = getCurrentUser();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = DB.collection('chat')
      .doc(params.id)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const list = [];
        snapshot.forEach(doc => {
          list.push(doc.data());
        });
        setMessages(list);
      });
    return () => unsubscribe();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: params.title || 'Chat',
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
  }, []);

  const _handleMessageSend = async messageList => {
    const newMessage = messageList[0];
    try {
      await createMessage({channelId: params.id, message: newMessage});
    } catch (e) {
      Alert.alert('Send Message Error', e.message);
    }
  };

  return (
    <Container>
      <GiftedChat
        listViewProps={{
          style: {backgroundColor: theme.background},
        }}
        placeholder="Enter a message..."
        messages={messages}
        user={{_id: uid, name, avatar: photoUrl}}
        onSend={_handleMessageSend}
        alwaysShowSend={true}
        textInputProps={{
          autoCapitalize: 'none',
          autoCorrect: false,
          textContentType: 'none',
        }}
        multiline={false}
        renderUsernameOnMessage={true}
        scrollToBottom={true}
        renderSend={props => <SendButton {...props} />}
      />
    </Container>
  );
};

export default ChatRoom;

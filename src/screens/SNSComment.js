import React, {useCallback, useState, useEffect, useLayoutEffect} from 'react';
import styled from 'styled-components/native';
import {RefreshControl, FlatList} from 'react-native';
import {DB, getCurrentUser} from '../utils/firebase';
import {Comment, CommentInput} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ScrollContainer = styled.ScrollView`
  background-color: ${({theme}) => theme.background};
`;

const ViewContainer = styled.View`
  height: ${({comments}) => (comments.length >= 7 ? 87 : 100)}%;
`;

const SNSComment = ({navigation, route}) => {
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
  const {postId} = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [comments, setComments] = useState([]);
  const [keyboard, setKeyboard] = useState(false);

  const user = getCurrentUser();

  const getDateOrTime = ts => {
    return moment(ts).fromNow();
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const unsubscribe = DB.collection('sns')
      .doc(postId)
      .collection('comment')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const list = [];
        snapshot.forEach(doc => {
          list.push(doc.data());
        });
        setComments(list);
      });

    wait(1000).then(() => {
      setRefreshing(false);
      unsubscribe();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ScrollContainer
        contentContainerStyle={{flex: 1}}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <ViewContainer comments={comments}>
          <FlatList
            keyExtractor={comment => comment.id}
            data={comments}
            renderItem={comment => (
              <Comment
                profileURL={comment.item.profileURL}
                name={comment.item.name}
                content={comment.item.content}
                createdAt={getDateOrTime(comment.item.createdAt)}
                commentId={comment.item.id}
                postId={postId}
                isOwned={comment.item.uid === user.uid}
                onRefresh={() => onRefresh()}
              />
            )}
          />
        </ViewContainer>
      </ScrollContainer>
      <KeyboardAwareScrollView
        style={{
          position: 'absolute',
          width: '100%',
          height: keyboard ? '53%' : '13%',
          bottom: 0,
          // backgroundColor: 'white',
        }}
        scrollEnabled={false}>
        <CommentInput
          photoURL={user.photoUrl}
          onBlur={() => setKeyboard(false)}
          onFocus={() => {
            setKeyboard(true);
            console.log(keyboard);
          }}
          onRefresh={() => onRefresh()}
          postId={postId}
        />
      </KeyboardAwareScrollView>
    </>
  );
};

export default React.memo(SNSComment);

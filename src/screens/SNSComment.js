import React, {useCallback, useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {RefreshControl, FlatList} from 'react-native';
import {DB} from '../utils/firebase';
import {Comment} from '../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import moment from 'moment';

const Container = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.background};
`;

const SNSDeletepost = ({navigation, route}) => {
  const {postId} = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [comments, setComments] = useState([]);

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
    <KeyboardAwareScrollView
      style={{flex: 1, backgroundColor: 'white'}}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <Container>
        <FlatList
          keyExtractor={comment => comment.id}
          data={comments}
          renderItem={comment => (
            <Comment
              profileURL={comment.item.profileURL}
              name={comment.item.name}
              content={comment.item.content}
              createdAt={getDateOrTime(comment.item.createdAt)}
            />
          )}
        />
      </Container>
    </KeyboardAwareScrollView>
  );
};

export default SNSDeletepost;

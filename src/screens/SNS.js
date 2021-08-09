import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {DB, getCurrentUser} from '../utils/firebase';
import styled from 'styled-components/native';
import {Post} from '../components';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const getDateOrTime = ts => {
  return moment(ts).fromNow();
};

const SNS = ({navigation, route}) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const user = getCurrentUser();

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // const unsubscribe =
    DB.collection('sns')
      .orderBy('createdAt', 'desc')
      .get()
      .then(value => {
        const list = [];
        value.forEach(doc => {
          list.push(doc.data());
        });
        setPosts(list);
      })
      .then(() => {
        wait(1000).then(() => {
          setRefreshing(false);
        });
      });
  }, []);

  useEffect(() => {
    onRefresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        extraScrollHeight={30}>
        <FlatList
          keyExtractor={post => post.id}
          data={posts}
          renderItem={post => (
            <Post
              navigation={navigation}
              content={post.item.content}
              createdAt={getDateOrTime(post.item.createdAt)}
              name={post.item.name}
              postId={post.item.id}
              uid={post.item.uid}
              updateboolean={post.item.uid === user.uid ? true : false}
              email={post.item?.email || 'guest'}
              photoURL={post.item.photoURL}
              profileURL={post.item.profileURL}
              comment={post.item.comment}
              like={post.item.like}
            />
          )}
          windowSize={3}
        />
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default SNS;

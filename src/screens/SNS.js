import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import {DB} from '../utils/firebase';
import styled from 'styled-components/native';
import {Post} from '../components';
import moment from 'moment';

const Container = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.background};
`;

const getDateOrTime = ts => {
  // const now = moment().startOf('day');
  // const target = moment(ts).startOf('day');
  return moment(ts).fromNow();
};

const SNS = ({navigation, route}) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const unsubscribe = DB.collection('sns')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const list = [];
        snapshot.forEach(doc => {
          list.push(doc.data());
        });
        setPosts(list);
      });

    wait(1000).then(() => {
      setRefreshing(false);
      unsubscribe();
    });
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      DB.collection('sns')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
          const list = [];
          snapshot.forEach(doc => {
            list.push(doc.data());
          });
          setPosts(list);
        });
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);
  return (
    <Container>
      <FlatList
        keyExtractor={post => post.id}
        data={posts}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={post => (
          <Post
            navigation={navigation}
            content={post.item.content}
            createdAt={getDateOrTime(post.item.createdAt)}
            name={post.item.name}
            email={post.item?.email || 'guest'}
            photoURL={post.item.photoURL}
            profileURL={post.item.profileURL}
          />
        )}
        windowSize={3}
      />
    </Container>
  );
};

export default SNS;

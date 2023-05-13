import { Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/postservices';
import PostItem from './PostItem';
import { Grid, GridItem } from '@chakra-ui/react';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    document.title = 'SAIT-Home';
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { status, data } = await getPosts();
    // console.log('Printing the data received from fetching the posts: ', data);

    if (status === 200) {
      console.log(data.posts);
      setPosts(data.posts);
    } else if (status === 500) {
      setPosts(null);
      console.log(data.message);
    }
  };

  return (
    <>
      <Flex className="ads-container" justifyContent={'center'}>
        <Stack padding={'1rem'}>
          {!posts ? (
            <Text color={'#7b2431'}>
              Currently there are no advertisements for you
            </Text>
          ) : posts.length === 0 ? (
            <Spinner color="#7b2431" margin={'1rem 0'} size={'xl'} />
          ) : (
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {posts.map(post => {
                return (
                  <GridItem w="100%" key={post._id}>
                    <PostItem
                      id={post._id}
                      item={post.item[0]}
                      owner={post.owner[0]}
                      date={post.date_posted}
                      views={post.views}
                    />
                  </GridItem>
                );
              })}
            </Grid>
          )}
        </Stack>
      </Flex>
    </>
  );
};

export default Posts;

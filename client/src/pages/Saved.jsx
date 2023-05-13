import { Box, Flex, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import SavedCard from '../components/SavedCard';
import { fetchPostsByUserID } from '../services/savedservices';

const Saved = () => {
  const [savedPosts, setSavedPosts] = useState([]);

  useEffect(() => {
    fetchSavedPosts();
  }, []);

  const fetchSavedPosts = async () => {
    const { data, status } = await fetchPostsByUserID();

    if (status === 200) {
      setSavedPosts(data);
      console.log('Printing the saved posts: ', data);
    } else if (status === 500) {
      setSavedPosts(null);
    }
  };

  return (
    <>
      <Flex flexDir={'column'} alignItems={'center'}>
        <Heading margin={'2rem 0'}>Saved Posts</Heading>
        {savedPosts === null ? (
          <Text color={'#7b2431'}>There are no saved posts. </Text>
        ) : savedPosts.length === 0 ? (
          <Spinner color="#7b2431" margin={'1rem 0'} size={'xl'} />
        ) : (
          <Box minW={'60vw'}>
            {savedPosts.map(post => {
              return (
                <SavedCard
                  key={post._id}
                  id={post._id}
                  post={post.savedPost[0]}
                  item={post.item[0]}
                  owner={post.owner[0]}
                />
              );
            })}
          </Box>
        )}
      </Flex>
    </>
  );
};

export default Saved;

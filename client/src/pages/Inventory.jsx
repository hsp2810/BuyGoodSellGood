import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InventoryCard from '../components/InventoryCard';
import { getPostsById } from '../services/postservices';
import '../utilities/styles/inventory.css';

const Inventory = () => {
  const [myPosts, setMyPosts] = useState([]);

  useEffect(() => {
    fetchMyPosts();
  }, []);

  const fetchMyPosts = async () => {
    const { data, status } = await getPostsById();

    if (status === 200) {
      setMyPosts(data.posts);
    } else if (status === 400) {
      setMyPosts(null);
    }
  };

  return (
    <Flex flexDir={'column'} alignItems={'center'}>
      <Flex flexDir={'column'} alignItems={'center'}>
        <Heading margin={'2rem 0'}>Your Posts</Heading>
        {!myPosts ? (
          <Text color={'#7b2431'}>You haven't upload any post. </Text>
        ) : myPosts.length === 0 ? (
          <Spinner color="#7b2431" margin={'1rem 0'} size={'xl'} />
        ) : (
          <Grid templateRows="repeat(3, 1fr)" gap={6}>
            {myPosts.map(post => {
              return (
                <GridItem w="100%" key={post._id}>
                  <InventoryCard
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
      </Flex>
      <Box>
        <Link to={'/home/inventory/insert'} className="insert-btn">
          <Heading size={'sm'}>Post Advertisement</Heading>
        </Link>
      </Box>
    </Flex>
  );
};

export default Inventory;

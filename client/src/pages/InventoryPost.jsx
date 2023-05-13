import {
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  Spinner,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getPost, removePost } from '../services/postservices';
import '../utilities/styles/post.css';

const InventoryPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { post } = useSelector(state => state.post);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const { status, data } = await getPost(id);

    if (status == 200) {
      dispatch({
        type: 'fetchedPost',
        payload: data.post[0],
      });
      // setPost(data.post[0]);
    }
  };

  const handleDelete = async () => {
    const userResponse = window.confirm(
      'Are you sure you want to delete the advertisement? '
    );

    if (userResponse) {
      const { status, data } = await removePost(id);

      if (status === 200) {
        alert(data.message);
        navigate('/home/inventory');
      }
    }
  };

  return (
    <>
      {post === null ? (
        <Text color={'#7b2431'} textAlign={'center'}>
          Error occured in loading the post. Go back to home.{' '}
        </Text>
      ) : post === undefined ? (
        <Spinner color="#7b2431" margin={'1rem auto !important'} size={'xl'} />
      ) : (
        <Flex flexDirection={'column'}>
          <Flex bgColor={'#e9eeee'} padding={'3rem'} alignItems={'center'}>
            <Stack width={'25%'} flex={30}>
              <Image
                src={post.item[0].file.url}
                borderRadius="lg"
                height={'40vh'}
                width={'30vw'}
              />
            </Stack>
            <Stack flex={70}>
              <Flex>
                <VStack marginLeft={'7rem'} flex={20} alignItems={'flex-start'}>
                  <Heading>Item</Heading>
                  <Text>Title: {post.item[0].title}</Text>
                  <Text>Price: ${post.item[0].price}</Text>
                  <Text>Details: {post.item[0].overview}</Text>
                  <HStack marginTop={'5rem !important'}>
                    <Button
                      backgroundColor={'#198754'}
                      color={'#fff'}
                      _hover={{ backgroundColor: '#157347' }}
                    >
                      <Link to={`/home/inventory/${id}/edit`}>Edit post</Link>
                    </Button>
                    <Button
                      backgroundColor={'#7b2431'}
                      color={'#fff'}
                      _hover={{ backgroundColor: '#a6192e' }}
                      onClick={handleDelete}
                    >
                      Delete post
                    </Button>
                  </HStack>
                </VStack>
              </Flex>
            </Stack>
          </Flex>
          <VStack marginTop={'1rem'}>
            <Heading>Description</Heading>
            <Stack minHeight={'50vh'} padding={'1rem 3rem'}>
              <Text>{post.item[0].description}</Text>
            </Stack>
          </VStack>
        </Flex>
      )}
    </>
  );
};

export default InventoryPost;

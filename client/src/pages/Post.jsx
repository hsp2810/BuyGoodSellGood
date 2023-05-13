import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../services/postservices';
import { useSelector } from 'react-redux';
import '../utilities/styles/post.css';
import { savePost } from '../services/savedservices';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const { homeUser } = useSelector(state => state.auth);
  const [saveButtonText, setSaveButtonText] = useState('Save post');

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const { status, data } = await getPost(id);

    if (status == 200) {
      setPost(data.post[0]);
    }
  };

  const handleSavePost = async () => {
    const input = {
      post_id: id,
      user_id: homeUser._id,
    };
    // console.log(input);

    const { status } = await savePost(input);
    if (status === 200) {
      setSaveButtonText('Saved');
    } else if (status === 501) {
      alert('Post already saved. Go to saved');
    }
  };
  // <Spinner color="#7b2431" margin={'1rem 0'} size={'xl'} />

  return (
    <>
      {post === null ? (
        'Error occured in loading the post. Go back to home'
      ) : (
        <Flex flexDirection={'column'}>
          <Flex bgColor={'#e9eeee'} padding={'3rem'} alignItems={'center'}>
            <Stack width={'25%'} flex={30}>
              <Image
                src={
                  post.item[0].file.url
                    ? post.item[0].file.url
                    : 'Image not found'
                }
                alt="Green double couch with wooden legs"
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
                  <Button
                    backgroundColor={'#7b2431'}
                    color={'white'}
                    marginTop={'5rem !important'}
                    _hover={{ backgroundColor: '#a6192e' }}
                    onClick={handleSavePost}
                    disabled={saveButtonText === 'Saved'}
                  >
                    {saveButtonText}
                  </Button>
                </VStack>
                <VStack flex={50} alignItems={'flex-start'}>
                  <Heading>Owner</Heading>
                  <Text>
                    Name: {post.owner[0].fName} {post.owner[0].lName}
                  </Text>
                  <Text>Email: {post.owner[0].email}</Text>
                  <Text>
                    Phone:{' '}
                    {post.owner[0].phone
                      ? post.owner[0].phone
                      : 'No phone number is provided by the owner'}
                  </Text>
                </VStack>
              </Flex>
            </Stack>
          </Flex>
          <VStack marginTop={'1rem'}>
            <Heading>Description</Heading>
            <Stack padding={'1rem 3rem'} minH={'50vh'}>
              <Text>{post.item[0].description}</Text>
            </Stack>
          </VStack>
        </Flex>
      )}
    </>
  );
};

export default Post;

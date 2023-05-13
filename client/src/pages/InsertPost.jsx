import React, { useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import '../utilities/styles/insertpost.css';
import { useSelector } from 'react-redux';
import { addPost } from '../services/postservices';
import { useNavigate } from 'react-router-dom';

// bgColor={'#e9eeee'} Color for the background: Don't look good on the light theme
const defPost = {
  title: '',
  description: '',
  price: '',
  overview: '',
};

const InsertPost = () => {
  const navigate = useNavigate();
  const [insertPost, setInsertPost] = useState(defPost);
  const { homeUser } = useSelector(state => state.auth);
  const [postImage, setPostImage] = useState('');
  const [postImagePreview, setPostImagePreview] = useState('');

  const handleInputChange = e => {
    setInsertPost({ ...insertPost, [e.target.name]: e.target.value });
  };

  const handleUpload = async () => {
    const { status } = await addPost({
      ...insertPost,
      ownerID: homeUser._id,
      file: postImage,
    });

    if (status === 200) {
      alert('Posted successfully.');
      navigate('/home/inventory');
    }
  };

  const handleFile = e => {
    console.log('Url of the image: ', e.target.files[0]);
    setPostImage(e.target.files[0]);
  };

  return (
    <>
      {homeUser === undefined ? (
        <Text color={'#7b2431'} textAlign={'center'} margin={'2rem 0'}>
          Please wait.
        </Text>
      ) : (
        <Flex flexDirection={'column'}>
          <Flex padding={'3rem'} alignItems={'center'}>
            <Stack width={'25%'} flex={30}>
              <FormControl>
                <Input
                  border={'none !important'}
                  height={'inherit !important'}
                  id="fileUpload"
                  onChange={handleFile}
                  type="file"
                />
              </FormControl>
            </Stack>
            <Stack flex={70}>
              <Flex>
                <VStack marginLeft={'7rem'} flex={20} alignItems={'flex-start'}>
                  <Heading>Item</Heading>
                  <FormControl>
                    <Input
                      w={'70%'}
                      variant={'flushed'}
                      type="text"
                      placeholder="add title"
                      _placeholder={{ color: '#7b2431' }}
                      borderColor={'#7b2431 !important'}
                      name={'title'}
                      value={insertPost.title}
                      onChange={handleInputChange}
                    />

                    <Input
                      w={'70%'}
                      variant={'flushed'}
                      type="number"
                      placeholder="add price (in $CAD)"
                      _placeholder={{ color: '#7b2431' }}
                      borderColor={'#7b2431 !important'}
                      name={'price'}
                      value={insertPost.price}
                      onChange={handleInputChange}
                    />
                    <Input
                      w={'70%'}
                      variant={'flushed'}
                      type="text"
                      placeholder="add overview in one line"
                      _placeholder={{ color: '#7b2431' }}
                      borderColor={'#7b2431 !important'}
                      name={'overview'}
                      value={insertPost.overview}
                      onChange={handleInputChange}
                    />
                  </FormControl>
                </VStack>
                <VStack flex={50} alignItems={'flex-start'}>
                  <Heading>Owner</Heading>
                  <Text>{homeUser.fName}</Text>
                  <Text>{homeUser.email}</Text>
                  {/* We haven't added the Phone of the user to the DB so using the last name just for now */}
                  <Text>{homeUser.phone}</Text>
                </VStack>
              </Flex>
            </Stack>
          </Flex>
          <VStack marginTop={'1rem'}>
            <Heading>Description</Heading>
            <Textarea
              w={'80%'}
              borderColor={'#7b2431 !important'}
              _placeholder={{ color: '#7b2431' }}
              marginTop={'1rem !important'}
              placeholder="Enter detailed description about the item."
              h={'50vh'}
              name={'description'}
              value={insertPost.description}
              onChange={handleInputChange}
            />
          </VStack>

          <Button
            backgroundColor={'#7b2431'}
            color={'white'}
            margin={'2rem auto !important'}
            _hover={{ backgroundColor: '#a6192e' }}
            w={'25%'}
            onClick={handleUpload}
          >
            Upload
          </Button>
        </Flex>
      )}
    </>
  );
};

export default InsertPost;

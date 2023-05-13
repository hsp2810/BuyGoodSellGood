import React, { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  Image,
} from '@chakra-ui/react';
import '../utilities/styles/insertpost.css';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { editPost, getPost } from '../services/postservices';

const defPost = {
  file: {},
  title: '',
  description: '',
  price: '',
  overview: '',
};

const EditInventoryPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editPostCred, seteditPostCred] = useState(defPost);
  const { homeUser } = useSelector(state => state.auth);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    const { status, data } = await getPost(id);

    if (status == 200) {
      seteditPostCred(data.post[0].item[0]);
    }
  };

  const handleInputChange = e => {
    seteditPostCred({ ...editPostCred, [e.target.name]: e.target.value });
  };

  const handleFile = e => {
    console.log('Url of the edited image: ', e.target.files[0]);
    seteditPostCred({ ...editPostCred, file: e.target.files[0] });
  };

  const handleUpdate = async () => {
    console.log('Sended Edited Object: ', editPostCred);
    const { status, data } = await editPost(editPostCred);

    if (status === 200) {
      alert(data.message);
      navigate(`/home/inventory/${id}`);
    }
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
              <Text textAlign={'center'} fontWeight={'bold'}>
                Uploaded image. Choose another file to edit this one.
              </Text>
              <Image
                src={editPostCred.file.url}
                alt=""
                borderRadius="lg"
                height={'40vh'}
                width={'30vw'}
              />
              <Input
                border={'none !important'}
                height={'inherit !important'}
                id="fileUpload"
                type="file"
                onChange={handleFile}
              />
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
                      value={editPostCred.title}
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
                      value={editPostCred.price}
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
                      value={editPostCred.overview}
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
              value={editPostCred.description}
              onChange={handleInputChange}
            />
          </VStack>

          <Button
            backgroundColor={'#7b2431'}
            color={'white'}
            margin={'2rem auto !important'}
            _hover={{ backgroundColor: '#a6192e' }}
            w={'25%'}
            onClick={handleUpdate}
          >
            Update Post
          </Button>
        </Flex>
      )}
    </>
  );
};

export default EditInventoryPost;

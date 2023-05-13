import React, { useEffect, useState } from 'react';
import { authenticate } from '../services/authenticate';
import { useNavigate } from 'react-router-dom';
import { Flex, Heading, HStack, Stack } from '@chakra-ui/react';
import Posts from '../components/Posts';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();
  const { isLogin, homeUser } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    checkIfLogined();
  }, []);

  const checkIfLogined = async () => {
    if (isLogin === false) {
      navigate('/login');
    } else {
      const { status, data } = await authenticate('/home');
      if (status === 200) {
        dispatch({
          type: 'setLoginUserCredentials',
          payload: data,
        });
      }
    }
  };

  return (
    homeUser && (
      <Flex w={'100%'} flexDir={'column'} marginTop={'1.5rem'}>
        <HStack marginLeft={'1rem'}>
          <Heading size={'lg'} textAlign={'center'} display={'inline'}>
            Welcome back,
          </Heading>
          <Heading
            size={'lg'}
            textAlign={'center'}
            color={'#7b2431'}
            display={'inline'}
          >
            {homeUser.fName}
          </Heading>
        </HStack>
        <Heading size={'lg'} textAlign={'center'} marginTop={'2rem'}>
          All Posts
        </Heading>
        <Stack marginTop={'1rem'}>
          <Posts />
        </Stack>
      </Flex>
    )
  );
};

export default Home;

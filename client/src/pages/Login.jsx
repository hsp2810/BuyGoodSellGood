import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authenticate, login } from '../services/authenticate';
import '../utilities/styles/login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const defUser = {
  email: 'harshit123@gmail.com',
  password: 'password',
};

const Login = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [loginUser, setloginUser] = useState(defUser);

  const handleChange = e => {
    setloginUser({ ...loginUser, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    const { data, status } = await login(loginUser);
    console.log(status);

    if (status === 200) {
      dispatch({
        type: 'changeLogin',
        payload: 'false',
      });
      navigate('/home');
    } else if (status === 423) {
      alert(data.message);
    }
  };

  useEffect(() => {
    // console.log('Value of isLogin is: ', isLogin);
    if (isLogin === true) {
      navigate('/home');
    }
  });

  return isLogin ? (
    <Heading size={'md'}>
      User is already logined. Redirecting to Home...
    </Heading>
  ) : (
    <Flex
      align={'center'}
      justify={'center'}
      height={'88vh'}
      className={'loginContainer'}
    >
      <VStack
        width={'25%'}
        display={'flex'}
        borderRadius={'10px'}
        alignItems={'center'}
        justifyContent={'center'}
        margin={'10rem auto'}
        padding={'1rem 3rem'}
      >
        <Box margin={'2rem 0'}>
          <Heading>Login</Heading>
        </Box>
        <FormControl isRequired>
          <Stack>
            <Input
              variant="flushed"
              placeholder="Login with SAIT email"
              name="email"
              value={loginUser.email}
              id={'email'}
              onChange={handleChange}
            />
          </Stack>

          <Stack>
            <Input
              variant={'flushed'}
              pr="4.5rem"
              type={'password'}
              placeholder="Password"
              name="password"
              id="password"
              value={loginUser.password}
              onChange={handleChange}
            />
          </Stack>

          <Stack margin={'2rem 0px'}>
            <Button
              onClick={handleLogin}
              color="white"
              backgroundColor={'#a6192e !important'}
            >
              Login
            </Button>
          </Stack>
        </FormControl>
        <HStack margin={'2rem 0px'}>
          <Text>Don't have an account</Text>
          <Button variant={'link'} color="#a6192e">
            <Link to={'/register'}>register here</Link>
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default Login;

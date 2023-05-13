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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { register } from '../services/authenticate';

const defUser = {
  fName: '',
  lName: '',
  email: '',
  phone: '',
  password: '',
};

const Register = () => {
  const [registerUser, setregisterUser] = useState(defUser);

  const handleChange = e => {
    setregisterUser({ ...registerUser, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { data, status } = await register(registerUser);

    if (status === 200) {
      alert(data.message);
      setregisterUser(defUser);
    }
  };

  return (
    <Flex align={'center'} justify={'center'} height={'90vh'}>
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
          <Heading>Register</Heading>
        </Box>
        <FormControl isRequired>
          <Stack>
            <Input
              type={'text'}
              variant="flushed"
              placeholder="First name"
              name="fName"
              value={registerUser.fName}
              id={'fName'}
              onChange={handleChange}
            />
          </Stack>
          <Stack>
            <Input
              type={'text'}
              variant="flushed"
              placeholder="Last name"
              name="lName"
              value={registerUser.lName}
              id={'lName'}
              onChange={handleChange}
            />
          </Stack>
          <Stack>
            <Input
              type={'email'}
              variant="flushed"
              placeholder="Register with SAIT email"
              name="email"
              value={registerUser.email}
              id={'email'}
              onChange={handleChange}
            />
          </Stack>
          <Stack>
            <Input
              type={'tel'}
              variant="flushed"
              placeholder="Phone"
              name="phone"
              value={registerUser.phone}
              id={'phone'}
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
              value={registerUser.password}
              onChange={handleChange}
            />
          </Stack>

          <Stack margin={'2rem 0px'}>
            <Button
              onClick={handleRegister}
              color="white"
              backgroundColor={'#a6192e !important'}
            >
              Register
            </Button>
          </Stack>
        </FormControl>
        <HStack margin={'2rem 0px'}>
          <Text>Already have an account</Text>
          <Button variant={'link'} color="#a6192e">
            <Link to={'/login'}>login here</Link>
          </Button>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default Register;

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { deactivateUser, editUser } from '../services/userservices';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authenticate';

const Profile = () => {
  const { homeUser } = useSelector(state => state.auth);
  const [editUserCred, seteditUserCred] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    seteditUserCred(homeUser);
    console.log('Setting the home user: ', homeUser);
  }, [homeUser]);

  const handleChange = e => {
    seteditUserCred({ ...editUserCred, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const { status } = await editUser(editUserCred);

    if (status === 200) {
      alert('Personal information updated successfully');
    }
  };

  const handleDeactivate = async () => {
    const userResponse = window.confirm(
      'Are you sure you want to deactivate the account? If you do so only the administrator will be able to activate it back.'
    );

    if (userResponse) {
      const { data, status } = await deactivateUser(homeUser._id);

      if (status === 200) {
        alert(data.message);

        const { status } = await logout();
        dispatch({
          type: 'changeLogin',
          payload: 'true',
        });
        navigate('/login');
      }
    }
  };
  return (
    <>
      {!editUserCred ? (
        <Text color={'#7b2431'} textAlign={'center'} margin={'2rem 0'}>
          Please wait.
        </Text>
      ) : (
        <Flex align={'center'} justify={'center'} height={'90vh'}>
          <VStack
            width={'50%'}
            display={'flex'}
            borderRadius={'10px'}
            alignItems={'center'}
            justifyContent={'center'}
            margin={'10rem auto'}
            padding={'1rem 3rem'}
          >
            <Box margin={'2rem 0'}>
              <Heading>Personal Information</Heading>
            </Box>
            <Stack>
              <FormControl display={'flex'} alignItems={'baseline'}>
                <FormLabel width={'10vw'}>Email address</FormLabel>
                <VStack alignItems={'flex-start'} justifyContent={'flex-start'}>
                  <Input
                    type={'email'}
                    w={'75%'}
                    variant="flushed"
                    name="email"
                    value={editUserCred.email}
                    disabled={true}
                    id={'email'}
                    onChange={handleChange}
                  />
                  <FormHelperText color={'#7b2431'}>
                    You cannot change email once registered for an account.
                  </FormHelperText>
                </VStack>
              </FormControl>
              <FormControl display={'flex'} alignItems={'baseline'}>
                <FormLabel width={'10vw'}>First name</FormLabel>
                <Input
                  type={'text'}
                  w={'75%'}
                  m={'0rem 1.5rem'}
                  variant="flushed"
                  name="fName"
                  value={editUserCred.fName}
                  id={'fName'}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl display={'flex'} alignItems={'baseline'}>
                <FormLabel width={'10vw'}>Last name</FormLabel>
                <Input
                  type={'text'}
                  w={'75%'}
                  m={'0rem 1.5rem'}
                  variant="flushed"
                  name="lName"
                  value={editUserCred.lName}
                  id={'lName'}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl display={'flex'} alignItems={'baseline'}>
                <FormLabel width={'10vw'}>Phone</FormLabel>
                <Input
                  type={'tel'}
                  w={'75%'}
                  m={'0rem 1.5rem'}
                  variant="flushed"
                  name="phone"
                  value={editUserCred.phone}
                  id={'phone'}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl display={'flex'} alignItems={'baseline'}>
                <FormLabel width={'10vw'}>Password</FormLabel>
                <Input
                  type={'password'}
                  w={'75%'}
                  m={'0rem 1.5rem'}
                  variant="flushed"
                  name="password"
                  value={editUserCred.password}
                  id={'password'}
                  onChange={handleChange}
                />
              </FormControl>
            </Stack>

            <Stack margin={'4rem 0px !important'}>
              <Button
                onClick={handleUpdate}
                color="white"
                backgroundColor={'#a6192e !important'}
              >
                Update Personal Information
              </Button>
              <Button
                onClick={handleDeactivate}
                color="white"
                backgroundColor={'#a6192e !important'}
              >
                Deactivate account permenently
              </Button>
            </Stack>
          </VStack>
        </Flex>
      )}
    </>
  );
};

export default Profile;

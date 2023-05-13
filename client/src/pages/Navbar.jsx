import React from 'react';
import { Box, Button, Flex, HStack, Img } from '@chakra-ui/react';
import NavItems from '../components/NavItems';
import '../utilities/styles/navbar.css';
import Logo from '../utilities/images/SAIT-LOGO.png';
import { logout } from '../services/authenticate';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = () => {
  // Getting the value of isLogin from the store
  const { isLogin } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { status } = await logout();

    if (status === 200) {
      dispatch({
        type: 'changeLogin',
        payload: 'true',
      });
      navigate('/login');
    }
  };

  return (
    <Flex
      backgroundColor={'whitesmoke'}
      h={'5em'}
      justifyContent={'space-around'}
      align={'center'}
      position={'sticky !important'}
      top={'0 !important'}
      zIndex={'1000'}
    >
      <Box width={'15%'}>
        <Img src={Logo} objectFit="cover" />
      </Box>
      {isLogin ? (
        <HStack>
          <NavItems path={'/home'} title={'Home'} />
          <NavItems path={'/home/inventory'} title={'My Inventory'} />
          <NavItems path={'/home/saved'} title={'Saved'} />
        </HStack>
      ) : (
        <HStack>
          <NavItems path={'/'} title={'SAIT'} />
          <NavItems path={'/about'} title={'About Developers'} />
        </HStack>
      )}
      <HStack>
        {isLogin && (
          <HStack>
            <NavItems path={'/home/profile'} title={'Profile'} />
            <Button
              backgroundColor={'#7b2431'}
              color={'white'}
              _hover={{ backgroundColor: '#a6192e' }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </HStack>
        )}
      </HStack>
    </Flex>
  );
};

export default Navbar;

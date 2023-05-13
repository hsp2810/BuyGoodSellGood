import { Box, Heading, Image } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Box position={'absolute'} bottom="0" w={'100%'} height={'30px'}>
      <Heading
        textAlign={'center'}
        size={'md'}
        marginTop={'4rem'}
        marginBottom={'1rem'}
      >
        Copyright 2023 | Southern Alberta Institute of Techonology | All rights
        reserved
      </Heading>
    </Box>
  );
};

export default Footer;

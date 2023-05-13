import { AlertIcon, Flex } from '@chakra-ui/react';
import React from 'react';

const Alert = ({ type, message }) => {
  return (
    <Flex>
      <Alert status={type}>
        <AlertIcon />
        {message}
      </Alert>
    </Flex>
  );
};

export default Alert;

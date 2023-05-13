import { Box } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const NavItems = ({ path, title }) => {
  return (
    <Box margin={'1rem !important'}>
      <Link className="nav-links" to={path}>
        {title}
      </Link>
    </Box>
  );
};

export default NavItems;

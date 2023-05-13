import React from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import '../utilities/styles/inventorycard.css';

const InventoryCard = ({ id, item, owner, date, views }) => {
  const parseAndReturnDate = () => {
    let newDate = new Date(date);
    // console.log(date);
    let formattedDate = `${newDate.getFullYear()}-${
      newDate.getMonth() + 1
    }-${newDate.getDate()}`;
    return formattedDate;
  };

  return (
    <>
      {console.log('I have got the card: ', id, item, owner, date, views)}
      <Card
        direction={{ base: 'column', sm: 'row' }}
        overflow="hidden"
        variant="outline"
        margin={'.5rem 0'}
        minW={'60vw'}
        maxW={'75vw'}
      >
        <Image
          objectFit="cover"
          maxW={{ base: '100%', sm: '200px' }}
          src={item.file.url ? item.file.url : 'Image not found'}
          alt="Caffe Latte"
        />

        <Stack>
          <CardBody>
            <Heading size="md">{item.title}</Heading>
            <Text py="1">Details: {item.overview}.</Text>
            <Text py="1">Posted on {parseAndReturnDate()}.</Text>
            <Text py="1">Viewed by {views} people.</Text>
          </CardBody>

          <CardFooter>
            <Link to={`${id}`} className="view-link">
              View
            </Link>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
};

export default InventoryCard;

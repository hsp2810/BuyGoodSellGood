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

const SavedCard = ({ id, post, item, owner }) => {
  const parseAndReturnDate = () => {
    let newDate = new Date(post.date_posted);
    let formattedDate = `${newDate.getFullYear()}-${newDate.getMonth()}-${
      newDate.getDate() + 1
    }`;
    return formattedDate;
  };

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
      margin={'.5rem 0'}
    >
      {console.log('Nothingytoufegf: ', post, 'Ite3m: ', item)}
      <Image
        src={item.file.url ? item.file.url : 'Image not found'}
        alt="Green double couch with wooden legs"
        borderRadius="lg"
        width={'25% !important'}
      />

      <Stack>
        <CardBody>
          <Heading size="md">{item.title}</Heading>
          <Text py="1">Details: {item.overview}.</Text>
          <Text py="1">Posted on {parseAndReturnDate()}.</Text>
          <Text py="1">Posted by {owner.fName + ' ' + owner.lName}.</Text>
        </CardBody>

        <CardFooter columnGap={'1rem'}>
          <Link to={`${post._id}`} className="view-link">
            View
          </Link>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default SavedCard;

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import '../utilities/styles/main.css';
import { useSelector } from 'react-redux';
import { increaseViews } from '../services/postservices';

const PostItem = ({ id, item, owner, date, views }) => {
  const parseAndReturnDate = () => {
    let newDate = new Date(date);
    let formattedDate = `${newDate.getFullYear()}-${
      newDate.getMonth() - 1
    }-${newDate.getDate()}`;
    return formattedDate;
  };

  const handleIncreaseViews = async () => {
    const { status } = await increaseViews(id);
  };

  return (
    <>
      {item === undefined ? (
        <Text textAlign={'center'}>No item found</Text>
      ) : (
        <Card maxW="xs" maxH={'lg'} minW={'20vw'}>
          <CardBody>
            <Image
              src={item.file.url ? item.file.url : 'Image not found'}
              borderRadius="lg"
              width={'18vw'}
              height={'12vw'}
            />
            <Stack mt="6" spacing="1" marginTop={'0px !important'}>
              <Stack
                flexDir={'row'}
                alignItems={'center'}
                justifyContent={'space-evenly'}
              >
                <Heading size="md">{item.title}</Heading>
                <Text
                  color="#a6192e"
                  fontSize="2xl"
                  marginBottom={'0.5rem !important'}
                >
                  ${item.price}
                </Text>
              </Stack>
              <Text fontSize={'sm'}>{item.overview}.</Text>
              <Text fontSize={'sm'}>Posted on {parseAndReturnDate()}</Text>
              <Text fontSize={'sm'}>Viewed by {views} people</Text>
              <Text fontSize={'sm'}>
                Posted by {owner.fName + ' ' + owner.lName}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <Link
              to={`post/${id}`}
              className="primary-btn"
              onClick={handleIncreaseViews}
            >
              View
            </Link>
          </CardFooter>
        </Card>
      )}
    </>
  );
};

export default PostItem;

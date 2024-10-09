import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export default function CommentsList() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: comments,
    error,
    isLoading,
  } = useQuery<Comment[]>({
    queryKey: ["comments", page],
    queryFn: () =>
      fetch(
        `https://jsonplaceholder.typicode.com/comments?_limit=${limit}&_page=${page}`
      ).then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
        <Spinner
          thickness="4px"
          speed="0.75s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          label="Loading..."
        />
      </Box>
    );
  }

  return (
    <Box p={5}>
      <Heading mb={5}>Comments</Heading>
      {error && <Text>Error fetching comments.</Text>}
      <VStack spacing={4} align="stretch">
        {comments?.map((comment) => (
          <Box key={comment.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Heading size="md">{comment.name}</Heading>
            <Text>{comment.body}</Text>
            <Text fontSize="sm" color="gray.500">
              {comment.email}
            </Text>
          </Box>
        ))}
      </VStack>
      <HStack mt={5} spacing={5} justify="center">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          isDisabled={page === 1}
        >
          Previous
        </Button>
        <Text>Page {page}</Text>
        <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
      </HStack>
    </Box>
  );
}

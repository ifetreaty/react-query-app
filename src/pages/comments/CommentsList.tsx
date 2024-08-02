import { Box, Heading, Text, VStack, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export default function CommentsList() {
  const {
    data: comments,
    error,
    isLoading,
  } = useQuery<Comment[]>({
    queryKey: ["comments"],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/comments`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) return <Spinner />;
  if (error) return <Text>Error fetching comments.</Text>;

  return (
    <Box p={5}>
      <Heading mb={5}>Comments</Heading>
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
    </Box>
  );
}

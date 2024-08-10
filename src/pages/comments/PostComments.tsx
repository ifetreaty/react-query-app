import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export default function PostComments() {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const {
    data: comments,
    error,
    isLoading,
  } = useQuery<Comment[]>({
    queryKey: ["comments", postId],
    queryFn: () =>
      fetch(`http://localhost:5000/posts/${postId}/comments`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) return <Spinner />;
  // if (error) return <Text>Error fetching comments.</Text>;

  return (
    <Box p={5}>
      <Breadcrumb mb={5}>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => navigate("/posts")}>
            Post
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Comments</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Button mb={5} onClick={() => navigate(-1)}>
        Back to Posts
      </Button>
      <Heading mb={5}>Comments</Heading>
      {error && <Text color="red">Error fetching comments.</Text>}
      <VStack spacing={4} align="stretch">
        {comments?.map((comment) => (
          <Box key={comment.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Heading size="md">{comment.name}</Heading>
            <Text>
              <strong>Email:</strong> {comment.email}
            </Text>
            <Text mt={2}>{comment.body}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

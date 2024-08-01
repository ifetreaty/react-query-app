import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function PostDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: post,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["post", id],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      }),
  });

  if (isLoading) return <Spinner />;
  if (error) return <Text>Error fetching post details.</Text>;

  return (
    <Box p={5} maxW="600px" mx="auto">
      <Breadcrumb mb={5}>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => navigate("/posts")}>
            Posts
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink>Post Details</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <Button mb={5} onClick={() => navigate(-1)}>
        Back to Posts
      </Button>
      <Box p={5} borderWidth="1px" borderRadius="lg">
        <Heading mb={5}>{post.title}</Heading>
        <Text>{post.body}</Text>
      </Box>
    </Box>
  );
}

import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link as RouterLink } from "react-router-dom";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

type NewPost = {
  title: string;
  body: string;
  userId?: number;
};

export default function PostsList() {
  // const queryClient = useQueryClient();
  const toast = useToast();

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/posts`).then((res) =>
        res.json()
      ),
    refetchInterval: 60000,
  });

  const { mutate: addPost, isPending: isPending } = useMutation({
    mutationFn: (newPost: NewPost) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json()),
    onSuccess: () => {
      // queryClient.invalidateQueries(["posts"]);
      toast({
        title: "Post added.",
        description: "Your post has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "Error.",
        description: "There was an error adding your post.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: (postId: number) =>
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: "DELETE",
      }).then((response) => response.json()),
    onSuccess: () => {
      // queryClient.invalidateQueries(["posts"]);
      toast({
        title: "Post deleted.",
        description: "The post has been deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "Error.",
        description: "There was an error deleting the post.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const { register, handleSubmit, reset } = useForm<NewPost>();

  const onSubmit = (data: NewPost) => {
    addPost(data);
    reset();
  };

  if (isLoading) return <Spinner />;
  if (error) return <Text>Error fetching posts.</Text>;

  return (
    <Box p={5}>
      <Heading mb={5}>Posts</Heading>
      <Text fontWeight={700} fontSize="20px" mb={4}>
        Add New Post
      </Text>
      <Box mb="6rem" p={5} borderWidth="1px" borderRadius="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={4}>
            <FormLabel>Title</FormLabel>
            <Input
              placeholder="Post title"
              {...register("title", {
                required: "Title is required",
                minLength: {
                  value: 5,
                  message: "Title must be at least 5 characters long",
                },
              })}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Body</FormLabel>
            <Textarea
              placeholder="Post body"
              {...register("body", {
                required: "Body is required",
                minLength: {
                  value: 10,
                  message: "Body must be at least 10 characters long",
                },
              })}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" isLoading={isPending}>
            Add Post
          </Button>
        </form>
      </Box>
      <Text fontWeight={700} fontSize="20px" mb={4}>
        View All Posts
      </Text>
      <VStack spacing={4} align="stretch">
        {posts?.map((post) => (
          <Box key={post.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Heading size="md">
              <RouterLink to={`/posts/${post.id}`}>{post.title}</RouterLink>
            </Heading>
            <Text>{post.body}</Text>
            <Button
              mt={4}
              mr={4}
              colorScheme="gray"
              isLoading={isDeleting}
              onClick={() => deletePost(post.id)}
            >
              Delete Post
            </Button>
            <Button
              mt={4}
              colorScheme="teal"
              as={RouterLink}
              to={`/posts/${post.id}/comments`}
            >
              View Comments
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

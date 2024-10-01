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
  FormErrorMessage,
  HStack,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
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
  const queryClient = useQueryClient();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: posts,
    error,
    isLoading,
  } = useQuery<Post[]>({
    queryKey: ["posts", page],
    queryFn: () =>
      fetch(`http://localhost:5000/posts?_limit=${limit}&_page=${page}`).then(
        (res) => res.json()
      ),
    refetchInterval: 60000,
  });

  //   queryFn: async () => {
  //     const res = await fetch(
  //       `http://localhost:5000/posts?_limit=${limit}&_page=${page}`
  //     );
  //     const totalCount = parseInt(res.headers.get("X-Total-Count") || "0", 10);
  //     setTotalItems(totalCount);
  //     return res.json();
  //   },
  //   keepPreviousData: true,
  // });

  // console.log("posts: ", posts);
  // console.log("count: ", posts?.length);
  // console.log("total: ", totalItems);

  // const isLastPage = posts?.length < limit || page * limit >= totalItems;

  const { mutate: addPost, isPending: isPending } = useMutation({
    mutationFn: (newPost: NewPost) =>
      fetch("http://localhost:5000/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
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
      fetch(`http://localhost:5000/posts/${postId}`, {
        method: "DELETE",
      }).then((response) => response.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewPost>();

  const onSubmit = (data: NewPost) => {
    addPost(data);
    reset();
  };

  if (isLoading) return <Spinner />;
  if (error) return <Text color="red">Error fetching posts.</Text>;

  return (
    <Box p={5}>
      <Heading mb={5}>Posts</Heading>
      <Text fontWeight={700} fontSize="20px" mb={4}>
        Add New Post
      </Text>
      <Box mb="6rem" p={5} borderWidth="1px" borderRadius="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={4} isInvalid={!!errors.title}>
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
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl mb={4} isInvalid={!!errors.body}>
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
            <FormErrorMessage>
              {errors.body && errors.body.message}
            </FormErrorMessage>
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            isLoading={isPending || isSubmitting}
          >
            Add Post
          </Button>
        </form>
      </Box>
      <Text fontWeight={700} fontSize="20px" mb={4}>
        View All Posts
      </Text>
      {error && <Text>Error fetching Posts.</Text>}
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

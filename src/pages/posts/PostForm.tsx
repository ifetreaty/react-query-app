import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export default function PostForm() {
  const { register, handleSubmit, reset } = useForm();
  const toast = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: (newPost) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(newPost),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json()),
    onSuccess: () => {
      toast({
        title: "Post added.",
        description: "Your post has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
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

  const onSubmit = (data) => {
    mutate(data);
  };

  if (isPending) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.100"
        color="green.500"
        verticalAlign="middle"
      />
    );
  }

  return (
    <Box p={5} maxWidth="500px" mx="auto">
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

        <Button type="submit" colorScheme="teal">
          Add Post
        </Button>
      </form>
    </Box>
  );
}

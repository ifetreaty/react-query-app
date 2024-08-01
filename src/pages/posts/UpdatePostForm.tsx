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
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function UpdatePostForm() {
  const { id } = useParams();
  const toast = useToast();
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
        res.json()
      ),
  });

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      title: post?.title || "",
      body: post?.body || "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (updatedPost) =>
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedPost),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json()),
    onSuccess: () => {
      toast({
        title: "Post updated.",
        description: "Your post has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
    },
    onError: () => {
      toast({
        title: "Error.",
        description: "There was an error updating your post.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  if (isLoading) return <Spinner />;

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

        <Button type="submit" colorScheme="teal" isLoading={isPending}>
          Update Post
        </Button>
      </form>
    </Box>
  );
}

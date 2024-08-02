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
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export default function UpdatePostForm() {
  const { id } = useParams<{ id: string }>();
  const toast = useToast();
  // const queryClient = useQueryClient();

  const { data: post, isLoading } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) =>
        res.json()
      ),
  });

  const { register, handleSubmit, reset, setValue } = useForm<Post>({
    defaultValues: {
      title: "",
      body: "",
      userId: 0,
      id: 0,
    },
  });

  useEffect(() => {
    if (post) {
      setValue("title", post.title);
      setValue("body", post.body);
      setValue("userId", post.userId);
      setValue("id", post.id);
    }
  }, [post, setValue]);

  const { mutate, isPending } = useMutation({
    mutationFn: (updatedPost: Post) =>
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedPost),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }).then((response) => response.json()),
    onSuccess: () => {
      // queryClient.invalidateQueries(["post", id]);
      toast({
        title: "Post updated.",
        position: "top-right",
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
        position: "top-right",
        description: "There was an error updating your post.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: Post) => {
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

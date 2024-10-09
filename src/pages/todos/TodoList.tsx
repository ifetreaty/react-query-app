import { Box, Heading, Text, VStack, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React  from "react";
type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function TodoList() {
  const {
    data: todos,
    error,
    isLoading,
  } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/todos`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) return <Spinner />;
  if (error) return <Text>Error fetching todos.</Text>;

  return (
    <Box p={5}>
      <Heading mb={5}>Todos</Heading>
      <VStack spacing={4} align="stretch">
        {todos?.map((todo) => (
          <Box key={todo.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Heading size="md">{todo.title}</Heading>
            <Text>{todo.completed ? "Completed" : "Not Completed"}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

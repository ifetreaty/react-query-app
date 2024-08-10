import {
  Box,
  Heading,
  Text,
  VStack,
  Spinner,
  Image,
  HStack,
  Button,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export default function PhotosList() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: photos,
    error,
    isLoading,
  } = useQuery<Photo[]>({
    queryKey: ["photos", page],
    queryFn: () =>
      fetch(
        `https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`
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

  // if (error) return <Text color="red">Error fetching photos.</Text>;

  return (
    <Box p={5}>
      <Heading mb={5}>Photos</Heading>
      {error && <Text>Error fetching Photos.</Text>}

      <VStack spacing={4} align="stretch">
        {photos?.map((photo) => (
          <Box key={photo.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Heading size="md">{photo.title}</Heading>
            <Image src={photo.thumbnailUrl} alt={photo.title} />
            <Text>{photo.url}</Text>
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

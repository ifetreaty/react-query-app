import { Box, Heading, Text, VStack, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function AlbumsList() {
  const {
    data: albums,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["albums"],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/albums`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) return <Spinner />;
  if (error) return <Text>Error fetching albums.</Text>;

  return (
    <Box p={5}>
      <Heading mb={5}>Albums</Heading>
      <VStack spacing={4} align="stretch">
        {albums.map((album) => (
          <Box key={album.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Heading size="md">{album.title}</Heading>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

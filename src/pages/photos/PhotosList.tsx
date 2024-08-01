import { Box, Heading, Text, VStack, Spinner, Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function PhotosList() {
  const {
    data: photos,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["photos"],
    queryFn: () =>
      fetch(`https://jsonplaceholder.typicode.com/photos`).then((res) =>
        res.json()
      ),
  });

  if (isLoading) return <Spinner />;
  if (error) return <Text>Error fetching photos.</Text>;

  return (
    <Box p={5}>
      <Heading mb={5}>Photos</Heading>
      <VStack spacing={4} align="stretch">
        {photos.map((photo) => (
          <Box key={photo.id} borderWidth="1px" borderRadius="lg" p={4}>
            <Heading size="md">{photo.title}</Heading>
            <Image src={photo.thumbnailUrl} alt={photo.title} />
            <Text>{photo.url}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

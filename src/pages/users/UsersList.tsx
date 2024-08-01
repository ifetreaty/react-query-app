import { Box, Heading, Text, Stack, VStack, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

export default function UsersList() {
  const {
    data: userData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/users").then((response) =>
        response.json()
      ),
  });

  if (error) {
    return <Text>There was an error!</Text>;
  }

  if (isLoading) {
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
    <Box p={5}>
      <Heading mb={5}>Users List</Heading>
      <VStack spacing={5}>
        {userData.map((user) => (
          <Box
            key={user.id}
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            w="100%"
          >
            <Stack direction="row" justify="space-between">
              <Box>
                <Text fontSize="xl" fontWeight="bold">
                  {user.name}
                </Text>
                <Text>Username: {user.username}</Text>
                <Text>Email: {user.email}</Text>
                <Text>Phone: {user.phone}</Text>
                <Text>
                  Website:{" "}
                  <a
                    href={`http://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.website}
                  </a>
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Address</Text>
                <Text>
                  {user.address.street}, {user.address.suite}
                </Text>
                <Text>
                  {user.address.city}, {user.address.zipcode}
                </Text>
                <Text>
                  Lat: {user.address.geo.lat}, Lng: {user.address.geo.lng}
                </Text>
              </Box>
              <Box>
                <Text fontWeight="bold">Company</Text>
                <Text>Name: {user.company.name}</Text>
                <Text>CatchPhrase: {user.company.catchPhrase}</Text>
                <Text>BS: {user.company.bs}</Text>
              </Box>
            </Stack>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}

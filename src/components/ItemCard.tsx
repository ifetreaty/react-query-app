import { Box, Text } from "@chakra-ui/react";

interface IItemCard {
  title?: string;
  description?: string;
}

const ItemCard = ({ title, description }: IItemCard) => {
  return (
    <Box border="1px" borderRadius="md" p={4} mb={4}>
      <Text fontSize="xl" fontWeight="bold">
        {title}
      </Text>
      <Text>{description}</Text>
    </Box>
  );
};

export default ItemCard;

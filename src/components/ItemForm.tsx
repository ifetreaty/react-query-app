import { Box, FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useState } from "react";

const ItemForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(formData);
      }}
    >
      <FormControl id="title" mb={4}>
        <FormLabel>Title</FormLabel>
        <Input
          name="title"
          value={formData.title || ""}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="description" mb={4}>
        <FormLabel>Description</FormLabel>
        <Input
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
        />
      </FormControl>
      <Button type="submit" colorScheme="teal">
        Submit
      </Button>
    </Box>
  );
};

export default ItemForm;

import { Box } from "@chakra-ui/react";

interface IItems {
  item?: string;
}
interface IItemList {
  items: IItems[];
  renderItem?: React.ReactNode;
}

const ItemList = ({ items, renderItem }: IItemList) => {
  return <Box>{items.map((item) => renderItem(item))}</Box>;
};

export default ItemList;

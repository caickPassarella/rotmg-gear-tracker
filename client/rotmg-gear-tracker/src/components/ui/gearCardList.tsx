import {
  Card,
  Text,
  Flex,
  Spacer,
  Box,
  LinkBox,
  LinkOverlay,
  Popover,
} from "@chakra-ui/react";
import type { Item } from "@/types";
import allItems from "../../assets/AllRotmgItems.png";

import { PopOver } from "./popOver";

export const GearCardList = ({ name, count, src, img, percentage }: Item) => {
  return (
    <Card.Root
      backgroundColor="#161616"
      border="1px solid #3a3a3a"
      _hover={{
        transform: "scale(1.04)",
        backgroundColor: "#353535",
        boxShadow: "md",
      }}
      cursor="pointer"
      size="sm"
      variant="subtle"
    >
      <LinkBox>
        <PopOver>
          <Flex flexDirection="row" alignItems="center">
            <Box
              backgroundImage={`url(${allItems})`}
              backgroundPosition={img}
              width="46px"
              height="46px"
              margin="4"
              imageRendering="pixelated"
            />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Flex direction="row">
                <Text>Count: {count}</Text>
                <Spacer />
                <Text fontWeight="bold">{percentage}%</Text>
              </Flex>
            </Card.Body>
          </Flex>
        </PopOver>
      </LinkBox>
    </Card.Root>
  );
};

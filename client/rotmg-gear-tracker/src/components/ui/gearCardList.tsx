import { Card, Text, Flex, Spacer, Box, Link } from "@chakra-ui/react";
import type { Item } from "@/types";
import allItems from "../../assets/AllRotmgItems.png";

export const GearCardList = ({ name, count, src, img, percentage }: Item) => {
  return (
    <Card.Root size="sm" variant="subtle">
      <Flex flexDirection="row" alignItems="center">
        <Link target="_blank" href={src} rel="noopener noreferrer">
          <Box
            backgroundImage={`url(${allItems})`}
            backgroundPosition={img}
            width="46px"
            height="46px"
            margin="4"
            cursor="pointer"
          />
        </Link>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Flex direction="row">
            <Text>Count: {count}</Text>
            <Spacer />
            <Text fontWeight="bold">{percentage}%</Text>
          </Flex>
        </Card.Body>
      </Flex>
    </Card.Root>
  );
};

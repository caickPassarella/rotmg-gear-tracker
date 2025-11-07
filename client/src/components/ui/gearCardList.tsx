import { Card, Text, Flex, Spacer, Box, LinkBox } from "@chakra-ui/react";
import type { Item } from "@/types";

import { PopOver } from "./popOver";

export const GearCardList = ({
  name,
  count,
  src,
  img,
  percentage,
  rarities,
  enchantments,
}: Item) => {
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
        <PopOver
          src={src}
          name={name}
          rarities={rarities}
          enchantments={enchantments}
        >
          <Flex flexDirection="row" alignItems="center">
            <Box
              backgroundImage={
                "url(https://www.realmeye.com/s/h9/css/renders.png)"
              }
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

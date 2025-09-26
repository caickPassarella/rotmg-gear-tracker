import { Card, Stack, Image, Text, Flex, Spacer } from "@chakra-ui/react";
import type { GearCardListType } from "@/types";
import { necromancer } from "@/assets";

export const GearCardList = ({ item, count, percentage }: GearCardListType) => {
  return (
    <Card.Root size="sm" variant="subtle">
      <Stack direction="row">
        <Card.Body gap="2">
          <Card.Title>{item}</Card.Title>
          <Flex direction="row">
            <Text>Count: {count}</Text>
            <Spacer />
            <Text fontWeight="bold">{percentage}%</Text>
          </Flex>
        </Card.Body>
      </Stack>
    </Card.Root>
  );
};

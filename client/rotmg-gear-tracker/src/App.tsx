import { useState } from "react";
import "./App.css";
import { fetchRotmgGear } from "./utils";
import type { classNameType, Item } from "./types";

// Chakra UI components
import {
  Heading,
  Text,
  Container,
  Box,
  Flex,
  SimpleGrid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import { GearCardList } from "./components/ui/gearCardList";

import { necromancer } from "./assets";

function App() {
  const [classIsSelected, setClassIsSelected] = useState(false);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [totalCharacters, setTotalCharacters] = useState(0);

  const handleButtonClick = async (className: classNameType) => {
    const gearData = await fetchRotmgGear(className);
    setClassIsSelected(true);
    setAllItems(gearData.gearUsage);
    setTotalCharacters(gearData.totalCharacters);
    console.log(gearData);
  };
  return (
    <Flex gap="16" direction="column">
      <Box>
        <Heading fontWeight="bold" size="3xl" colorPalette="white">
          ROTMG GEAR TRACKER
        </Heading>
        <Text fontSize="md" fontWeight="light">
          Find the most used gear for each class
        </Text>
      </Box>
      <Container>
        <SimpleGrid minChildWidth="48px" gap="16">
          <GridItem>
            <Image
              onClick={() => handleButtonClick("necromancers")}
              cursor="pointer"
              height="48px"
              src={necromancer}
            />
          </GridItem>
          <GridItem>
            <Image cursor="pointer" height="48px" src={necromancer} />
          </GridItem>
          <GridItem>
            <Image height="48px" src={necromancer} />
          </GridItem>
          <GridItem>
            <Image height="48px" src={necromancer} />
          </GridItem>
          <GridItem>
            <Image height="48px" src={necromancer} />
          </GridItem>
          <GridItem>
            <Image height="48px" src={necromancer} />
          </GridItem>
          <GridItem>
            <Image height="48px" src={necromancer} />
          </GridItem>
          <GridItem>
            <Image height="48px" src={necromancer} />
          </GridItem>
          <GridItem>
            <Image height="48px" src={necromancer} />
          </GridItem>
          <GridItem>
            <Image height="48px" src={necromancer} />
          </GridItem>
          <GridItem>
            <Image height="48px" src={necromancer} />
          </GridItem>
          <GridItem>
            <Image height="48px" src={necromancer} />
          </GridItem>
        </SimpleGrid>
      </Container>
      <SimpleGrid minChildWidth="250px" gap="4">
        {classIsSelected &&
          allItems.map((item, index) => (
            <GearCardList
              key={index}
              item={item.name}
              count={item.count}
              percentage={item.percentage}
            />
          ))}
        {/* {classIsSelected && (
          <GearCardList item="test" count={2} percentage="32%" />
        )} */}
      </SimpleGrid>
    </Flex>
  );
}

export default App;

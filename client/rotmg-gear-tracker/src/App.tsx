import { useState } from "react";
import "./App.css";
import { fetchRotmgGear } from "./utils";
import { allClasses } from "./types";
import type { ClassName, Item } from "./types";

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

import { classImages } from "./assets";

function App() {
  const [classIsSelected, setClassIsSelected] = useState(false);
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [totalCharacters, setTotalCharacters] = useState(0);

  const handleButtonClick = async (className: ClassName) => {
    const gearData = await fetchRotmgGear(className);
    setClassIsSelected(true);
    setAllItems(gearData.gearUsage);
    setTotalCharacters(gearData.totalCharacters);
    console.log(gearData);
  };
  return (
    <Flex gap="16" direction="column" justifyContent="center">
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
          {allClasses.map((className) => (
            <GridItem key={className}>
              <Image
                onClick={() => handleButtonClick(className)}
                cursor="pointer"
                height="48px"
                src={classImages[className]}
                alt={className}
              />
            </GridItem>
          ))}
        </SimpleGrid>
      </Container>
      <SimpleGrid minChildWidth="md" gap="4">
        {classIsSelected &&
          allItems.map((item, index) => (
            <GearCardList
              key={index}
              name={item.name}
              count={item.count}
              src={item.src}
              img={item.img}
              percentage={item.percentage}
            />
          ))}
      </SimpleGrid>
    </Flex>
  );
}

export default App;

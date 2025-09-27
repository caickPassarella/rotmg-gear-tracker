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
  const [currentClass, setCurrentClass] = useState("");
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [totalCharacters, setTotalCharacters] = useState(0);

  const gearTypes = ["Weapon", "Armor", "Ability", "Ring"];

  const handleButtonClick = async (className: ClassName) => {
    const gearData = await fetchRotmgGear(className);
    setCurrentClass(className);
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
                _hover={{
                  transform: "scale(1.04)",
                  filter: "drop-shadow(0 0 0.50rem rgba(219, 219, 219, 0.247))",
                }}
                onClick={() => handleButtonClick(className)}
                cursor="pointer"
                height="48px"
                src={classImages[className]}
                alt={className}
                imageRendering="pixelated"
              />
            </GridItem>
          ))}
        </SimpleGrid>
      </Container>
      {currentClass && (
        <Box>
          <Box paddingBottom="2">
            <Heading fontWeight="bold" size="3xl" textAlign="left">
              {currentClass}
            </Heading>
            <Text textAlign="left" fontSize="md" fontWeight="light">
              <Text as="span" fontWeight="bold">
                {totalCharacters}
              </Text>{" "}
              characters found
            </Text>
          </Box>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }}>
            {gearTypes.map((type) => (
              <Box key={type}>
                <Heading fontWeight="bold" size="md" mb={4}>
                  {type}
                </Heading>
                {allItems
                  .filter((item) => item.type === type)
                  .map((item, index) => (
                    <Box key={index} margin={4}>
                      <GearCardList
                        name={item.name}
                        count={item.count}
                        type={item.type}
                        src={item.src}
                        img={item.img}
                        percentage={item.percentage}
                      />
                    </Box>
                  ))}
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}
    </Flex>
  );
}

export default App;

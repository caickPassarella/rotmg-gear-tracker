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
  Spinner,
  Link,
  Stack,
} from "@chakra-ui/react";
import { GearCardList } from "./components/ui/gearCardList";

import { classImages } from "./assets";

function App() {
  const [currentClass, setCurrentClass] = useState("");
  const [allItems, setAllItems] = useState<Item[]>([]);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [loading, setLoading] = useState(false);

  const gearTypes = ["Weapon", "Armor", "Ability", "Ring"];

  const handleButtonClick = async (className: ClassName) => {
    setLoading(true);
    const gearData = await fetchRotmgGear(className);
    setCurrentClass(className);
    setAllItems(gearData.gearUsage);
    setTotalCharacters(gearData.totalCharacters);
    console.log(gearData);
    setLoading(false);
  };
  return (
    <Flex gap="16" direction="column" justifyContent="center">
      <Flex justifyContent="space-between">
        <Stack direction="row">
          <Link
            paddingRight={3}
            _hover={{
              textDecoration: "underline",
              color: "#ffffff",
              boxShadow: "md",
            }}
          >
            Home
          </Link>
          <Link
            _hover={{
              textDecoration: "underline",
              color: "#ffffff",
              boxShadow: "md",
            }}
          >
            Contact
          </Link>
        </Stack>
        <Heading fontWeight="bold" size="lg" colorPalette="white">
          ROTMG GEAR TRACKER
        </Heading>
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href="https://github.com/caickPassarella/rotmg-gear-tracker"
        >
          <Image
            _hover={{
              transform: "scale(1.08)",
            }}
            height="24px"
            alt="GitHub"
            src={classImages["gitHub"]}
          />
        </Link>
      </Flex>
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
      {loading ? <Spinner margin={4} size="lg" /> : <></>}
      {currentClass && (
        <Box>
          <Box>
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
                    <Box key={index} marginY={4} marginRight={6}>
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

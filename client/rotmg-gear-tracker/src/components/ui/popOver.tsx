import {
  Popover,
  Portal,
  Stack,
  Text,
  DataList,
  Tag,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import type { PopOverProp } from "@/types";
import { raritiesImgs } from "@/assets";

export const PopOver = ({ children, rarities }: PopOverProp) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              <Stack direction="column">
                <Text fontWeight="medium">Rarities</Text>

                {Object.entries(rarities).map(([rarity, value]) => (
                  <Tag.Root maxW="110px">
                    <Tag.StartElement>
                      <Image src={raritiesImgs[rarity]} />
                    </Tag.StartElement>
                    <Tag.Label>
                      {rarity}: {value}
                    </Tag.Label>
                  </Tag.Root>
                ))}
              </Stack>
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

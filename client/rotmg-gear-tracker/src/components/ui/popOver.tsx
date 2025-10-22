import {
  Portal,
  Tag,
  Image,
  CloseButton,
  Dialog,
  DataList,
  Text,
  Stack,
  Button,
  LinkOverlay,
} from "@chakra-ui/react";
import type { PopOverProp } from "@/types";
import { raritiesImgs } from "@/assets";
import { LuExternalLink } from "react-icons/lu";

export const PopOver = ({
  children,
  src,
  name,
  rarities,
  enchantments,
}: PopOverProp) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Stack align="flex-start">
                <Dialog.Title>{name}</Dialog.Title>
                <Button gap={2} variant="outline" size="xs">
                  <LinkOverlay
                    rel="noopener noreferrer"
                    target="_blank"
                    href={src}
                  >
                    Wiki
                  </LinkOverlay>
                  <LuExternalLink />
                </Button>
              </Stack>
            </Dialog.Header>
            <Dialog.Body>
              <DataList.Root>
                <DataList.Item>
                  <Text fontSize="md">Rarity count</Text>
                  <DataList.ItemValue gap={3}>
                    {Object.entries(rarities).map(([rarity, value]) => (
                      <Tag.Root maxW="110px">
                        <Tag.StartElement>
                          <Image src={raritiesImgs[rarity]} />
                        </Tag.StartElement>
                        <Tag.Label>{value}</Tag.Label>
                      </Tag.Root>
                    ))}
                  </DataList.ItemValue>
                </DataList.Item>
                <Text fontSize="md">Enchantments</Text>
                {enchantments.map(([name, value]) => (
                  <DataList.Item key={name}>
                    <DataList.ItemLabel>{name}</DataList.ItemLabel>
                    <DataList.ItemValue>{value}</DataList.ItemValue>
                  </DataList.Item>
                ))}
                <Text fontSize="sm" color="fg.warning">
                  Only shows enchantments with a count higher than 1
                </Text>
              </DataList.Root>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

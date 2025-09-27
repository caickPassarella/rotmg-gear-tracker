import { Popover, Portal } from "@chakra-ui/react";
import { useState } from "react";
import type { PopOverProp } from "@/types";

export const PopOver = ({ children }: PopOverProp) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Popover.Trigger asChild>{children}</Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Body>
              This is a popover with the same width as the trigger button
            </Popover.Body>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  );
};

"use client";

import React, { useRef } from "react";
import { Box, Flex, Drawer, Portal, Button } from "@chakra-ui/react";
import { RxTextAlignJustify } from "react-icons/rx";
import { usePathname } from "next/navigation";

interface DrawerMenuProps {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (value: boolean) => void;
  listData: { title: string; route: string }[];
  handleItemPress: (item: { title: string; route: string }) => void;
}

const DrawerMenu = ({
  isDrawerOpen,
  setIsDrawerOpen,
  listData,
  handleItemPress,
}: DrawerMenuProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  return (
    <Drawer.Root
      placement="end"
      initialFocusEl={() => ref.current}
      open={isDrawerOpen}
      onOpenChange={(value) => setIsDrawerOpen(value.open)}
    >
      <Drawer.Trigger asChild>
        <Box cursor="pointer">
          <RxTextAlignJustify size={28} color="black" />
        </Box>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content bg="white">
            <Drawer.Body>
              <Flex
                direction="column"
                gap={2}
                alignItems="flex-start"
                width="full"
              >
                {listData?.map((item) => (
                  <Button
                    key={item.route}
                    justifyContent="flex-start"
                    w="full"
                    size="lg"
                    fontWeight="semibold"
                    variant="ghost"
                    color={pathname === item.route ? "red" : "black"}
                    borderBottom="1px solid #e2e8f0"
                    onClick={() => handleItemPress(item)}
                    _hover={{ color: "gray.500", backgroundColor: "white" }}
                  >
                    {item.title}
                  </Button>
                ))}
              </Flex>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default DrawerMenu;

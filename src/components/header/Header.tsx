"use client";

import {
  Box,
  Flex,
  Text,
  Drawer,
  useBreakpointValue,
  Portal,
  Button,
} from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import { FaMapMarkerAlt } from "react-icons/fa";
import { RxTextAlignJustify } from "react-icons/rx";
import React, { Fragment, useRef } from "react";
import { FaAngleRight } from "react-icons/fa6";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const ref = useRef<HTMLInputElement>(null);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const headerMenu = [
    { title: "Konum Listesi", route: "/" },
    { title: "Konum Ekle", route: "/add-location" },
    { title: "Rota Oluştur", route: "/draw-route" },
  ];

  const handleGoHome = () => router.push("/");

  const handleRoute = (route: string) => {
    router.push(route);
  };

  return (
    <Box
      as="header"
      w="100%"
      h={14}
      bg="gray.100"
      boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex align="center" justify="space-between" h="100%" px={6}>
        <Flex onClick={handleGoHome} gap={2} cursor="pointer" align="center">
          <FaMapMarkerAlt color="red" size={24} />
          <Text color="black" fontWeight="semibold">
            Location App
          </Text>
        </Flex>

        {isMobile ? (
          <Fragment>
            <Drawer.Root placement={"end"} initialFocusEl={() => ref.current}>
              <Drawer.Trigger asChild>
                <Box cursor={"pointer"}>
                  <RxTextAlignJustify size={28} color="black" />
                </Box>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content bg={"white"}>
                    <Drawer.Body>
                      <Flex
                        gap={2}
                        flexDirection="column"
                        alignItems={"flex-start"}
                      >
                        {headerMenu.map((item) => {
                          const isActive = pathname === item.route;
                          return (
                            <Button
                              key={item.route}
                              fontWeight="semibold"
                              color={isActive ? "red" : "black"}
                              _hover={{ color: "gray.500", cursor: "pointer" }}
                              w={"full"}
                              size="lg"
                              borderBottom={"1px solid #e2e8f0"}
                              alignItems={"center"}
                              justifyContent={"space-between"}
                              onClick={() => handleRoute(item.route)}
                            >
                              {item.title}
                              <FaAngleRight size={20} color="gray" />
                            </Button>
                          );
                        })}
                      </Flex>
                    </Drawer.Body>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          </Fragment>
        ) : (
          <Flex gap={4}>
            {headerMenu.map((item) => {
              const isActive = pathname === item.route;
              return (
                <Text
                  key={item.route}
                  fontWeight="semibold"
                  color={isActive ? "red" : "black"}
                  _hover={{ color: "gray.500", cursor: "pointer" }}
                  onClick={() => handleRoute(item.route)}
                >
                  {item.title}
                </Text>
              );
            })}
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Header;

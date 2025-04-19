"use client";

import { Box, Flex, Text, useBreakpointValue } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import { FaMapMarkerAlt } from "react-icons/fa";
import React, { useState } from "react";
import { headerMenuList } from "@/utils/headerMenuList";
import DrawerMenu from "../drawer/DrawerMenu";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleGoHome = () => router.push("/");

  const handleRoute = (route: string) => {
    if (pathname !== route) router.push(route);
    setIsDrawerOpen(false);
  };

  const renderMobileMenu = () => (
    <DrawerMenu
      listData={headerMenuList}
      isDrawerOpen={isDrawerOpen}
      setIsDrawerOpen={setIsDrawerOpen}
      handleItemPress={(item) => {
        handleRoute(item.route);
      }}
    />
  );

  const renderDesktopMenu = () => (
    <Flex gap={4}>
      {headerMenuList.map((item) => (
        <Text
          key={item.route}
          fontWeight="semibold"
          color={pathname === item.route ? "red" : "black"}
          cursor="pointer"
          _hover={{ color: "gray.500" }}
          onClick={() => handleRoute(item.route)}
        >
          {item.title}
        </Text>
      ))}
    </Flex>
  );

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

        {isMobile ? renderMobileMenu() : renderDesktopMenu()}
      </Flex>
    </Box>
  );
};

export default Header;

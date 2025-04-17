"use client";

import React, { Fragment } from "react";
import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  Box,
  Text,
  Flex,
  HStack,
} from "@chakra-ui/react";
import { IoArrowForwardSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { FaMapMarkedAlt } from "react-icons/fa";

type LatLng = {
  lat: number;
  lng: number;
  name: string | null;
  color?: string | null;
  id: string;
};

interface RouteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  origin: LatLng | null;
  destination: LatLng | null;
  waypoints: LatLng[];
}

const RouteModal = ({
  isOpen,
  onOpenChange,
  origin,
  destination,
  waypoints,
}: RouteModalProps) => {
  const router = useRouter();
  const allPoints = [origin, ...waypoints, destination].filter(
    (point) => point !== undefined && point !== null
  );

  return (
    <HStack wrap="wrap">
      <Drawer.Root
        open={isOpen}
        onOpenChange={(value) => onOpenChange(value.open)}
        placement={"bottom"}
      >
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content
              roundedTop={"l3"}
              roundedBottom={undefined}
              p={4}
              bg="white"
            >
              <Drawer.Header>
                <Drawer.Title color={"black"}>Rota Sıralaması</Drawer.Title>
              </Drawer.Header>

              <Drawer.Body maxH="310px" overflowY="auto">
                <Flex
                  direction={{ base: "column", md: "row" }}
                  gap={3}
                  align="center"
                  justify="flex-start"
                  wrap="wrap"
                >
                  {allPoints.length > 0 && (
                    <Fragment>
                      {allPoints?.map((point, index) => (
                        <Fragment key={index}>
                          <Box
                            px={4}
                            py={2}
                            borderRadius="md"
                            bg={point?.color ?? "black"}
                            color="white"
                            textAlign="center"
                            minW="100px"
                          >
                            <Text fontWeight="medium" fontSize="sm">
                              {point?.name || `Konum ${index + 1}`}
                            </Text>
                          </Box>

                          {index !== allPoints?.length - 1 && (
                            <IoArrowForwardSharp size={24} color="black" />
                          )}
                        </Fragment>
                      ))}
                    </Fragment>
                  )}

                  {allPoints.length === 0 && (
                    <Flex
                      w={"full"}
                      direction="column"
                      align="center"
                      justify="center"
                      bg="gray.50"
                      borderRadius="lg"
                      textAlign="center"
                      gap={3}
                      py={4}
                    >
                      <FaMapMarkedAlt size={60} color="black" />

                      <Text
                        fontSize="md"
                        fontWeight="semibold"
                        color="gray.700"
                      >
                        Henüz hiç lokasyon eklenmedi.
                      </Text>

                      <Text fontSize="md" color="gray.500" maxW="md">
                        Rota oluşturmak için lütfen lokasyon ekleyiniz.
                      </Text>

                      <Button
                        size="sm"
                        variant="outline"
                        color="black"
                        borderColor="gray.400"
                        _hover={{ bg: "black", color: "white" }}
                        onClick={() => router.push("/add-location")}
                      >
                        Lokasyon Ekle
                      </Button>
                    </Flex>
                  )}
                </Flex>
              </Drawer.Body>

              <Drawer.Footer>
                <Drawer.ActionTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    color="black"
                    borderColor="gray.400"
                    _hover={{ bg: "black", color: "white" }}
                  >
                    Kapat
                  </Button>
                </Drawer.ActionTrigger>
              </Drawer.Footer>

              <Drawer.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Drawer.CloseTrigger>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </HStack>
  );
};

export default RouteModal;

"use client";

import React, { Fragment } from "react";
import {
  Button,
  CloseButton,
  Drawer,
  Portal,
  Flex,
  HStack,
} from "@chakra-ui/react";
import NotFoundLocationCard from "../card/NotFoundLocationCard";
import RouteOrderCardItem from "../card/RouteOrderCardItem";

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
                  {allPoints?.length > 0 && (
                    <Fragment>
                      {allPoints?.map((item, index) => (
                        <RouteOrderCardItem
                          key={item?.id}
                          point={item}
                          index={index}
                          allPoints={allPoints}
                        />
                      ))}
                    </Fragment>
                  )}

                  {allPoints?.length === 0 && (
                    <Flex align="center" justify="center" w="full">
                      <NotFoundLocationCard />
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

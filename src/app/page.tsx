"use client";

import LocationCardItem from "@/components/card/LocationCardItem";
import NotFoundLocationCard from "@/components/card/NotFoundLocationCard";
import AlertDialog from "@/components/dialog/AlertDialog";
import { toaster } from "@/components/ui/toaster";
import { useLocationStore } from "@/store/useLocationStore";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const { locations, deleteLocation } = useLocationStore();
  const [openAlert, setOpenAlert] = useState(false);
  const [locationId, setLocationId] = useState<string | null>(null);

  const handleAlertOpenPress = (id: string) => {
    setOpenAlert(true);
    setLocationId(id);
  };

  const handleDeleteLocation = () => {
    deleteLocation(locationId as string);
    setOpenAlert(false);

    toaster.create({
      title: "Başarılı",
      description: "Konum başarıyla silindi.",
      type: "success",
      duration: 1500,
    });
  };

  return (
    <Box bg={"white"} minH={"calc(100vh - 56px)"}>
      <AlertDialog
        title="Konumu Sil"
        description="Bu konumu silmek istediğinize emin misiniz?"
        isOpen={openAlert}
        onOpenChange={() => {
          setOpenAlert(false);
        }}
        onConfirmPress={handleDeleteLocation}
        cancelButtonText="Vazgeç"
        confirmButtonText="Sil"
      />

      {locations?.length > 0 && (
        <VStack w={"full"} gap={4} pt={5} px={5} pb={20}>
          <HStack w={"full"} justify="space-between">
            <Text fontSize="xl" fontWeight="bold" color="black">
              Konumlarım
            </Text>

            <Button
              size="sm"
              variant="surface"
              onClick={() => router.push("/draw-route")}
              color={"white"}
            >
              Rota Göster
            </Button>
          </HStack>

          <Grid
            templateColumns={{
              base: "1fr",
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
              xl: "repeat(4, 1fr)",
            }}
            gap={6}
            w={"full"}
          >
            {locations?.map((location) => (
              <GridItem key={location?.id}>
                <LocationCardItem
                  id={location?.id}
                  lat={location?.lat}
                  lng={location?.lng}
                  name={location?.name || "Konum Adı"}
                  color={location?.color as string}
                  onDelete={(id) => {
                    handleAlertOpenPress(id);
                  }}
                  onEdit={(id) => {
                    router.push(`/edit-location/${id}`);
                  }}
                />
              </GridItem>
            ))}
          </Grid>
        </VStack>
      )}

      {locations?.length === 0 && (
        <Flex h={"calc(100vh - 56px)"} align="center" justify="center">
          <NotFoundLocationCard />
        </Flex>
      )}
    </Box>
  );
};

export default Page;

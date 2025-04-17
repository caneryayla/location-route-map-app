"use client";

import LocationCardItem from "@/components/card/LocationCardItem";
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
import { FaMapMarkedAlt } from "react-icons/fa";

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
      description: "Lokasyon başarıyla silindi.",
      type: "success",
      duration: 3000,
    });
  };

  return (
    <Box bg={"white"} minH={"calc(100vh - 56px)"}>
      <AlertDialog
        title="Lokasyonu Sil"
        description="Bu lokasyonu silmek istediğinize emin misiniz?"
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
              Lokasyonlarım
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
          >
            {locations?.map((location) => (
              <GridItem key={location?.id}>
                <LocationCardItem
                  id={location?.id}
                  lat={location?.lat}
                  lng={location?.lng}
                  name={location?.name || "Lokasyon"}
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
        <Flex
          direction="column"
          align="center"
          justify="center"
          bg="gray.50"
          borderRadius="lg"
          textAlign="center"
          minH={"calc(100vh - 56px)"}
          gap={4}
        >
          <FaMapMarkedAlt size={100} color="black" />

          <Text fontSize="2xl" fontWeight="semibold" color="gray.700">
            Henüz hiç lokasyon eklenmedi.
          </Text>

          <Text fontSize="md" color="gray.500" maxW="md">
            Konumlarınızı görüntüleyebilmek için ilk lokasyonunuzu oluşturun.
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
    </Box>
  );
};

export default Page;

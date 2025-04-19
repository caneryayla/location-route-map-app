import { Button, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React from "react";
import { FaMapMarkedAlt } from "react-icons/fa";

const NotFoundLocationCard = () => {
  const router = useRouter();

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      borderRadius="lg"
      textAlign="center"
      gap={4}
      w={"full"}
    >
      <FaMapMarkedAlt size={100} color="black" />

      <Text fontSize="2xl" fontWeight="semibold" color="gray.700">
        Henüz hiç konum eklenmedi.
      </Text>

      <Text fontSize="md" color="gray.500" maxW="md">
        Konumlarınızı görüntüleyebilmek için lütfen bir konum ekleyin.
      </Text>

      <Button
        size="sm"
        variant="outline"
        color="black"
        borderColor="gray.400"
        _hover={{ bg: "black", color: "white" }}
        onClick={() => router.push("/add-location")}
      >
        Konum Ekle
      </Button>
    </Flex>
  );
};

export default NotFoundLocationCard;

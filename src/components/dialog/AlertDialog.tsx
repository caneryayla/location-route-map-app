import React from "react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";

interface AlertDialogProps {
  title: string;
  description: string;
  isOpen: boolean;
  onOpenChange: () => void;
  onConfirmPress: () => void;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

const AlertDialog = ({
  title,
  description,
  isOpen,
  onOpenChange,
  cancelButtonText = "Vazgeç",
  confirmButtonText = "Tamam",
  onConfirmPress,
}: AlertDialogProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg={"white"}>
            <Dialog.Header>
              <Dialog.Title color={"black"}>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p className="text-black">{description}</p>
            </Dialog.Body>
            <Dialog.Footer justifyContent={"start"}>
              <Dialog.ActionTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  color="black"
                  borderColor="gray.400"
                  _hover={{ bg: "black", color: "white" }}
                >
                  {cancelButtonText}
                </Button>
              </Dialog.ActionTrigger>
              <Button
                size="sm"
                variant="outline"
                color="black"
                borderColor="gray.400"
                _hover={{ bg: "black", color: "white" }}
                onClick={onConfirmPress}
              >
                {confirmButtonText}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" color={"black"} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AlertDialog;

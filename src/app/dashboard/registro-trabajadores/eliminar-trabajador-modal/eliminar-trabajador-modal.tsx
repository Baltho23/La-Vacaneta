import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { ModalInfo } from "@/app/models/modalState.model";
import { UsuarioModel } from "@/app/models/usuario.model";
import { API_METHODS, DELETE } from "@/app/util/fetching";

export default function EliminarTrabajador({modalState, onOpenChange, onSubmit}: ModalInfo) {

  const usuario: UsuarioModel = modalState.data;
  const [loading, setLoading]: [boolean, Function] = useState(false);

  async function submit(onClose: Function) {
    setLoading(true);
    await fetch(API_METHODS.user.byUserId + usuario.id, {...DELETE})
      .then((response) => {
        setLoading(false);
        onClose();
        onSubmit();
    });
  }

  return (
    <Modal isOpen={modalState.isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Confirmación requerida</ModalHeader>
            <ModalBody>
              <p> 
                ¿Está seguro de eliminar el usuario <b> {usuario.username} </b>?
              </p>
            </ModalBody>
            <ModalFooter>
              <Button isLoading={loading} color="danger" onPress={() => submit(onClose)}>
                Si
              </Button>
              <Button color="default" onPress={onClose}>
                No
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
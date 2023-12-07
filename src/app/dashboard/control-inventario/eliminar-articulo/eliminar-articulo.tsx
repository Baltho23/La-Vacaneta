import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Button } from "@nextui-org/button";
import { ModalInfo } from "@/app/models/modalState.model";
import { API_METHODS, DELETE } from "@/app/util/fetching";
import { ArticuloModel } from "@/app/models/articulo.model";

export default function EliminarArticulo({modalState, onOpenChange, onSubmit}: ModalInfo) {

  const articulo: ArticuloModel = modalState.data;
  const [loading, setLoading]: [boolean, Function] = useState(false);

  async function submit(onClose: Function) {
    setLoading(true);
    await fetch(API_METHODS.articulo.byArticuloId+ articulo.id, {...DELETE})
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
                ¿Está seguro de eliminar el articulo <b> {articulo.name} </b>?
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
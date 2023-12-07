import { ModalInfo } from "@/app/models/modalState.model";
import { EmptyPotreroModel, PotreroModel } from "@/app/models/potrero.model";
import { API_METHODS, POST, PUT } from "@/app/util/fetching";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function PotreroModal({modalState, onOpenChange, onSubmit}: ModalInfo){

  const [potreroForm, setPotreroForm]: [PotreroModel, Function] = useState(EmptyPotreroModel());
  const [loading, setLoading]: [boolean, Function] = useState(false);

  useEffect(() => {
    if (modalState.data) {
      setPotreroForm(modalState.data)
    } else {
      setPotreroForm(EmptyPotreroModel)
    }
  }, [modalState.data])

  function handlePotreroForm(event: any) {
    const {name, value} = event.target;
    setPotreroForm((prevFormData: PotreroModel) => ({
      ...prevFormData,
      [name]: value,
    }));   
  }

  async function submitPotreroForm(onClose: Function) {
    setLoading(true);
    const body = JSON.stringify(potreroForm);
    if (potreroForm?.id) {
      await fetch(API_METHODS.user.default, { ...PUT, body })
      .then((response) => response.text())
      .then((data) => {
        setLoading(false);
        onClose();
        onSubmit();
      })
      .catch((error) => console.log(error));
    } else {
      await fetch(API_METHODS.user.default, { ...POST, body })
      .then((response) => response.text())
      .then((data) => {
        setLoading(false);
        onClose();
        onSubmit();
      })
      .catch((error) => console.log(error));
    }
  }

    return (
      <Modal
        isOpen={modalState.isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Nuevo Protero
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Nombre"
                  name="name"
                  value={potreroForm.name}
                  placeholder="Ingresar nombre"
                  variant="bordered"
                  onChange={handlePotreroForm}
                />
                <Input
                  label="Calidad"
                  name="quality"
                  value={potreroForm.quality}
                  placeholder="Porcentaje de calidad"
                  variant="bordered"
                  onChange={handlePotreroForm}
                />
                <Input
                  label="Nivel"
                  name="level"
                  value={potreroForm.level}
                  placeholder="Porcentaje de nivel"
                  variant="bordered"
                  onChange={handlePotreroForm}
                />
                <Input
                  label="Desgaste"
                  name="wear"
                  value={potreroForm.wear}
                  placeholder="Porcentaje de desgaste"
                  variant="bordered"
                  onChange={handlePotreroForm}
                />
                <Input
                  label="Imagen"
                  name="picture"
                  value={potreroForm.picture}
                  placeholder="URL de la imagen"
                  variant="bordered"
                  onChange={handlePotreroForm}
                />
                <Input
                  label="Hectareas"
                  name="hectares"
                  value={potreroForm.hectares}
                  placeholder="Ingrese la cantidad"
                  variant="bordered"
                  onChange={handlePotreroForm}
                />
                <Input
                  label="Inicio"
                  name="Start"
                  value={potreroForm.Start}
                  placeholder="YYYY-MM-DD"
                  variant="bordered"
                  onChange={handlePotreroForm}
                />
                <Input
                  label="Cierre"
                  name="end"
                  value={potreroForm.end}
                  placeholder="YYYY-MM-DD"
                  variant="bordered"
                  onChange={handlePotreroForm}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button
                  isLoading={loading}
                  color="primary"
                  onPress={() => {
                    submitPotreroForm(onClose);
                  }}
                >
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
}
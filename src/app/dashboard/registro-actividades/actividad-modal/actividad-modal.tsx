import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Input, Textarea } from "@nextui-org/input";
import { Button} from "@nextui-org/button";
import { useEffect, useState } from "react";
import { API_METHODS, POST, PUT } from "@/app/util/fetching";
import { ModalInfo } from "@/app/models/modalState.model";
import { ActividadModel, EmptyActividadModel } from "@/app/models/actividad.model";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";

const estados = [
    {label: "Por hacer", value: "TODO"},
    {label: "En progreso", value: "INPROGRESS"},
    {label: "Finalizada", value: "DONE"},
  ];
  

export default function ActividadModal({modalState, onOpenChange, onSubmit}: ModalInfo) {
 
    const [actividadForm, setActividadForm]: [ActividadModel, Function] = useState(EmptyActividadModel());
    const [loading, setLoading]: [boolean, Function] = useState(false);
    const [selectedEstado, setSelectedEstado]: any = useState("TODO");

    useEffect(() => {
      if (modalState.data) {
        setActividadForm(modalState.data)
        const estado = estados.find(e => e.value === actividadForm.estado);
        if (estado) {
          setSelectedEstado(estado.value);
        }
      } else {
        setActividadForm(EmptyActividadModel)
      }
    }, [modalState, actividadForm.estado])

    function handleActividadForm(event: any) {
      const {name, value} = event.target;
      setActividadForm((prevFormData: any) => ({
        ...prevFormData,
        [name]: value,
      }));  
    }

    async function submitActividadForm(onClose: Function) {
      setLoading(true);
      actividadForm.estado = selectedEstado;
      const body = JSON.stringify(actividadForm);
      if (actividadForm?.id) {
        await fetch(API_METHODS.actividad.default, { ...PUT, body })
        .then((response) => response.text())
        .then((data) => {
          setLoading(false);
          onClose();
          onSubmit();
        })
        .catch((error) => console.log(error));
      } else {
        await fetch(API_METHODS.actividad.default, { ...POST, body })
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
              <ModalHeader className="flex flex-col gap-1">Crear/editar Actividad</ModalHeader>
                <ModalBody>
                  <Autocomplete
                    label="Estado"
                    variant="bordered"
                    defaultItems={estados}
                    placeholder="Seleccione un estado"
                    selectedKey={selectedEstado}
                    onSelectionChange={setSelectedEstado}
                  >
                    {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                  </Autocomplete>
                  <Textarea
                    name="mensaje"
                    variant="bordered"
                    label="Descripción"
                    value={actividadForm.mensaje}
                    labelPlacement="outside"
                    placeholder="Descripción de la tarea"
                    onChange={handleActividadForm}
                  />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cerrar
                </Button>
                <Button isLoading={loading} color="primary" onPress={()=>{submitActividadForm(onClose)}}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  }
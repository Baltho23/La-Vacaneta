import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Button} from "@nextui-org/button";
import { useEffect, useState } from "react";
import { API_METHODS, POST, PUT } from "@/app/util/fetching";
import { ModalInfo } from "@/app/models/modalState.model";
import { ArticuloModel, EmptyArticuloModel } from "@/app/models/articulo.model";

export default function EditarArticulo({modalState, onOpenChange, onSubmit}: ModalInfo) {
 
    const [articuloForm, setArticuloForm]: [ArticuloModel, Function] = useState(EmptyArticuloModel());
    const [loading, setLoading]: [boolean, Function] = useState(false);

    const categoryOptions = [
      {label: "Medicamento", value: "medicamento"}, 
      {label: "Herramienta", value: 'herramienta'},
      {label: "Otro", value: "otro"}
    ]

    useEffect(() => {
      if (modalState.data) {
        setArticuloForm(modalState.data)
      } else {
        setArticuloForm(EmptyArticuloModel)
      }
    }, [modalState])

    function handleArticuloForm(event: any) {
        const {name, value} = event.target;
        setArticuloForm((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));   
    }

    async function submitArticuloForm(onClose: Function) {
      setLoading(true);
      const body = JSON.stringify(articuloForm);
      if (articuloForm?.id) {
        await fetch(API_METHODS.articulo.default, { ...PUT, body })
        .then((response) => response.text())
        .then((data) => {
          setLoading(false);
          onClose();
          onSubmit();
        })
        .catch((error) => console.log(error));
      } else {
        await fetch(API_METHODS.articulo.default, { ...POST, body })
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
                <ModalHeader className="flex flex-col gap-1">Crear/editar articulo</ModalHeader>
                <ModalBody>
                  <Input
                    label="Nombre"
                    name="name"
                    value={articuloForm.name}
                    placeholder="Ingresar nombre"
                    variant="bordered"
                    onChange={handleArticuloForm}
                  />
                  <Input
                    label="Cantidad"
                    name="amount"
                    value={articuloForm.amount}
                    placeholder="Ingresar cantidad actual"
                    variant="bordered"
                    onChange={handleArticuloForm}
                  />
                  <Input
                    label="Vencimiento"
                    name="expiration"
                    value={articuloForm.expiration}
                    placeholder="YYYY-MM-DD"
                    variant="bordered"
                    onChange={handleArticuloForm}
                  />
                  <Input
                    label="Categoria"
                    name="category"
                    value={articuloForm.category}
                    variant="bordered"
                    onChange={handleArticuloForm}
                  />
                  <Input
                    label="Imagen"
                    name="picture"
                    value={articuloForm.picture}
                    placeholder="URL de la imagen"
                    variant="bordered"
                    onChange={handleArticuloForm}
                  />
                  <Input
                    label="Proveedor"
                    name="supplier"
                    value={articuloForm.supplier}
                    placeholder="Proveedor del articulo"
                    variant="bordered"
                    onChange={handleArticuloForm}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button isLoading={loading} color="primary" onPress={()=>{submitArticuloForm(onClose)}}>
                    Guardar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
    );
  }
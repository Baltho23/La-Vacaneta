import "./registro-animales.css";
import Vaca from "@/app/models/vaca.model";
import Icon from "@/app/components/icon/icon";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import { Modal, ModalContent, ModalBody, ModalHeader, ModalFooter } from "@nextui-org/modal";
import { ListSelectItem } from "@/app/models/selectItem.model";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";
import { Image } from "@nextui-org/react";

export default function RegistroAnimales() {

  const [isOpenRegistroAnimal, setIsOpenRegistroAnimal] = useState(false);
  const [selectedVaca, setSelectedVaca]: [Vaca, Function] = useState({} as Vaca);

  const sexoItems: ListSelectItem[]  = [
    { label: 'Macho', value: 'M' },
    { label: 'Hembra', value: 'F' }
  ]

  let [vacas, setVacas]: [Vaca[], Function] = useState([
    { id: '1', edad: '12', peso: '12', raza: "Sanabria", sexo: {label: 'Macho', value: 'M'} },
    { id: '2', edad: '14', peso: '14', raza: "Sanabria", sexo: {label: 'Macho', value: 'M'} },
    { id: '3', edad: '16', peso: '14', raza: "Sanabria", sexo: {label: 'Macho', value: 'M'} },
    { id: '4', edad: '18', peso: '14', raza: "Sanabria", sexo: {label: 'Macho', value: 'M'} },
    { id: '5', edad: '12', peso: '12', raza: "Sanabria", sexo: {label: 'Macho', value: 'M'} },
    { id: '6', edad: '14', peso: '14', raza: "Sanabria", sexo: {label: 'Macho', value: 'M'} },
    { id: '7', edad: '16', peso: '14', raza: "Sanabria", sexo: {label: 'Macho', value: 'M'} },
    { id: '8', edad: '18', peso: '14', raza: "Sanabria", sexo: {label: 'Macho', value: 'M'} },
    { id: '9', edad: '12', peso: '12', raza: "Sanabria", sexo: {label: 'Macho', value: 'M'} },
    { id: '10', edad: '14', peso: '14', raza: "Sanabria", sexo: {label: 'Macho', value: 'M'} },
    { id: '11', edad: '16', peso: '14', raza: "Sanabria", sexo: {label: 'Macho', value: 'M'} },
    { id: '12', edad: '18', peso: '14', raza: "Sanabria", sexo: {label: 'Macho', value: 'M'} }
  ]);

  function tarjetaVaca(vaca: Vaca) {
    return (
      <div className="card" key={vaca.id}>
        <section className="card-top-img">
        <Image
          isZoomed
          alt="NextUI Fruit Image with Zoom"
          src="https://i.pinimg.com/564x/75/f7/37/75f737e49bcc08c6f1812e60407a4044.jpg"
        />
        </section>
        <section className="card-content">
          <div className="flex gap-1">
            <h2 className="font-medium">Raza:</h2>
            <p>{ vaca.raza }</p>
          </div>
          <div className="flex gap-1">
            <h2 className="font-medium">Peso:</h2>
            <p>{ vaca.peso } Kg</p>
          </div>
          <div className="flex gap-1">
            <h2 className="font-medium">Edad:</h2>
            <p>{ vaca.edad } Meses</p>
          </div>
          <div className="flex gap-1">
            <h2 className="font-medium">Sexo:</h2>
            <p>{ vaca.sexo?.label }</p>
          </div>
        </section>
        <section className="card-footer">
          <Button isIconOnly color="primary" title="Editar animal" onPress={()=> editarVaca(vaca)}>
            <Icon name="pen"></Icon>
          </Button>
          <EliminarAnimal vacaId={vaca.id}></EliminarAnimal>
        </section>
      </div>
    );
  }

  function editarVaca(vaca: Vaca) {
    setSelectedVaca(vaca);
    setIsOpenRegistroAnimal(true);
  }

  function agregarVaca() {
    setSelectedVaca({} as Vaca);
    setIsOpenRegistroAnimal(true);
  }

  function RegistroAnimal() {
    const [submitted, setSubmitted]: [boolean, Function] = useState(false);
    const emptyVaca: Vaca = {id: '', peso: '', edad: '', raza: '', sexo: {label: '', value: ''}}
    const [vacaForm, setVacaForm]: [Vaca, Function] = useState(
      selectedVaca.id ? selectedVaca : emptyVaca
    );

    function onOpenChange(event: any) {
      setSubmitted(false);
      setIsOpenRegistroAnimal(event);
    }

    function handleVacaForm(event: any) {
      const {name, value} = event.target;
      switch (name) {
        case "sexo":
          const sexo = sexoItems.find((s) => s.value === value);
          setVacaForm((prevFormData: Vaca) => ({
            ...prevFormData,
            [name]: sexo,
          }));
          break;
        default:
          setVacaForm((prevFormData: Vaca) => ({
            ...prevFormData,
            [name]: value,
          }));
          break;
      }
    }

    function formularioValido(): boolean {
      return (vacaForm.edad && vacaForm.peso && vacaForm.raza && vacaForm.sexo?.value);
    }
    
    function guardarVaca() {
      setSubmitted(true);
      if (formularioValido()) {
        if (!vacaForm.id) {
          let idVaca;
          if (vacas.length > 0) {
            const ultimaVaca = vacas.reduce((anterior, actual) => {
              return actual.id > anterior.id ? actual : anterior;
            });
            idVaca = ultimaVaca.id + 1;
          } else {
            idVaca = 1;
          }
        }
        
        const indexVaca = vacas.findIndex(v => v.id === vacaForm.id);
        let newVacas = [...vacas];
        if (indexVaca != -1) {
          newVacas[indexVaca] = vacaForm;
          setVacas(newVacas); 
        } else {
          setVacas([...vacas, vacaForm]);
        }
        setIsOpenRegistroAnimal(false);
      }
    }

    return (
        <>
          <Modal isOpen={isOpenRegistroAnimal} onOpenChange={onOpenChange}>
            <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {selectedVaca.id ? "Editar animal" : 'Registrar animal'}
                </ModalHeader>
                <ModalBody>
                  <form className="tabview-form">
                    <Input
                      name="raza"
                      type="text"
                      label="Raza"
                      value={vacaForm.raza}
                      onChange={handleVacaForm}
                      color={(!vacaForm.raza && submitted)? "danger" : "default"}
                      required
                    ></Input>
                    <Input
                      name="edad"
                      type="number"
                      label="Edad (meses)"
                      value={vacaForm.edad}
                      onChange={handleVacaForm}
                      color={(!vacaForm.edad && submitted)? "danger" : "default"}
                      required
                    ></Input>
                    <Input
                      name="peso"
                      type="number"
                      label="Peso (kg)"
                      value={vacaForm.peso}
                      onChange={handleVacaForm}
                      color={(!vacaForm.peso && submitted)? "danger" : "default"}
                      required
                    ></Input>
                    <Select 
                      items={sexoItems}
                      name="sexo"
                      selectedKeys={vacaForm.sexo?.value}
                      onChange={handleVacaForm}
                      color={(!vacaForm.sexo?.value && submitted)? "danger" : "default"}
                      label="Seleccione el sexo"
                    >
                      {sexoItems.map((sexo) => (
                        <SelectItem key={sexo.value} value={sexo.value}>
                          {sexo.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" onPress={guardarVaca}>
                    Guardar
                  </Button>
                </ModalFooter>
              </>
            )}
            </ModalContent>
          </Modal>
        </>
      );
  }

  function EliminarAnimal({vacaId}: {vacaId: string}) {
    const [isOpen, setIsOpen] = useState(false);

    function eliminarVaca() {
      let newVacas = vacas.filter(vaca => vaca.id !== vacaId);
      setVacas(newVacas);
    }
    
    return (
      <Popover placement="bottom" isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <PopoverTrigger>
          <Button isIconOnly color="danger" title="Eliminar animal">
            <Icon name="times"></Icon>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px]">
          {(titleProps) => (
            <div className="px-1 py-2 w-full">
              <p className="text-small font-bold text-foreground" {...titleProps}>
                Confirmación
              </p>
              <div className="mt-2 flex flex-col gap-2 w-full">
                ¿Esta seguro de eliminarlo?
                <div className="flex gap-3 justify-end">
                  <Button color="danger" size="sm" onPress={eliminarVaca}>Si</Button>
                  <Button size="sm" onPress={()=> setIsOpen(false)}>No</Button>
                </div>
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <>
      <div className="flex justify-end w-full mb-6">
        <Button 
          title="Registrar animal" 
          color="primary" 
          endContent={<Icon name="plus"></Icon>}
          onPress={agregarVaca}
        >Agregar</Button>
      </div>

      <div className="flex flex-wrap gap-y-5 justify-around">
        {vacas.map((vaca) => tarjetaVaca(vaca))}
      </div>
      <RegistroAnimal></RegistroAnimal>
    </>  
  );
}

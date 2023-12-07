import "./registro-actividades.css";
import { useEffect, useMemo, useState } from "react";
import {Card, CardBody, Spinner } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import Icon from "@/app/components/icon/icon";
import { API_METHODS } from "@/app/util/fetching";
import { TableState } from "@/app/models/tableState.model";
import { ActividadModel } from "@/app/models/actividad.model";
import EliminarActividad from "./eliminar-actividad/eliminar-actividad";
import { InitialModalState, ModalState } from "@/app/models/modalState.model";
import ActividadModal from "./actividad-modal/actividad-modal";


export default function RegistroActividades() {
  
  const [cardState, setCardState]: [TableState, Function] = useState({isLoading: true, data: []});
  const [eliminarActividadState, setEliminarActividadState]: [ModalState, Function] = useState(InitialModalState);
  const [actividadModalState, setActividadModalState]: [ModalState, Function] = useState(InitialModalState);

  async function loadCards() {
    await fetch(API_METHODS.actividad.default)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const state: TableState = {isLoading: false, data};
        setCardState(state);
      });
  }

  const reloadCards = () => {
    const status: TableState = { ...cardState, isLoading: true}
    setCardState(status);
    loadCards();
  }

  useEffect(() => {
    loadCards()
  }, [])

  function showActividadModal(actividad?: ActividadModel) {
    const modalInfo = { isOpen: true, data: actividad };
    setActividadModalState(modalInfo);
  }

  function showEliminarActividadModal(actividad: ActividadModel) {
    const modalInfo = { isOpen: true, data: actividad };
    setEliminarActividadState(modalInfo);
  }

  function CardItem(actividad: ActividadModel) {
    return (
      <Card key={actividad.id}>
        <CardBody className="flex flex-row justify-between fondo">
          <p>
            {actividad.mensaje}
          </p>
          <Dropdown>
            <DropdownTrigger>
              <Button size="sm" className="w-0.5 fondo">
                <Icon name="uil uil-angle-down"></Icon>
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem onPress={() => showActividadModal(actividad)} key="edit">Editar</DropdownItem>
              <DropdownItem onPress={() =>copyText(actividad)} key="copy">Copiar</DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                onPress={() => showEliminarActividadModal(actividad)}
              >
                Eliminar
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardBody>
      </Card>
    );
  }

  function copyText(actividad: ActividadModel) {
    navigator.clipboard.writeText(actividad.mensaje);
    alert("Texto Copiado");
  }

  const toDoTask = useMemo(
    () => {
      return cardState.data.filter((actividad: ActividadModel) => actividad.estado === "TODO");
    },
    [cardState.data],
  );
  
  const inProgressTask = useMemo(
    () => {
      return cardState.data.filter((actividad: ActividadModel) => actividad.estado === "INPROGRESS");
    },
    [cardState.data],
  );

  const doneTask = useMemo(
    () => {
      return cardState.data.filter((actividad: ActividadModel) => actividad.estado === "DONE");
    },
    [cardState.data],
  );

  return (
    <main>
      <div className="flex p-5">
        <Button
          onPress={() => showActividadModal()}
          color="secondary"
          radius="full"
        >
          Añadir tarjeta
        </Button>
      </div>
      <div className="flex justify-between">
        <Card className="w-[30%]">
          <CardBody>
            <h1 className="my-4 text-xl font-bold ">Tareas por hacer</h1>
            <div className="flex flex-col mb-4 gap-3">
              { cardState.isLoading? <Spinner></Spinner> : toDoTask.map( actividad => CardItem(actividad)) }
            </div>
          </CardBody>
        </Card>
        <Card className="w-[30%]">
          <CardBody>
            <h1 className="my-4 text-xl font-bold ">Tareas en desarrollo</h1>
            <div className="flex flex-col mb-4 gap-3">
              { cardState.isLoading? <Spinner></Spinner> : inProgressTask.map( actividad => CardItem(actividad)) }
            </div>
          </CardBody>
        </Card>
        <Card className="w-[30%]">
          <CardBody>
            <h1 className="my-4 text-xl font-bold ">Tareas finalizadas</h1>
            <div className="flex flex-col mb-4 gap-3">
              { cardState.isLoading? <Spinner></Spinner> : doneTask.map( actividad => CardItem(actividad)) }
            </div>
          </CardBody>
        </Card>
      </div>
      <EliminarActividad 
        modalState={eliminarActividadState} 
        onOpenChange={setEliminarActividadState}  
        onSubmit={reloadCards}
      ></EliminarActividad>
      <ActividadModal
        modalState={actividadModalState} 
        onOpenChange={setActividadModalState}  
        onSubmit={reloadCards}
      ></ActividadModal>
    </main>
  );
}

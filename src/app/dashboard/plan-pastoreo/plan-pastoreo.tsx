import "./plan-pastoreo.css";
import React, { useState } from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem} from "@nextui-org/react";
import Icon from "@/app/components/icon/icon";
import PotreroModal from "./potrero-modal/potrero-modal";
import { PotreroModel } from "@/app/models/potrero.model";
import { InitialModalState, ModalState } from "@/app/models/modalState.model";
import EliminarPotrero from "./eliminar-potrero-modal/eliminar-potrero-modal";

export default function PlanPastoreo(){

  const [potreroModalState, setPotreroModalState]: [ModalState, Function] = useState(InitialModalState);
  const [eliminarModalState, setEliminarModalState]: [ModalState, Function] = useState(InitialModalState);
  

  function showPotreroModal(user?: PotreroModel) {
    const modalInfo = { isOpen: true, data: user };
    setPotreroModalState(modalInfo);
  }

  function showEliminarPotreroModal(user?: PotreroModel) {
    const modalInfo = { isOpen: true, data: user };
    setEliminarModalState(modalInfo);
  }

  return (
    <main>
      <div className="flex justify-end w-full mb-6">
        <Button
          title="Agregar Potrero"
          color="primary"
          onPress={() => showPotreroModal()}
          endContent={<Icon name="plus"></Icon>}
        >
          Agregar
        </Button>
      </div>
      <div className="flex justify-between">
        <Card shadow="sm" className="minimo m-4">
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              className=" rounded-b-none w-full object-cover h-[300px]"
              src="https://media.istockphoto.com/id/1402056910/es/foto/los-prados-se-cubren-de-hierba-y-%C3%A1rboles-en-el-fondo-de-la-cordillera-por-la-ma%C3%B1ana-paisaje.jpg?s=612x612&w=0&k=20&c=gT4ygsv-xeO0LG_ipMdYsGLusdUhFxwgQy6N7M6VhiI="
            />
            <div className="ml-5">
              <h1 className="mt-2 text-center font-bold text-xl">
                Potrero Norte
                <Dropdown className="fondo">
                  <DropdownTrigger>
                    <Button size="sm" className="w-0.5 fondo">
                      <Icon name="uil uil-angle-down"></Icon>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Action event example"
                  >
                    <DropdownItem onClick={()=>showPotreroModal()} key="edit">Editar</DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                      onClick={()=>showEliminarPotreroModal()}
                    >
                      Eliminar
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </h1>
            </div>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <div>
              <div className="flex gap-3">
                <b className="mb-2">Calidad:</b>
                <p className="text-default-500">73%</p>
              </div>
              <div className="flex gap-3">
                <b>Desgaste:</b>
                <p className="text-default-500">24%</p>
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <b className="mb-2">Nivel:</b>
                <p className="text-default-500">69%</p>
              </div>
              <div className="flex gap-3">
                <b>Hectareas:</b>
                <p className="text-default-500">5</p>
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <b className="mb-2">Inicio:</b>
                <p className="text-default-500">21/11/2023</p>
              </div>
              <div className="flex gap-3">
                <b>Cierre:</b>
                <p className="text-default-500">08/02/2024</p>
              </div>
            </div>
          </CardFooter>
        </Card>
        <Card shadow="sm" className="minimo m-4">
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              className="rounded-b-none w-full object-cover h-[300px]"
              src="https://live.staticflickr.com/7597/16559374197_fca9d1678b_b.jpg"
            />
            <div className="ml-5">
              <h1 className="mt-2 text-center font-bold text-xl">
                Potrero Este
                <Dropdown className="fondo">
                  <DropdownTrigger>
                    <Button size="sm" className="w-0.5 fondo">
                      <Icon name="uil uil-angle-down"></Icon>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Action event example"
                    onAction={(key) => alert(key)}
                  >
                    <DropdownItem key="edit">Editar</DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                    >
                      Eliminar
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </h1>
            </div>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <div>
              <div className="flex gap-3">
                <b className="mb-2">Calidad:</b>
                <p className="text-default-500">73%</p>
              </div>
              <div className="flex gap-3">
                <b>Desgaste:</b>
                <p className="text-default-500">24%</p>
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <b className="mb-2">Nivel:</b>
                <p className="text-default-500">69%</p>
              </div>
              <div className="flex gap-3">
                <b>Hectareas:</b>
                <p className="text-default-500">3</p>
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <b className="mb-2">Inicio:</b>
                <p className="text-default-500">21/8/2023</p>
              </div>
              <div className="flex gap-3">
                <b>Cierre:</b>
                <p className="text-default-500">08/01/2024</p>
              </div>
            </div>
          </CardFooter>
        </Card>
        <Card shadow="sm" className="minimo m-4">
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              className="rounded-b-none w-full object-cover h-[300px]"
              src="https://www.researchgate.net/publication/237210571/figure/fig1/AS:642439563988992@1530180936500/Figura-2-Potreros-enmalezados-y-bosques-remanentes-en-la-vereda-San-Fermin-en-el.png"
            />
            <div className="ml-5">
              <h1 className="mt-2 text-center font-bold text-xl">
                Potrero Sur
                <Dropdown className="fondo">
                  <DropdownTrigger>
                    <Button size="sm" className="w-0.5 fondo">
                      <Icon name="uil uil-angle-down"></Icon>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    aria-label="Action event example"
                  >
                    <DropdownItem key="edit">Editar</DropdownItem>
                    <DropdownItem
                      key="delete"
                      className="text-danger"
                      color="danger"
                    >
                      Eliminar
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </h1>
            </div>
          </CardBody>
          <CardFooter className="text-small justify-between">
            <div>
              <div className="flex gap-3">
                <b className="mb-2">Calidad:</b>
                <p className="text-default-500">73%</p>
              </div>
              <div className="flex gap-3">
                <b>Desgaste:</b>
                <p className="text-default-500">24%</p>
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <b className="mb-2">Nivel:</b>
                <p className="text-default-500">69%</p>
              </div>
              <div className="flex gap-3">
                <b>Hectareas:</b>
                <p className="text-default-500">7</p>
              </div>
            </div>
            <div>
              <div className="flex gap-3">
                <b className="mb-2">Inicio:</b>
                <p className="text-default-500">28/12/2023</p>
              </div>
              <div className="flex gap-3">
                <b>Cierre:</b>
                <p className="text-default-500">19/05/2024</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      <PotreroModal
        modalState={potreroModalState}
        onOpenChange={setPotreroModalState}
        onSubmit={()=>{}}
      ></PotreroModal>
      <EliminarPotrero
        modalState={eliminarModalState}
        onOpenChange={setEliminarModalState}
        onSubmit={()=>{}}
      ></EliminarPotrero>
    </main>
  );
}
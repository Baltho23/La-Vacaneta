import Icon from "@/app/components/icon/icon";
import TrabajadorModal from "./trabajador-modal/trabajador-modal";
import EliminarTrabajador from "./eliminar-trabajador-modal/eliminar-trabajador-modal";

import { Button } from "@nextui-org/button"
import { Chip, ChipProps } from "@nextui-org/chip"
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/dropdown"
import { Input } from "@nextui-org/input"
import { Pagination } from "@nextui-org/pagination"
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Selection, SortDescriptor } from "@nextui-org/table"
import { useCallback, useEffect, useMemo, useState } from "react";
import { User } from "@nextui-org/user"
import { columns, statusOptions } from "./trabajadores";
import { API_METHODS } from "@/app/util/fetching";
import { UsuarioModel } from "@/app/models/usuario.model";
import { InitialModalState, ModalState } from "@/app/models/modalState.model";
import { TableState } from "@/app/models/tableState.model";
import { Spinner } from "@nextui-org/spinner";


const statusColorMap: Record<string, ChipProps["color"]> = {
  activo: "success",
  inactivo: "danger",
  vacaciones: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "username", "role", "status", "actions"];

export default function RegistroTrabajadores() {

  const [tableState, setTableState]: [TableState, Function] = useState({isLoading: true, data: []});
  const [filterValue, setFilterValue] = useState("");
  const [trabajadorModalState, setTrabajadorModalState]: [ModalState, Function] = useState(InitialModalState);
  const [eliminarModalState, setEliminarModalState]: [ModalState, Function] = useState(InitialModalState);
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [statusFilter, setStatusFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const loadTable = async () => {
    await fetch(API_METHODS.user.default)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const status = { isLoading: false, data }
        setTableState(status);
      }
    ).catch((error) => console.log(error));
  }

  const reloadTable = () => {
    const status: TableState = { ...tableState, isLoading: true}
    setTableState(status);
    loadTable();
  }

  useEffect(() => {
    loadTable();
  }, [])

  const hasSearchFilter = Boolean(filterValue);

  const loadingState = tableState.isLoading ? "loading" : "idle";

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    if (tableState.data) {
      let filteredUsers = [...tableState.data];

      if (hasSearchFilter) {
        filteredUsers = filteredUsers.filter((user) =>
          user.name.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
      if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
        filteredUsers = filteredUsers.filter((user) =>
          Array.from(statusFilter).includes(user.status),
        );
      }

      return filteredUsers;
    }
  }, [hasSearchFilter, filterValue, statusFilter, tableState.data]);
  
  const pages = filteredItems? Math.ceil(filteredItems.length / rowsPerPage) : 1;

  const items = useMemo(() => {
    if (filteredItems) {
      const start = (page - 1) * rowsPerPage;
      const end = start + rowsPerPage;

      return filteredItems.slice(start, end);
    }
  }, [page, filteredItems, rowsPerPage]);
 
  const sortedItems = useMemo(() => {
    if (items) {
      return [...items].sort((a: UsuarioModel, b: UsuarioModel) => {
        const first = a[sortDescriptor.column as keyof UsuarioModel] as number;
        const second = b[sortDescriptor.column as keyof UsuarioModel] as number;
        const cmp = first < second ? -1 : first > second ? 1 : 0;
  
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }
  }, [sortDescriptor, items]);

  const renderCell = useCallback((user: UsuarioModel, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof UsuarioModel];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src: user.avatar}}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case "status":
        return (
          <Chip className="capitalize" color={statusColorMap[user.status]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <Icon name="ellipsis-v"></Icon>
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem 
                  aria-label="Editar" 
                  onPress={() => showTrabajadorModal(user)}
                >Editar</DropdownItem>
                <DropdownItem 
                  onPress={() => showEliminarTrabajadorModal(user)}
                >Eliminar</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(()=>{
    setFilterValue("")
    setPage(1)
  },[])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Buscar por nombre"
            startContent={<Icon  name="search"></Icon>}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<Icon  name="angle-down"></Icon>} variant="flat">
                  Estado
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button endContent={<Icon  name="angle-down"></Icon>} variant="flat">
                  Columnas
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button 
              color="primary" 
              onPress={() => showTrabajadorModal()} 
              endContent={<Icon name="plus"></Icon>}
            >
              Añadir Trabajador
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-small">Total: {tableState.data?.length} Usuarios</span>
        </div>
      </div>
    );
  }, [
    onClear,
    filterValue,
    tableState.data,
    statusFilter,
    visibleColumns,
    onSearchChange,
  ]);

  const bottomContent = useMemo(() => {
    if (!tableState.isLoading) {
      return (
        <div className="py-2 px-2 flex justify-center items-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={setPage}
          />
        </div>
      );
    }
  }, [page, pages, tableState.isLoading]);

  function showTrabajadorModal(user?: UsuarioModel) {
    const modalInfo = { isOpen: true, data: user };
    setTrabajadorModalState(modalInfo);
  }

  function showEliminarTrabajadorModal(user: UsuarioModel) {
    const modalInfo = { isOpen: true, data: user };
    setEliminarModalState(modalInfo);
  }

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[641px]",
        }}

        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody 
          emptyContent={tableState.isLoading ? "Cargando" : "No se encontraron usuarios"} 
          items={sortedItems} 
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TrabajadorModal 
        modalState={trabajadorModalState}
        onOpenChange={setTrabajadorModalState}
        onSubmit={reloadTable}
      ></TrabajadorModal>
      <EliminarTrabajador
        modalState={eliminarModalState}
        onOpenChange={setEliminarModalState}
        onSubmit={reloadTable}
      ></EliminarTrabajador>
    </>
  );
}

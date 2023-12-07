import EliminarArticulo from "./eliminar-articulo/eliminar-articulo";
import EditarArticulo from "./editar-articulo/editar-articulo";
import Icon from "@/app/components/icon/icon";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Selection, SortDescriptor} from "@nextui-org/table";
import {columns, categoryOptions} from "./data";
import { ArticuloModel } from "@/app/models/articulo.model";
import { TableState } from "@/app/models/tableState.model";
import { InitialModalState, ModalState } from "@/app/models/modalState.model";
import { API_METHODS } from "@/app/util/fetching";
import { User } from "@nextui-org/user";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import { Button } from "@nextui-org/button";
import { Dropdown,DropdownItem, DropdownTrigger, DropdownMenu } from "@nextui-org/dropdown";
import { Chip, ChipProps } from "@nextui-org/chip";
import { Pagination } from "@nextui-org/pagination";

const categoryColorMap: Record<string, ChipProps["color"]> = {
  suministro: "success",
  medicamento: "danger",
  otros: "warning",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "category", "amount", "expiration", "supplier", "actions"];

export default function ControlInventario() {

  const [tableState, setTableState]: [TableState, Function] = useState({isLoading: true, data: []});
  const [articuloModalState, setArticuloModalState]: [ModalState, Function] = useState(InitialModalState);
  const [eliminarModalState, setEliminarModalState]: [ModalState, Function] = useState(InitialModalState);
  const [filterValue, setFilterValue] = useState("");
  const [visibleColumns, setVisibleColumns] = useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [categoryFilter, setCategoryFilter] = useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "type",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const loadTable = async () => {
    await fetch(API_METHODS.articulo.default)
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
      let filteredArticulos = [...tableState.data];

      if (hasSearchFilter) {
        filteredArticulos = filteredArticulos.filter((articulo) =>
          articulo.name.toLowerCase().includes(filterValue.toLowerCase()),
        );
      }
      if (categoryFilter !== "all" && Array.from(categoryFilter).length !== categoryOptions.length) {
        filteredArticulos = filteredArticulos.filter((articulo) =>
          Array.from(categoryFilter).includes(articulo.category),
        );
      }

      return filteredArticulos;
    }
  }, [hasSearchFilter, filterValue, categoryFilter, tableState.data]);

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
      return [...items].sort((a: ArticuloModel, b: ArticuloModel) => {
        const first = a[sortDescriptor.column as keyof ArticuloModel] as number;
        const second = b[sortDescriptor.column as keyof ArticuloModel] as number;
        const cmp = first < second ? -1 : first > second ? 1 : 0;
  
        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      });
    }
  }, [sortDescriptor, items]);

  const renderCell = useCallback((articulo: ArticuloModel, columnKey: React.Key) => {
    const cellValue: any = articulo[columnKey as keyof ArticuloModel];
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{radius: "lg", src: articulo.picture}}
            name={articulo.name}
          ></User>
        );
      case "expiration":
        const date = new Date(cellValue);
        return date.toLocaleDateString();
      case "category":
        return (
          <Chip className="capitalize" color={categoryColorMap[articulo.category]} size="sm" variant="flat">
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                    <Icon  name="ellipsis-v"></Icon>
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  onClick={()=> showArticuloModal(articulo)}
                >Editar</DropdownItem>
                <DropdownItem
                  onClick={()=> showEliminarArticuloModal(articulo)}
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
                  Categoria
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={categoryFilter}
                selectionMode="multiple"
                onSelectionChange={setCategoryFilter}
              >
                {categoryOptions.map((category) => (
                  <DropdownItem key={category.uid} className="capitalize">
                    {(category.name)}
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
              onClick={() => showArticuloModal()}
              endContent={<Icon  name="plus"></Icon>}
            >
              Añadir Material
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-small">Total: {tableState.data?.length} Materiales</span>
        </div>
      </div>
    );
  }, [
    onClear,
    filterValue,
    tableState.data,
    categoryFilter,
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

  function showArticuloModal(user?: ArticuloModel) {
    const modalInfo = { isOpen: true, data: user };
    setArticuloModalState(modalInfo);
  }

  function showEliminarArticuloModal(user: ArticuloModel) {
    const modalInfo = { isOpen: true, data: user };
    console.log(modalInfo);
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
          emptyContent={tableState.isLoading ? "Cargando" : "No se encontraron articulos"} 
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
      <EditarArticulo
        modalState={articuloModalState}
        onOpenChange={setArticuloModalState}
        onSubmit={reloadTable}
      ></EditarArticulo>
      <EliminarArticulo
        modalState={eliminarModalState}
        onOpenChange={setEliminarModalState}
        onSubmit={reloadTable}
      ></EliminarArticulo>
    </>
  );
}

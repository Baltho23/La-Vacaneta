const columns = [
  {name: "Nombre", uid: "name", sortable: true},
  {name: "Categoria", uid: "category", sortable: true},
  {name: "Cantidad", uid: "amount", sortable: true},
  {name: "Vencimiento", uid: "expiration"},
  {name: "Proveedor", uid: "supplier"},
  {name: "Acciones", uid: "actions"}
];

const categoryOptions = [
  {name: "Suministro", uid: "suministro"},
  {name: "Medicamento", uid: "medicamento"},
  {name: "Otros", uid: "otros"},
];

export {columns, categoryOptions};

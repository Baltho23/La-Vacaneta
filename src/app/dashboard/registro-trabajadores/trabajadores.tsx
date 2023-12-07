const columns = [
  {name: "Nombre", uid: "name", sortable: true},
  {name: "Usuario", uid: 'username', sortable: true},
  {name: "Edad", uid: "age", sortable: true},
  {name: "Rol", uid: "role", sortable: true},
  {name: "Equipo", uid: "team"},
  {name: "Email", uid: "email"},
  {name: "Estado", uid: "status", sortable: true},
  {name: "Acciones", uid: "actions"},
];

const statusOptions = [
  {name: "Activo", uid: "activo"},
  {name: "inactivo", uid: "inactivo"},
  {name: "Vacaciones", uid: "vacaciones"},
];

export {columns, statusOptions};

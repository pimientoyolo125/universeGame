create table usuarios (
  id bigint primary key generated always as identity,
  correo text not null unique,
  contrasena text not null,
  nombre text not null,
  apellido text not null,
  telefono text,
  idtipousuario bigint not null,
  constraint fk_tipo_usuario foreign key (idtipousuario) references tipousuario (id)
);

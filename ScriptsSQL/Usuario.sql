create table usuarios (
  correo text primary key,
  contrasena text not null,
  nombre text not null,
  apellido text not null,
  telefono text,
  direccion text,
  id_tipo_usuario bigint not null,
  constraint fk_tipo_usuario foreign key (id_tipo_usuario) references tipo_usuario (id)
);
create table tipo_usuario (
  id bigint primary key generated always as identity,
  nombre text not null,
  descripcion text not null
);
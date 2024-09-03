create table tipo_pago (
  id bigint primary key generated always as identity,
  nombre text not null,
  descripcion text not null
);
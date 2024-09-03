create table productos (
  id bigint primary key generated always as identity,
  id_tipo_producto bigint not null,
  id_inventario bigint not null,
  nombre text not null,
  descripcion text not null,
  imagen text,
  precio double precision not null,
  marca text,
  color text,
  modelo int,
  constraint fk_tipo_producto foreign key (id_tipo_producto) references tipo_producto (id)
);

alter table productos
add constraint fk_inventario foreign key (id_inventario) references inventarios (id);
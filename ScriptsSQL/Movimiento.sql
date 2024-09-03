create table movimientos (
  id bigint primary key generated always as identity,
  id_inventario bigint not null,
  fecha_movimiento timestamp with time zone not null,
  id_tipo_movimiento bigint not null,
  cantidad int not null,
  valor double precision not null,
  constraint fk_inventario_movimiento foreign key (id_inventario) references inventarios (id),
  constraint fk_tipo_movimiento foreign key (id_tipo_movimiento) references tipo_movimiento (id)
);
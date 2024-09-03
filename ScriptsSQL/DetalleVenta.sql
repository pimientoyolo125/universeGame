create table detalle_ventas (
  id bigint primary key generated always as identity,
  id_producto bigint not null,
  id_venta bigint not null,
  cantidad int not null,
  precio_unidad double precision not null,
  subtotal double precision not null,
  constraint fk_producto_detalle foreign key (id_producto) references productos (id),
  constraint fk_venta foreign key (id_venta) references ventas (id)
);
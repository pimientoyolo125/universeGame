create table detalleventa (
  id bigint primary key generated always as identity,
  idproducto bigint not null,
  idventa bigint not null,
  cantidad int not null,
  constraint fk_producto_detalle foreign key (idproducto) references productos (id),
  constraint fk_venta foreign key (idventa) references ventas (id)
);
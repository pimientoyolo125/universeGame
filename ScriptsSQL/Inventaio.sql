create table inventarios (
  id bigint primary key generated always as identity,
  id_producto bigint not null,
  cantidad_entradas int not null,
  valor_entradas double precision not null,
  cantidad int not null,
  valor double precision not null,
  cantidad_salidas int not null,
  valor_salidas double precision not null,
  fecha_modificacion timestamp with time zone not null,
  constraint fk_producto foreign key (id_producto) references productos (id)
);
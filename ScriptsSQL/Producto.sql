create table productos (
  id bigint primary key generated always as identity,
  idtipoproducto bigint not null,
  nombre text not null,
  descripcion text not null,
  imagen text,
  precio double precision not null,
  marca text,
  color text,
  modelo int,
  cantidad int not null,
  impuesto double precision not null,
  constraint fk_tipo_producto foreign key (idtipoproducto) references tipoproducto (id)
);
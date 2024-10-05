create table tipousuario (
  id bigint primary key generated always as identity,
  nombre text not null,
  descripcion text not null
);

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

create table carritos (
  id bigint primary key generated always as identity,
  idusuario bigint not null,
  total double precision not null,
  constraint fk_usuario foreign key (idusuario) references usuarios (id)
);

create table tipoproducto (
  id bigint primary key generated always as identity,
  nombre text not null,
  descripcion text not null
);

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

create table ventas (
  id bigint primary key generated always as identity,
  fecha timestamp with time zone not null,
  observaciones text,
  idusuario bigint not null,
  total double precision not null,
  constraint fk_correo_usuario_venta foreign key (idusuario) references usuarios (id)
);

create table detalleventa (
  id bigint primary key generated always as identity,
  idproducto bigint not null,
  idventa bigint not null,
  cantidad int not null,
  constraint fk_producto_detalle foreign key (idproducto) references productos (id),
  constraint fk_venta foreign key (idventa) references ventas (id)
);

create table detallecarrito (
  id bigint primary key generated always as identity,
  idproducto bigint not null,
  idcarrito bigint not null,
  cantidad int not null,
  constraint fk_producto_detalle foreign key (idproducto) references productos (id),
  constraint fk_carrito foreign key (idcarrito) references carritos (id)
);

create table direccion (
  id bigint primary key generated always as identity,
  idusuario bigint not null,
  pais text not null,
  region text not null,
  ciudad text not null,
  direccion text not null,
  constraint fk_usuario foreign key (idusuario) references usuarios (id)
);




create table tipo_usuario (
  id bigint primary key generated always as identity,
  nombre text not null,
  descripcion text not null
);

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

create table carritos (
  id bigint primary key generated always as identity,
  id_usuario text not null,
  total double precision not null,
  constraint fk_usuario foreign key (id_usuario) references usuarios (correo)
);

create table tipo_producto (
  id bigint primary key generated always as identity,
  nombre text not null,
  descripcion text not null
);

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

alter table productos
add constraint fk_inventario foreign key (id_inventario) references inventarios (id);

create table tipo_pago (
  id bigint primary key generated always as identity,
  nombre text not null,
  descripcion text not null
);

create table metodos_pago (
  id bigint primary key generated always as identity,
  numero_cuenta text not null,
  id_tipo_pago bigint not null,
  correo_usuario text not null,
  constraint fk_tipo_pago foreign key (id_tipo_pago) references tipo_pago (id),
  constraint fk_correo_usuario foreign key (correo_usuario) references usuarios (correo)
);

create table ventas (
  id bigint primary key generated always as identity,
  fecha timestamp with time zone not null,
  observaciones text,
  correo_usuario text not null,
  id_metodo_pago bigint not null,
  total double precision not null,
  constraint fk_correo_usuario_venta foreign key (correo_usuario) references usuarios (correo),
  constraint fk_metodo_pago foreign key (id_metodo_pago) references metodos_pago (id)
);

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

create table tipo_movimiento (
  id bigint primary key generated always as identity,
  nombre text not null,
  descripcion text not null
);

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
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
create table metodos_pago (
  id bigint primary key generated always as identity,
  numero_cuenta text not null,
  id_tipo_pago bigint not null,
  correo_usuario text not null,
  constraint fk_tipo_pago foreign key (id_tipo_pago) references tipo_pago (id),
  constraint fk_correo_usuario foreign key (correo_usuario) references usuarios (correo)
);
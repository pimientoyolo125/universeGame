create table ventas (
  id bigint primary key generated always as identity,
  fecha timestamp with time zone not null,
  observaciones text,
  idusuario bigint not null,
  total double precision not null,
  constraint fk_correo_usuario_venta foreign key (idusuario) references usuarios (id)
);
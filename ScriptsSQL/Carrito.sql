create table carritos (
  id bigint primary key generated always as identity,
  id_usuario text not null,
  total double precision not null,
  constraint fk_usuario foreign key (id_usuario) references usuarios (correo)
);
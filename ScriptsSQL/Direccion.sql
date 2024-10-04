create table direccion (
  id bigint primary key generated always as identity,
  idusuario bigint not null,
  pais text not null,
  region text not null,
  ciudad text not null,
  direccion text not null,
  constraint fk_usuario foreign key (idusuario) references usuarios (id)
);
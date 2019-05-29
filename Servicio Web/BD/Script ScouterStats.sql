delimiter $$
create database if not exists `j7u18mh8zxs59l97`
$$

use `j7u18mh8zxs59l97`
$$
drop table if exists mae_aplicacion
$$
create table mae_aplicacion(
    nid_aplica int auto_increment not null, -- Indentificador Unico
    co_aplica char(5) not null, -- Código de Perfil
    no_aplica varchar(100) not null, -- Descripción del Perfil
    nu_versio int not null, -- Versión
    no_versio varchar(100) not null, -- Versión
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_mae_aplicacion_nid_aplica primary key (nid_aplica)
)
$$
drop table if exists mae_perfil
$$
create table mae_perfil(
    nid_perfil int auto_increment not null, -- Indentificador Unico
    co_perfil char(5) not null, -- Código de Perfil
    no_perfil varchar(100) not null, -- Descripción del Perfil
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_mae_perfil_nid_perfil primary key (nid_perfil)
)
$$
drop table if exists mae_posicion
$$
create table mae_posicion(
    nid_posici int auto_increment not null, -- Indentificador Unico
    co_posici char(5) not null, -- Código de la Posición
    no_posici varchar(100) not null, -- Descripción de la Posición
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_mae_posicion_nid_posici primary key (nid_posici)
)
$$
drop table if exists mae_grupo
$$
create table mae_grupo(
    nid_gruacc int auto_increment not null, -- Indentificador Unico
    co_gruacc char(5) not null, -- Código del Grupo
    no_gruacc varchar(100) not null, -- Descripción del Grupo
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_mae_grupo_nid_gruacc primary key (nid_gruacc)
)
$$
drop table if exists mae_accion
$$
create table mae_accion(
    nid_accion int auto_increment not null, -- Indentificador Unico
    co_accion char(5) not null, -- Código de la Acción
    no_accion varchar(100) not null, -- Descripción de la Acción
    nid_gruacc int not null, -- Identificador unico del grupo
    co_gruacc varchar(100) not null, -- Código del Grupo
    fl_accpos boolean not null, -- Acción positiva
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_mae_accion_nid_accion primary key (nid_accion),
    constraint fk_mae_accion_mae_grupo foreign key (nid_gruacc) references mae_grupo (nid_gruacc)
)
$$
drop table if exists mae_formacion
$$
create table mae_formacion(
    nid_formac int auto_increment not null, -- Indentificador Unico
    co_formac char(5) not null, -- Código de la Formación
    no_formac varchar(100) not null, -- Descripción de la Formación
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_mae_formacion_nid_formac primary key (nid_formac)
)
$$
drop table if exists mae_formacion_posicion
$$
create table mae_formacion_posicion(
    nid_forpos int auto_increment not null, -- Indentificador Unico
    nid_formac int, -- Identificador de la formación
    co_formac char(5), -- Código de la formación
    nid_posici int, -- Identificador de la posición
    co_posici char(5), -- Código de la posición
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_mae_formacion_posicion_nid_forpos primary key (nid_forpos),
    constraint fk_mae_formacion_posicion_mae_formacion foreign key(nid_formac) references mae_formacion (nid_formac),
    constraint fk_mae_formacion_posicion_mae_posicion foreign key(nid_posici) references mae_posicion (nid_posici)
)
$$
drop table if exists tbl_usuario
$$
create table tbl_usuario(
    nid_usrapp int auto_increment not null, -- Indentificador Unico
    no_maiusr varchar(100) not null, -- Correo
    no_pasusr varchar(400) not null, -- Clave,
    nid_perfil int not null, -- Identificador Perfil
    nid_culqid varchar(100) null, -- Identificador de cliente Culqi
    co_perfil char(5) null, -- Código de Perfil
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_tbl_usuario_nid_usrapp primary key (nid_usrapp),
    constraint fk_tbl_usuario_mae_perfil_nid_perfil foreign key (nid_perfil) references mae_perfil (nid_perfil)
)
$$
drop table if exists tbl_admin
$$
create table tbl_admin(
    nid_admapp int auto_increment not null, -- Indentificador Unico
    no_maiusr varchar(100) not null, -- Correo
    no_pasusr varchar(400) not null, -- Clave,
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_tbl_admin_nid_admapp primary key (nid_admapp)
)
$$
drop table if exists tbl_club
$$
create table tbl_club(
    nid_cluapp int auto_increment not null, -- Identificador Unico
    no_nomclu varchar(150) not null, -- Nombre del CLub
    no_nomcon varchar(150) null, -- Nombre de Contacto
    no_telcon varchar(30) null, -- NUmero telefono contacto
    nid_usrapp int, -- Identificador del usuario
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_tbl_club_nid_cluapp primary key (nid_cluapp),
    constraint fk_tbl_club_tbl_usuario_nid_usrapp foreign key (nid_usrapp) references tbl_usuario (nid_usrapp)
)
$$
drop table if exists tbl_club_
$$
drop table if exists tbl_encargado
$$
create table tbl_encargado(
    nid_encarg int auto_increment not null, -- Identificador Unico
    no_encarg varchar(200) not null, -- Nombre del encargado
    no_telenc varchar(30) null, -- Telefono del encargado
    nid_usrapp int not null, -- Identificador del usuario
    nid_cluapp int not null, -- Identificador del club
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_tbl_encargado_nid_encarg primary key (nid_encarg),
    constraint fk_tbl_encargado_tbl_usuario_nid_usrapp foreign key (nid_usrapp) references tbl_usuario (nid_usrapp),
    constraint fk_tbl_encargado_tbl_club_nid_cluapp foreign key (nid_cluapp) references tbl_club (nid_cluapp)
)
$$
drop table if exists tbl_entrenador
$$
create table tbl_entrenador(
    nid_entren int auto_increment not null, -- Identificador Unico
    no_entren varchar(200) not null, -- Nombre del entrenador
    nid_usrapp int not null, -- Correo del entrenador
    nid_cluapp int not null, -- Identificador del club
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_tbl_entrenador_nid_entren primary key (nid_entren),
    constraint fk_tbl_entrenador_tbl_usuario_nid_usrapp foreign key (nid_usrapp) references tbl_usuario (nid_usrapp),
    constraint fk_tbl_entrenador_tbl_club_nid_cluapp foreign key (nid_cluapp) references tbl_club (nid_cluapp)
)
$$
drop table if exists tbl_sede
$$
create table tbl_sede(
    nid_stsede int auto_increment not null, -- Identificador Unico
    no_stsede varchar(200) not null, -- Nombre de la Sede
    no_ubicac varchar(150) null, -- Ubicación de la Sede
    nid_cluapp int not null, -- Identificador del club
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_tbl_sede_nid_stsede primary key (nid_stsede),
    constraint fk_tbl_sede_tbl_club_nid_cluapp foreign key (nid_cluapp) references tbl_club (nid_cluapp)
)
$$
drop table if exists tbl_encargado_sede
$$
create table tbl_encargado_sede(
    nid_encsed int auto_increment not null, -- Identificador Unico
    nid_cluapp int not null, -- Identificador del club
    nid_encarg int not null, -- Identificador del encargado
    nid_stsede int not null, -- Identificador de la sede
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_tbl_encargado_sede_nid_encsed primary key (nid_encsed),
    constraint fk_tbl_encargado_sede_tbl_club_nid_cluapp foreign key (nid_cluapp) references tbl_club (nid_cluapp),
    constraint fk_tbl_encargado_sede_tbl_encargado_nid_encarg foreign key (nid_encarg) references tbl_encargado (nid_encarg),
    constraint fk_tbl_encargado_sede_tbl_sede_nid_stsede foreign key (nid_stsede) references tbl_sede (nid_stsede)
)
$$
drop table if exists tbl_position_club
$$
create table tbl_position_club(
    nid_posclu int auto_increment not null, -- Identificador Unico
    nid_posici int not null, -- Indentificador de la posición
    co_posici char(5) not null, -- Código de la Posición
    nid_accion int not null, -- Identificador de la acción
    co_accion char(5) not null, -- Código de la Acción 
    fl_visibi boolean not null default true, -- Flag de Visibilidad
    nid_cluapp int not null, -- Identificador del club
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_tbl_position_club_nid_posclu primary key (nid_posclu),
    constraint fk_tbl_position_club_tbl_club_nid_cluapp foreign key (nid_cluapp) references tbl_club (nid_cluapp)
)
$$
drop table if exists tbl_equipo
$$
create table tbl_equipo(
    nid_equipo int auto_increment not null, -- Identificador Unico
    no_descri varchar(3000), -- Descripción del equipo
    nid_stsede int not null, -- Identificador de la sede
    nid_cluapp int not null, -- Identificador del Club
    fe_fecpag datetime not null,
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_tbl_equipo_nid_equipo primary key (nid_equipo),
    constraint fk_tbl_equipo_tbl_sede foreign key (nid_stsede) references tbl_sede (nid_stsede),
    constraint fk_tbl_equipo_tbl_club foreign key (nid_cluapp) references tbl_club (nid_cluapp)
)
$$
drop table if exists tbl_jugador
$$
create table tbl_jugador(
    nid_jugado int auto_increment not null, -- Identificador Unico
    no_jugado varchar(100) not null, -- Nombre del jugador
    nid_posici int null, -- Identificador de la posición
    fl_titula boolean not null, -- Flag Titular
    fe_fecnac datetime, -- Fecha de Nacimiento
    nid_equipo int not null, -- Identificador del equipo
    nid_stsede int not null, -- Identificador de la sede
    nid_cluapp int not null, -- Identificador del club
    nid_usrapp int not null, -- Identificador del usuario
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_tbl_jugador_nid_jugado primary key (nid_jugado),
    constraint fk_tbl_jugador_mae_posicion_nid_posici foreign key (nid_posici) references mae_posicion (nid_posici),
    constraint fk_tbl_jugador_tbl_equipo_nid_equipo foreign key (nid_equipo) references tbl_equipo (nid_equipo),
    constraint fk_tbl_jugador_tbl_sede_nid_stsede foreign key (nid_stsede) references tbl_sede (nid_stsede),
    constraint fk_tbl_jugador_tbl_club_nid_cluapp foreign key (nid_cluapp) references tbl_club (nid_cluapp),
    constraint fk_tbl_jugador_tbl_usuario_nid_usrapp foreign key (nid_usrapp) references tbl_usuario (nid_usrapp)
)
$$
drop table if exists tbl_partido
$$
create table tbl_partido(
    nid_partid int auto_increment not null, -- Identificador Unico
    nid_equipo int not null, -- Indetificador del equipo
    nid_stsede int not null, -- Identificador de la sede
    nid_cluapp int not null, -- Identificador del club
    fe_fecpar datetime not null, -- Fecha del partido
    no_equcon varchar(100) not null, -- Equipo Contrario
    qt_golmar int, -- Goles Marcados
    qt_golrec int, -- GOles Recibidos
    fl_result int, -- Flag Resultado del partido
    fl_parter boolean, -- Flag Partido Terminado
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_tbl_partido_nid_partid primary key (nid_partid),
    constraint fk_tbl_partido_tbl_equipo_nid_equipo foreign key (nid_equipo) references tbl_equipo (nid_equipo),
    constraint fk_tbl_partido_tbl_sede_nid_stsede foreign key (nid_stsede) references tbl_sede (nid_stsede),
    constraint fk_tbl_partido_tbl_club_nid_cluapp foreign key (nid_cluapp) references tbl_club (nid_cluapp)
)
$$
drop table if exists tbl_partido_jugador
$$
create table tbl_partido_jugador(
    nid_parjug int auto_increment not null, -- Identificador Unico
    nid_equipo int not null, -- Indetificador del equipo
    nid_stsede int not null, -- Identificador de la sede
    nid_cluapp int not null, -- Identificador del club
    nid_jugado int not null, -- Identificador del jugador
    nid_partid int not null, -- Identificador del partido
    fl_parjug boolean, -- Flag de partido jugado
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_tbl_partido_jugador_nid_parjug primary key (nid_parjug),
    constraint fk_tbl_partido_jugador_tbl_equipo_nid_equipo foreign key (nid_equipo) references tbl_equipo (nid_equipo),
    constraint fk_tbl_partido_jugador_tbl_sede_nid_stsede foreign key (nid_stsede) references tbl_sede (nid_stsede),
    constraint fk_tbl_partido_jugador_tbl_club_nid_cluapp foreign key (nid_cluapp) references tbl_club (nid_cluapp),
    constraint fk_tbl_partido_jugador_tbl_jugador_nid_jugado foreign key (nid_jugado) references tbl_jugador (nid_jugado),
    constraint fk_tbl_partido_jugador_tbl_partido_nid_partid foreign key (nid_partid) references tbl_partido (nid_partid)
)
$$
drop table if exists tbl_jugador_accion
$$
create table tbl_jugador_accion(
    nid_jugacc int auto_increment not null, -- Identificador Unico
    nid_equipo int not null, -- Indetificador del equipo
    nid_stsede int not null, -- Identificador de la sede
    nid_cluapp int not null, -- Identificador del club
    nid_jugado int not null, -- Identificador del jugador
    nid_partid int not null, -- Identificador del partido
    nid_accion int not null, -- Identificador de la acción
    qt_accion int not null default 0, -- Cantidad de veces de la acción
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_tbl_jugador_accion_nid_jugacc primary key (nid_jugacc),
    constraint fk_tbl_jugador_accion_tbl_equipo_nid_equipo foreign key (nid_equipo) references tbl_equipo (nid_equipo),
    constraint fk_tbl_jugador_accion_tbl_sede_nid_stsede foreign key (nid_stsede) references tbl_sede (nid_stsede),
    constraint fk_tbl_jugador_accion_tbl_club_nid_cluapp foreign key (nid_cluapp) references tbl_club (nid_cluapp),
    constraint fk_tbl_jugador_accion_tbl_jugador_nid_jugado foreign key (nid_jugado) references tbl_jugador (nid_jugado),
    constraint fk_tbl_jugador_accion_tbl_partido_nid_partid foreign key (nid_partid) references tbl_partido (nid_partid)
)
$$
drop table if exists tbl_entrenador_equipo
$$
create table tbl_entrenador_equipo(
    nid_entequ int auto_increment not null, -- Identificador Unico
    nid_equipo int not null, -- Indetificador del equipo
    nid_stsede int not null, -- Identificador de la sede
    nid_cluapp int not null, -- Identificador del club
    nid_entren int not null, -- Indetificador del entrenador
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_tbl_entrenador_equipo_nid_entequ primary key (nid_entequ),
    constraint fk_tbl_entrenador_equipo_tbl_equipo_nid_equipo foreign key (nid_equipo) references tbl_equipo (nid_equipo),
    constraint fk_tbl_entrenador_equipo_tbl_sede_nid_stsede foreign key (nid_stsede) references tbl_sede (nid_stsede),
    constraint fk_tbl_entrenador_equipo_tbl_club_nid_cluapp foreign key (nid_cluapp) references tbl_club (nid_cluapp),
    constraint fk_tbl_entrenador_equipo_tbl_entrenador_nid_entren foreign key (nid_entren) references tbl_entrenador (nid_entren)
)
$$
drop table if exists tbl_entrenador_partido
$$
create table tbl_entrenador_partido
(
    nid_entpar int auto_increment not null, -- Identificador Unico
    nid_partid int not null, -- Identificador del partido
    nid_equipo int not null, -- Identificador del equipo
    nid_stsede int not null, -- Identificador de la sede
    nid_cluapp int not null, -- Identificador del club
    nid_entren int not null, -- Identificador del entrenador
    fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_tbl_entrenador_partido_nid_entpar primary key (nid_entpar),
    constraint fk_tbl_entrenador_partido_tbl_partido_nid_partid foreign key (nid_partid) references tbl_partido (nid_partid),
    constraint fk_tbl_entrenador_partido_tbl_sede_nid_stsede foreign key (nid_stsede) references tbl_sede (nid_stsede),
    constraint fk_tbl_entrenador_partido_tbl_club_nid_cluapp foreign key (nid_cluapp) references tbl_club (nid_cluapp),
    constraint fk_tbl_entrenador_partido_tbl_entrenador_nid_entren foreign key (nid_entren) references tbl_entrenador (nid_entren)
);
$$
drop table if exists tbl_tarjeta
$$
create table tbl_tarjeta
(
	nid_tarjet varchar(500) not null, -- Identificador de la tarjeta
    nid_client varchar(500) not null, -- Identificador del cliente
    nu_tarjet varchar(16) null, -- Numero de la tarjeta
	fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_tbl_tarjeta_nid_tarjet primary key (nid_tarjet)
);
$$
drop table if exists tbl_suscripcion
$$
create table tbl_suscripcion
(
	nid_suscri varchar(500) not null, -- Identificador de la suscripcion
    nid_tarjet varchar(500) not null, -- Identificador de la tarjeta
    nid_plansu varchar(500) not null, -- Identificador del plan
    nid_client varchar(500) not null, -- Identificador del cliente
	fe_creaci datetime null default now(), -- Fecha Creación
    fe_modifi datetime null, -- Fecha de Modificación
    fl_inacti boolean null default false, -- Flag Inactivo
    constraint pk_tbl_suscripcion_nid_suscri primary key (nid_suscri)
);
$$
drop function if exists SPLIT_STRING
$$
create function SPLIT_STRING(
	str varchar(255) ,
	delim varchar(12) ,
	pos int
) returns varchar(255) charset utf8 return replace(
	substring(
		substring_index(str , delim , pos) ,
		char_length(
			substring_index(str , delim , pos - 1)
		) + 1
	) ,
	delim ,
	''
);
$$
drop procedure if exists sps_login_user
$$
create procedure sps_login_user(
    in p_no_maiusr varchar(100)
)
begin
    select nid_usrapp, no_maiusr, no_pasusr, nid_perfil, co_perfil, nid_culqid
    from tbl_usuario
    where no_maiusr = p_no_maiusr
		and fl_inacti = false;
end
$$
drop procedure if exists sps_login_admin
$$
create procedure sps_login_admin(
    in p_no_maiusr varchar(100)
)
begin
    select nid_admapp, no_maiusr, no_pasusr
    from tbl_admin
    where no_maiusr = p_no_maiusr
		and fl_inacti = false;
end
$$
drop procedure if exists spi_register_card
$$
create procedure spi_register_card(
	p_nid_tarjet varchar(500), -- Identificador de la tarjeta
    p_nid_client varchar(500), -- Identificador del cliente
    p_nu_tarjet varchar(16) -- Numero de la tarjeta
)
begin
	start transaction;
		-- Se elimina todas las tarjetas anteriores pertenecientes al cliente
        delete from tbl_tarjeta
        where nid_client = p_nid_client;
        -- Se registra la nueva tarjeta
		insert into tbl_tarjeta(nid_tarjet, nid_client, nu_tarjet)
		values(p_nid_tarjet, p_nid_client, p_nu_tarjet);
    commit;
end
$$
drop procedure if exists sps_get_cards
$$
create procedure sps_get_cards(
    p_nid_client varchar(500) -- Identificador del cliente
)
begin
	select * from tbl_tarjeta;
end
$$
drop procedure if exists spi_register_suscription
$$
create procedure spi_register_suscription(
	p_nid_suscri varchar(500), -- Identificador de la suscripcion
    p_nid_tarjet varchar(500), -- Identificador de la tarjeta
    p_nid_plansu varchar(500), -- Identificador del plan
    p_nid_client varchar(500) -- Identificador del cliente
)
begin
	start transaction;
		-- Se elimina las suscripciones anteriores pertenecientes al cliente
        delete from tbl_suscripcion
        where nid_client = p_nid_client;
		-- Se registra la nueva suscripción
		insert into tbl_suscripcion(nid_suscri, nid_tarjet, nid_plansu, nid_client)
		values(p_nid_suscri, p_nid_tarjet, p_nid_plansu, p_nid_client);
    commit;
end
$$
drop procedure if exists sps_get_suscriptions
$$
create procedure sps_get_suscriptions(
    p_nid_client varchar(500) -- Identificador del cliente
)
begin
	select * from tbl_suscripcion
	where nid_client = p_nid_client;
end
$$
drop procedure if exists spi_register_user
$$
create procedure spi_register_user(
    in p_no_maiusr varchar(100),
    in p_no_pasusr varchar(400),
    in p_co_perfil char(5),
    in p_nid_culqid varchar(100)
)
begin
    declare l_nid_perfil int;
    declare l_co_perfil char(5);
    
    set l_nid_perfil = (
        select nid_perfil from mae_perfil where co_perfil = p_co_perfil
        and fl_inacti = false
	);
    set l_co_perfil = (
		select co_perfil from mae_perfil where co_perfil = p_co_perfil
        and fl_inacti = false
	);
    
    start transaction;
		insert into tbl_usuario(no_maiusr, no_pasusr, nid_perfil, co_perfil, nid_culqid)
		values(p_no_maiusr, p_no_pasusr, l_nid_perfil, l_co_perfil, p_nid_culqid);
    commit;
end
$$
drop procedure if exists sps_get_perfil_by_code
$$
create procedure sps_get_perfil_by_code(
    in p_co_perfil char(5)
)
begin
    select nid_perfil, co_perfil, no_perfil
    from mae_perfil
    where co_perfil = p_co_perfil
		and fl_inacti = false;
end
$$
drop procedure if exists spi_register_club
$$
create procedure spi_register_club(
    in p_no_nomclu varchar(150),
    in p_no_nomcon varchar(150),
    in p_no_telcon varchar(30),
    in p_no_maiusr varchar(100)
)
begin
    declare l_nid_usrapp int;
    set l_nid_usrapp = (
		select nid_usrapp from tbl_usuario where no_maiusr = p_no_maiusr
        and fl_inacti = false
	);
        
    start transaction;
    
    insert into tbl_club(no_nomclu, no_nomcon, no_telcon, nid_usrapp)
    values(p_no_nomclu, p_no_nomcon, no_telcon, l_nid_usrapp);
    
    commit;
end
$$
drop procedure if exists spi_initialize_position_club
$$
create procedure spi_initialize_position_club(
    in p_no_maiusr varchar(100),
    in p_no_nomclu varchar(150)
)
begin
    declare l_nid_usrapp int;
    declare l_nid_cluapp int;
    set l_nid_usrapp = 
        (select nid_usrapp from tbl_usuario
            where no_maiusr = p_no_maiusr
            and fl_inacti = false
		);
        
    set l_nid_cluapp = 
        (select nid_cluapp from tbl_club
            where no_nomclu = p_no_nomclu
            and nid_usrapp = l_nid_usrapp
            and fl_inacti = false
		);
        
    start transaction;
        insert into tbl_position_club(nid_posici, co_posici, nid_accion, co_accion, nid_cluapp)
        select nid_posici, co_posici, nid_accion, co_accion, l_nid_cluapp from mae_posicion
        cross join mae_accion
        order by nid_posici, nid_accion;
    commit;
end
$$
drop procedure if exists sps_get_encargado
$$
create procedure sps_get_encargado(
    in p_no_maiusr varchar(100)
)
begin
    declare l_nid_usrapp int;
    declare l_nid_cluapp int;
    set l_nid_usrapp = 
        (select nid_usrapp from tbl_usuario
            where no_maiusr = p_no_maiusr
            and fl_inacti = false
		);
        
    set l_nid_cluapp = 
        (select nid_cluapp from tbl_club
            where nid_usrapp = l_nid_usrapp
            and fl_inacti = false
		);
        
    select usr.no_maiusr as no_maienc ,enc.nid_encarg, enc.no_encarg, enc.nid_usrapp, enc.no_telenc, enc.nid_cluapp
    from tbl_encargado enc
    inner join tbl_usuario usr on usr.nid_usrapp = enc.nid_usrapp
		and usr.fl_inacti = false
    where enc.nid_cluapp = l_nid_cluapp
		and enc.fl_inacti = false;
end
$$
drop procedure if exists sps_get_encargado_fl_sede
$$
create procedure sps_get_encargado_fl_sede(
    p_nid_stsede int,
    p_fl_stsede boolean
)
begin
    declare l_nid_cluapp int;
    set l_nid_cluapp = (
        select clu.nid_cluapp
        from tbl_club clu
        inner join tbl_sede sed on sed.nid_cluapp = clu.nid_cluapp
			and sed.fl_inacti = false
        where sed.nid_stsede = p_nid_stsede
        and clu.fl_inacti = false
    );
    if(p_fl_stsede = true)
    then
        select enc.* from tbl_encargado enc
        where enc.nid_cluapp = l_nid_cluapp
        and enc.nid_encarg in (
            select nid_encarg from tbl_encargado_sede sed
            where sed.nid_cluapp = l_nid_cluapp
            and sed.nid_stsede = p_nid_stsede
            and sed.fl_inacti = false
            group by nid_encarg
        )
        and enc.fl_inacti = false;
    else
        select enc.* from tbl_encargado enc
        where enc.nid_cluapp = l_nid_cluapp
        and enc.nid_encarg not in (
            select nid_encarg from tbl_encargado_sede sed
            where sed.nid_cluapp = l_nid_cluapp
            and sed.nid_stsede = p_nid_stsede
            and sed.fl_inacti = false
            group by nid_encarg
        )
        and enc.fl_inacti = false;
    end if;
end
$$
drop procedure if exists sps_get_sede
$$
create procedure sps_get_sede(
    in p_no_maiusr varchar(100)
)
begin
    declare l_nid_usrapp int;
    declare l_nid_cluapp int;
    set l_nid_usrapp = 
        (select nid_usrapp from tbl_usuario
            where no_maiusr = p_no_maiusr
            and fl_inacti = false
		);
        
    set l_nid_cluapp = 
        (select nid_cluapp from tbl_club
            where nid_usrapp = l_nid_usrapp
            and fl_inacti = false
		);
            
    select nid_stsede, no_stsede, no_ubicac, nid_cluapp
    from tbl_sede
    where nid_cluapp = l_nid_cluapp
    and fl_inacti = false;
end
$$
drop procedure if exists spu_set_sede
$$
create procedure spu_set_sede(
    in p_nid_stsede int,
    in p_no_stsede varchar(200),
    in p_no_ubicac  varchar(150)
)
begin
    start transaction;
        update tbl_sede sed
        set sed.no_stsede = p_no_stsede,
            no_ubicac = p_no_ubicac,
            fe_modifi = now()
        where nid_stsede = p_nid_stsede;
    commit;
end
$$
drop procedure if exists spi_register_encargado
$$
create procedure spi_register_encargado(
    in p_no_encarg varchar(200),
    in p_no_telenc varchar(30),
    in p_no_maiusr varchar(100),
    in p_no_maiclu varchar(100)
)
begin
    declare l_nid_usrapp int;
    declare l_nid_usrclu int;
    declare l_nid_cluapp int;
    set l_nid_usrapp = 
        (select nid_usrapp from tbl_usuario
            where no_maiusr = p_no_maiusr
            and fl_inacti = false
		);
            
    set l_nid_usrclu = 
        (select nid_usrapp from tbl_usuario
            where no_maiusr = p_no_maiclu
            and fl_inacti = false
		);
        
    set l_nid_cluapp = 
        (select nid_cluapp from tbl_club
            where nid_usrapp = l_nid_usrclu
            and fl_inacti = false
		);
    
    start transaction;
        insert into tbl_encargado(no_encarg, nid_usrapp, no_telenc, nid_cluapp)
        values(p_no_encarg, l_nid_usrapp, p_no_telenc, l_nid_cluapp);
    commit;
end
$$
drop procedure if exists spi_register_sede
$$
create procedure spi_register_sede(
    in p_no_stsede varchar(200),
    in p_no_ubicac varchar(150),
    in p_no_maiusr varchar(100)
)
begin
    declare l_nid_cluapp int;
    set l_nid_cluapp = 
        (select nid_cluapp from tbl_club clu
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
			and usr.no_maiusr = p_no_maiusr
            and usr.fl_inacti = false
        where clu.fl_inacti = false);
    start transaction;
        insert into tbl_sede(no_stsede, no_ubicac, nid_cluapp)
        values(p_no_stsede, p_no_ubicac, l_nid_cluapp);
    commit;
end
$$
drop procedure if exists spi_register_sede_encargado
$$
create procedure spi_register_sede_encargado(
	in p_nid_stsede varchar(200),
    in p_nid_encarg int,
    in p_no_maiusr varchar(100)
)
begin
	declare l_nid_cluapp int;
	set l_nid_cluapp = 
		(select nid_cluapp from tbl_club clu
			inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
				and usr.no_maiusr = p_no_maiusr
                and usr.fl_inacti = false
			where clu.fl_inacti = false
		);
	start transaction;
		insert into tbl_encargado_sede(nid_cluapp, nid_encarg, nid_stsede)
        values(l_nid_cluapp, p_nid_encarg, p_nid_stsede);
    commit;
end
$$
drop procedure if exists sps_get_teams
$$
create procedure sps_get_teams(
    in p_no_maiusr varchar(100)
)
begin
    declare l_nid_cluapp int;
    set l_nid_cluapp = (
        select nid_cluapp from tbl_club clu
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
            and usr.no_maiusr = p_no_maiusr
            and usr.fl_inacti = false
		where clu.fl_inacti = false
    );
    
    select * from tbl_equipo
    where nid_cluapp = l_nid_cluapp
    and fl_inacti = false;
end
$$
$$
drop procedure if exists spd_delete_sede_encargado
$$
create procedure spd_delete_sede_encargado(
    in p_nid_stsede int
)
begin
    start transaction;
        /*delete from tbl_encargado_sede
        where nid_stsede = p_nid_stsede;*/
        update tbl_encargado_sede
        set fl_inacti = true
        where nid_stsede = p_nid_stsede;
    commit;
end
$$
drop procedure if exists sps_get_equipo_by_sede
$$
create procedure sps_get_equipo_by_sede(
    in p_nid_stsede int
)
begin
    select clu.no_nomclu, clu.no_nomcon,sed.no_stsede, equ.nid_equipo, equ.no_descri,
		usr.no_maiusr as no_maiadm, equ.nid_cluapp, equ.nid_stsede, equ.fe_fecpag
    from tbl_equipo equ
    inner join tbl_club clu on clu.nid_cluapp = equ.nid_cluapp
		and clu.fl_inacti = false
	inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
		and usr.fl_inacti = false
	inner join tbl_sede sed on sed.nid_stsede = equ.nid_stsede
		and sed.fl_inacti = false
    where equ.nid_stsede = p_nid_stsede
    and equ.fl_inacti = false;
end
$$
drop procedure if exists sps_get_equipo_by_club
$$
create procedure sps_get_equipo_by_club(
    in p_no_maiusr varchar(100)
)
begin
    select equ.nid_equipo, equ.no_descri, equ.nid_cluapp, equ.nid_stsede, equ.fe_fecpag
    from tbl_equipo equ
    inner join tbl_club clu on clu.nid_cluapp = equ.nid_cluapp
		and clu.fl_inacti = false
	inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
		and usr.no_maiusr = p_no_maiusr
		and usr.fl_inacti = false
    where equ.fl_inacti = false
    order by equ.fe_fecpag asc;
end
$$
drop procedure if exists sps_get_equipo_by_manager
$$
create procedure sps_get_equipo_by_manager(
    in p_nid_encarg int
)
begin
    select equ.nid_equipo, equ.no_descri, equ.nid_cluapp, equ.nid_stsede, equ.fe_fecpag
    from tbl_equipo equ
    inner join tbl_club clu on clu.nid_cluapp = equ.nid_cluapp
		and clu.fl_inacti = false
	inner join tbl_encargado_sede ens on ens.nid_cluapp = clu.nid_cluapp
		and ens.nid_stsede = equ.nid_stsede
        and ens.nid_encarg = p_nid_encarg
        and ens.fl_inacti = false
    where equ.fl_inacti = false
    order by equ.fe_fecpag asc;
end
$$
drop procedure if exists sps_get_equipo_by_coach
$$
create procedure sps_get_equipo_by_coach(
    in p_nid_entren int
)
begin
    select equ.nid_equipo, equ.no_descri, equ.nid_cluapp, equ.nid_stsede, equ.fe_fecpag
    from tbl_equipo equ
    inner join tbl_club clu on clu.nid_cluapp = equ.nid_cluapp
		and clu.fl_inacti = false
	inner join tbl_entrenador_equipo ene on ene.nid_cluapp = clu.nid_cluapp
		and ene.nid_stsede = equ.nid_stsede
        and ene.nid_entren = p_nid_entren
        and ene.nid_equipo = equ.nid_equipo
        and ene.fl_inacti = false
    where equ.fl_inacti = false
    order by equ.fe_fecpag asc;
end
$$
drop procedure if exists spd_delete_sede
$$
create procedure spd_delete_sede(
    in p_nid_stsede int
)
begin
    start transaction;
        /*delete from tbl_encargado_sede
        where nid_stsede = p_nid_stsede;

        delete from tbl_sede
        where nid_stsede = p_nid_stsede;*/
        update tbl_encargado_sede
        set fl_inacti = true
        where nid_stsede = p_nid_stsede;
        
        update tbl_sede
        set fl_inacti = true
        where nid_stsede = p_nid_stsede;
    commit;
end
$$
drop procedure if exists spu_set_encargado
$$
create procedure spu_set_encargado(
    in p_nid_encarg int,
    in p_no_encarg varchar(200),
    in p_no_telenc varchar(30)
)
begin
    start transaction;
        update tbl_encargado
        set no_encarg = p_no_encarg,
            no_telenc = p_no_telenc,
            fe_modifi = now()
        where nid_encarg = p_nid_encarg;
    commit;
end
$$
drop procedure if exists sps_get_encargado_asignado
$$
create procedure sps_get_encargado_asignado(
    in p_nid_encarg int
)
begin
    select enc.nid_encarg, enc.no_encarg, enc.no_telenc from tbl_encargado enc
    inner join tbl_encargado_sede ens on ens.nid_encarg = enc.nid_encarg
		and ens.fl_inacti = false
    where enc.nid_encarg = p_nid_encarg
		and enc.fl_inacti = false;
end
$$
drop procedure if exists spd_delete_encargado
$$
create procedure spd_delete_encargado(
    in p_nid_encarg int
)
begin
    declare l_nid_usrapp int;
    set l_nid_usrapp = (
        select usr.nid_usrapp from tbl_usuario usr
        inner join tbl_encargado enc on enc.nid_usrapp = usr.nid_usrapp
            and enc.nid_encarg = p_nid_encarg
            and enc.fl_inacti = false
		where usr.fl_inacti = false
    );
    start transaction;
        /*delete from tbl_encargado_sede
        where nid_encarg = p_nid_encarg;
        
        delete from tbl_encargado
        where nid_encarg = p_nid_encarg;
        
        delete from tbl_usuario
        where nid_usrapp = l_nid_usrapp;*/   
        update tbl_encargado_sede
        set fl_inacti = true
        where nid_encarg = p_nid_encarg;
        
        update tbl_encargado
        set fl_inacti = true
        where nid_encarg = p_nid_encarg;
        
        update tbl_usuario
        set fl_inacti = true
        where nid_usrapp = l_nid_usrapp;
        
    commit;
end
$$
drop procedure if exists sps_get_entrenador
$$
create procedure sps_get_entrenador(
    in p_no_maiusr varchar(100)
)
begin
    declare l_nid_cluapp int;
    set l_nid_cluapp = 
        (select clu.nid_cluapp from tbl_club clu
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
			and usr.no_maiusr = p_no_maiusr
			and usr.fl_inacti = false
        where clu.fl_inacti = false);
    select ent.nid_entren, ent.no_entren, uen.no_maiusr as no_maient
    from tbl_entrenador ent
    inner join tbl_usuario uen on uen.nid_usrapp = ent.nid_usrapp
		and uen.fl_inacti = false
    where ent.nid_cluapp = l_nid_cluapp
    and ent.fl_inacti = false;
end
$$
drop procedure if exists sps_get_jugador
$$
create procedure sps_get_jugador(
    in p_no_maiusr varchar(100),
    in p_nid_stsede int,
    in p_nid_equipo int
)
begin
    select usr.no_maiusr, usj.no_maiusr as no_maijug, jug.nid_jugado, jug.nid_equipo, jug.nid_stsede, jug.nid_cluapp, 
    jug.nid_usrapp, jug.no_jugado, jug.nid_posici, jug.fl_titula, jug.fe_fecnac
    from tbl_jugador jug
    inner join tbl_club clu on clu.nid_cluapp = jug.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
        and usr.no_maiusr = p_no_maiusr
		and usr.fl_inacti = false
    inner join tbl_sede sed on sed.nid_stsede = jug.nid_stsede
        and sed.nid_stsede = p_nid_stsede
        and sed.fl_inacti = false
    inner join tbl_equipo equ on equ.nid_equipo = jug.nid_equipo
        and equ.nid_equipo = p_nid_equipo
        and equ.fl_inacti = false
    inner join tbl_usuario usj on usj.nid_usrapp = jug.nid_usrapp
    and jug.fl_inacti = false;
end
$$
drop procedure if exists sps_get_jugador_by_email
$$
create procedure sps_get_jugador_by_email(
    in p_no_maijug varchar(100)
)
begin
    declare l_nid_usrapp int;
    set l_nid_usrapp = (
        select nid_usrapp from tbl_usuario
        where no_maiusr = p_no_maijug
        and fl_inacti = false
    );
    select usr.no_maiusr, jug.nid_jugado, jug.no_jugado, jug.nid_equipo, 
            jug.nid_stsede, jug.nid_cluapp, jug.nid_posici, 
            jug.nid_usrapp, jug.fl_titula
    from tbl_jugador jug
    inner join tbl_club clu on clu.nid_cluapp = jug.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
		and usr.fl_inacti = false
    where jug.nid_usrapp = l_nid_usrapp
    and jug.fl_inacti = false;
end
$$
drop procedure if exists sps_get_match_player
$$
create procedure sps_get_match_player(
    in p_no_maiusr varchar(100),
    in p_nid_stsede int,
    in p_nid_equipo int,
    in p_nid_jugado int
)
begin
    declare l_nid_cluapp int;
    set l_nid_cluapp = (
        select nid_cluapp from tbl_club clu
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
			and usr.no_maiusr = p_no_maiusr
            and usr.fl_inacti = false
        where clu.fl_inacti = false
    );
    
    select par.nid_partid, par.nid_equipo, par.nid_stsede, par.nid_cluapp,
            par.fe_fecpar, par.no_equcon, par.qt_golmar, par.qt_golrec,
            par.fl_result, par.fl_parter
    from tbl_partido par
    inner join tbl_partido_jugador pju on pju.nid_partid = par.nid_partid
		and pju.nid_jugado = p_nid_jugado
        and pju.fl_inacti = false
    where par.nid_cluapp = l_nid_cluapp
    and par.nid_stsede = p_nid_stsede
    and par.nid_equipo = p_nid_equipo
    and par.fl_inacti = false
    order by par.nid_partid desc;
end
$$
drop procedure if exists sps_get_jugador_accion
$$
create procedure sps_get_jugador_accion(
    in p_no_maiusr varchar(100),
    in p_nid_stsede int,
    in p_nid_equipo int,
    in p_nid_partid int,
    in p_nid_jugado int
)
begin
    declare l_nid_cluapp int;
    set l_nid_cluapp = (
        select nid_cluapp from tbl_club clu
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
			and usr.no_maiusr = p_no_maiusr
            and usr.fl_inacti = false
		where clu.fl_inacti = false
    );
    if(p_nid_jugado = 0) then
		select jua.nid_equipo, jua.nid_stsede, jua.nid_cluapp,
		jua.nid_partid, jua.nid_accion, acc.no_accion, 
        sum(jua.qt_accion) as qt_accion
		from tbl_jugador_accion jua
		inner join mae_accion acc on acc.nid_accion = jua.nid_accion
			and acc.fl_inacti = false
		where jua.nid_cluapp = l_nid_cluapp
		and jua.nid_stsede = p_nid_stsede
		and jua.nid_equipo = p_nid_equipo
		and jua.nid_partid = p_nid_partid
        and jua.fl_inacti = false
        group by jua.nid_equipo, jua.nid_stsede, jua.nid_cluapp, 
		jua.nid_accion, jua.nid_partid,
		jua.nid_accion, acc.no_accion;
	else
		select jua.nid_jugacc, jua.nid_equipo, jua.nid_stsede, jua.nid_cluapp,
			jua.nid_jugado, jua.nid_partid, jua.nid_accion, acc.no_accion, jua.qt_accion
		from tbl_jugador_accion jua
		inner join mae_accion acc on acc.nid_accion = jua.nid_accion
			and acc.fl_inacti = false
		where jua.nid_cluapp = l_nid_cluapp
		and jua.nid_stsede = p_nid_stsede
		and jua.nid_equipo = p_nid_equipo
		and jua.nid_partid = p_nid_partid
		and jua.nid_jugado = p_nid_jugado;
	end if;
end
$$
drop procedure if exists sps_get_entrenador_by_email
$$
create procedure sps_get_entrenador_by_email(
    in p_no_maient varchar(100)
)
begin
    declare l_nid_usrapp int;
    set l_nid_usrapp = (
        select nid_usrapp from tbl_usuario
        where no_maiusr = p_no_maient
        and fl_inacti = false
    );
    select usr.no_maiusr, ent.nid_entren, ent.no_entren,
            ent.nid_usrapp, ent.nid_cluapp, clu.no_nomclu
    from tbl_entrenador ent
    inner join tbl_club clu on clu.nid_cluapp = ent.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
		and usr.fl_inacti = false
    where ent.nid_usrapp = l_nid_usrapp
		and ent.fl_inacti = false;
end
$$
drop procedure if exists sps_get_posicion_accion
$$
create procedure sps_get_posicion_accion(
    in p_no_maiusr varchar(100)
)
begin
    select usr.no_maiusr, poc.nid_posclu, poc.nid_posici, poc.co_posici, poc.nid_accion, 
            poc.co_accion, poc.fl_visibi, poc.nid_cluapp
    from tbl_position_club poc
    inner join tbl_club clu on clu.nid_cluapp = poc.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
        and usr.no_maiusr = p_no_maiusr
        and usr.fl_inacti = false
	where poc.fl_inacti = false;
end
$$
drop procedure if exists spu_set_posicion_accion
$$
create procedure spu_set_posicion_accion(
    in p_no_maiusr varchar(100),
    in p_co_posici char(5),
    in p_co_accion char(5),
    in p_fl_visibi boolean
)
begin
    declare l_nid_cluapp int;
    set l_nid_cluapp = (
        select clu.nid_cluapp from tbl_club clu
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
			and usr.no_maiusr = p_no_maiusr
            and usr.fl_inacti = false
		where clu.fl_inacti = false
    );
    start transaction;
        update tbl_position_club
        set fl_visibi = p_fl_visibi,
            fe_modifi = now()
        where co_posici = p_co_posici
        and co_accion = p_co_accion
        and nid_cluapp = l_nid_cluapp;
    commit;
end
$$
drop procedure if exists sps_get_entrenador_equipo
$$
create procedure sps_get_entrenador_equipo(
    in p_no_maiusr varchar(100),
    in p_nid_entren int
)
begin
    select ene.nid_entequ, ene.nid_equipo, ene.nid_stsede, ene.nid_cluapp, ene.nid_entren
    from tbl_entrenador_equipo ene
    inner join tbl_club clu on clu.nid_cluapp = ene.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
        and usr.no_maiusr = p_no_maiusr
        and usr.fl_inacti = false
    where ene.nid_entren = p_nid_entren
		and ene.fl_inacti = false;
end
$$
drop procedure if exists sps_get_sede_entrenador
$$
create procedure sps_get_sede_entrenador(
    in p_no_maiusr varchar(100),
    in p_nid_entren int 
)
begin
    select sed.nid_stsede, usr.no_maiusr, sed.no_stsede, sed.no_ubicac, sed.nid_cluapp
    from tbl_sede sed
    inner join tbl_club clu on clu.nid_cluapp = sed.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
        and usr.no_maiusr = p_no_maiusr
        and usr.fl_inacti = false
    inner join tbl_entrenador_equipo ene on ene.nid_cluapp = sed.nid_cluapp
        and ene.nid_stsede = sed.nid_stsede
		and ene.fl_inacti = false
	where sed.fl_inacti = false
	group by sed.nid_stsede, usr.no_maiusr, sed.no_stsede, sed.no_ubicac, sed.nid_cluapp;
end
$$
drop procedure if exists sps_get_equipo_sede_entrenador
$$
create procedure sps_get_equipo_sede_entrenador(
    in p_no_maiusr varchar(100),
    in p_nid_entren int,
    in p_nid_stsede int
)
begin
    select equ.nid_equipo, equ.no_descri, equ.nid_stsede, equ.nid_cluapp, usr.no_maiusr, equ.fe_fecpag
    from tbl_equipo equ
    inner join tbl_club clu on clu.nid_cluapp = equ.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
        and usr.no_maiusr = p_no_maiusr
        and usr.fl_inacti = false
    inner join tbl_sede sed on sed.nid_stsede = equ.nid_stsede
        and sed.nid_stsede = p_nid_stsede
		and sed.fl_inacti = false
	inner join tbl_entrenador_equipo ene on ene.nid_equipo = equ.nid_equipo
		and ene.nid_entren = p_nid_entren
        and ene.fl_inacti = false
	where equ.fl_inacti = false;
end
$$
drop procedure if exists sps_get_match_coach
$$
create procedure sps_get_match_coach(
    in p_no_maiusr varchar(100),
    in p_nid_stsede int,
    in p_nid_equipo int,
    in p_nid_entren int
)
begin
    declare l_nid_cluapp int;
    set l_nid_cluapp = (
        select nid_cluapp from tbl_club clu
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
			and usr.no_maiusr = p_no_maiusr
			and usr.fl_inacti = false
		where clu.fl_inacti = false
    );
    
    select par.nid_partid, par.nid_equipo, par.nid_stsede, par.nid_cluapp,
            par.fe_fecpar, par.no_equcon, par.qt_golmar, par.qt_golrec,
            par.fl_result, par.fl_parter
    from tbl_partido par
    inner join tbl_entrenador_partido pen on pen.nid_partid = par.nid_partid
    and pen.nid_entren = p_nid_entren
		and pen.fl_inacti = false
    where par.nid_cluapp = l_nid_cluapp
    and par.nid_stsede = p_nid_stsede
    and par.nid_equipo = p_nid_equipo
    and par.fl_inacti = false
    order by par.nid_partid desc;
end
$$
drop procedure if exists sps_get_jugadores_partido
$$
create procedure sps_get_jugadores_partido(
    in p_no_maiusr varchar(100),
    in p_nid_partid int,
    in p_nid_equipo int,
    in p_nid_stsede int
)
begin
    select usr.no_maiusr, usj.no_maiusr as no_maijug, jug.nid_jugado, jug.no_jugado, jug.nid_posici, jug.fl_titula, 
    jug.fe_fecnac, jug.nid_equipo, jug.nid_stsede, jug.nid_cluapp, pju.fl_parjug
    from tbl_jugador jug
    inner join tbl_usuario usj on usj.nid_usrapp = jug.nid_usrapp
		and usj.fl_inacti = false
    inner join tbl_partido_jugador pju on pju.nid_jugado = jug.nid_jugado
		and pju.fl_inacti = false
    inner join tbl_partido par on par.nid_partid = pju.nid_partid
        and pju.nid_partid = p_nid_partid
        and par.fl_inacti = false
    inner join tbl_equipo equ on equ.nid_equipo = par.nid_equipo
        and pju.nid_equipo = p_nid_equipo
        and equ.fl_inacti = false
    inner join tbl_sede sed on sed.nid_stsede = equ.nid_stsede
        and pju.nid_stsede = p_nid_stsede
		and sed.fl_inacti = false
    inner join tbl_club clu on clu.nid_cluapp = sed.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
        and usr.no_maiusr = p_no_maiusr
        and usr.fl_inacti = false
	where jug.fl_inacti = false
	group by usr.no_maiusr, usj.no_maiusr, jug.nid_jugado, jug.no_jugado, jug.nid_posici, jug.fl_titula, 
    jug.fe_fecnac, jug.nid_equipo, jug.nid_stsede, jug.nid_cluapp, pju.fl_parjug
    order by usr.no_maiusr desc;
end
$$
drop procedure if exists sps_get_sede_encargado
delimiter $$
create procedure sps_get_sede_encargado(
    in p_no_maiusr varchar(100),
    in p_nid_encarg int 
)
begin
    select sed.nid_stsede, usr.no_maiusr, sed.no_stsede, sed.no_ubicac, sed.nid_cluapp
    from tbl_sede sed
    inner join tbl_club clu on clu.nid_cluapp = sed.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
        and usr.no_maiusr = p_no_maiusr
        and usr.fl_inacti = false
    inner join tbl_encargado_sede ens on ens.nid_stsede = sed.nid_stsede
        and ens.nid_encarg = p_nid_encarg
        and ens.fl_inacti = false
	where sed.fl_inacti = false
    order by sed.nid_stsede;
end
$$
drop procedure if exists sps_get_encargado_by_email
$$
create procedure sps_get_encargado_by_email(
    in p_no_maiusr varchar(100)
)
begin
    select usr.no_maiusr as no_maienc, usc.no_maiusr, enc.nid_encarg, enc.no_encarg,
    enc.no_telenc, enc.nid_usrapp, enc.nid_cluapp, clu.no_nomclu
    from tbl_encargado enc
    inner join tbl_usuario usr on usr.nid_usrapp = enc.nid_usrapp
        and usr.no_maiusr = p_no_maiusr
        and usr.fl_inacti = false
    inner join tbl_club clu on clu.nid_cluapp = enc.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usc on usc.nid_usrapp = clu.nid_usrapp
		and usc.fl_inacti = false
    where enc.fl_inacti = false;
end
$$
drop procedure if exists sps_get_equipo_entrenador
$$
create procedure sps_get_equipo_entrenador(
    in p_no_maiusr varchar(100),
    in p_nid_stsede int,
    in p_nid_equipo int
)
begin
    select usr.no_maiusr, uen.no_maiusr as no_maient, ent.no_entren, ene.nid_entequ, ene.nid_equipo, ene.nid_stsede, ene.nid_cluapp, ene.nid_entren
    from tbl_entrenador_equipo ene
    inner join tbl_entrenador ent on ent.nid_entren = ene.nid_entren
		and ent.fl_inacti = false
    inner join tbl_usuario uen on uen.nid_usrapp = ent.nid_usrapp
		and uen.fl_inacti = false
    inner join tbl_sede sed on sed.nid_stsede = ene.nid_stsede
        and sed.fl_inacti = false
    inner join tbl_equipo equ on equ.nid_equipo = ene.nid_equipo
        and equ.nid_equipo = p_nid_equipo
        and equ.fl_inacti = false
    inner join tbl_club clu on clu.nid_cluapp = ene.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
        and usr.no_maiusr = p_no_maiusr
        and usr.fl_inacti = false
	where ene.nid_stsede = p_nid_stsede
    and ene.fl_inacti = false;
end
$$
drop procedure if exists sps_get_action
$$
create procedure sps_get_action()
begin
    select nid_accion, co_accion, no_accion, nid_gruacc, co_gruacc
    from mae_accion
    where fl_inacti = false;
end
$$
drop procedure if exists sps_get_position
$$
create procedure sps_get_position()
begin
    select nid_posici, co_posici, no_posici
    from mae_posicion
    where fl_inacti = false;
end
$$
drop procedure if exists spi_register_equipo
$$
create procedure spi_register_equipo(
    in p_no_maiusr varchar(100),
    in p_no_descri varchar(3000),
    in p_nid_stsede int,
    in p_fe_fecpag datetime
)
begin
    declare l_nid_cluapp int;
    set l_nid_cluapp = (
        select nid_cluapp from tbl_club clu
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
            and usr.no_maiusr = p_no_maiusr
            and usr.fl_inacti = false
		where clu.fl_inacti = false
    );
    start transaction;
        insert into tbl_equipo(no_descri, nid_stsede, nid_cluapp, fe_fecpag)
        values(p_no_descri, p_nid_stsede, l_nid_cluapp, p_fe_fecpag);
    commit;
end
$$
drop procedure if exists sps_get_teams
$$
create procedure sps_get_teams(
    in p_no_maiusr varchar(100)
)
begin
    declare l_nid_cluapp int;
    set l_nid_cluapp = (
        select nid_cluapp from tbl_club clu
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
            and usr.no_maiusr = p_no_maiusr
            and usr.fl_inacti = false
		where clu.fl_inacti = false
    );
    
    select * from tbl_equipo
    where nid_cluapp = l_nid_cluapp
    and fl_inacti = false;
end
$$
drop procedure if exists sps_get_teams
$$
create procedure sps_get_teams(
    in p_no_maiusr varchar(100)
)
begin
    declare l_nid_cluapp int;
    set l_nid_cluapp = (
        select nid_cluapp from tbl_club clu
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
            and usr.no_maiusr = p_no_maiusr
            and usr.fl_inacti = false
		where clu.fl_inacti = false
    );
    
    select * from tbl_equipo
    where nid_cluapp = l_nid_cluapp
    and fl_inacti = false;
end
$$
drop procedure if exists spi_register_player
$$
create procedure spi_register_player(
    in p_nid_equipo int,
    in p_nid_stsede int,
    in p_no_maiusr varchar(100),
    in p_no_maijug varchar(100),
    in p_no_jugado varchar(150),
    in p_nid_posici int,
    in p_fl_titula boolean
)
begin
    declare l_nid_cluapp int;
    declare l_nid_usrapp int;
    declare l_nid_posici int;
    set l_nid_cluapp = (
        select nid_cluapp from tbl_club clu
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
            and usr.no_maiusr = p_no_maiusr
            and usr.fl_inacti = false
		where clu.fl_inacti = false
    );
    set l_nid_usrapp = (
        select nid_usrapp from tbl_usuario usr
        where usr.no_maiusr = p_no_maijug
			and usr.fl_inacti = false
    );
    if(p_nid_posici = 0) then
		set l_nid_posici = null;
	else
		set l_nid_posici = p_nid_posici;
	end if;
    start transaction;
        insert into tbl_jugador(no_jugado, nid_posici, fl_titula, nid_equipo, nid_stsede, nid_cluapp, nid_usrapp)
        values(p_no_jugado, l_nid_posici, p_fl_titula, p_nid_equipo, p_nid_stsede, l_nid_cluapp, l_nid_usrapp);
    commit;
end
$$
drop procedure if exists spi_register_entrenador
$$
create procedure spi_register_entrenador(
    in p_no_maiusr varchar(100),
    in p_no_maient varchar(100),
    in p_no_entren varchar(200)
)
begin
    declare l_nid_cluapp int;
    declare l_nid_usrapp int;
    set l_nid_cluapp = (
        select clu.nid_cluapp from tbl_club clu
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
            and usr.no_maiusr = p_no_maiusr
            and usr.fl_inacti = false
		where clu.fl_inacti = false
    );
    set l_nid_usrapp = (
        select usr.nid_usrapp from tbl_usuario usr
        where usr.no_maiusr = p_no_maient
			and usr.fl_inacti = false
    );
    start transaction;
        insert into tbl_entrenador(no_entren, nid_usrapp, nid_cluapp)
        values(p_no_entren, l_nid_usrapp, l_nid_cluapp);
    commit;
end
$$
drop procedure if exists sps_get_entrenador_no_team
$$
create procedure sps_get_entrenador_no_team(
    in p_no_maiusr varchar(100),
    in p_nid_stsede int,
    in p_nid_equipo int
)
begin
    select usr.no_maiusr , uen.no_maiusr as no_maient, ent.nid_entren, ent.no_entren, ent.nid_usrapp, ent.nid_cluapp
    from tbl_entrenador ent
    inner join tbl_club clu on clu.nid_cluapp = ent.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
        and usr.no_maiusr = p_no_maiusr
        and usr.fl_inacti = false
    inner join tbl_usuario uen on uen.nid_usrapp = ent.nid_usrapp
		and uen.fl_inacti = false
    where ent.nid_entren not in (
        select ene.nid_entren
        from tbl_entrenador_equipo ene
        inner join tbl_club clu on clu.nid_cluapp = ene.nid_cluapp
			and clu.fl_inacti = false
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
            and usr.no_maiusr = p_no_maiusr
            and usr.fl_inacti = false
        where ene.nid_stsede = p_nid_stsede
            and ene.nid_equipo = p_nid_equipo
            and ene.fl_inacti = false
    )
    and ent.fl_inacti = false;
end
$$
drop procedure if exists spu_set_equipo
$$
create procedure spu_set_equipo(
    in p_nid_equipo int,
    in p_no_descri varchar(3000)
)
begin
    start transaction;
        update tbl_equipo equ
        set equ.no_descri = p_no_descri,
            equ.fe_modifi = now()
        where nid_equipo = p_nid_equipo;
    commit;
end
$$
drop procedure if exists spd_delete_entrenador_equipo
$$
create procedure spd_delete_entrenador_equipo(
    in p_nid_equipo int
)
begin
    start transaction;
        /*delete from tbl_entrenador_equipo
        where nid_equipo = p_nid_equipo;*/
        update tbl_entrenador_equipo
        set fl_inacti = true
        where nid_equipo = p_nid_equipo;
    commit;
end
$$
drop procedure if exists spi_register_entrenador_equipo
$$
create procedure spi_register_entrenador_equipo(
    in p_nid_equipo int,
    in p_nid_stsede int,
    in p_no_maiusr varchar(100),
    in p_nid_entren int
)
begin
    declare l_nid_cluapp int;
    set l_nid_cluapp = (
        select clu.nid_cluapp from tbl_club clu
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
            and usr.no_maiusr = p_no_maiusr
            and usr.fl_inacti = false
    );
    start transaction;
        insert into tbl_entrenador_equipo(nid_equipo, nid_stsede, nid_cluapp, nid_entren)
        values(p_nid_equipo, p_nid_stsede, l_nid_cluapp, p_nid_entren);
    commit;
end
$$
drop procedure if exists sps_get_player_team
$$
create procedure sps_get_player_team(
    in p_nid_equipo int
)
begin
    select nid_jugado, no_jugado, nid_posici, fl_titula, fe_fecnac, 
            nid_equipo, nid_stsede, nid_cluapp, nid_usrapp
    from tbl_jugador
    where nid_equipo = p_nid_equipo
    and fl_inacti = false;
end
$$
drop procedure if exists spd_delete_equipo
$$
create procedure spd_delete_equipo(
    in p_nid_equipo int
)
begin
    start transaction;
        /*delete from tbl_entrenador_partido
        where nid_equipo = p_nid_equipo;
        
        delete from tbl_entrenador_equipo
        where nid_equipo = p_nid_equipo;
        
        delete from tbl_equipo
        where nid_equipo = p_nid_equipo;*/
        
        update tbl_entrenador_partido
        set fl_inacti = true
        where nid_equipo = p_nid_equipo;
        
        update tbl_entrenador_equipo
        set fl_inacti = true
        where nid_equipo = p_nid_equipo;
        
        update tbl_equipo
        set fl_inacti = true
        where nid_equipo = p_nid_equipo;
        
    commit;
end
$$
drop procedure if exists spd_delete_player
$$
create procedure spd_delete_player(
    in p_nid_jugado int
)
begin
    declare l_nid_usrapp int;
    set l_nid_usrapp = (
        select usr.nid_usrapp from tbl_usuario usr
        inner join tbl_jugador jug on jug.nid_usrapp = usr.nid_usrapp
            and jug.nid_jugado = p_nid_jugado
            and jug.fl_inacti = false
		where usr.fl_inacti = false
    );
    start transaction;
        /*delete from tbl_jugador_accion
        where nid_jugado = p_nid_jugado;
        
        delete from tbl_partido_jugador
        where nid_jugado = p_nid_jugado;
        
        delete from tbl_jugador
        where nid_jugado = p_nid_jugado;
        
        delete from tbl_usuario
        where nid_usrapp = l_nid_usrapp;*/
        
        update tbl_jugador
        set fl_inacti = true
        where nid_jugado = p_nid_jugado;
    commit;
end
$$
drop procedure if exists spd_delete_entrenador
$$
create procedure spd_delete_entrenador(
    in p_nid_entren int
)
begin
    declare l_nid_usrapp int;
    set l_nid_usrapp = (
        select usr.nid_usrapp from tbl_usuario usr
        inner join tbl_entrenador ent on ent.nid_usrapp = usr.nid_usrapp
            and ent.nid_entren = p_nid_entren
            and ent.fl_inacti = false
		where usr.fl_inacti = false
    );
    start transaction;
        /*delete from tbl_entrenador_partido
        where nid_entren = p_nid_entren;
    
        delete from tbl_entrenador_equipo
        where nid_entren = p_nid_entren;
        
        delete from tbl_entrenador
        where nid_entren = p_nid_entren;
        
        delete from tbl_usuario
        where nid_usrapp = l_nid_usrapp;*/
        update tbl_entrenador_partido
        set fl_inacti = true
        where nid_entren = p_nid_entren;
        
        update tbl_entrenador_equipo
        set fl_inacti = true
        where nid_entren = p_nid_entren;
        
        update tbl_entrenador
        set fl_inacti = true
        where nid_entren = p_nid_entren;
        
        update tbl_usuario
        set fl_inacti = true
        where nid_usrapp = l_nid_usrapp;
    commit;
end
$$
drop procedure if exists spu_update_entrenador
$$
create procedure spu_update_entrenador(
    in p_nid_entren int,
    in p_no_entren varchar(200)
)
begin
    start transaction;
        update tbl_entrenador
        set no_entren = p_no_entren,
        fe_modifi = now()
        where nid_entren = p_nid_entren;
    commit;
end
$$
drop procedure if exists sps_get_matches_coach
$$
create procedure sps_get_matches_coach(
    in p_no_maiusr varchar(100),
    in p_nid_entren int
)
begin
    select par.nid_partid, par.nid_equipo, par.nid_stsede, par.nid_cluapp
    , par.fe_fecpar, par.no_equcon, par.qt_golmar, par.qt_golrec
    , par.fl_result, par.fl_parter
    from tbl_partido par
    inner join tbl_entrenador_partido enp on enp.nid_partid = par.nid_partid
        and enp.nid_entren = p_nid_entren
        and enp.fl_inacti = false
    inner join tbl_club clu on clu.nid_cluapp = par.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
        and usr.no_maiusr = p_no_maiusr
        and usr.fl_inacti = false
	where par.fl_inacti = false
	order by par.nid_partid desc;
end
$$
drop procedure if exists spu_update_player
$$
create procedure spu_update_player(
    in p_nid_jugado int,
    in p_no_jugado varchar(200),
    in p_nid_posici int
)
begin
    start transaction;
        update tbl_jugador
        set no_jugado = p_no_jugado,
        nid_posici = p_nid_posici,
        fe_modifi = now()
        where nid_jugado = p_nid_jugado;
    commit;
end
$$
drop procedure if exists sps_get_match_team
$$
create procedure sps_get_match_team(
    in p_no_maiusr varchar(100),
    in p_nid_stsede int,
    in p_nid_equipo int
)
begin
    select par.nid_partid, par.nid_equipo, par.nid_stsede, par.nid_cluapp
    , DATE_FORMAT(par.fe_fecpar,'%Y-%m-%d') as fe_fecpar, par.no_equcon
    ,par.qt_golmar, par.qt_golrec, par.fl_result, par.fl_parter
    from tbl_partido par
    inner join tbl_club clu on clu.nid_cluapp = par.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
        and usr.no_maiusr = p_no_maiusr
        and usr.fl_inacti = false
    where par.nid_stsede = p_nid_stsede
        and par.nid_equipo = p_nid_equipo
        and par.fl_inacti = false
	order by par.nid_partid desc;
end
$$
drop procedure if exists sps_get_equipo
$$
create procedure sps_get_equipo(
    in p_no_maisur varchar(100),
    in p_nid_equipo int,
    in p_nid_stsede int
)
begin
    select equ.nid_equipo, equ.no_descri, equ.nid_stsede, equ.nid_cluapp, equ.fe_fecpag
    from tbl_equipo equ
    inner join tbl_club clu on clu.nid_cluapp = equ.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
        and usr.no_maiusr = p_no_maisur
        and usr.fl_inacti = false
    where equ.nid_equipo = p_nid_equipo
        and equ.nid_stsede = p_nid_stsede
        and equ.fl_inacti = false;
end
$$
drop procedure if exists spi_register_match
$$
create procedure spi_register_match(
    in p_nid_equipo int,
    in p_nid_stsede int,
    in p_no_maiusr varchar(100),
    in p_fe_fecpar datetime,
    in p_no_equcon varchar(100),
    in p_qt_golmar int,
    in p_qt_golrec int,
    in p_fl_result int,
    in p_fl_parter boolean
)
begin
    declare l_nid_cluapp int;
    declare l_nid_partid int;
    set l_nid_cluapp = (
        select clu.nid_cluapp from tbl_club clu
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
            and usr.no_maiusr = p_no_maiusr
            and usr.fl_inacti = false
		where clu.fl_inacti = false
    );
    -- Insertando el partido
    start transaction;
    insert into tbl_partido( nid_equipo, nid_stsede, nid_cluapp, fe_fecpar, no_equcon, 
    qt_golmar, qt_golrec, fl_result, fl_parter)
    values(p_nid_equipo, p_nid_stsede, l_nid_cluapp, p_fe_fecpar, p_no_equcon
    , p_qt_golmar, p_qt_golrec, p_fl_result, fl_parter);
    commit;
    
    -- Obteniendo el ultimo ID Registrado
    select max(nid_partid) into l_nid_partid from tbl_partido;
    
    -- Se crea la particiáción de los jugadores
    start transaction;
    insert into tbl_partido_jugador(nid_equipo, nid_stsede, nid_cluapp, nid_jugado
                , nid_partid, fl_parjug)
    select p_nid_equipo, p_nid_stsede, l_nid_cluapp , nid_jugado, l_nid_partid, 0 from tbl_jugador
    where nid_stsede = p_nid_stsede
    and nid_cluapp = l_nid_cluapp
    and nid_equipo = p_nid_equipo;
    commit;
    
    -- Se crea la participación de los entrenadores
    start transaction;
    insert into tbl_entrenador_partido(nid_partid, nid_equipo, nid_stsede, nid_cluapp, nid_entren)
    select l_nid_partid, p_nid_equipo, p_nid_stsede, l_nid_cluapp, ent.nid_entren
    from tbl_entrenador ent
    inner join tbl_entrenador_equipo ene on ene.nid_entren = ent.nid_entren
        and ene.nid_stsede = p_nid_stsede
        and ene.nid_equipo = p_nid_equipo;
    commit;
        
    -- Crear las estadisticas
    start transaction;
    insert into tbl_jugador_accion(nid_equipo, nid_stsede, nid_cluapp, nid_jugado, nid_partid, nid_accion, qt_accion)
    select p_nid_equipo, p_nid_stsede, l_nid_cluapp, jug.nid_jugado, l_nid_partid, acc.nid_accion, 0
    from tbl_jugador jug
    cross join mae_accion acc
    where jug.nid_stsede = p_nid_stsede
    and jug.nid_equipo = p_nid_equipo;
    commit;
end
$$
drop procedure if exists sps_get_training
$$
create procedure sps_get_training()
begin
    select nid_formac, co_formac, no_formac
    from mae_formacion
    where fl_inacti = false;
end
$$
drop procedure if exists sps_get_player_titula
$$
create procedure sps_get_player_titula(
    in p_no_maiusr varchar(100),
    in p_nid_equipo int,
    in p_nid_stsede int,
    in p_fl_titula boolean
)
begin
    select usr.no_maiusr, jug.nid_jugado, jug.no_jugado, jug.nid_posici, jug.fl_titula, 
    jug.fe_fecnac, jug.nid_equipo, jug.nid_stsede, jug.nid_cluapp, jug.nid_usrapp
    from tbl_jugador jug
    inner join tbl_club clu on clu.nid_cluapp = jug.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
		and usr.fl_inacti = false
    where jug.nid_equipo = p_nid_equipo
    and jug.nid_stsede = p_nid_stsede
    and jug.fl_titula = p_fl_titula
    and jug.fl_inacti = false;
end
$$
drop procedure if exists spu_update_player_titularidad
$$
create procedure spu_update_player_titularidad(
    in p_nid_jugado int,
    in p_fl_titula boolean
)
begin
    start transaction;
        update tbl_jugador jug
        set jug.fl_titula = p_fl_titula,
        jug.fe_modifi = now()
        where nid_jugado = p_nid_jugado;
    commit;
end
$$
drop procedure if exists spu_partido_jugador
$$
create procedure spu_partido_jugador(
    in p_no_maiusr varchar(100),
    in p_nid_stsede int,
    in p_nid_equipo int
)
begin
    start transaction;
        update tbl_partido_jugador pju
        inner join tbl_jugador jug on jug.nid_jugado = pju.nid_jugado
            and jug.fl_titula = true
        set pju.fl_parjug = true,
        pju.fe_modifi = now()
        where pju.nid_stsede = p_nid_stsede
        and pju.nid_equipo = p_nid_equipo;
    commit;
end
$$
drop procedure if exists sps_get_posicion_formacion
$$
create procedure sps_get_posicion_formacion(
    in p_co_formac char(5)
)
begin
    select pos.nid_posici, pos.co_posici, pos.no_posici
    from mae_posicion pos
    inner join mae_formacion_posicion fop on fop.nid_posici = pos.nid_posici
		and fop.fl_inacti = false
    inner join mae_formacion fom on fom.nid_formac = fop.nid_formac
		and fom.co_formac = p_co_formac
        and fom.fl_inacti = false
    where pos.fl_inacti = false;
end
$$
drop procedure if exists sps_get_action_group
$$
create procedure sps_get_action_group(
    in p_no_maisur varchar(100),
    in p_co_gruacc char(5),
    in p_nid_posici int,
    in p_fl_visibl boolean
)
begin
    select usr.no_maiusr, acc.nid_accion, acc.co_accion, acc.no_accion, acc.nid_gruacc, acc.co_gruacc, acc.fl_accpos
    from mae_accion acc
    inner join tbl_position_club pcl on pcl.nid_accion = acc.nid_accion
        and pcl.fl_visibi = p_fl_visibl
        and pcl.nid_posici = p_nid_posici
        and pcl.fl_inacti = false
    inner join tbl_club clu on clu.nid_cluapp = pcl.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
        and usr.no_maiusr = p_no_maisur
        and usr.fl_inacti = false
    where acc.co_gruacc = p_co_gruacc
		and acc.fl_inacti = false
    group by usr.no_maiusr, acc.nid_accion, acc.co_accion, acc.no_accion, acc.nid_gruacc, acc.co_gruacc, acc.fl_accpos;
end
$$
drop procedure if exists spu_update_action_player
$$
create procedure spu_update_action_player(
    in p_nid_partid int,
    in p_nid_equipo int,
    in p_nid_stsede int,
    in p_no_maiusr varchar(100),
    in p_nid_jugado int,
    in p_nid_accion int
)
begin
    declare l_nid_cluapp int;
    set l_nid_cluapp = (
        select clu.nid_cluapp from tbl_club clu
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
            and usr.no_maiusr = p_no_maiusr
            and usr.fl_inacti = false
		where clu.fl_inacti = false
    );
    start transaction;
        update tbl_jugador_accion jua
        set jua.qt_accion = jua.qt_accion + 1,
        jua.fe_modifi = now()
        where jua.nid_partid = p_nid_partid
        and jua.nid_equipo = p_nid_equipo
        and jua.nid_stsede = p_nid_stsede
        and jua.nid_cluapp = l_nid_cluapp
        and jua.nid_jugado = p_nid_jugado
        and jua.nid_accion = p_nid_accion;
    commit;
    
    select jug.no_jugado, acc.no_accion, jua.qt_accion from tbl_jugador jug
    inner join tbl_jugador_accion jua on jua.nid_jugado = jug.nid_jugado
    inner join mae_accion acc on acc.nid_accion = jua.nid_accion
    where jua.nid_partid = p_nid_partid
        and jua.nid_equipo = p_nid_equipo
        and jua.nid_stsede = p_nid_stsede
        and jua.nid_cluapp = l_nid_cluapp
        and jua.nid_jugado = p_nid_jugado
        and jua.nid_accion = p_nid_accion;
end
$$
drop procedure if exists spu_reset_payment_team
$$
create procedure spu_reset_payment_team(
    in p_nid_equipo int,
    in p_nid_stsede int
)
begin
	declare l_fe_fecpag datetime;
    set l_fe_fecpag = (
        select equ.fe_fecpag from tbl_equipo equ
		where equ.nid_equipo = p_nid_equipo
    );
    if(datediff(now(), l_fe_fecpag) >= 30) then
		start transaction;
			update tbl_equipo equ
			set equ.fe_fecpag = now(),
			fe_modifi = now()
			where equ.nid_equipo = p_nid_equipo
			and equ.nid_stsede = p_nid_stsede;
		commit;
	else
		start transaction;
			update tbl_equipo equ
			set equ.fe_fecpag = adddate(equ.fe_fecpag, interval 30 day),
			fe_modifi = now()
			where equ.nid_equipo = p_nid_equipo
			and equ.nid_stsede = p_nid_stsede;
		commit;
    end if;
end
$$
drop procedure if exists sps_get_preview_resultado_partido
$$
create procedure sps_get_preview_resultado_partido(
    in p_nid_partid int,
    in p_nid_equipo int,
    in p_nid_stsede int,
    in p_no_maiusr varchar(100)
)
begin
    declare l_qt_golmar int;
    declare l_qt_golrec int;
    set l_qt_golmar = (
        select sum(jua.qt_accion) from tbl_jugador_accion jua
        inner join tbl_club clu on clu.nid_cluapp = jua.nid_cluapp
			and clu.fl_inacti = false
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
            and usr.no_maiusr = p_no_maiusr
            and usr.fl_inacti = false
        inner join mae_accion acc on acc.nid_accion = jua.nid_accion
            and acc.co_accion = 'GOLAN'
            and acc.fl_inacti = false
        where jua.nid_partid = p_nid_partid
        and jua.nid_equipo = p_nid_equipo
        and jua.nid_stsede = p_nid_stsede
        and jua.fl_inacti = false
    );
    
    set l_qt_golrec = (
        select sum(jua.qt_accion) from tbl_jugador_accion jua
        inner join tbl_club clu on clu.nid_cluapp = jua.nid_cluapp
			and clu.fl_inacti = false
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
            and usr.no_maiusr = p_no_maiusr
            and usr.fl_inacti = false
        inner join mae_accion acc on acc.nid_accion = jua.nid_accion
            and acc.co_accion = 'GOLRE'
            and acc.fl_inacti = false
        where jua.nid_partid = p_nid_partid
        and jua.nid_equipo = p_nid_equipo
        and jua.nid_stsede = p_nid_stsede
        and jua.fl_inacti = false
    );
    
    select par.nid_partid, par.nid_equipo, par.nid_stsede, par.nid_cluapp, 
    par.fe_fecpar, l_qt_golmar as qt_golmar, l_qt_golrec as qt_golrec, fl_result
    from tbl_partido par
    inner join tbl_club clu on clu.nid_cluapp = par.nid_cluapp
		and clu.fl_inacti = false
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
        and usr.no_maiusr = p_no_maiusr
        and usr.fl_inacti = false
    where par.nid_partid = p_nid_partid
		and par.nid_equipo = p_nid_equipo
		and par.nid_stsede = p_nid_stsede
		and par.fl_inacti = false;
end
$$
drop procedure if exists spu_update_resultado_partido
$$
create procedure spu_update_resultado_partido(
    in p_nid_partid int,
    in p_nid_equipo int,
    in p_nid_stsede int,
    in p_no_maiusr varchar(100),
    in p_qt_golmar int,
    in p_qt_golrec int,
    in p_fl_result int
)
begin
    declare l_nid_cluapp int;
    set l_nid_cluapp = (
        select nid_cluapp from tbl_club clu
        inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
            and usr.no_maiusr = p_no_maiusr
            and usr.fl_inacti = false
		where clu.fl_inacti = false
    );
    start transaction;
        update tbl_partido par
        set par.qt_golmar = p_qt_golmar,
        par.qt_golrec = p_qt_golrec,
        par.fl_result = p_fl_result,
        par.fl_parter = true,
        par.fe_modifi = now()
        where par.nid_partid = p_nid_partid
        and par.nid_equipo = p_nid_equipo
        and par.nid_stsede = p_nid_stsede
        and par.nid_cluapp = l_nid_cluapp;
    commit;
end
$$
drop procedure if exists sps_get_club
$$
create procedure sps_get_club(
	in p_no_maiusr varchar(100)
)
begin
	select * from tbl_club clu
    inner join tbl_usuario usr on usr.nid_usrapp = clu.nid_usrapp
		and usr.no_maiusr = p_no_maiusr
        and usr.fl_inacti = false
	where clu.fl_inacti = false;
end
$$
drop procedure if exists sps_get_seat
$$
create procedure sps_get_seat(
	in p_nid_stsede int
)
begin
	select * from tbl_sede
    where nid_stsede = p_nid_stsede
    and fl_inacti = false;
end
$$
drop procedure if exists spu_upd_change_password
$$
create procedure spu_upd_change_password(
	in p_no_maiusr varchar(100),
    in p_no_pasusr varchar(400)
)
begin
	start transaction;
		update tbl_usuario
        set no_pasusr = p_no_pasusr,
			fe_modifi = now()
		where no_maiusr = p_no_maiusr;
    commit;
end
$$
drop procedure if exists sps_get_statistics_club
$$
create procedure sps_get_statistics_club(
	in p_no_maiusr varchar(100),
    in p_ls_stsede varchar(3000),
    in p_qt_stsede int,
    in p_nid_stsede int,
    in p_ls_equipo varchar(3000),
    in p_qt_equipo int,
    in p_nid_equipo int,
    in p_ls_jugado varchar(3000),
    in p_qt_jugado int,
    in p_fe_fecini datetime,
    in p_fe_fecfin datetime
)
begin
	declare l_cont_stsede int;
    declare l_cont_equipo int;
    declare l_cont_jugado int;
    create temporary table cod_sede( nid_stsede varchar(3000));
    create temporary table cod_equipo( nid_equipo varchar(3000));
    create temporary table cod_jugador( nid_jugado varchar(3000));
    set l_cont_stsede = 1;
    set l_cont_equipo = 1;
    set l_cont_jugado = 1;
	if(p_qt_stsede > 0) then
		while l_cont_stsede <= p_qt_stsede do
			insert into cod_sede
			select SPLIT_STRING(p_ls_stsede, ',', l_cont_stsede) as nid_stsede;
            set l_cont_stsede = l_cont_stsede + 1;
		end while;
    end if;
    
    if(p_qt_equipo > 0) then
		while l_cont_equipo <= p_qt_equipo do
			insert into cod_equipo
			select SPLIT_STRING(p_ls_equipo, ',', l_cont_equipo) as nid_equipo;
            set l_cont_equipo = l_cont_equipo + 1;
		end while;
    end if;
    
    if(p_qt_jugado > 0) then
		while l_cont_jugado <= p_qt_jugado do
			insert into cod_jugador
			select SPLIT_STRING(p_ls_jugado, ',', l_cont_jugado) as nid_jugado;
            set l_cont_jugado = l_cont_jugado + 1;
		end while;
    end if;

	select jua.nid_jugacc, equ.nid_equipo, equ.no_descri, sed.nid_stsede, sed.no_stsede, 
	clu.nid_cluapp, clu.no_nomclu, jug.nid_jugado, jug.no_jugado,
	par.nid_partid, par.fe_fecpar, par.no_equcon, par.qt_golmar, par.qt_golrec,
	par.fl_result, par.fl_parter, acc.nid_accion, acc.no_accion, jua.qt_accion
	from tbl_club clu
	inner join tbl_usuario usc on usc.nid_usrapp = clu.nid_usrapp
		and usc.no_maiusr = p_no_maiusr
		and usc.fl_inacti = false
	left join tbl_sede sed on sed.nid_cluapp = clu.nid_cluapp
		and (p_qt_stsede = 0 or sed.nid_stsede in (
			select nid_stsede from cod_sede
		))
		and (p_nid_stsede = 0 or sed.nid_stsede = p_nid_stsede)
		and sed.fl_inacti = false
	left join tbl_equipo equ on equ.nid_cluapp = clu.nid_cluapp
		and equ.nid_stsede = sed.nid_stsede
		and (p_qt_equipo = 0 or equ.nid_equipo in (
			select nid_equipo from cod_equipo
		))
		and (p_nid_equipo = 0 or equ.nid_equipo = p_nid_equipo)
		and equ.fl_inacti = false
	left join tbl_jugador jug on jug.nid_cluapp = clu.nid_cluapp
		and jug.nid_stsede = sed.nid_stsede
		and jug.nid_equipo = equ.nid_equipo
		and (p_qt_jugado = 0 or jug.nid_jugado in(
			select nid_jugado from cod_jugador
		))
		and jug.fl_inacti = false
	left join tbl_partido par on par.nid_cluapp = clu.nid_cluapp
		and par.nid_stsede = sed.nid_stsede
		and par.nid_equipo = equ.nid_equipo
		and par.fl_inacti = false
		and CAST(par.fe_fecpar as DATE) between p_fe_fecini and p_fe_fecfin
	left join tbl_jugador_accion jua on jua.nid_cluapp = clu.nid_cluapp
		and jua.nid_stsede = sed.nid_stsede
		and jua.nid_equipo = equ.nid_equipo
		and jua.nid_partid = par.nid_partid
		and jua.nid_jugado = jug.nid_jugado
		and jua.nid_partid = par.nid_partid
	left join mae_accion acc on acc.nid_accion = jua.nid_accion
		and jua.fl_inacti = false
	where clu.fl_inacti = false
    order by clu.nid_cluapp, sed.nid_stsede, equ.nid_equipo, par.nid_partid, jug.nid_jugado desc;
    
    drop table cod_sede;
    drop table cod_equipo;
    drop table cod_jugador;
end
$$
drop procedure if exists sps_get_apps
$$
create procedure sps_get_apps()
begin
    select nid_aplica, co_aplica, no_aplica, nu_versio, no_versio
    from mae_aplicacion
    where fl_inacti = false;
end
$$
drop procedure if exists spu_set_app
$$
create procedure spu_set_app(
	in p_nid_aplica int,
    in p_no_versio varchar(100)
)
begin
    start transaction;
		update mae_aplicacion
        set nu_versio = nu_versio + 1,
			no_versio = p_no_versio,
			fe_modifi = now()
		where nid_aplica = p_nid_aplica;
    commit;
end
$$
drop procedure if exists sps_get_app_by_code
$$
create procedure sps_get_app_by_code(
	in p_co_aplica char(5)
)
begin
	select nid_aplica, co_aplica, no_aplica, nu_versio, no_versio
    from mae_aplicacion
    where co_aplica = p_co_aplica
    and fl_inacti = false;
end
$$
delimiter ;

/***************************
    INSERCCIÓN DE DATOS
***************************/
-- Aplicaciones
insert into mae_aplicacion(co_aplica, no_aplica, nu_versio, no_versio) values('ADMIN', 'admin', 1, '1.0');
insert into mae_aplicacion(co_aplica, no_aplica, nu_versio, no_versio) values('MANAG', 'manager', 1, '1.0');
insert into mae_aplicacion(co_aplica, no_aplica, nu_versio, no_versio) values('COACH', 'coach', 1, '1.0');
insert into mae_aplicacion(co_aplica, no_aplica, nu_versio, no_versio) values('PLAYE', 'player', 1, '1.0');
-- Perfil
insert into mae_perfil(co_perfil, no_perfil) values('ADMIN', 'Club');
insert into mae_perfil(co_perfil, no_perfil) values('MANAG', 'Encargado');
insert into mae_perfil(co_perfil, no_perfil) values('COACH', 'Entrenador');
insert into mae_perfil(co_perfil, no_perfil) values('PLAYE', 'Jugador');
-- Posición
insert into mae_posicion(co_posici, no_posici) values('ARQUE', 'Arquero');
insert into mae_posicion(co_posici, no_posici) values('CENME', 'Central Medio');
insert into mae_posicion(co_posici, no_posici) values('CENDE', 'Central Derecho');
insert into mae_posicion(co_posici, no_posici) values('CENIZ', 'Central Izquierdo');
insert into mae_posicion(co_posici, no_posici) values('LATDE', 'Lateral Derecho');
insert into mae_posicion(co_posici, no_posici) values('LATIZ', 'Lateral Izquierdo');
insert into mae_posicion(co_posici, no_posici) values('VOLME', 'Volante Medio');
insert into mae_posicion(co_posici, no_posici) values('VOLMD', 'Volante Medio Derecho');
insert into mae_posicion(co_posici, no_posici) values('VOLMI', 'Volante Medio Izquierdo');
insert into mae_posicion(co_posici, no_posici) values('EXTDE', 'Extremo Derecho');
insert into mae_posicion(co_posici, no_posici) values('EXTIZ', 'Extremo Izquierdo');
insert into mae_posicion(co_posici, no_posici) values('DELCE', 'Delantero Centro');
insert into mae_posicion(co_posici, no_posici) values('DELDE', 'Delantero Derecho');
insert into mae_posicion(co_posici, no_posici) values('DELIZ', 'Delantero Izquierdo');
-- Grupo
insert into mae_grupo(co_gruacc, no_gruacc) values('ATAQU', 'Ataque');
insert into mae_grupo(co_gruacc, no_gruacc) values('CONST', 'Construccion');
insert into mae_grupo(co_gruacc, no_gruacc) values('DUELO', 'Duelos');
insert into mae_grupo(co_gruacc, no_gruacc) values('DEFEN', 'Defensa');
-- Acción
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('GOLAN', 'Gol', 1, 'ATAQU', 1);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('ASIST', 'Asistencia', 1, 'ATAQU', 1);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('TIACC', 'Tiro al arco completo', 1, 'ATAQU', 1);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('TIACI', 'Tiro al arco incompleto', 1, 'ATAQU', 0);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('PAFIC', 'Pase de finalización completo', 1, 'ATAQU', 1);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('PAFII', 'Pase de finalización incompleto', 1, 'ATAQU', 0);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('REGAC', 'Regate completo', 1, 'ATAQU', 1);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('REGAI', 'Regate incompleto', 1, 'ATAQU', 0);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('PROYE', 'Proyección', 1, 'ATAQU', 1);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('FUJUE', 'Fuera de juego', 1, 'ATAQU', 0);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('BALPE', 'Balón perdido', 1, 'ATAQU', 0);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('PASBU', 'Pase bueno', 2, 'CONST', 1);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('PASMA', 'Pase malo', 2, 'CONST', 0);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('CENBU', 'Centro bueno', 2, 'CONST', 1);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('CENMA', 'Centro malo', 2, 'CONST', 0);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('INDGA', '1 vs 1 ganado', 3, 'DUELO', 1);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('INDPE', '1 vs 1 perdido', 3, 'DUELO', 0);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('DUCAG', 'Duelo de campo ganado', 3, 'DUELO', 1);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('DUCAP', 'Duelo de campo perdido', 3, 'DUELO', 0);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('DUAEG', 'Duelo aéreo ganado', 3, 'DUELO', 1);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('DUAEP', 'Duelo aéreo perdido', 3, 'DUELO', 0);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('PRESI', 'Presión', 4, 'DEFEN', 1);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('BALRE', 'Balón recuperado', 4, 'DEFEN', 1);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('RECBU', 'Rechazo bueno', 4, 'DEFEN', 1);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('RECMA', 'Rechazo malo', 4, 'DEFEN', 0);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('TIRRE', 'Tiro rechazado', 4, 'DEFEN', 1);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('CIERR', 'Cierre', 4, 'DEFEN', 1);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('FALCO', 'Falta cometida', 4, 'DEFEN', 0);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('FALRE', 'Falta recibida', 4, 'DEFEN', 1);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('TARAM', 'Tarjeta amarilla', 4, 'DEFEN', 0);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('TARRO', 'Tarjeta roja', 4, 'DEFEN', 0);
insert into mae_accion(co_accion, no_accion, nid_gruacc, co_gruacc, fl_accpos) values('GOLRE', 'Gol recibido', 4, 'DEFEN', 0);
-- Formación
insert into mae_formacion(co_formac, no_formac) values('FORM1', '4-4-2');
insert into mae_formacion(co_formac, no_formac) values('FORM2', '4-3-3');
insert into mae_formacion(co_formac, no_formac) values('FORM3', '4-5-1');
insert into mae_formacion(co_formac, no_formac) values('FORM4', '3-5-2');
-- Formación - Posición
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(1, 'FORM1', 1, 'ARQUE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(1, 'FORM1', 3, 'CENDE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(1, 'FORM1', 4, 'CENIZ');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(1, 'FORM1', 5, 'LATDE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(1, 'FORM1', 6, 'LATIZ');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(1, 'FORM1', 8, 'VOLMD');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(1, 'FORM1', 9, 'VOLMI');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(1, 'FORM1', 10, 'EXTDE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(1, 'FORM1', 11, 'EXTIZ');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(1, 'FORM1', 13, 'DELDE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(1, 'FORM1', 14, 'DELIZ');

insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(2, 'FORM2', 1, 'ARQUE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(2, 'FORM2', 3, 'CENDE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(2, 'FORM2', 4, 'CENIZ');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(2, 'FORM2', 5, 'LATDE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(2, 'FORM2', 6, 'LATIZ');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(2, 'FORM2', 7, 'VOLME');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(2, 'FORM2', 8, 'VOLMD');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(2, 'FORM2', 9, 'VOLMI');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(2, 'FORM2', 12, 'DELCE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(2, 'FORM2', 13, 'DELDE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(2, 'FORM2', 14, 'DELIZ');

insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(3, 'FORM3', 1, 'ARQUE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(3, 'FORM3', 3, 'CENDE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(3, 'FORM3', 4, 'CENIZ');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(3, 'FORM3', 5, 'LATDE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(3, 'FORM3', 6, 'LATIZ');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(3, 'FORM3', 7, 'VOLME');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(3, 'FORM3', 8, 'VOLMD');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(3, 'FORM3', 9, 'VOLMI');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(3, 'FORM3', 10, 'EXTDE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(3, 'FORM3', 11, 'EXTIZ');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(3, 'FORM3', 12, 'DELCE');

insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(4, 'FORM4', 1, 'ARQUE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(4, 'FORM4', 2, 'CENME');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(4, 'FORM4', 3, 'CENDE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(4, 'FORM4', 4, 'CENIZ');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(4, 'FORM4', 7, 'VOLME');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(4, 'FORM4', 8, 'VOLMD');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(4, 'FORM4', 9, 'VOLMI');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(4, 'FORM4', 10, 'EXTDE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(4, 'FORM4', 11, 'EXTIZ');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(4, 'FORM4', 13, 'DELDE');
insert into mae_formacion_posicion(nid_formac, co_formac, nid_posici, co_posici) values(4, 'FORM4', 14, 'DELIZ');
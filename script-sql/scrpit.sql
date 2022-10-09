--Rodar esse script no sql

create database if not exists db_basico;

use db_basico;

create table tb_veiculos(
	id int not null auto_increment primary key,
    placa varchar(9),
    chassi varchar(50),
    renavam varchar(50),
    modelo varchar(255),
    marca varchar(50),
    ano varchar(255)
);

--Alguns inserts para popular a consulta no banco

insert into tb_veiculos (placa, chassi, renavam, modelo, marca,ano) values ('LAK-5263', '', '83085274243', 'Freelander HSE 2.5 V6 24V 177cv 5p', 'Land Rover', '2003');
insert into tb_veiculos (placa, chassi, renavam, modelo, marca,ano) values ('LEM-6880', '', '26447614456', 'X3 XDRIVE 20i 2.0/X-Line Bi-TB Flex Aut.', 'BMW', '2012');

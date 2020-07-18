drop database if exists wooden-spoon;

create database wooden_spoon;

use wooden_spoon;

drop table if exists posts;

create table posts(
    id int not null auto_increment,
    url varchar(200) not null,
    post varchar(255),
    primary key (id)
);
insert into posts (url, post) values ('pics/russianSpoons/rSpoon2.jpg', 'second post');



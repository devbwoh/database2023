# 권한 설정
grant all privileges on  *.* to 'root'@'%' identified by 'root 패스워드';
delete from mysql.user where host="localhost" and user="root";

# root와 manager 패스워드 다르게 설정할 것
CREATE USER 'manager'@'%' identified by 'manager 패스워드';
grant all privileges on  songdb.* to 'manager'@'%';

flush privileges;
select host,user,plugin,authentication_string from mysql.user;
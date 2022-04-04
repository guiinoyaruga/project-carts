const express = require("express");
const routes = require("./routes")

const app = express();
const port = 3008;

routes(app)

app.listen(port, () => console.log(`Database Online on Port ${port}`));

module.exports = app;

// - modulos importados - //
//npm install express
//npm install bodyparser
//npm install nodemon
//npm install mysql2
//npm install sequelize sequelize-cli path
//npx sequelize-cli init
//npx sequelize-cli model:create --name tabela --attributes // -- cria as tabelas
//npx sequelize-cli db:migrate -- // migra as tabelas do sequelize para o banco de dado
//npx sequelize-cli seed:generate --name  -- // cria um seed de teste
//npx sequelize-cli db:seed:all -- // envia seeds para popular o banco
//npx sequelize db:migrate:undo // volta uma alteração do banco

// show databases;
// use aqui_a_tabela;
// describe nome_da_tabela;
// select * from tabela;
// insert into nome_da_tabela (propriedades) values (atributos)
const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost", // your database server ip or domain name
  user: "root",
  password: "",
  database: "empleados_crud"
});

app.post('/create', (request, response)=>{
  console.log(request);
  const nombre = request.body.nombre
  const edad = request.body.edad
  const pais = request.body.pais
  const cargo = request.body.cargo
  const anios = request.body.anios

  db.query('INSERT INTO empleados(nombre,edad,pais,cargo,anios) VALUES(?,?,?,?,?)', [nombre,edad,pais,cargo,anios],
  (err, result)=>{
    if(err){
      console.log(err);
    }else{
      response.send(result);
    }
  });
});


app.get('/empleados', (request, response)=>{
  console.log(request);
  db.query('SELECT * FROM empleados',
  (err, result)=>{
    if(err){
      console.log(err);
    }else{
      response.send(result);
    }
  });
});

app.put('/update', (request, response)=>{
  console.log(request);
  const id = request.body.id
  const nombre = request.body.nombre
  const edad = request.body.edad
  const pais = request.body.pais
  const cargo = request.body.cargo
  const anios = request.body.anios

  db.query('UPDATE empleados set nombre=?, edad=?, pais=?, cargo=?, anios=? WHERE id=?', [nombre, edad, pais, cargo, anios, id],
  (err, result)=>{
    if(err){
      console.log(err);
    }else{
      response.send(result);
    }
  });
});

app.delete('/delete/:id', (request, response)=>{
  console.log(request.params.id);
  const id = request.params.id

  db.query('DELETE FROM empleados WHERE id=?', [id],
  (err, result)=>{
    if(err){
      console.log(err);
    }else{
      response.send(result);
    }
  });
});

app.listen(3001, ()=>{
  console.log('este puerto esta funcionando');
});
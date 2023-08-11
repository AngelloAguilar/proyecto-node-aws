//Importaciones de paquetes
import mysql from "mysql"
import fetch from 'node-fetch';
import express from'express';
import bodyParser  from'body-parser';



var conexion = mysql.createConnection({
    database: "starwars_db",
    host: "localhost",
    user: "root",
    password: ""
});

// conexion.connect(function(error){

//     if(error){
//         throw error;
//     }
//     else {
//         console.log('Conexion exitosa!');
//     }
// });

const app = express();
ConsumoRegistro();
ExposicionAPI();


function ConsumoRegistro(){
//Consumo API starwars y registro en MySQL
    app.get('/personajes/:id', (req, res) => {
        const userId = req.params.id;
       
      
          fetch('https://swapi.py4e.com/api/people/'+userId)
          .then((respuesta) => {
              return respuesta.json();
          }).then((resp) => {
            //Se inserta en bd la informacion de la API
            var sqlquery = "INSERT INTO personajes VALUES (null,'" + resp.name + "'," + resp.height + "," + resp.mass + ",'" +
            resp.hair_color + "','" + resp.skin_color + "','" + resp.eye_color + "','" + resp.birth_year + "','" + resp.gender + "','" + resp.homeworld + "')";
      
            conexion.query(sqlquery, function (error, filas) {
      
                    if (error)
                        throw error;
                    console.log("Registro agregado!", filas);
                });

        });
      
        res.send("Registro agregado");
      });
      
      app.listen(3001, () => {
        console.log('Servidor en funcionamiento en http://localhost:3001/');
      });


}


function ExposicionAPI(){
//Exposicion API
app.use(bodyParser.json());

    /* Definir una ruta GET */
app.get('/consultaPersonajes', (req, res) => {
  
   // Consulta y exposicion
    conexion.query("select * from personajes", function(error,filas){

            if (error) 
            throw error;

            console.log(filas);
            res.json(filas);
    });
    
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('Servidor en funcionamiento en http://localhost:3000/');
});

}



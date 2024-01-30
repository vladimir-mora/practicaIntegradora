const moongose = require("mongoose");

const uri = "mongodb://localhost:27017/coderest";
moongose
  .connect(uri)
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log("Error en la conexion",error))

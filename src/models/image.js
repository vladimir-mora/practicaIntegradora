const moogose = require("mongoose");

const imagenSchema = new moogose.Schema({
    title: String,
    description: String,
    filename: String,
    path: String
});

const ImagenModel = moogose.model("imagenes", imagenSchema);

module.exports = ImagenModel;
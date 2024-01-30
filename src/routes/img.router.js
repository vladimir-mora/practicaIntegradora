const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");

const imagenModel = require("../models/image.js");

// routes
// ruta raiz
router.get("/", async (req, res) => {

    const imagenes = await imagenModel.find();
    const nuevoArray = imagenes.map((imagen) => {
      return {
        id: imagen._id,
        title: imagen.title,
        description: imagen.description,
        filename: imagen.filename,
        patch: imagen.path,
      };
    });
    res.render("index", { imagenes: nuevoArray });
});

// ruta formulario para ingresar imagenes
router.get("/upload", (req, res) => {
  res.render("upload");
});

router.post("/upload", async (req, res) => {
  const imagen = new imagenModel();
  imagen.title = req.body.title;
  imagen.description = req.body.description;
  imagen.filename = req.file.filename;
  imagen.path = "/img/" + req.file.filename;

  await imagen.save();

  res.redirect("/");
});

router.get("/image/:id/delete", async (req, res) => {
  const { id } = req.params;
  //   borramos de la base de datos
  const imagen = await imagenModel.findByIdAndDelete(id);
  //   borro la imagen de la carpeta
  await fs.unlink(path.resolve("./src/public" + imagen.path));
  res.redirect("/");
});

module.exports = router;

//Ruta para manejar la subida de arcivos a la base de datos con multer

const express = require('express');

const router = express.Router();

const multer = require('multer');

const path = require('path'); //para reconocer la extension del archivo(png o jpg)

//metodo de multer para guardar archivos en un directorio y para nombrarlos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //guarda las imagenes en la carpeta uploads
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    //nombra a las imagenes
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

//funcion para validar el tipo de imagen
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    //si pasa ambas validaciones
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

//pasamos el middleware a la ruta
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

//creando la ruta o end point
router.post('/upload', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path}`);
});

module.exports = router;

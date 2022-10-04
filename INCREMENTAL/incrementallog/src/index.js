const express = require("express");
var cors = require("cors");
const app = express();
const corsOptions = {
  origin: process.env.APP_URL,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const logger = require("./logger");
//se ejecuta cada vez que recibe una solicitud. nota: Si se carga después de la ruta a la vía de acceso raíz, la solicitud nunca funcionara
app.use(function (req, res, next) {
  logger.addNewLine(req.body.level, req.body.message, req.body.optinalParam);
  //next();
});
app.listen(process.env.PORT_LISTENER, () => {
  console.log("API up and running");
});

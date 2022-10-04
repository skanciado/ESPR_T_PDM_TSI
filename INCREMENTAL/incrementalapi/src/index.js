//https://www.arangodb.com/docs/stable/data-modeling-documents-document-methods.html
// NOTA: ORDENAR RUTAS ALFABETICAMENTE
const express = require("express");
var cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
// Routes general
const routesHelp = require("./routes/routesHelp");
const routesGeneral = require("./routes/routesGeneral");
// Routes by UserCase
const routesCaseObjectTypes = require("./userCases/objectTypesCase");
const routesTokensStatus = require("./userCases/tokensStatusCase");
const routesCaseUsers = require("./userCases/usersCase");
const routesCaseRoles = require("./userCases/rolesCase");
// Routes by Tables
const routesCaches = require("./routes/routesCaches");
const routesGroups = require("./routes/routesGroups");
const routesObjectTypes = require("./routes/routesObjectTypes");
const routesParentObjects = require("./routes/routesParentObjects");
const routesRoles = require("./routes/routesRoles");
//config CORS
const corsOptions = {
  origin: process.env.APP_URL,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//se ejecuta cada vez que recibe una solicitud. nota: Si se carga después de la ruta a la vía de acceso raíz, la solicitud nunca funcionara
/* app.use(function (req, res, next) {
	console.log('Time:', Date.now());
	next();
});
 */
app.use(cookieParser(process.env.COOKIE_SECRET));
// Routes general
app.use("/help", routesHelp);
app.use("/aql", routesGeneral);
// Routes by UserCase
app.use("/objectTypesCase", routesCaseObjectTypes);
app.use("/tokensStatusCase", routesTokensStatus);
app.use("/usersCase", routesCaseUsers);
app.use("/rolesCase", routesCaseRoles);
// Routes by Tables
app.use("/caches", routesCaches);
app.use("/groups", routesGroups);
app.use("/objectTypes", routesObjectTypes);
app.use("/parentObjects", routesParentObjects);
app.use("/roles", routesRoles);
app.listen(process.env.PORT_LISTENER, () => {
  console.log("API up and running");
});

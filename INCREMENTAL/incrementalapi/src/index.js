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
const routesCaseGroups = require("./userCases/groupsCase");
//const routesCaseLifeCycle = require("./userCases/lifeCycleCase");
const routesCaseObjectTypes = require("./userCases/objectTypesCase");
const routesCaseLifecycles = require("./userCases/lifeCyclesCase");
const routesCaseWorkflows = require("./userCases/workflowCase");
const routesTokensStatus = require("./userCases/tokensStatusCase");
const routesCaseUsers = require("./userCases/usersCase");
const routesCaseRoles = require("./userCases/rolesCase");
// Routes by Tables
const routesCaches = require("./routes/routesCaches");
const routesCurrentLifecycle = require("./routes/routesCurrentLifecycle");
const routesCurrentWorkflow = require("./routes/routesCurrentWorkflow");
const routesDocuments = require("./routes/routesDocuments");
const routesFolders = require("./routes/routesFolders");
const routesWorkflows = require("./routes/routesWorkflows");
const routesGroups = require("./routes/routesGroups");
const routesLifecycle = require("./routes/routesLifecycle");
const routesObjectTypes = require("./routes/routesObjectTypes");
const routesObjToLifecycle = require("./routes/routesObjToLifecycle");
const routesObjToWorkflow = require("./routes/routesObjToWorkflow");
const routesParentObjects = require("./routes/routesParentObjects");
const routesPolicies = require("./routes/routesPolicies");
const routesProjects = require("./routes/routesProjects");
const routesRoles = require("./routes/routesRoles");
const routesStatus = require("./routes/routesStatus");
const routesTasks = require("./routes/routesTasks");
const routesUsers = require("./routes/routesUsers");
//config CORS
const corsOptions = {
  origin: process.env.APP_URL,
  credentials: true,
  allowedHeaders: ["Content-Type"],
};
// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//se ejecuta cada vez que recibe una solicitud. nota: Si se carga después de la ruta a la vía de acceso raíz, la solicitud nunca funcionara
app.use(function (req, res, next) {
  console.log("Time:", Date.now());
  next();
});

app.use(cookieParser(process.env.COOKIE_SECRET));
// Routes general
app.use("/help", routesHelp);
app.use("/aql", routesGeneral);
app.use("/generalCase", routesGeneral);
// Routes by UserCase
app.use("/groupsCase", routesCaseGroups);
//app.use("/lifeCycleCase", routesCaseLifeCycle);
app.use("/objectTypesCase", routesCaseObjectTypes);
app.use("/lifeCyclesCase", routesCaseLifecycles);
app.use("/workflowsCase", routesCaseWorkflows);
app.use("/objToLifecycle", routesObjToLifecycle);
app.use("/objToWorkflow", routesObjToWorkflow);
app.use("/tokensStatusCase", routesTokensStatus);
app.use("/usersCase", routesCaseUsers);
app.use("/rolesCase", routesCaseRoles);
// Routes by Tables
app.use("/caches", routesCaches);
app.use("/currentlifecycle", routesCurrentLifecycle);
app.use("/currentworkflow", routesCurrentWorkflow);
app.use("/documents", routesDocuments);
app.use("/folders", routesFolders);
app.use("/workflows", routesWorkflows);
app.use("/groups", routesGroups);
app.use("/lifecycles", routesLifecycle);
app.use("/objectTypes", routesObjectTypes);
app.use("/parentObjects", routesParentObjects);
app.use("/policies", routesPolicies);
app.use("/projects", routesProjects);
app.use("/roles", routesRoles);
app.use("/status", routesStatus);
app.use("/tasks", routesTasks);
app.use("/users", routesUsers);
app.listen(process.env.PORT_LISTENER, () => {
  console.log(`Port Listener in ${process.env.PORT_LISTENER}`);
  console.log(`APP_URL=${process.env.APP_URL}`);
  console.log(`DB_URL=${process.env.DB_URL}`);
  console.log(`DB_NAME=${process.env.DB_NAME}`);
  console.log(`DB_USER=${process.env.DB_USER}`);
  console.log(`DB_PASS=${process.env.DB_PASS}`);
  console.log(`OBJTYPE_BASEOBJECT_UID=${process.env.OBJTYPE_BASEOBJECT_UID}`);
});

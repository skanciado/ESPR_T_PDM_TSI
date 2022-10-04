const router = require("express").Router();
const bcrypt = require("bcryptjs");
const userService = require("../services/usersQueries");
const {createError, createErrorWithCode} = require("../utils/error");
const {loginValidation} = require("../validation/user");
const {createTokenAndCookie, unregisterToken, verifyToken} = require("../utils/tokensAndCookies");
const generalQueries = require("../services/generalQueriesArangoDb");
const {saveLogMessage} = require("../services/log");
router.post("/createUser", async (req, res) => {
  try {
    const userData = req.body;
    // check user is already registered
    const emailExist = await generalQueries.find("Users", {email: userData.email});
    if (emailExist._result.length === 0) {
      return res.status(process.env.CODE_API).send(createErrorWithCode(896, "_API_emailNotExist"));
    }
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(userData.password, salt);
    userData.password = hashPassword;
    userData.isAdmin = false;
    userData.enableUser = true;
    const created = await userService.createUser(userData);
    return res.send(created);
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
    }
    saveLogMessage("error", JSON.stringify(e));
    return res.status(process.env.CODE_API).json(e);
  }
});
router.post("/updatePasswordUser", async (req, res) => {
  try {
    const userData = req.body;
    const salt = await bcrypt.genSalt(10);
    const userFind = await generalQueries.find("Users", {email: userData.email});
    if (userFind._result.length === 0) {
      return res.status(process.env.CODE_API).json(createErrorWithCode(895, "_API_userNotMatch"));
    }
    const checkPassword = await bcrypt.compare(userData.oldPassword, userFind._result[0].password);
    if (userFind._result.length > 0 && checkPassword) {
      const newPasswordHash = await bcrypt.hash(userData.password, salt);
      const userUpdated = await generalQueries.update("Users", {email: userData.email, password: userFind._result.password}, {password: newPasswordHash});
      return res.send(userUpdated);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(897, "_API_invalidPassword"));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
    }
    saveLogMessage("error", JSON.stringify(e));
    return res.status(process.env.CODE_API).json(e);
  }
});
router.post("/loginUser", async (req, res) => {
  try {
    //saveLogMessage("info", "prueba");
    //saveLogMessage("debug", "prueba2");
    const {error} = loginValidation(req.body);
    if (error) return res.status(process.env.CODE_API).json(createErrorWithCode(898, error.details[0].message));
    //si el usuario existe
    //const userDat = await findUserCase(req.body.email);
    let userData = await generalQueries.find("Users", {email: req.body.email});
    if (userData._result.length === 0) {
      return res.status(process.env.CODE_API).json(createErrorWithCode(896, "_API_emailNotExist"));
    }
    //si el password es correcto
    const validPass = await bcrypt.compare(req.body.password, userData._result[0].password);
    if (!validPass) return res.status(process.env.CODE_API).json(createErrorWithCode(897, "_API_invalidPassword"));
    //elimina el password de la salida de datos
    userData._result[0].password = undefined;
    const payload = {
      sub: userData._result[0]._key,
      iat: Date.now(),
      email: userData._result[0].email,
    };
    const result = await createTokenAndCookie(payload, req, res);
    if (result["error"] === true) {
      return res.status(process.env.CODE_API).json(result);
    }
    res.send(userData._result[0]);
  } catch (e) {
    if (e["code"] === undefined) {
      //error producido por la funcion, NO por una consulta a bds
      e = createError(e.message);
    }
    saveLogMessage("error", JSON.stringify(e));
    return res.status(process.env.CODE_API).json(e);
  }
});
router.post("/logoutUser", async (req, res) => {
  try {
    const result = await unregisterToken(req.body.email);
    if (result["error"] === true) {
      return res.status(process.env.CODE_API).json(result);
    }
    res.status(202);
    res.clearCookie("incremental").send();
  } catch (e) {
    if (e["code"] === undefined) {
      //error producido por la funcion, NO por una consulta a bds
      e = createError(e.message);
    }
    saveLogMessage("error", JSON.stringify(e));
    return res.status(process.env.CODE_API).json(e);
  }
});
router.get("/getLogedUser", async (req, res) => {
  try {
    //la cookie sale descodificada porque el secreto se lo hemos pasado en el cookieParser
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      let userData = await generalQueries.find("Users", {email: decrypt.payload.email});
      if (emailExist._result.length === 0) {
        return res.status(process.env.CODE_API).send(createErrorWithCode(896, "_API_emailNotExist"));
      }
      userData._result[0].password = undefined;
      return res.send(userData._result[0]);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
    }
    saveLogMessage("error", JSON.stringify(e));
    return res.status(process.env.CODE_API).json(e);
  }
});
async function findUserCase(email) {
  try {
    const user = await generalQueries.query(`
          FOR u IN Users
          FILTER u.email == '${email}'
          LET roles = (
            FOR r IN Roles 
            FILTER r._id IN u.roles
            RETURN r
          ) 
          LET groups = (
            FOR g IN Groups 
            FILTER g._id IN u.groups
            RETURN g
          ) 
          RETURN {_id: u._id, id: u.id, name: u.name, password: u.password, email: u.email, isAdmin: u.isAdmin, enableUser: u.enableUser, roles: roles, groups: groups}
      `);
    return user;
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return e;
  }
}
module.exports = router;

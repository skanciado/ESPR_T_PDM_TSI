const router = require("express").Router();
const {createError, createErrorWithCode} = require("../utils/error");
const {createTokenAndCookie, verifyToken} = require("../utils/tokensAndCookies");
const generalQueries = require("../services/generalQueriesArangoDb");
router.get("/refreshToken", async (req, res) => {
  try {
    //la cookie sale descodificada porque el secreto se lo hemos pasado en el cookieParser
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      //si el usuario esta loginado el token estara en la lista de tokens
      let tokenData = await generalQueries.find("TokensStatus", {email: decrypt.payload.email});
      const token = req.signedCookies.incremental;
      if (tokenData._result.length > 0 && tokenData._result[0].token === token) {
        const payload = {
          sub: decrypt._key,
          iat: Date.now(),
          email: decrypt.payload.email,
        };
        const result = await createTokenAndCookie(payload, req, res);
        if (result["error"] === true) {
          return res.status(process.env.CODE_API).json(result);
        }
        const userData = await generalQueries.find("Users", {email: decrypt.payload.email});
        delete userData._result[0].password;
        return res.send(userData._result[0]);
      } else {
        return res.status(process.env.CODE_API).json(createErrorWithCode(899, "_API_tokenNotMatch"));
      }
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
module.exports = router;

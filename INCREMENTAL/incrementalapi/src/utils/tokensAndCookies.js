const jwt = require("jsonwebtoken");
const {promisify} = require("util");
const {createError} = require("./error");
const generalQueries = require("../services/generalQueriesArangoDb");
const {saveLogMessage} = require("../services/log");
async function createTokenAndCookie(payload, req, res) {
  try {
    const token = signToken(payload);
    const dateExpireToken = createCookie(token, req, res);
    const result = await registerToken(payload.email, dateExpireToken, token);
    return result;
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return e;
  }
}
function signToken(payload) {
  const jwt = require("jsonwebtoken");
  return jwt.sign({payload}, process.env.TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN * 60000,
  });
}
function createCookie(token, req, res) {
  let dateExpire = new Date();
  dateExpire.setTime(dateExpire.getTime() + process.env.COOKIE_EXPIRES_IN * 60000);
  res.cookie("incremental", token, {
    expires: dateExpire,
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "http",
    signed: true,
    sameSite: "strict",
    session: true,
    overwrite: true,
  });
  return dateExpire;
}
async function registerToken(email, dateExpireToken, token) {
  try {
    const regToken = {
      email: email,
      dateExpireToken: dateExpireToken,
      token: token,
    };
    let createdTokensStatus = await generalQueries.replace("TokensStatus", {email: email}, regToken);
    if (createdTokensStatus.replaced === 0) {
      createdTokensStatus = await generalQueries.create("TokensStatus", regToken);
    }
    return createdTokensStatus;
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return e;
  }
}
async function unregisterToken(email) {
  try {
    const unregToken = {
      email: email,
    };
    const createdTokensStatus = await generalQueries.remove("TokensStatus", unregToken);
    return createdTokensStatus;
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return e;
  }
}
async function verifyToken(req, res) {
  if (req.signedCookies.incremental !== undefined) {
    const token = req.signedCookies.incremental;
    try {
      const decrypt = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);
      return decrypt;
    } catch (e) {
      return "Token expired";
    }
  } else {
    return "Cookie expired";
  }
}
module.exports.createTokenAndCookie = createTokenAndCookie;
module.exports.unregisterToken = unregisterToken;
module.exports.verifyToken = verifyToken;

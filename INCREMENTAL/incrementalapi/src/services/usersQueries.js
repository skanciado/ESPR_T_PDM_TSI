const DB = require("../config/db");
var collection = DB.collection("Users");
const {createSimpleErrorPromise, createErrorPromise} = require("../utils/error");
const {registerValidation} = require("../validation/user");
exports.createUser = (user) => {
  const {error} = registerValidation(user);
  if (error) return createErrorPromise(error.details[0].message);
  return collection.save(user).catch((e) => {
    return createSimpleErrorPromise(e.response.body);
  });
};

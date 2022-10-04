//code = -1 (serian errores de codigo o servidorBds/api)
//code = num (serian errores personalizados por progrmador)
//Funcion errores personalizados
const createErrorWithCode = (code, message) => {
  return {code: code, error: true, message: message};
};
//Funcion errores de programacion
const createError = (message) => {
  return createErrorWithCode(-1, message);
};
//Funcion errores del servidor de base de datos
const createErrorPromise = (error) => {
  return new Promise((resolve, reject) => {
    if (error["response"] !== undefined) {
      reject({code: -1, codeServer: error.response.body.code, error: true, message: error.response.body.errorMessage, errorNum: error.response.body.errorNum});
    } else {
      reject({code: -1, codeServer: error.code, error: true, message: error.message, errorNum: error.errno});
    }
  });
};
//Funcion errores personalizados del servidor de base de datos
const createSimpleErrorPromise = (error) => {
  return new Promise((resolve, reject) => {
    reject(error);
  });
};
module.exports.createError = createError;
module.exports.createErrorWithCode = createErrorWithCode;
module.exports.createErrorPromise = createErrorPromise;
module.exports.createSimpleErrorPromise = createSimpleErrorPromise;

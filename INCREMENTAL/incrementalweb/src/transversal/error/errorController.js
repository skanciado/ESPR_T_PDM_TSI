import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import i18n from "../language/i18n";
import resources from "../language/translations";
import log from "loglevel";
const colors = {
  red: `\u001b[1;31m`,
  green: `\u001b[1;32m`,
  yellow: `\u001b[1;33m`,
  blue: `\u001b[1;34m`,
  purple: `\u001b[1;35m`,
  cyan: `\u001b[1;36m`,
};
export function errorController(nameFunction, error, callstack, isToastError = true) {
  let errView = undefined;
  consoleError("ERROR", nameFunction, error, callstack);
  if (isToastError === true) {
    const isCanSee = canSee(nameFunction, error);
    if (isCanSee === true) {
      if (error?.code === undefined) {
        //error de codigo del frontEnd
        errView = {message: error};
      } else {
        if (error.code !== -1) {
          errView = {message: findMessage(error)};
        }
        //error de la api (si code es = -1 es un error de fallo de programacion o de la bds. si code es != -1 es un error personalizado)
        errView = {message: nameFunction + " " + error.code + " " + error.codeServer + " " + error.message + " " + error?.errorNum};
      }
      toast.error(errView.message);
    }
  }
  return errView;
}
function canSee(nameFunction, error) {
  if (nameFunction === "refreshToken") {
    return false;
  }
  if (nameFunction === "ErrorBoundary") {
    return false;
  }
  return true;
}
export function consoleError(typeError, nameFunction, error, callstack = "") {
  const date = new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
  log.setLevel(log.levels.TRACE);
  if (typeError.toUpperCase() === "ERROR") {
    log.info(colors.red, date + " [ERROR] " + nameFunction + ": " + JSON.stringify(error) + " " + callstack);
  }
  const level = process.env.REACT_APP_CONSOLE_LOG_VISUALIZE_LEVEL;
  if (level.toUpperCase() === "TRACE" || level.toUpperCase().includes(typeError.toUpperCase()) === true) {
    if (typeError.toUpperCase() === "DEBUG") {
      log.info(colors.yellow, date + " [DEBUG] " + nameFunction + ": " + JSON.stringify(error) + " " + callstack);
    }
    if (typeError.toUpperCase() === "INFO") {
      log.info(colors.green, date + " [INFO] " + nameFunction + ": " + JSON.stringify(error) + " " + callstack);
    }
    if (typeError.toUpperCase() === "WARN") {
      log.info(colors.red, date + " [WARN] " + nameFunction + ": " + JSON.stringify(error) + " " + callstack);
    }
  }
  /*log.trace(colors.purple, date + " [TRACE] " + JSON.stringify(error));
  log.debug(colors.yellow, date + " [DEBUG] " + JSON.stringify(error));
  log.info(colors.green, date + " [INFO] " + JSON.stringify(error));
  log.warn(colors.red, date + " [WARN] " + JSON.stringify(error));
  log.error(colors.red, date + " [ERROR] " + JSON.stringify(error));*/
  return undefined;
}
function findMessage(error) {
  const lang = i18n.language;
  let translation = undefined;
  switch (error.code) {
    case "900":
      translation = resources[lang].translation["_API_cookieAndTokenExpired"];
      break;
    case "899":
      translation = resources[lang].translation["_API_tokenNotMatch"];
      break;
    case "897":
      translation = resources[lang].translation["_API_invalidPassword"];
      break;
    case "896":
      translation = resources[lang].translation["_API_emailNotExist"];
      break;
    case "895":
      translation = resources[lang].translation["_API_userNotMatch"];
      break;
    default:
      translation = error.message;
  }
  return translation;
}
export function errorMessage(nameFunction, element, isToastError = true) {
  let errView = undefined;
  try {
    if (element?.response?.data?.message !== undefined) {
      //error de api
      errView = errorController(nameFunction, element.response.data.message, "", isToastError);
    } else {
      if (element.message !== undefined) {
        //error catch web front-end
        errView = errorController(nameFunction, element.message, element.stack, isToastError);
      } else {
        //error personalizado
        errView = errorController(nameFunction, element, "", isToastError);
      }
    }
  } catch (e) {
    if (e?.response?.data?.message === undefined) {
      //nunca tendria que pasar por aqui el error seria en esta funcion NO en la api
      errView = errorController(nameFunction, e.message, e.stack, isToastError);
    }
  }
  return errView;
}

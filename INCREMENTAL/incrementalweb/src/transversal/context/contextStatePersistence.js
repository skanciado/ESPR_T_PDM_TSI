const cryptoJS = require("crypto-js");
export default function persistenceContext(store) {
  const originUrl = window.location.origin;
  const navigation = performance.getEntriesByType("navigation")[0];
  if (navigation.name !== originUrl && navigation.name !== originUrl + "/") {
    //PERSISTING DATA TO REFRESH NAVIGATOR (nota: hasta que no se ejecuta otro tipo de navegacion no cambia el type)
    if (store.user === undefined) {
      if (navigation.name.endsWith("/login") === true) {
        let iPageTabID = sessionStorage.getItem("tabIdIncremental");
        if (iPageTabID === null) {
          iPageTabID = Date.now().toString();
          sessionStorage.setItem("tabIdIncremental", iPageTabID);
        }
      } else {
        const iPageTabID = sessionStorage.getItem("tabIdIncremental");
        const stateStr = localStorage.getItem("Incremental_" + iPageTabID);
        //DESENCRIPTAR
        const bytes = cryptoJS.AES.decrypt(stateStr, process.env.REACT_APP_TOKEN_SECRET);
        const decrypted = bytes.toString(cryptoJS.enc.Utf8);
        const state = JSON.parse(decrypted);
        Object.keys(state).forEach((key) => {
          store[key] = state[key];
        });
        //update stateReducer values
        return true;
      }
    } else {
      let iPageTabID = sessionStorage.getItem("tabIdIncremental");
      if (iPageTabID !== null) {
        let tempStore = JSON.parse(JSON.stringify(store));
        Object.entries(store).forEach(([key]) => {
          if (key.endsWith("Dispatch") === true) {
            delete tempStore[key];
          }
        });
        //ENCRIPTAR
        const encrypted = cryptoJS.AES.encrypt(JSON.stringify(tempStore), process.env.REACT_APP_TOKEN_SECRET).toString();
        localStorage.setItem("Incremental_" + iPageTabID, encrypted);
      }
    }
  }
  return false;
}
export function persistenceContextDelete() {
  //este forEach borraria los datos de otras sesiones de incremental que esten abiertas
  const localStorageKeys = Object.keys(localStorage);
  localStorageKeys.forEach((key) => {
    if (key.startsWith("Incremental_") === true) {
      localStorage.removeItem(key);
    }
  });
}

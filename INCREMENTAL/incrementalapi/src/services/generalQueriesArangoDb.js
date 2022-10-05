const DB = require("../config/db");
const { createErrorPromise, createErrorWithCode } = require("../utils/error");
exports.create = (table, data) => {
  const collection = DB.collection(table);
  return collection.save(data).catch((e) => {
    return createErrorPromise(e);
  });
};
exports.createEdge = (table, data, fromItem, toItem) => {
  const collection = DB.edgeCollection(table);
  return collection.save(data, fromItem, toItem).catch((e) => {
    return createErrorPromise(e);
  });
};
exports.update = (table, filter, data) => {
  const collection = DB.collection(table);
  return collection.updateByExample(filter, data).catch((e) => {
    return createErrorPromise(e);
  });
};
exports.updateEdge = (table, filter, data) => {
  const collection = DB.edgeCollection(table);
  return collection.updateByExample(filter, data).catch((e) => {
    return createErrorPromise(e);
  });
};
exports.remove = (table, filter) => {
  const collection = DB.collection(table);
  return collection.removeByExample(filter).catch((e) => {
    return createErrorPromise(e);
  });
};
exports.removeEdge = (table, filter) => {
  const collection = DB.edgeCollection(table);
  return collection.removeByExample(filter).catch((e) => {
    return createErrorPromise(e);
  });
};
exports.find = (table, filter) => {
  const collection = DB.collection(table);
  return collection.byExample(filter).catch((e) => {
    return createErrorPromise(e);
  });
};
exports.findEdge = (table, filter) => {
  const collection = DB.edgeCollection(table);
  return collection.byExample(filter).catch((e) => {
    return createErrorPromise(e);
  });
};
exports.findAll = (table) => {
  console.info("useDatabase" + process.env.DB_NAME);
  DB.useDatabase(process.env.DB_NAME);
  console.info("Login" + process.env.DB_USER + " " + process.env.DB_PASSWORD);
  DB.login(process.env.DB_USER, process.env.DB_PASS);
  const collection = DB.collection(table);
  return collection.all().catch((e) => {
    return createErrorPromise(e);
  });
};
exports.findAllEdge = (table) => {
  const collection = DB.edgeCollection(table);
  return collection.all().catch((e) => {
    return createErrorPromise(e);
  });
};
exports.replace = (table, filter, data) => {
  const collection = DB.collection(table);
  return collection.replaceByExample(filter, data).catch((e) => {
    return createErrorPromise(e);
  });
};
exports.replaceEdge = (table, filter, data) => {
  const collection = DB.edgeCollection(table);
  return collection.replaceByExample(filter, data).catch((e) => {
    return createErrorPromise(e);
  });
};
exports.query = (aql) => {
  return DB.query(aql).catch((e) => {
    return createErrorPromise(e);
  });
};

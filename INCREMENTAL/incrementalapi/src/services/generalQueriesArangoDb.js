const DB = require("../config/db");
const {createErrorPromise, createErrorWithCode} = require("../utils/error");

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
exports.remove = (table, filter) => {
  const collection = DB.collection(table);
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
  const collection = DB.collection(table);
  return collection.all().catch((e) => {
    return createErrorPromise(e);
  });
  0;
};
exports.replace = (table, filter, data) => {
  const collection = DB.collection(table);
  return collection.replaceByExample(filter, data).catch((e) => {
    return createErrorPromise(e);
  });
};
exports.query = (aql) => {
  return DB.query(aql).catch((e) => {
    return createErrorPromise(e);
  });
};

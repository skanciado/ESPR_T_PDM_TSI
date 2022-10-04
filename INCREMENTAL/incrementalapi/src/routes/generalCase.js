const router = require("express").Router();
const generalQueries = require("../services/generalQueriesArangoDb");
const {createError, createErrorWithCode} = require("../utils/error");
const {verifyToken} = require("../utils/tokensAndCookies");
const {saveLogMessage} = require("../services/log");
async function query(req, res) {
  try {
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      let data = req.body.query;
      data = await generalQueries.query(data);
      return res.send(data);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
}
async function create(req, res, table) {
  try {
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      let data = req.body.data;
      Object.keys(data).map((key) => {
        if (data[key] === undefined) {
          delete data[key];
        }
      });
      data = await generalQueries.create(table, data);
      return res.send(data);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
}
async function find(req, res, table) {
  try {
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      let data;
      let filter = req.body.filter;
      Object.keys(filter).map((key) => {
        if (filter[key] === undefined) {
          delete filter[key];
        }
      });
      data = await generalQueries.find(table, filter);
      return res.send(data);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
}
async function findAll(req, res, table) {
  try {
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      let data;
      data = await generalQueries.findAll(table);
      return res.send(data);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
}
async function update(req, res, table) {
  try {
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      let data = req.body.data;
      let filter = req.body.filter;
      Object.keys(filter).map((key) => {
        if (filter[key] === undefined) {
          delete filter[key];
        }
      });
      Object.keys(data).map((key) => {
        if (data[key] === undefined) {
          delete data[key];
        }
      });
      data = await generalQueries.update(table, filter, data);
      return res.send(data);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
}
async function remove(req, res, table) {
  try {
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      let data;
      let filter = req.body.filter;
      Object.keys(filter).map((key) => {
        if (filter[key] === undefined) {
          delete filter[key];
        }
      });
      data = await generalQueries.remove(table, filter);
      return res.send(data);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
}
async function createJson(req, res, table) {
  try {
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      let data = req.body.data;
      data = await generalQueries.create(table, data);
      return res.send(data);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
}
async function findJson(req, res, table) {
  try {
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      let data;
      let filter = req.body.filter;
      data = await generalQueries.find(table, filter);
      return res.send(data);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
}
async function updateJson(req, res, table) {
  try {
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      let data = req.body.data;
      let filter = req.body.filter;
      data = await generalQueries.update(table, filter, data);
      return res.send(data);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
}
async function removeJson(req, res, table) {
  try {
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      let data;
      let filter = req.body.filter;
      data = await generalQueries.remove(table, filter);
      return res.send(data);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
}
async function replaceJson(req, res, table) {
  try {
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      let data = req.body.data;
      let filter = req.body.filter;
      data = await generalQueries.replace(table, filter, data);
      return res.send(data);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
}
async function findEdge(req, res, table) {
  try {
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      let data;
      let filter = req.body.filter;
      Object.keys(filter).map((key) => {
        if (filter[key] === undefined) {
          delete filter[key];
        }
      });
      data = await generalQueries.findEdge(table, filter);
      return res.send(data);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
}
async function updateEdge(req, res, table) {
  try {
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      let data = req.body.data;
      let filter = req.body.filter;
      Object.keys(filter).map((key) => {
        if (filter[key] === undefined) {
          delete filter[key];
        }
      });
      Object.keys(data).map((key) => {
        if (data[key] === undefined) {
          delete data[key];
        }
      });
      data = await generalQueries.updateEdge(table, filter, data);
      return res.send(data);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
}
async function createEdge(req, res, table) {
  try {
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      let data = req.body.data;
      Object.keys(data).map((key) => {
        if (data[key] === undefined) {
          delete data[key];
        }
      });
      data = await generalQueries.createEdge(table, data);
      return res.send(data);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
}
async function removeEdge(req, res, table) {
  try {
    const decrypt = await verifyToken(req, res);
    if (decrypt.payload !== undefined) {
      let data;
      let filter = req.body.filter;
      Object.keys(filter).map((key) => {
        if (filter[key] === undefined) {
          delete filter[key];
        }
      });
      data = await generalQueries.removeEdge(table, filter);
      return res.send(data);
    } else {
      return res.status(process.env.CODE_API).json(createErrorWithCode(900, decrypt));
    }
  } catch (e) {
    if (e["code"] === undefined) {
      e = createError(e.message);
      saveLogMessage("error", JSON.stringify(e));
    }
    return res.status(process.env.CODE_API).json(e);
  }
}
module.exports.query = query;
module.exports.create = create;
module.exports.find = find;
module.exports.findAll = findAll;
module.exports.update = update;
module.exports.remove = remove;
module.exports.createJson = createJson;
module.exports.findJson = findJson;
module.exports.replaceJson = replaceJson;
module.exports.updateJson = updateJson;
module.exports.removeJson = removeJson;
module.exports.findEdge = findEdge;
module.exports.updateEdge = updateEdge;
module.exports.createEdge = createEdge;
module.exports.removeEdge = removeEdge;

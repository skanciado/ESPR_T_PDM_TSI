const {createLogger, addColors, format, transports} = require("winston");
const util = require("util");
const {timestamp, printf} = format;
require("dotenv").config();
const myFormat = printf(({level, message, timestamp, durationMs}) => {
  let sPadLevel = (level.toUpperCase() + ":").padStart(7);
  let sActualDuration = typeof durationMs !== "undefined" ? durationMs + "ms" : "";
  return `${timestamp} ${sPadLevel} ${message} ${sActualDuration}`;
});
const myFormatConsole = printf(({level, message, timestamp, durationMs}) => {
  let sPadLevel = (level.toUpperCase() + ":").padStart(7);
  let sActualDuration = typeof durationMs !== "undefined" ? durationMs + "ms" : "";
  return format.colorize().colorize(
    level,
    `${timestamp} ${sPadLevel} ${util.inspect(message + sActualDuration, {
      depth: 2,
      compact: true,
    })}`
  );
});
const myCustomLevels = {
  levels: {
    system: 0,
    error: 1,
    warn: 2,
    timer: 3,
    info: 4,
    http: 5,
    debug: 6,
    off: 7,
  },
  colors: {
    system: "white",
    error: "red",
    warn: "yellow",
    timer: "cyan",
    info: "green",
    http: "magenta",
    debug: "blue",
    none: "grey",
  },
};
const transport = new transports.File({
  filename: process.env.LOG_DIRNAME + process.env.LOG_FILENAME.replace(".log", JSON.stringify(new Date().getTime()) + ".log"),
  maxSize: process.env.LOG_MAXSIZE,
  maxFiles: process.env.LOG_MAXFILES,
  zippedArchive: false,
});
//format: format.simple()
const logger = createLogger({
  levels: myCustomLevels.levels,
  format: format.combine(timestamp(/*{ format: 'DD-MM-YYYY HH:mm:ss ' }*/), format.splat(), myFormat),
  transports: [transport],
});
const console = new transports.Console({
  colorize: process.env.COLORIZE_LEVELS,
  level: process.env.LOG_VISUALIZE_LEVEL,
  levels: myCustomLevels.levels,
  format: format.combine(timestamp(/*{ format: 'DD-MM-YYYY HH:mm:ss ' }*/), format.prettyPrint(), format.splat(), format.simple(), myFormatConsole),
});
logger.add(console);
addColors(myCustomLevels.colors);
exports.addNewLine = function addNewLine(sLevel, sLogEntry, optionalParams = undefined) {
  if (process.env.LOG_NOT_SAVE_LEVELS.includes(sLevel) === false) {
    logger.log({level: sLevel, message: sLogEntry, optionalParams});
  }
};
exports.initTimer = function createTimer() {
  let oTimer = logger.startTimer();
  return oTimer;
};
exports.endTimer = function endTimer(oTimer, sHeader) {
  if (oTimer !== undefined) {
    oTimer.done({message: `${sHeader} -- Elapsed time: `, level: "timer"});
  }
};

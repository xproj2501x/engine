/**
 * Imperium 4X (Shared) - Log Service
 * ===
 *
 * @module logService
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import Log from './log';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

const LEVEL = {
  LOG: 'LOG',
  WARN: 'WARN',
  INFO: 'INFO',
  ERROR: 'ERROR'
};

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * LogService
 * @class
 * @memberof module:logService
 */
class LogService {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The name of the constructor for the calling class
   * @private
   * @type { string }
   */
  _context;

  /**
   *
   * @private
   * @type { module:logService.Log }
   */
  _log;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * LogService
   * @constructor
   * @param { string } context - the name of the constructor for the calling class
   */
  constructor(context) {
    this._log = new Log();
    this._context = context;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Public Methods
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Writes a log message to the log
   * @param { string } message - the message to be written
   */
  log(message) {
    this._write(LEVEL.LOG, message);
  }

  /**
   * Writes a warning message to the log
   * @param { string } message - the message to be written
   */
  warn(message) {
    this._write(LEVEL.WARN, message);
  }

  /**
   * Writes an info message to the log
   * @param { string } message - the message to be written
   */
  info(message) {
    this._write(LEVEL.INFO, message);
  }

  /**
   * Writes an error message to the log
   * @param { string } message - the message to be written
   */
  error(message) {
    this._write(LEVEL.ERROR, message);
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Private Methods
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Writes a message to the log
   * @param { string } level - the level of the message
   * @param { string } message - the message to be written
   */
  _write(level, message) {
    if (typeof message === 'object') {
      this._log.write(`[${this._context}] ${level}:`);
      this._log.write(JSON.stringify(message));
    } else {
      this._log.write(`[${this._context}] ${level}: ${message}`);
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Static Methods
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @param { string } context - the name of the constructor for the calling class
   * @return {module:logService.LogService}
   */
  static create(context) {
    return new LogService(context);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default LogService;

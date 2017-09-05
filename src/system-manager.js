/**
 * Imperium 4X (Shared) - System Manager
 * ===
 *
 * @module system
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import LogService from './services/log';
import MessageService from './services/message';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
class SystemManager {

  ////////////////////////////////////////////////////////////////////////////////
  // Private Properties
  ////////////////////////////////////////////////////////////////////////////////
  _logService;
  _messageService;

  /**
   * Collection of registered systems
   * @private
   * @type {Array}
   */
  _systems;
  _assemblageManager;
  ////////////////////////////////////////////////////////////////////////////////
  // Public Properties
  ////////////////////////////////////////////////////////////////////////////////
  /** Get _systems.length
   * @readonly
   * @return { int }
   */
  get systems() {
    return this._systems.length;
  }

  /**
   * SystemManager
   * @constructor
   * @param { Array } configuration - a collection of system constructors
   */
  constructor(configuration, assemblageManager) {
    this._logService = LogService.create(this.constructor.name);
    this._systems = configuration;
    this._assemblageManager = assemblageManager;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Public Methods
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Runs update for each registered system
   * @param {int} tick - the current state of the engine
   */
  update(tick) {
    this._systems.forEach((system) => {
      system.update(tick, this._assemblageManager);
    });
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Private Methods
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Registers systems from the configuration
   * @private
   * @param { Array } configuration - a collection of system constructors
   */
  _init(configuration) {
    configuration.forEach((system) => {
      this._addSystem(system);
    });
  }

  /**
   * Instantiates a system and adds it to the collection
   * @private
   * @param { object } template - a template for the system to be added
   * @return { boolean }
   */
  _addSystem(template) {
    if (!this._hasSystem(template.id)) {
      const SYSTEM = new template.constructor();

      this._systems[template.id] = SYSTEM;
      return true;
    }
    return false;
  }

  /**
   * Instantiates a system and adds it to the collection
   * @private
   * @param { string } name - the name of the system
   * @return { boolean }
   */
  _hasSystem(name) {
    return name in this._systems;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  static create(configuration, assemblageManager) {
    return new SystemManager(configuration, assemblageManager);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default SystemManager;

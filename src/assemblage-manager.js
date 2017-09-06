/**
 * Engine - Assemblage Manager
 * ===
 *
 * @module assemblageManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import LogService from './services/log';
import Assemblage from './assemblage';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * AssemblageManager
 * @class
 * @memberof module:engine
 */
class AssemblageManager {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type { module:logService.LogService }
   */
  _logService;

  /**
   * Collection of assemblage templates
   * @private
   * @type { object }
   */
  _templates;

  /**
   * Collection of assemblagess
   * @private
   * @type { Array }
   */
  _assemblages;

  /**
   * @private
   * @type { module:engine.EntityManager }
   */
  _entityMananger;

  /**
   * @private
   * @type { module:engine.ComponentManager }
   */
  _componentManager;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /** Get _assemblages.length
   * @readonly
   * @return { int }
   */
  get assemblages() {
    return this._assemblages.length;
  }

  /**
   * AssemblageManager
   * @constructor
   * @param { Array } templates - a collection of assemblage templates
   * @param { module:engine.EntityManager } entityManager - the entity manager
   * @param { module:engine.ComponentManager } componentManager - the component manager
   */
  constructor(templates, entityManager, componentManager) {
    this._logService = LogService.create(this.constructor.name);
    this._templates = templates;
    this._assemblages = [];
    this._entityManager = entityManager;
    this._componentManager = componentManager;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates an assemblage of the specified type
   * @param { string } type - the type of assemblage to be created
   * @param { object } state - the initial state of the assemblage to be created
   * @param { module:engine.EntityManager } entity - the root entity of the assemblage
   */
  createAssemblage(type, state, entity = null) {
    const TEMPLATE = this._findTemplate(type);
    const ENTITY = entity || this._entityManager.createEntity();

    TEMPLATE.COMPONENTS.forEach((componentType) => {
      try {
        const DEFAULT_STATE = (TEMPLATE.DEFAULTS && TEMPLATE.DEFAULTS[componentType])
          ? TEMPLATE.DEFAULTS[componentType] : {};
        const CUSTOM_STATE = (state && state[componentType]) ? state[componentType] : {};
        const MERGED_STATE = Object.assign({}, DEFAULT_STATE, CUSTOM_STATE);
        const COMPONENT = this._componentManager.createComponent(ENTITY.id, componentType, MERGED_STATE);

        ENTITY.attachComponent(componentType, COMPONENT);
      } catch (err) {
        this._logService.error(err);
        throw err;
      }
    });
  }

  /**
   * Removes the specified assemblage from the collection
   * @param { int } id - the entity id
   * @param { string } type - the assemblage type
   */
  removeAssemblage(id, type) {
    try {
      const ASSEMBLAGE = this._findAssemblage(id, type);
      const INDEX = this._assemblages.indexOf(ASSEMBLAGE);

      this._assemblages.splice(INDEX, 1);
    } catch (err) {
      this._logService.error(err);
      throw err;
    }
  }

  /**
   * Finds a template for the specified component type
   * @private
   * @param { string } type - the type of template to be retrieved
   * @return { Component }
   */
  _findTemplate(type) {
    if (!this._templates[type]) {
      throw new Error(`Assemblage template ${type} not found`);
    }
    return this._templates[type];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @param { object } templates - a collection of assemblage templates
   * @param { module:engine.EntityManager } entityManager - entity manager
   * @param { module:engine.ComponentManager } componentManager - component manager
   * @return {module:engine.AssemblageManager}
   */
  static create(templates, entityManager, componentManager) {
    return new AssemblageManager(templates, entityManager, componentManager);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default AssemblageManager;

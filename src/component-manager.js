/**
 * Engine - Component Manager
 * ===
 *
 * @module componentManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import LogService from './services/log';
import Component from './component';

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * ComponentManager
 * @class
 * @memberof module:engine
 */
class ComponentManager {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type { module:logService.LogService }
   */
  _logService;

  /**
   * Collection of component templates
   * @private
   * @type { object }
   */
  _templates;

  /**
   * Collection of components
   * @private
   * @type { Array }
   */
  _components;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * ComponentManager
   * @constructor
   * @param { object } templates - a collection of component templates
   */
  constructor(templates) {
    this._logService = LogService.create(this.constructor.name);
    this._templates = templates;
    this._components = [];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates a new component of the specified type
   * @param { int } id - the id number of the parent entity
   * @param { string } type - the type of component to be created
   * @param { object } state - the initial state of the component to be created
   * @return { module:engine.Component }
   */
  createComponent(id, type, state) { // eslint-disable-line id-length
    const TEMPLATE = this._findTemplate(type);
    const DEFAULT_STATE = TEMPLATE.DEFAULTS;
    const MERGED_STATE = Object.assign({}, DEFAULT_STATE, state);
    const DATA = {
      id: id, // eslint-disable-line id-length
      type: type,
      keys: TEMPLATE.STATE,
      state: MERGED_STATE
    };
    const COMPONENT = Component.create(DATA);

    this._components.push(COMPONENT);
    return COMPONENT;
  }

  /**
   * Finds a component with the specified id
   * @param { string } id - the id of the component to be retrieved
   * @return { Component }
   */
  findComponent(id) { // eslint-disable-line id-length
    const COMPONENT = this._components.find((component) => {
      if (component.id === id) {
        return component;
      }
      return null;
    });

    if (!COMPONENT) {
      throw new Error(`Component id ${id} not found`);
    }
    return COMPONENT;
  }

  /**
   * Finds all components of the specified type
   * @param { string } type - the type of components to be retrieved
   * @return { Array}
   */
  findComponentsOfType(type) {
    const COMPONENTS = this._components.filter((component) => {
      return component.type === type;
    });

    return COMPONENTS;
  }

  /**
   * Removes a component with the specified id
   * @param { string } id - the id of the component to be removed
   */
  removeComponent(id) { // eslint-disable-line id-length
    try {
      const COMPONENT = this.findComponent(id);
      const INDEX = this._components.indexOf(COMPONENT);

      this._components.splice(INDEX, 1);
    } catch (err) {
      throw err;
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Adds a component template to the collection
   * @private
   * @param { object } template - the template to be added
   */
  _addTemplate(template) {
    const NAME = template.name;
    const KEYS = template.keys;

    if (this._templates[NAME]) {
      throw new Error(`Component template ${NAME} already exists`);
    }
    this._templates[NAME] = KEYS;
  }

  /**
   * Finds a template for the specified component type
   * @private
   * @param { string } type - the type of template to be retrieved
   * @return { Component }
   */
  _findTemplate(type) {
    if (!this._templates[type]) {
      throw new Error(`Component template ${type} not found`);
    }
    return this._templates[type];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @static
   * @param { object } templates - the configuration to be used when creating the component manager
   * @return { module:engine.ComponentManager }
   */
  static create(templates) {
    return new ComponentManager(templates);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default ComponentManager;

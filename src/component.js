/**
 * Engine - Component
 * ===
 *
 * @module component
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * Component
 * @class
 * @memberof module:engine
 */
class Component {

  //////////////////////////////////////////////////////////////////////////////
  // Static Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The id of the parent entity
   * @private
   * @type { int }
   */
  _id;

  /**
   * The type of the component
   * @private
   * @type { string }
   */
  _type;

  /**
   * The state properties of the component
   * @private
   * @type { object }
   */
  _state;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get _id
   * @readonly
   * @return { string }
   */
  get id() { // eslint-disable-line id-length
    return this._id;
  }

  /**
   * Get _type
   * @readonly
   * @return { string }
   */
  get type() {
    return this._type;
  }

  /**
   * Get _state
   * @readonly
   * @return { object }
   */
  get state() {
    return this._state;
  }

  /**
   * Component
   * @constructor
   * @param { int } id - the id of the parent entity
   * @param { string } type - the type of the component to be created
   * @param { enum } keys - the keys for the component type
   * @param { object } state - the initial state of the component
   */
  constructor(id, type, keys, state) { // eslint-disable-line id-length
    if (type === null) {
      throw new Error('Component type cannot be null');
    }
    this._id = id;
    this._type = type;
    this._init(keys);
    this.update(state);

  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Gets the specificed property of the component state
   * @param { string } key - the key for the property to be retrieved
   * @return { object }
   */
  getProperty(key) {
    if (!this._state.hasOwnProperty(key)) {
      throw new Error(`Invalid property ${key} for component type ${this._type}`);
    }
    return this._state[key];
  }

  /**
   * Updates the state of the component with new values
   * @param { object } state - the new state of the component
   */
  update(state) {
    for (const KEY in state) {
      if (state.hasOwnProperty(KEY)) {
        const VALUE = state[KEY];

        try {
          this._setProperty(KEY, VALUE);
        } catch (err) {
          throw err;
        }
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Sets the keys for the component state
   * @private
   * @param { enum } state - the keys for the state of the of the component
   */
  _init(state) {
    this._state = {};
    for (const KEY in state) {
      if (state.hasOwnProperty(KEY)) {
        this._state[state[KEY]] = null;
      }
    }
  }

  /**
   * Sets the value of the specified property
   * @private
   * @param { string } key - the key of the property to be changed
   * @param { string } value - the value of the property to be changed
   */
  _setProperty(key, value) {
    if (!this._state.hasOwnProperty(key)) {
      throw new Error(`Invalid property ${key} for component type ${this._type}`);
    }
    this._state[key] = value;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @static
   * @param { object } data - configuration for the component to be created
   * @return { module:engine.Component }
   */
  static create(data) {
    if (data === null) {
      throw new Error('Component configuration missing');
    }
    return new Component(data.id, data.type, data.keys, data.state);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Component;

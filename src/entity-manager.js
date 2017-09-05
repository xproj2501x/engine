/**
 * Engine - Entity Manager
 * ===
 *
 * @module entityManager
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import LogService from './services/log';
import Entity from './entity';

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * EntityManager
 * @class
 * @memberof module:engine
 */
class EntityManager {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type { module:logService.LogService }
   */
  _logService;

  /**
   * Collection of entities
   * @private
   * @type { Array }
   */
  _entities;

  /**
   * The id to be assigned to the next entity created
   * @private
   * @type { int }
   */
  _nextId;
  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /** Get _systems.length
   * @readonly
   * @return { int }
   */
  get entities() {
    return this._entities.length;
  }

  /**
   * EntityManager
   * @constructor
   */
  constructor() {
    this._logService = LogService.create(this.constructor.name);
    this._nextId = 0;
    this._entities = [];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates a new entity
   * @return { module:engine.Entity }
   */
  createEntity() {
    const ENTITY = Entity.create(this._nextId);

    this._nextId++;
    this._entities.push(ENTITY);
    return ENTITY;
  }

  /**
   * Finds an entity with the specified id
   * @param { int } id - The id of the entity to be retrieved
   * @return { module:engine.Entity }
   */
  findEntity(id) { // eslint-disable-line id-length
    const Entity = this._entities.find((entity) => {
      if (entity.id === id) {
        return entity;
      }
      return null;
    });

    if (!Entity) {
      throw new Error(`Entity id ${id} not found`);
    }
    return Entity;
  }

  /**
   * Removes an entity
   * @param { string } id - The id of the entity to be deleted
   */
  removeEntity(id) { // eslint-disable-line id-length
    try {
      const ENTITY = this.findEntity(id);
      const INDEX = this._entities.indexOf(ENTITY);

      this._entities.splice(INDEX, 1);
    } catch (err) {
      throw err;
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @static
   * @return { module:engine.EntityManager }
   */
  static create() {
    return new EntityManager();
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default EntityManager;

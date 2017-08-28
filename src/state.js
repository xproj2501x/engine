/**
 * Imperium 4X (Shared) - State
 * ===
 *
 * @module state
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import Guid from '../util/guid';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
class State {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  _id;
  _entityManager;
  _componentManager;
  _assemblageManager;
  _entityComponentTable;
  _componentTypeTable;
  _componentToEntityTable;


  // _entityComponentData - dictionary - key: entity id, value: array of components - determine if by id or type
  // _componentData - dictionary - key: component id, value: entity id


  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  get id(){
    return this._id;
  }

  constructor(entityManager, componentManager, assemblageManager){
    this._id = Guid.create();
    this._entityManager = entityManager;
    this._componentManager = componentManager;
    this._assemblageManager = assemblageManager;
    this._entityComponentTable = {};
    this._componentTypeTable = {};
    this._componentToEntityTable = {};
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  createEntity(settings) {
    let assemblage = this._assemblageManager.findTemplate(settings.template);
    let entityId = this._entityManager.createEntity();
    if (!this._hasEntity(entityId)) {
      this._entityComponentTable[entityId] = [];
    }
    assemblage.forEach((component) => {
      let state = settings[component] || {};

      this.addComponentToEntity(entityId, component, state);
    });

    //componentData.forEach(component => {
    //  let id = this._componentManager.create();
    //});
  }

  findEntity(id) {

  }

  findEntitiesByAssemblage(template){
    let collection = {};
    let assemblage = this._assemblageManager.findTemplate(template);

    assemblage.forEach((component) => {
      collection[component] = this._componentManager.findComponentsByType(component);
    });

    let entities = {};

    for (let key in collection) {
      let components = collection[key];
      for (let idx = 0; idx < components.length; idx++) {
        let component = components[idx];
        let entityId = this._componentToEntityTable[component.id];
        if (!entities[entityId]) {
          entities[entityId] = {};
        }
        entities[entityId][key] = component;
      }
    }

    return entities;
  }

  updateEntity(id, newState) {

  }

  removeEntity(id) {
    return this._entityManager.removeEntity(id);
  }

  findComponent(id) {

  }

  findComponentsByType(type) {
    return this._componentManager.findComponentsByType(type);
  }

  findComponentsForEntity(id) {
    let components = [];
  }

  removeComponent(id) {
    return this._componentManager.removeComponent(id);
  }

  addComponentToEntity(entityId, component, state) {
    let componentId = this._componentManager.createComponent(component, state);
    this._entityComponentTable[entityId].push(componentId);
    if (!this._componentTypeTable[component]) {
      this._componentTypeTable[component] = [];
    }
    this._componentToEntityTable[componentId] = entityId;
    this._componentTypeTable[component].push(entityId);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  _hasEntity(id){
    return id in this._entityComponentTable;
  }

}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default State;
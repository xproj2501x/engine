/**
 * Game - Health System
 * ===
 *
 * @module healthSystem
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import LogService from '../../../../src/services/log';
import System from '../../../../src/system';
import Event from '../../../../src/services/event/event';
import { ASSEMBLAGE_TYPES, ASSEMBLAGES } from "./assemblages";
import { COMPONENT_TYPES, COMPONENTS } from "./components";

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * UpdateSystem
 * @class
 * @extends module:engine.System
 * @memberof module:game
 */
class HungerSystem extends System {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  constructor() {
    super();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Runs the update routine
   * @param {int} tick - the current game tick;
   * @param { module:engine.AssemblageManager } assemblages - the assemblage manager
   */
  update(tick, assemblages) {
    const EVENTS = [];
    const COMPONENT_MANAGER = assemblages._componentManager;
    const ENTITY_MANAGER = assemblages._entityManager;

    if (tick % 10 === 0) {
      let COMPONENTS = COMPONENT_MANAGER.findComponentsOfType(COMPONENT_TYPES.DAMAGE_COMPONENT);

      COMPONENTS.forEach((component) => {
        const DAMAGE = component.state;
        const HEALTH_COMPONENT = COMPONENT_MANAGER.findComponent(component.id, COMPONENT_TYPES.HEALTH_COMPONENT);
        const HEALTH = HEALTH_COMPONENT.state;
        const NEW_VALUE = (HEALTH.CURRENT_HEALTH - DAMAGE.AMOUNT >= 0) ? HEALTH.CURRENT_HEALTH - DAMAGE.AMOUNT : 0;

        HEALTH_COMPONENT.update({ CURRENT_HEALTH: NEW_VALUE });
        COMPONENT_MANAGER.removeComponent(component.id, COMPONENT_TYPES.DAMAGE_COMPONENT);
        if (!NEW_VALUE) {
          assemblages.removeAssemblage(component.id, ASSEMBLAGE_TYPES.CREATURE_ASSEMBLAGE);
          COMPONENT_MANAGER.removeComponent(component.id, COMPONENT_TYPES.POSITION_COMPONENT);
          COMPONENT_MANAGER.removeComponent(component.id, COMPONENT_TYPES.HEALTH_COMPONENT);
          COMPONENT_MANAGER.removeComponent(component.id, COMPONENT_TYPES.HUNGER_COMPONENT);
          COMPONENT_MANAGER.removeComponent(component.id, COMPONENT_TYPES.STATS_COMPONENT);
          ENTITY_MANAGER.removeEntity(component.id);
        }


      });


    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default HungerSystem;

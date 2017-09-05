/**
 * Game - Hunger System
 * ===
 *
 * @module updateSystem
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import LogService from '../../../../src/services/log/index';
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
  _flaggedForUpdate;
  _grid;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  constructor() {
    super();
    this._flaggedForUpdate = [];
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

    if (tick % 10 === 0) {
      // const CREATURES = assemblages.findAssemblagesOfType(ASSEMBLAGE_TYPES.CREATURE_ASSEMBLAGE);
      const CREATURES = COMPONENT_MANAGER.findComponentsOfType(COMPONENT_TYPES.HUNGER_COMPONENT);

      CREATURES.forEach((creature) => {
        // const COMPONENT = creature.findComponent(COMPONENT_TYPES.HUNGER_COMPONENT);
        const HUNGER = creature.state;
        const NEW_VALUE = (HUNGER.CURRENT_HUNGER - 1 >= 0) ? HUNGER.CURRENT_HUNGER - 1 : 0 ;

        if (NEW_VALUE === 0) {
          const MIN = 1;
          const MAX = 100;
          const CHANCE = Math.floor(Math.random() * (MAX - MIN)) + MIN;

          if (CHANCE > 45) {
            const COMPONENT = COMPONENT_MANAGER.createComponent(creature.id, COMPONENT_TYPES.DAMAGE_COMPONENT, {
              AMOUNT: 1,
              SOURCE: 'HUNGER'
            });
          }
          // const EVENT = new Event({
          //   sender: this.constructor.name,
          //   recipient: 'HEALTH_SYSTEM',
          //   subject: 'DAMAGE_COMPONENT',
          //   body: {
          //     id: COMPONENT.id,
          //     state: {
          //       AMOUNT: 1,
          //       SOURCE: 'HUNGER'
          //     }
          //   }
          // });
          //
          // EVENTS.push(EVENT);
        }
        creature.update({ CURRENT_HUNGER: NEW_VALUE });
      });

      return EVENTS;
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

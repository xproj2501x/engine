/**
 * Game - Genetics
 * ===
 *
 * @module genetics
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import { COMPONENT_TYPES, COMPONENTS } from "./components";
import { ASSEMBLAGE_TYPES, ASSEMBLAGES } from "./assemblages";
import HungerSystem from './hunger-system';
import HealthSystem from './health-system';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * genetics
 * @class
 */
class Genetics {

  //////////////////////////////////////////////////////////////////////////////
  // Static Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Genetics
   * @constructor
   */
  constructor() {

  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  create() {
    this._generateHeightMap(10);

    const CONFIG = {
      COMPONENTS: COMPONENTS,
      ASSEMBLAGES: ASSEMBLAGES,
      SYSTEMS: [
        new HungerSystem(),
        new HealthSystem()
      ],
      STATE: this._createState()
    };

    return CONFIG;
  }
  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  _generateHeightMap(size) {
    const SIDE = Math.pow(2, size) + 1;
    const MAX = SIDE - 1;
    const ROUGHNESS = Math.random();
    const SEED = Math.random();
    const GRID = [];

    for (let idx = 0; idx < side + 1; idx++) {
      GRID[idx] = new Array(side + 1);
    }
    GRID[0][0] = GRID[0][side] = GRID[side][0] = GRID[side][side] = SEED;
    GRID[side / 2][side / 2] = SEED;
    let height = ROUGHNESS;

    for (let length = side; length >= 2; length /= 2, height *= ROUGHNESS) {
      const halfLength = length / 2;

      for (let idx = 0; idx < side; idx += length) {
        for (let jdx = 0; jdx < side; jdx += length) {

        }
      }
    }

  }

  _divide(size) {
    const HALF = size / 2;

    for (let xPos = 0; xPos < 1; xPos += size) {
      for (let yPos = 0; yPos < 1; yPos += size) {

      }
    }
  }

  _createState() {
    const ASSEMBLAGES = [];
    const HEIGHT = 25;
    const WIDTH = 25;

    for (let idx = 0; idx < WIDTH; idx++) {
      for (let jdx = 0; jdx < HEIGHT; jdx++) {
        if (this._isAlive()) {
          const ASSEMBLAGE = {};

          ASSEMBLAGE.type = ASSEMBLAGE_TYPES.CREATURE_ASSEMBLAGE;
          ASSEMBLAGE.state = {};
          ASSEMBLAGE.state[COMPONENT_TYPES.POSITION_COMPONENT] = {
            X_POSITION: idx,
            Y_POSITION: jdx,
          };
          ASSEMBLAGE.state[COMPONENT_TYPES.HUNGER_COMPONENT] = {
            MAX_HUNGER: 10,
            CURRENT_HUNGER: 10
          };
          ASSEMBLAGE.state[COMPONENT_TYPES.HEALTH_COMPONENT] = {
            MAX_HEALTH: 10,
            CURRENT_HEALTH: 10
          };
          ASSEMBLAGES.push(ASSEMBLAGE);
        }
      }
    }
    return ASSEMBLAGES;
  }

  _isAlive() {
    const MIN = 1;
    const MAX = 100;
    const CHANCE = Math.floor(Math.random() * (MAX - MIN)) + MIN;

    return (CHANCE > 75);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////

}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Genetics

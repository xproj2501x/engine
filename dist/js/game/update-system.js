/**
 * Game - Update System
 * ===
 *
 * @module updateSystem
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import LogService from '../../../src/services/log';
import System from '../../../src/system';
import { ASSEMBLAGE_TYPES, ASSEMBLAGES } from "./assemblages";
import { COMPONENT_TYPES, COMPONENTS } from "./components";

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const TIME_STATE = COMPONENTS.TIME_COMPONENT.STATE;
const POSITION_STATE = COMPONENTS.POSITION_COMPONENT.STATE;
const HEALTH_STATE = COMPONENTS.HEALTH_COMPONENT.STATE;

const DIRECTIONS = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0]
];
////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * UpdateSystem
 * @class
 * @extends module:engine.System
 * @memberof module:game
 */
class UpdateSystem extends System {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  _flaggedForUpdate;

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
   * @param { module:engine.AssemblageManager } assemblages - the assemblage manager
   */
  update(assemblages) {
    const TIME_ASSEMBLAGE = assemblages.findAssemblagesOfType(ASSEMBLAGE_TYPES.TIME_ASSEMBLAGE)[0];
    const TIME_COMPONENT = TIME_ASSEMBLAGE.findComponent(COMPONENT_TYPES.TIME_COMPONENT);
    const TIME = TIME_COMPONENT.state.TIME++;

    if (TIME % 10 === 0) {
      const CELLS = assemblages.findAssemblagesOfType(ASSEMBLAGE_TYPES.CELL_ASSEMBLAGE);
      const GRID = this._createGrid(CELLS);

      this._findNeighbors(GRID);
      this._flaggedForUpdate.forEach((cell) => {
        this._changeState(cell);
      });

      this._flaggedForUpdate = [];
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  _createGrid(cells) {
    const GRID = [];

    for (const KEY in cells) {
      const CELL = cells[KEY];
      const POSITION = CELL.findComponent(COMPONENT_TYPES.POSITION_COMPONENT);
      const STATE = POSITION.state;
      const X_POSITION = STATE[POSITION_STATE.X_POSITION];
      const Y_POSITION = STATE[POSITION_STATE.Y_POSITION];

      if (!GRID[X_POSITION]) {
        GRID[X_POSITION] = [];
      }
      GRID[X_POSITION][Y_POSITION] = CELL;
    }
    return GRID;
  }

  _findNeighbors(grid) {
    for (let idx = 0; idx < grid.length; idx++) {
      const COLUMN = grid[idx];

      for (let jdx = 0; jdx < COLUMN.length; jdx++) {
        const CELL = grid[idx][jdx];
        let neighbors = 0;

        DIRECTIONS.forEach((direction) => {
          const X_POSITION = idx + direction[0];
          const Y_POSITION = jdx + direction[1];

          if (X_POSITION >= 0 && X_POSITION < grid.length && Y_POSITION >= 0 && Y_POSITION < COLUMN.length) {
            const NEIGHBOR = grid[X_POSITION][Y_POSITION];
            const HEALTH_COMPONENT = NEIGHBOR.findComponent(COMPONENT_TYPES.HEALTH_COMPONENT);
            const STATE = HEALTH_COMPONENT.state;

            if (STATE[HEALTH_STATE.CURRENT_HEALTH] === 1) {
              neighbors++;
            }
          }
        });

        this._checkState(CELL, neighbors);
      }
    }
  }

  _checkState(cell, neighbors) {
    const HEALTH_COMPONENT = cell.findComponent(COMPONENT_TYPES.HEALTH_COMPONENT);
    const STATE = HEALTH_COMPONENT.state;
    const ALIVE = STATE[HEALTH_STATE.CURRENT_HEALTH];

    if (neighbors < 2 && ALIVE === 1) {
      this._flaggedForUpdate.push(cell);
    }
    else if (neighbors === 3 && ALIVE === 0) {
      this._flaggedForUpdate.push(cell);
    }
    else if (neighbors > 3 && ALIVE) {
      this._flaggedForUpdate.push(cell);
    }
  }

  _changeState(cell) {
    const HEALTH = cell.findComponent(COMPONENT_TYPES.HEALTH_COMPONENT);
    const STATE = HEALTH.state;
    const VALUE = STATE[HEALTH_STATE.CURRENT_HEALTH];
    let update;

    if (VALUE === 1) {
      update = 0;
    } else {
      update = 1;
    }
    HEALTH.update({ CURRENT_HEALTH: update });
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default UpdateSystem;

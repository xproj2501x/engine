/**
 * Game - Update System
 * ===
 *
 * @module updateSystem
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import LogService from '../../../../src/services/log/index';
import System from '../../../../src/system';
import { ASSEMBLAGE_TYPES, ASSEMBLAGES } from "../assemblages";
import { COMPONENT_TYPES, COMPONENTS } from "../components";

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
  _grid;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  constructor() {
    super();
    this._flaggedForUpdate = [];
    this._grid = [];
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


      this._runGenerator(this._toGrid(CELLS));
      this._runGenerator(this._findNeighbors());
      this._flaggedForUpdate.forEach((cell) => {
        this._changeState2(cell);
      });

      this._flaggedForUpdate = [];
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  _checkState(cell, neighbors) {
    const HEALTH_COMPONENT = cell.findComponent(COMPONENT_TYPES.HEALTH_COMPONENT);
    const STATE = HEALTH_COMPONENT.state;
    const ALIVE = STATE[HEALTH_STATE.CURRENT_HEALTH];

    if (neighbors < 2 && ALIVE === 1) {
      this._flaggedForUpdate.push(HEALTH_COMPONENT);
    }
    else if (neighbors === 3 && ALIVE === 0) {
      this._flaggedForUpdate.push(HEALTH_COMPONENT);
    }
    else if (neighbors > 3 && ALIVE) {
      this._flaggedForUpdate.push(HEALTH_COMPONENT);
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

  _changeState2(component) {
    const STATE = component.state;
    const VALUE = STATE.CURRENT_HEALTH;
    let update;

    if (VALUE === 1) {
      update = 0;
    } else {
      update = 1;
    }

    component.update({ CURRENT_HEALTH: update})
  }

  _addToGrid(cell) {
    const POSITION = cell.findComponent(COMPONENT_TYPES.POSITION_COMPONENT);
    const STATE = POSITION.state;
    const X_POSITION = STATE[POSITION_STATE.X_POSITION];
    const Y_POSITION = STATE[POSITION_STATE.Y_POSITION];

    if (!this._grid[X_POSITION]) {
      this._grid[X_POSITION] = [];
    }
    this._grid[X_POSITION][Y_POSITION] = cell;
  }

  _getNeighbors(cell) {
    const POSITION_COMPONENT = cell.findComponent(COMPONENT_TYPES.POSITION_COMPONENT);
    const POSITION = POSITION_COMPONENT.state;
    let neighbors = 0;


    DIRECTIONS.forEach((direction) => {
      const X_POSITION = POSITION.X_POSITION + direction[0];
      const Y_POSITION = POSITION.Y_POSITION + direction[1];

      if (X_POSITION >= 0 && X_POSITION < this._grid.length && Y_POSITION >= 0 && Y_POSITION < this._grid.length) {
        const NEIGHBOR = this._grid[X_POSITION][Y_POSITION];
        const HEALTH_COMPONENT = NEIGHBOR.findComponent(COMPONENT_TYPES.HEALTH_COMPONENT);
        const STATE = HEALTH_COMPONENT.state;

        if (STATE[HEALTH_STATE.CURRENT_HEALTH] === 1) {
          neighbors++;
        }
      }
    });
    this._checkState(cell, neighbors);
  }

  *_toGrid(cells) {

    while (cells.length) {
      const CELL = cells.pop();
      // const POSITION = CELL.findComponent(COMPONENT_TYPES.POSITION_COMPONENT);
      // const STATE = POSITION.state;
      // const X_POSITION = STATE[POSITION_STATE.X_POSITION];
      // const Y_POSITION = STATE[POSITION_STATE.Y_POSITION];
      //
      // if (!this._grid[X_POSITION]) {
      //   this._grid[X_POSITION] = [];
      // }
      // this._grid[X_POSITION][Y_POSITION] = CELL;
      // this._addToGrid(CELL);
      // yield;
      // yield this._toPromise(this._addToGrid(CELL));
      this._addToGrid(CELL);
      yield;
    }
  }

  *_findNeighbors() {
    let idx = 0;
    let jdx = 0;

    while (idx < 25) {
      if (jdx < 25) {
        const CELL = this._grid[idx][jdx++];

        if (jdx === 25) {
          jdx = 0;
          idx++;
        }
        // let neighbors = 0;

        // DIRECTIONS.forEach((direction) => {
        //   const X_POSITION = idx + direction[0];
        //   const Y_POSITION = jdx + direction[1];
        //
        //   if (X_POSITION >= 0 && X_POSITION < this._grid.length && Y_POSITION >= 0 && Y_POSITION < this._grid.length) {
        //     const NEIGHBOR = this._grid[X_POSITION][Y_POSITION];
        //     const HEALTH_COMPONENT = NEIGHBOR.findComponent(COMPONENT_TYPES.HEALTH_COMPONENT);
        //     const STATE = HEALTH_COMPONENT.state;
        //
        //     if (STATE[HEALTH_STATE.CURRENT_HEALTH] === 1) {
        //       neighbors++;
        //     }
        //   }
        // });

        // this._checkState(CELL, neighbors);
        // yield;
        // yield this._toPromise(this._getNeighbors(CELL));
        this._getNeighbors(CELL);
        yield;
      } else {
        ++idx;
        jdx = 0;
      }
    }
  }

  _runGenerator(generator) {
    let process = function(result) {
      if (result.done) {
        return;
      }
      process(sequence.next());
      // (Array.isArray(result.value) ? Promise.all(result.value) : result.value)
      //   .then((value) => {
      //     process(sequence.next(value));
      //   });
    };
    let sequence = generator;
    let next = sequence.next();

    process(next);
  }

  _toPromise(func) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(func);
      }, 500);
    });
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default UpdateSystem;

// Async runner
function async(generator){
  var process = function(result){
    if (result.done) {
      return;
    }
    (Array.isArray(result.value) ? Promise.all(result.value) : result.value).then(function(value){
      process(sequence.next(value));
    });
  };

  var sequence = generator();
  var next = sequence.next();
  process(next);
};

// Generator function
var generator = function* () {
  var list = yield getList();
  console.log(list); // outputs [1, 2, 3, 4, 5]

  var details = yield list.map(p => getDetails(p));
  console.log(details); // outputs [11, 12, 13, 14, 15]
}

// Your async requests go here
function fakeAsync(f) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      f(resolve);
    }, 500);
  });
}

function getList() {
  return fakeAsync(function(resolve) {
    resolve([1, 2, 3, 4, 5]);
  });
}

function getDetails(i) {
  return fakeAsync(function(resolve) {
    resolve(i + 10);
  });
}


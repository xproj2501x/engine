/**
 * Engine - Engine
 * ===
 *
 * @module engine
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import LogService from './services/log';
import EntityManager from './entity-manager';
import ComponentManager from './component-manager';
import AssemblageManager from './assemblage-manager';
import Display from './display';
import {ASSEMBLAGE_TYPES} from '../dist/js/game/assemblages';
import {COMPONENT_TYPES} from '../dist/js/game/components';
import { FRAME_DURATION } from './constants';
////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * Engine
 * @class
 * @memberof module:engine
 */
class Engine {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  _logService;
  _systems;
  _assemblageManager;
  _display;
  _running;
  _lastFrame;
  _frameId;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Engine
   * @constructor
   * @param { object } configuration - configuration for the engine
   */
  constructor(configuration) {
    this._logService = new LogService(this.constructor.name);
    this._running = false;
    this._display = new Display();
    this._init(configuration);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Starts the engine
   */
  start() {
    if (!this._running) {
      this._currentTick = 0;
      this._running = true;
      this._frameId = requestAnimationFrame((timestamp) => {
        this._lastFrame = timestamp;
        this._frameId = requestAnimationFrame((timestamp) =>
          this._tick(timestamp));
      });
    }

  }

  /**
   * Stops the engine
   */
  stop() {
    this._running = false;
    cancelAnimationFrame(this._frameId);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Initializes the engine
   * @private
   * @param { object } configuration - configuration for the engine
   */
  _init(configuration) {
    const ENTITY_MANAGER = EntityManager.create();
    const COMPONENT_MANAGER = ComponentManager.create(configuration.COMPONENTS);

    this._systems = configuration.SYSTEMS;
    this._assemblageManager = AssemblageManager.create(configuration.ASSEMBLAGES, ENTITY_MANAGER, COMPONENT_MANAGER);

    configuration.STATE.forEach((assemblage) => {
      this._assemblageManager.createAssemblage(assemblage.type, assemblage.state);
    });
  }

  /**
   * The main game loop
   * @private
   * @param { float } timestamp - the timestamp for the current animation frame
   */
  _tick(timestamp) {
    const NOW = timestamp;

    this._currentTick++;
    if (NOW > this._lastFrame + FRAME_DURATION) {
      this._update(NOW);
      this._render(NOW);
      this._lastFrame = NOW;
    }
    this._frameId = requestAnimationFrame((timestamp) => {
      this._tick(timestamp);
    });
  }

  /**
   * Runs the update loop on all systems
   * @param { float } delta - the amount of time since last update
   * @private
   */
  _update(delta) {
    while (delta >= FRAME_DURATION) {
      for (const KEY in this._systems) {
        if (this._systems.hasOwnProperty(KEY)) {
          const SYSTEM = this._systems[KEY];

          SYSTEM.update(this._assemblageManager);
        }
      }
      delta -= FRAME_DURATION;
    }
  }

  /**
   * Runs the render loop on all entities
   * @param { float } delta - the amount of time since last update
   * @private
   */
  _render(delta) {
    const CELLS = this._assemblageManager.findAssemblagesOfType(ASSEMBLAGE_TYPES.CELL_ASSEMBLAGE);
    const SPRITES = [];

    CELLS.forEach((cell) => {
      const HEALTH = cell.findComponent(COMPONENT_TYPES.HEALTH_COMPONENT);

      if (HEALTH.state.CURRENT_HEALTH === 1) {
        SPRITES.push(cell);
      }
    });
    this._display.render(SPRITES);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @static
   * @param { object } configuration - configuration for the engine
   * @return { module:engine.Engine }
   */
  static create(configuration) {
    return new Engine(configuration);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Engine;

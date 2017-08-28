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
import {ASSEMBLAGE_TYPES} from "../dist/js/game/assemblages";
import {COMPONENT_TYPES} from "../dist/js/game/components";
import { MILLISECONDS, FPS, FRAME_DURATION } from "./constants";
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
  _fpsElement;
  _running;
  _lastFrame;
  _frameId;
  _lastFpsUpdate;
  _framesThisSecond;
  _fps;


  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  get fps() {
    if (this._lastFrame > this._lastFpsUpdate + MILLISECONDS) {
      this._fps = 0.25 * this._framesThisSecond + 0.75 * this._fps;
      this._lastFpsUpdate = this._lastFrame;
      this._framesThisSecond = 0;
    }
    return this._fps;
  }

  /**
   * Engine
   * @constructor
   */
  constructor(config) {
    this._logService = new LogService(this.constructor.name);
    this._running = false;
    this._display = new Display();
    this._fps = FPS;
    this._fpsElement = document.getElementById('fps');
    this._init(config);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   *
   */
  start() {
    if (!this._running) {
      this._currentTick = 0;
      this._running = true;
      this._frameId = requestAnimationFrame((timestamp) => {
        this._lastFrame = timestamp;
        this._lastFpsUpdate = timestamp;
        this._framesThisSecond = 0;
        this._frameId = requestAnimationFrame((timestamp) =>
          this._tick(timestamp));
      });
    }

  }

  /**
   *
   */
  stop() {
    this._running = false;
    cancelAnimationFrame(this._frameId);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
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
   *
   * @private
   */
  _tick(timestamp) {
    const NOW = timestamp;

    if (this._currentTick < 1) {
      this._currentTick++;
      if (NOW > this._lastFrame + FRAME_DURATION) {
        this._update(NOW);
        this._render(NOW);
        // this._framesThisSecond++;
        // this._fpsElement.textContent = Math.round(this.fps) + ' FPS';
        this._lastFrame = NOW;
      }
      this._frameId = requestAnimationFrame((timestamp) => {
        this._tick(timestamp);
      });

    }
  }

  /**
   *
   * @param delta
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
   *
   * @param interpolation
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

    // this._display.render(CELLS);
  }

  /**
   *
   * @private
   * @returns {*}
   */
  _timestamp() {
    return window.performance && window.performance.now ?
      window.performance.now() : new Date().getTime();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @static
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
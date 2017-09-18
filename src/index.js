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
import SystemManager from './system-manager';
import { FRAME_DURATION } from './constants';
import timestamp from './utility/timestamp';

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

  _entityManager;
  _componentManager;
  _assemblageManager;
  _systemManager;
  _inputHandler;
  _display;

  _running;
  _locked;

  _lastFrame;
  _frameId;

  _currentTick;
  _lastUpdate;
  _updateDuration;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Engine
   * @constructor
   * @param { object } configuration - configuration for the engine
   */
  constructor() {
    this._logService = LogService.create(this.constructor.name);
    this._running = false;
    this._currentTick = 0;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Starts the engine
   */
  start() {
    if (!this._running) {
      this._running = true;
      this._lastUpdate = timestamp();
      this._frameId = requestAnimationFrame((raf) => {
        this._lastFrame = raf;
        this._frameId = requestAnimationFrame((raf) =>
          this._tick(raf));
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

  /**
   * Pauses the engine
   */
  pause() {
    if (this._running) {
      this.stop();
    } else {
      this.start();
    }
  }

  /**
   * Loads the game configuration into the engine
   * @private
   * @param { object } configuration - configuration for the engine
   */
  load(configuration) {
    if (this._running) {
      throw new Error('Cannot load new configuration while game is running');
    }
    this._inputHandler = configuration.INPUT_HANDLER;
    this._display = configuration.DISPLAY;
    this._entityManager = EntityManager.create();
    this._componentManager = ComponentManager.create(configuration.COMPONENTS);
    this._assemblageManager = AssemblageManager.create(configuration.ASSEMBLAGES, this._entityManager, this._componentManager);
    this._systemManager = SystemManager.create(configuration.SYSTEMS, this._assemblageManager);
    configuration.STATE.forEach((assemblage) => {
      this._assemblageManager.createAssemblage(assemblage.type, assemblage.state);
    });
    this._display.render(this._componentManager);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Initializes the engine
   * @private
   * @param { object } configuration - configuration for the engine
   */


  /**
   * The main game loop
   * @private
   * @param { float } timestamp - the timestamp for the current animation frame
   */
  _tick(raf) {
    const START = timestamp();
    const INPUT_STATE = this._inputHandler.state;

    if (START > this._lastFrame + FRAME_DURATION) {
      this._update(START);
      this._render(START);
      this._lastFrame = timestamp();
      this._currentTick++;
      this._sendDebugInfo();

    }
    this._frameId = requestAnimationFrame((raf) => {
      this._tick(raf);
    });
  }

  /**
   * Runs the update loop on all systems
   * @param { float } delta - the amount of time since last update
   * @private
   */
  _update() {
    let delta = timestamp() - this._lastUpdate;

    while (delta >= FRAME_DURATION) {
      this._systemManager.update(this._currentTick);
      // for (const KEY in this._systems) {
      //   if (this._systems.hasOwnProperty(KEY)) {
      //     const SYSTEM = this._systems[KEY];
      //
      //     SYSTEM.update(this._assemblageManager);
      //   }
      // }
      delta -= FRAME_DURATION;
      this._lastUpdate = timestamp();
    }
  }

  /**
   * Runs the render loop on all entities
   * @param { float } delta - the amount of time since last update
   * @private
   */
  _render(delta) {
    this._display.render(this._componentManager);
  }

  _sendDebugInfo() {
    const PRECISION = 5;
    const MESSAGE = {
      subject: 'DIAGNOSTICS',
      body: {
        tick: this._currentTick,
        lastUpdate: this._lastUpdate.toPrecision(PRECISION),
        updateDuration: this._updateDuration,
        entities: 0,
        components: 0,
        assemblages: this._assemblageManager.assemblages,
        systems: 0
      }
    };

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

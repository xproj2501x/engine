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
import Display from './display';
import { ASSEMBLAGE_TYPES } from '../dist/js/game/assemblages';
import { COMPONENT_TYPES } from '../dist/js/game/components';
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
  _messageService;

  _systems;
  _assemblageManager;
  _systemManager;
  _display;

  _running;

  _lastFrame;
  _frameId;

  _currentTick;
  _lastUpdate;
  _updateDuration;
  _entities;
  _components;
  _assemblages;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Engine
   * @constructor
   * @param { object } configuration - configuration for the engine
   */
  constructor(messageService, configuration) {
    this._logService = LogService.create(this.constructor.name);
    this._messageService = messageService;
    this._messageService.subscribe('INPUT', (message) => this.handleInput(message));
    this._running = false;
    this._display = new Display(messageService);
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

  handleInput(message) {
    console.log(message);
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


    this._assemblageManager = AssemblageManager.create(configuration.ASSEMBLAGES, ENTITY_MANAGER, COMPONENT_MANAGER);
    this._systemManager = SystemManager.create(configuration.SYSTEMS, this._assemblageManager);
    configuration.STATE.forEach((assemblage) => {
      this._assemblageManager.createAssemblage(assemblage.type, assemblage.state);
    });
  }

  /**
   * The main game loop
   * @private
   * @param { float } timestamp - the timestamp for the current animation frame
   */
  _tick(raf) {
    const START = timestamp();

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
    const CELLS = this._assemblageManager.findAssemblagesOfType(ASSEMBLAGE_TYPES.CREATURE_ASSEMBLAGE);
    const SPRITES = [];

    this._display.render(CELLS);
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

    this._messageService.publish(MESSAGE);
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
  static create(messageService, configuration) {
    return new Engine(messageService, configuration);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Engine;

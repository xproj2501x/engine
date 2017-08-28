/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Imperium 4X (Shared) - Log Service
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * ===
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module logService
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////


var _log = __webpack_require__(8);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

var LEVEL = {
  LOG: 'LOG',
  WARN: 'WARN',
  INFO: 'INFO',
  ERROR: 'ERROR'
};

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * LogService
 * @class
 * @memberof module:logService
 */

var LogService = function () {

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * LogService
   * @constructor
   * @param { string } context - the name of the constructor for the calling class
   */


  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The name of the constructor for the calling class
   * @private
   * @type { string }
   */
  function LogService(context) {
    _classCallCheck(this, LogService);

    this._log = new _log2.default();
    this._context = context;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Public Methods
  ////////////////////////////////////////////////////////////////////////////////
  /**
   *
   * @param { string } message
   */


  /**
   *
   * @private
   * @type { module:logService.Log }
   */


  _createClass(LogService, [{
    key: 'log',
    value: function log(message) {
      this._write(LEVEL.LOG, message);
    }

    /**
     *
     * @param { string } message
     */

  }, {
    key: 'warn',
    value: function warn(message) {
      this._write(LEVEL.WARN, message);
    }

    /**
     *
     * @param { string } message
     */

  }, {
    key: 'info',
    value: function info(message) {
      this._write(LEVEL.INFO, message);
    }

    /**
     *
     * @param { string } message
     */

  }, {
    key: 'error',
    value: function error(message) {
      this._write(LEVEL.ERROR, message);
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Private Methods
    ////////////////////////////////////////////////////////////////////////////////
    /**
    *
    * @param { string } level
    * @param { string } message
    */

  }, {
    key: '_write',
    value: function _write(level, message) {
      if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) === 'object') {
        this._log.write('[' + this._context + '] ' + level + ':');
        this._log.write(JSON.stringify(message));
      } else {
        this._log.write('[' + this._context + '] ' + level + ': ' + message);
      }
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Static Methods
    ////////////////////////////////////////////////////////////////////////////////
    /**
     * Static factory method
     * @param { string } context - the name of the constructor for the calling class
     * @return {module:logService.LogService}
     */

  }], [{
    key: 'create',
    value: function create(context) {
      return new LogService(context);
    }
  }]);

  return LogService;
}();

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////


exports.default = LogService;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var COMPONENT_TYPES = exports.COMPONENT_TYPES = {
  HEALTH_COMPONENT: 'HEALTH_COMPONENT',
  TIME_COMPONENT: 'TIME_COMPONENT',
  POSITION_COMPONENT: 'POSITION_COMPONENT',
  SPRITE_COMPONENT: 'SPRITE_COMPONENT',
  ANIMATION_COMPONENT: 'ANIMATION_COMPONENT'
};

var COMPONENTS = exports.COMPONENTS = {
  HEALTH_COMPONENT: {
    ID: 0,
    STATE: {
      MAX_HEALTH: 'MAX_HEALTH',
      CURRENT_HEALTH: 'CURRENT_HEALTH'
    },
    DEFAULTS: {
      MAX_HEALTH: 0,
      CURRENT_HEALTH: 0
    }
  },
  TIME_COMPONENT: {
    ID: 1,
    STATE: {
      TIME: 'TIME'
    },
    DEFAULTS: {
      TIME: 0
    }
  },
  POSITION_COMPONENT: {
    ID: 2,
    STATE: {
      X_POSITION: 'X_POSITION',
      Y_POSITION: 'Y_POSITION'
    },
    DEFAULTS: {
      X_POSITION: 0,
      Y_POSITION: 0
    }
  },
  SPRITE_COMPONENT: {
    ID: 3,
    STATE: {
      X_POSITION: 'X_POSTION',
      Y_POSITION: 'Y_POSTION'
    },
    DEFAULTS: {
      X_POSITION: 0,
      Y_POSITION: 0
    }
  },
  ANIMATION_COMPONENT: {
    ID: 4,
    STATE: {
      SPEED: 'SPEED',
      FRAME: 'FRAME',
      LENGTH: 'LENGTH'
    }
  }
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ASSEMBLAGES = exports.ASSEMBLAGE_TYPES = undefined;

var _components = __webpack_require__(1);

var ASSEMBLAGE_TYPES = exports.ASSEMBLAGE_TYPES = {
  CELL_ASSEMBLAGE: 'CELL_ASSEMBLAGE',
  TIME_ASSEMBLAGE: 'TIME_ASSEMBLAGE'
};

var ASSEMBLAGES = exports.ASSEMBLAGES = {
  CELL_ASSEMBLAGE: {
    COMPONENTS: [_components.COMPONENT_TYPES.HEALTH_COMPONENT, _components.COMPONENT_TYPES.POSITION_COMPONENT],
    DEFAULTS: {
      HEALTH_COMPONENT: {
        MAX_HEALTH: 0,
        CURRENT_HEALTH: 0
      }
    }

  },
  TIME_ASSEMBLAGE: {
    COMPONENTS: [_components.COMPONENT_TYPES.TIME_COMPONENT]
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

var _components = __webpack_require__(1);

var _assemblages = __webpack_require__(2);

var _systems = __webpack_require__(5);

var _src = __webpack_require__(9);

var _src2 = _interopRequireDefault(_src);

var _game = __webpack_require__(16);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  var HREF = window.location;
  var DEBUG = HREF.search === '?DEBUG';
  var GAME = new _game2.default();
  var CONFIG = {
    COMPONENTS: _components.COMPONENTS,
    ASSEMBLAGES: _assemblages.ASSEMBLAGES,
    SYSTEMS: _systems.SYSTEMS,
    STATE: GAME.create()
  };
  var ENGINE = _src2.default.create(CONFIG);

  if (DEBUG) {
    var element = document.getElementById('debug');
    element.classList.toggle('hidden');
  }
  ENGINE.start();
})();

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SYSTEMS = undefined;

var _updateSystem = __webpack_require__(6);

var _updateSystem2 = _interopRequireDefault(_updateSystem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SYSTEMS = exports.SYSTEMS = {
  UPDATE_SYSTEM: new _updateSystem2.default()
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _system = __webpack_require__(7);

var _system2 = _interopRequireDefault(_system);

var _assemblages = __webpack_require__(2);

var _components = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Game - Update System
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * ===
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @module updateSystem
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
var TIME_STATE = _components.COMPONENTS.TIME_COMPONENT.STATE;
var POSITION_STATE = _components.COMPONENTS.POSITION_COMPONENT.STATE;
var HEALTH_STATE = _components.COMPONENTS.HEALTH_COMPONENT.STATE;

var DIRECTIONS = [[-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0]];
////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * UpdateSystem
 * @class
 * @extends module:engine.System
 * @memberof module:game
 */

var UpdateSystem = function (_System) {
  _inherits(UpdateSystem, _System);

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  function UpdateSystem() {
    _classCallCheck(this, UpdateSystem);

    var _this = _possibleConstructorReturn(this, (UpdateSystem.__proto__ || Object.getPrototypeOf(UpdateSystem)).call(this));

    _this._flaggedForUpdate = [];
    return _this;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Runs the update routine
   * @param { module:engine.AssemblageManager } assemblages - the assemblage manager
   */


  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////


  _createClass(UpdateSystem, [{
    key: "update",
    value: function update(assemblages) {
      var TIME_ASSEMBLAGE = assemblages.findAssemblagesOfType(_assemblages.ASSEMBLAGE_TYPES.TIME_ASSEMBLAGE)[0];
      var TIME_COMPONENT = TIME_ASSEMBLAGE.findComponent(_components.COMPONENT_TYPES.TIME_COMPONENT);
      var TIME = TIME_COMPONENT.state.TIME++;

      if (TIME % 10 === 0) {
        var CELLS = assemblages.findAssemblagesOfType(_assemblages.ASSEMBLAGE_TYPES.CELL_ASSEMBLAGE);
        var GRID = this._createGrid(CELLS);

        // this._findNeighbors(GRID);
        //   this._flaggedForUpdate.forEach((cell) => {
        //     this._changeState(cell);
        //   });
      }
    }

    //////////////////////////////////////////////////////////////////////////////
    // Private Methods
    //////////////////////////////////////////////////////////////////////////////

  }, {
    key: "_createGrid",
    value: function _createGrid(cells) {
      var GRID = [];

      for (var KEY in cells) {
        var CELL = cells[KEY];
        var POSITION = CELL.findComponent(_components.COMPONENT_TYPES.POSITION_COMPONENT);
        var X_POSITION = POSITION.getProperty(POSITION_STATE.X_POSITION);
        var Y_POSITION = POSITION.getProperty(POSITION_STATE.Y_POSITION);

        if (!GRID[X_POSITION]) {
          GRID[X_POSITION] = [];
        }
        GRID[X_POSITION][Y_POSITION] = CELL;
      }
      return GRID;
    }
  }, {
    key: "_findNeighbors",
    value: function _findNeighbors(grid) {
      var _this2 = this;

      var _loop = function _loop(idx) {
        var COLUMN = grid[idx];

        var _loop2 = function _loop2(jdx) {
          var CELL = grid[idx][jdx];
          var neighbors = 0;

          DIRECTIONS.forEach(function (direction) {
            var X_POSITION = idx + direction[0];
            var Y_POSITION = idx + direction[1];

            if (X_POSITION >= 0 && X_POSITION < grid.length && Y_POSITION >= 0 && Y_POSITION < COLUMN.length) {
              var NEIGHBOR = grid[X_POSITION][Y_POSITION];
              var HEALTH_COMPONENT = NEIGHBOR.findComponent(_components.COMPONENT_TYPES.HEALTH_COMPONENT);

              if (HEALTH_COMPONENT.getProperty(HEALTH_STATE.CURRENT_HEALTH) === 1) {
                neighbors++;
              }
            }
          });

          _this2._checkState(CELL, neighbors);
        };

        for (var jdx = 0; jdx < COLUMN.length; jdx++) {
          _loop2(jdx);
        }
      };

      for (var idx = 0; idx < grid.length; idx++) {
        _loop(idx);
      }
    }
  }, {
    key: "_checkState",
    value: function _checkState(cell, neighbors) {
      var HEALTH_COMPONENT = cell.findComponent(_components.COMPONENT_TYPES.HEALTH_COMPONENT);
      var ALIVE = HEALTH_COMPONENT.getProperty(HEALTH_STATE.CURRENT_HEALTH);

      if (neighbors < 2 && ALIVE === 1) {
        this._flaggedForUpdate.push(cell);
      } else if (neighbors === 3 && ALIVE === 0) {
        this._flaggedForUpdate.push(cell);
      } else if (neighbors > 3 && ALIVE) {
        this._flaggedForUpdate.push(cell);
      }
    }
  }, {
    key: "_changeState",
    value: function _changeState(cell) {
      var HEALTH = cell.findComponent(_components.COMPONENT_TYPES.HEALTH_COMPONENT);
      var VALUE = HEALTH.getProperty(HEALTH_STATE.CURRENT_HEALTH);
      var update = void 0;

      if (VALUE === 1) {
        update = 0;
      } else {
        update = 1;
      }
      HEALTH.update({ CURRENT_HEALTH: update });
    }
  }]);

  return UpdateSystem;
}(_system2.default);

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////


exports.default = UpdateSystem;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Engine - System
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * ===
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module system
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////


var _log = __webpack_require__(0);

var _log2 = _interopRequireDefault(_log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * System
 * @class
 * @memberof module:engine
 */
var System = function () {

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  function System() {
    _classCallCheck(this, System);

    this._logService = _log2.default.create(this.constructor.name);
  }
  ////////////////////////////////////////////////////////////////////////////////
  // Public Methods
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Runs the update routine
   * @param { module:engine.AssemblageManager } assemblages - the assemblage manager
   */


  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type { module:logService.LogService }
   */


  _createClass(System, [{
    key: 'update',
    value: function update(assemblages) {
      throw new Error('Error: update method called from base class');
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Private Methods
    ////////////////////////////////////////////////////////////////////////////////

  }]);

  return System;
}();

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////


exports.default = System;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Imperium 4X (Shared) - Log
 * ===
 *
 * @module log
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
var instance = null;

var LEVEL = {
  LOG: 'LOG',
  WARN: 'WARN',
  INFO: 'INFO',
  ERROR: 'ERROR'
};

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * LogService
 * @class
 * @memberof module:logService
 */

var Log = function () {

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  function Log() {
    _classCallCheck(this, Log);

    this._log = [];

    if (!instance) {
      instance = this;
    }
    return instance;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type { Array }
   */


  _createClass(Log, [{
    key: 'write',
    value: function write(msg) {
      this._log.push(msg);
      console.log(msg);
    }
    ////////////////////////////////////////////////////////////////////////////////
    // Public Methods
    ////////////////////////////////////////////////////////////////////////////////

  }, {
    key: 'clear',
    value: function clear() {
      this._log = [];
    }

    ////////////////////////////////////////////////////////////////////////////////
    // Private Methods
    ////////////////////////////////////////////////////////////////////////////////

  }]);

  return Log;
}();

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////


exports.default = Log;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Engine - Engine
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * ===
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module engine
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////


var _log = __webpack_require__(0);

var _log2 = _interopRequireDefault(_log);

var _entityManager = __webpack_require__(10);

var _entityManager2 = _interopRequireDefault(_entityManager);

var _componentManager = __webpack_require__(12);

var _componentManager2 = _interopRequireDefault(_componentManager);

var _assemblageManager = __webpack_require__(14);

var _assemblageManager2 = _interopRequireDefault(_assemblageManager);

var _display = __webpack_require__(18);

var _display2 = _interopRequireDefault(_display);

var _assemblages = __webpack_require__(2);

var _components = __webpack_require__(1);

var _constants = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
var Engine = function () {
  _createClass(Engine, [{
    key: 'fps',


    //////////////////////////////////////////////////////////////////////////////
    // Public Properties
    //////////////////////////////////////////////////////////////////////////////
    get: function get() {
      if (this._lastFrame > this._lastFpsUpdate + _constants.MILLISECONDS) {
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


    //////////////////////////////////////////////////////////////////////////////
    // Private Properties
    //////////////////////////////////////////////////////////////////////////////

  }]);

  function Engine(config) {
    _classCallCheck(this, Engine);

    this._logService = new _log2.default(this.constructor.name);
    this._running = false;
    this._display = new _display2.default();
    this._fps = _constants.FPS;
    this._fpsElement = document.getElementById('fps');
    this._init(config);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   *
   */


  _createClass(Engine, [{
    key: 'start',
    value: function start() {
      var _this = this;

      if (!this._running) {
        this._currentTick = 0;
        this._running = true;
        this._frameId = requestAnimationFrame(function (timestamp) {
          _this._lastFrame = timestamp;
          _this._lastFpsUpdate = timestamp;
          _this._framesThisSecond = 0;
          _this._frameId = requestAnimationFrame(function (timestamp) {
            return _this._tick(timestamp);
          });
        });
      }
    }

    /**
     *
     */

  }, {
    key: 'stop',
    value: function stop() {
      this._running = false;
      cancelAnimationFrame(this._frameId);
    }

    //////////////////////////////////////////////////////////////////////////////
    // Private Methods
    //////////////////////////////////////////////////////////////////////////////

  }, {
    key: '_init',
    value: function _init(configuration) {
      var _this2 = this;

      var ENTITY_MANAGER = _entityManager2.default.create();
      var COMPONENT_MANAGER = _componentManager2.default.create(configuration.COMPONENTS);

      this._systems = configuration.SYSTEMS;
      this._assemblageManager = _assemblageManager2.default.create(configuration.ASSEMBLAGES, ENTITY_MANAGER, COMPONENT_MANAGER);

      configuration.STATE.forEach(function (assemblage) {
        _this2._assemblageManager.createAssemblage(assemblage.type, assemblage.state);
      });
    }

    /**
     *
     * @private
     */

  }, {
    key: '_tick',
    value: function _tick(timestamp) {
      var _this3 = this;

      var NOW = timestamp;

      if (this._currentTick < 1) {
        this._currentTick++;
        if (NOW > this._lastFrame + _constants.FRAME_DURATION) {
          this._update(NOW);
          this._render(NOW);
          // this._framesThisSecond++;
          // this._fpsElement.textContent = Math.round(this.fps) + ' FPS';
          this._lastFrame = NOW;
        }
        this._frameId = requestAnimationFrame(function (timestamp) {
          _this3._tick(timestamp);
        });
      }
    }

    /**
     *
     * @param delta
     * @private
     */

  }, {
    key: '_update',
    value: function _update(delta) {
      while (delta >= _constants.FRAME_DURATION) {
        for (var KEY in this._systems) {
          if (this._systems.hasOwnProperty(KEY)) {
            var SYSTEM = this._systems[KEY];

            SYSTEM.update(this._assemblageManager);
          }
        }
        delta -= _constants.FRAME_DURATION;
      }
    }

    /**
     *
     * @param interpolation
     * @private
     */

  }, {
    key: '_render',
    value: function _render(delta) {
      var CELLS = this._assemblageManager.findAssemblagesOfType(_assemblages.ASSEMBLAGE_TYPES.CELL_ASSEMBLAGE);
      var SPRITES = [];

      CELLS.forEach(function (cell) {
        var HEALTH = cell.findComponent(_components.COMPONENT_TYPES.HEALTH_COMPONENT);

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

  }, {
    key: '_timestamp',
    value: function _timestamp() {
      return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
    }

    //////////////////////////////////////////////////////////////////////////////
    // Static Methods
    //////////////////////////////////////////////////////////////////////////////
    /**
     * Static factory method
     * @static
     * @return { module:engine.Engine }
     */

  }], [{
    key: 'create',
    value: function create(configuration) {
      return new Engine(configuration);
    }
  }]);

  return Engine;
}();

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////


exports.default = Engine;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Engine - Entity Manager
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * ===
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module entityManager
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////


var _log = __webpack_require__(0);

var _log2 = _interopRequireDefault(_log);

var _entity = __webpack_require__(11);

var _entity2 = _interopRequireDefault(_entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * EntityManager
 * @class
 * @memberof module:engine
 */
var EntityManager = function () {
  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * EntityManager
   * @constructor
   */


  /**
   * Collection of entities
   * @private
   * @type { Array }
   */
  function EntityManager() {
    _classCallCheck(this, EntityManager);

    this._logService = _log2.default.create(this.constructor.name);
    this._nextId = 0;
    this._entities = [];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates a new entity
   * @return { module:engine.Entity }
   */


  /**
   * The id to be assigned to the next entity created
   * @private
   * @type { int }
   */


  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type { module:logService.LogService }
   */


  _createClass(EntityManager, [{
    key: 'createEntity',
    value: function createEntity() {
      var ENTITY = _entity2.default.create(this._nextId);

      this._nextId++;
      this._entities.push(ENTITY);
      return ENTITY;
    }

    /**
     * Finds an entity with the specified id
     * @param { int } id - The id of the entity to be retrieved
     * @return { module:engine.Entity }
     */

  }, {
    key: 'findEntity',
    value: function findEntity(id) {
      // eslint-disable-line id-length
      var Entity = this._entities.find(function (entity) {
        if (entity.id === id) {
          return entity;
        }
        return null;
      });

      if (!Entity) {
        throw new Error('Entity id ' + id + ' not found');
      }
      return Entity;
    }

    /**
     * Removes an entity
     * @param { string } id - The id of the entity to be deleted
     */

  }, {
    key: 'removeEntity',
    value: function removeEntity(id) {
      // eslint-disable-line id-length
      try {
        var ENTITY = this.findEntity(id);
        var INDEX = this._entities.indexOf(ENTITY);

        this._entities.splice(INDEX, 1);
      } catch (err) {
        throw err;
      }
    }

    //////////////////////////////////////////////////////////////////////////////
    // Static Methods
    //////////////////////////////////////////////////////////////////////////////
    /**
     * Static factory method
     * @static
     * @return { module:engine.EntityManager }
     */

  }], [{
    key: 'create',
    value: function create() {
      return new EntityManager();
    }
  }]);

  return EntityManager;
}();

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////


exports.default = EntityManager;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Engine - Entity
 * ===
 *
 * @module entity
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * Entity
 * @class
 * @memberof module:engine
 */
var Entity = function () {
  _createClass(Entity, [{
    key: "id",


    //////////////////////////////////////////////////////////////////////////////
    // Public Properties
    //////////////////////////////////////////////////////////////////////////////

    /**
     * Get _id
     * @readonly
     * @return { int }
     */


    //////////////////////////////////////////////////////////////////////////////
    // Private Properties
    //////////////////////////////////////////////////////////////////////////////
    /**
     * The id of the entity
     * @private
     * @type { int }
     */
    get: function get() {
      // eslint-disable-line id-length
      return this._id;
    }

    /**
     * Entity
     * @constructor
     */


    /**
     * The components currently attached to the entity
     * @private
     * @type { object }
     */

  }]);

  function Entity(id) {
    _classCallCheck(this, Entity);

    // eslint-disable-line id-length
    this._id = id;
    this._components = {};
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Attaches a component to the entity
   * @param { string } type - the component type to be attached
   * @param { module:engine.Component } component - the component to be attached
   */


  _createClass(Entity, [{
    key: "attachComponent",
    value: function attachComponent(type, component) {
      if (this._components[type]) {
        throw new Error("Component type " + type + " already attached to entity " + this._id);
      }
      this._components[type] = component;
    }

    /**
     * Detaches a component currently attached to the entity
     * @param { string } type - the component type to be detached
     */

  }, {
    key: "detachComponent",
    value: function detachComponent(type) {
      if (!this._components[type]) {
        throw new Error("Component type " + type + " is not attached to entity " + this._id);
      }
      delete this._components[type];
    }

    /**
     * Finds a component attached to the entity
     * @param { string } type - the type of component to be retrieved
     * @return { module:engine.Component }
     */

  }, {
    key: "findComponent",
    value: function findComponent(type) {
      if (!this._components[type]) {
        throw new Error("Component type " + type + " is not attached to entity " + this._id);
      }
      return this._components[type];
    }

    //////////////////////////////////////////////////////////////////////////////
    // Static Methods
    //////////////////////////////////////////////////////////////////////////////
    /**
     * Static factory method
     * @static
     * @param { int } id - the id number for the entity
     * @return {module:engine.Entity}
     */

  }], [{
    key: "create",
    value: function create(id) {
      // eslint-disable-line id-length
      return new Entity(id);
    }
  }]);

  return Entity;
}();

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////


exports.default = Entity;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Engine - Component Manager
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * ===
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module componentManager
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////


var _log = __webpack_require__(0);

var _log2 = _interopRequireDefault(_log);

var _component = __webpack_require__(13);

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * ComponentManager
 * @class
 * @memberof module:engine
 */
var ComponentManager = function () {

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * ComponentManager
   * @constructor
   * @param { object } templates - a collection of component templates
   */


  /**
   * Collection of component templates
   * @private
   * @type { object }
   */
  function ComponentManager(templates) {
    _classCallCheck(this, ComponentManager);

    this._logService = _log2.default.create(this.constructor.name);
    this._templates = templates;
    this._components = [];
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates a new component of the specified type
   * @param { int } id - the id number of the parent entity
   * @param { string } type - the type of component to be created
   * @param { object } state - the initial state of the component to be created
   * @return { module:engine.Component }
   */


  /**
   * Collection of components
   * @private
   * @type { Array }
   */


  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type { module:logService.LogService }
   */


  _createClass(ComponentManager, [{
    key: 'createComponent',
    value: function createComponent(id, type, state) {
      // eslint-disable-line id-length
      var TEMPLATE = this._findTemplate(type);
      var STATE = this._buildState(TEMPLATE.DEFAULTS, state);

      var DATA = {
        id: id, // eslint-disable-line id-length
        type: type,
        keys: TEMPLATE.STATE,
        state: STATE
      };
      var COMPONENT = _component2.default.create(DATA);

      this._components.push(COMPONENT);
      return COMPONENT;
    }

    /**
     * Finds a component with the specified id
     * @param { string } id - the id of the component to be retrieved
     * @return { Component }
     */

  }, {
    key: 'findComponent',
    value: function findComponent(id) {
      // eslint-disable-line id-length
      var COMPONENT = this._components.find(function (component) {
        if (component.id === id) {
          return component;
        }
        return null;
      });

      if (!COMPONENT) {
        throw new Error('Component id ' + id + ' not found');
      }
      return COMPONENT;
    }

    /**
     * Finds all components of the specified type
     * @param { string } type - the type of components to be retrieved
     * @return { Array}
     */

  }, {
    key: 'findComponentsOfType',
    value: function findComponentsOfType(type) {
      var COMPONENTS = this._components.filter(function (component) {
        return component.type === type;
      });

      return COMPONENTS;
    }

    /**
     * Removes a component with the specified id
     * @param { string } id - the id of the component to be removed
     */

  }, {
    key: 'removeComponent',
    value: function removeComponent(id) {
      // eslint-disable-line id-length
      try {
        var COMPONENT = this.findComponent(id);
        var INDEX = this._components.indexOf(COMPONENT);

        this._components.splice(INDEX, 1);
      } catch (err) {
        throw err;
      }
    }

    //////////////////////////////////////////////////////////////////////////////
    // Private Methods
    //////////////////////////////////////////////////////////////////////////////

    /**
     * Adds a component template to the collection
     * @private
     * @param { object } template - the template to be added
     */

  }, {
    key: '_addTemplate',
    value: function _addTemplate(template) {
      var NAME = template.name;
      var KEYS = template.keys;

      if (this._templates[NAME]) {
        throw new Error('Component template ' + NAME + ' already exists');
      }
      this._templates[NAME] = KEYS;
    }

    /**
     * Finds a template for the specified component type
     * @private
     * @param { string } type - the type of template to be retrieved
     * @return { Component }
     */

  }, {
    key: '_findTemplate',
    value: function _findTemplate(type) {
      if (!this._templates[type]) {
        throw new Error('Component template ' + type + ' not found');
      }
      return this._templates[type];
    }
  }, {
    key: '_buildState',
    value: function _buildState(defaults, custom) {
      if (custom) {
        for (var KEY in custom) {
          if (custom.hasOwnProperty(KEY)) {
            defaults[KEY] = custom[KEY];
          }
        }
      }
      return defaults;
    }
    //////////////////////////////////////////////////////////////////////////////
    // Static Methods
    //////////////////////////////////////////////////////////////////////////////
    /**
     * Static factory method
     * @static
     * @param { object } templates - the configuration to be used when creating the component manager
     * @return { module:engine.ComponentManager }
     */

  }], [{
    key: 'create',
    value: function create(templates) {
      return new ComponentManager(templates);
    }
  }]);

  return ComponentManager;
}();

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////


exports.default = ComponentManager;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Engine - Component
 * ===
 *
 * @module component
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * Component
 * @class
 * @memberof module:engine
 */
var Component = function () {
  _createClass(Component, [{
    key: 'id',


    //////////////////////////////////////////////////////////////////////////////
    // Public Properties
    //////////////////////////////////////////////////////////////////////////////
    /**
     * Get _id
     * @readonly
     * @return { string }
     */


    /**
     * The type of the component
     * @private
     * @type { string }
     */
    get: function get() {
      // eslint-disable-line id-length
      return this._id;
    }

    /**
     * Get _type
     * @readonly
     * @return { string }
     */


    /**
     * The state properties of the component
     * @private
     * @type { object }
     */


    //////////////////////////////////////////////////////////////////////////////
    // Static Properties
    //////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////
    // Private Properties
    //////////////////////////////////////////////////////////////////////////////
    /**
     * The id of the parent entity
     * @private
     * @type { int }
     */

  }, {
    key: 'type',
    get: function get() {
      return this._type;
    }

    /**
     * Get _state
     * @readonly
     * @return { object }
     */

  }, {
    key: 'state',
    get: function get() {
      return this._state;
    }

    /**
     * Component
     * @constructor
     * @param { int } id - the id of the parent entity
     * @param { string } type - the type of the component to be created
     * @param { enum } keys - the keys for the component type
     * @param { object } state - the initial state of the component
     */

  }]);

  function Component(id, type, keys, state) {
    _classCallCheck(this, Component);

    // eslint-disable-line id-length
    if (type === null) {
      throw new Error('Component type cannot be null');
    }
    this._id = id;
    this._type = type;
    this._init(keys);
    this.update(state);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Gets the specificed property of the component state
   * @param { string } key - the key for the property to be retrieved
   * @return { object }
   */


  _createClass(Component, [{
    key: 'getProperty',
    value: function getProperty(key) {
      if (!this._state.hasOwnProperty(key)) {
        throw new Error('Invalid property ' + key + ' for component type ' + this._type);
      }
      return this._state[key];
    }

    /**
     * Updates the state of the component with new values
     * @param { object } state - the new state of the component
     */

  }, {
    key: 'update',
    value: function update(state) {
      for (var KEY in state) {
        if (state.hasOwnProperty(KEY)) {
          var VALUE = state[KEY];

          try {
            this._setProperty(KEY, VALUE);
          } catch (err) {
            throw err;
          }
        }
      }
    }

    //////////////////////////////////////////////////////////////////////////////
    // Private Methods
    //////////////////////////////////////////////////////////////////////////////
    /**
     * Sets the keys for the component state
     * @private
     * @param { enum } keys - the keys for the state of the of the component
     */

  }, {
    key: '_init',
    value: function _init(state) {
      this._state = {};
      for (var KEY in state) {
        this._state[state[KEY]] = null;
      }
    }

    /**
     * Sets the value of the specified property
     * @private
     * @param { string } key - the key of the property to be changed
     * @param { string } value - the value of the property to be changed
     */

  }, {
    key: '_setProperty',
    value: function _setProperty(key, value) {
      if (!this._state.hasOwnProperty(key)) {
        throw new Error('Invalid property ' + key + ' for component type ' + this._type);
      }
      this._state[key] = value;
    }

    //////////////////////////////////////////////////////////////////////////////
    // Static Methods
    //////////////////////////////////////////////////////////////////////////////
    /**
     * Static factory method
     * @static
     * @param { object } data - configuration for the component to be created
     * @return { module:engine.Component }
     */

  }], [{
    key: 'create',
    value: function create(data) {
      if (data === null) {
        throw new Error('Component configuration missing');
      }
      return new Component(data.id, data.type, data.keys, data.state);
    }
  }]);

  return Component;
}();

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////


exports.default = Component;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Engine Assemblage Manager
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * ===
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module assemblageManager
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////


var _log = __webpack_require__(0);

var _log2 = _interopRequireDefault(_log);

var _assemblage = __webpack_require__(15);

var _assemblage2 = _interopRequireDefault(_assemblage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * AssemblageManager
 * @class
 * @memberof module:engine
 */
var AssemblageManager = function () {

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * @private
   * @type { module:engine.EntityManager }
   */


  /**
   * Collection of assemblage templates
   * @private
   * @type { object }
   */
  function AssemblageManager(templates, entityManager, componentManager) {
    _classCallCheck(this, AssemblageManager);

    this._logService = _log2.default.create(this.constructor.name);
    this._templates = templates;
    this._assemblages = [];
    this._entityManager = entityManager;
    this._componentManager = componentManager;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Creates an assemblage of the specified type
   * @param { string } type
   * @param { module:engine.EntityManager } entity
   * @param { object } state
   */


  /**
   * @private
   * @type { module:engine.ComponentManager }
   */


  /**
   * Collection of assemblagess
   * @private
   * @type { Array }
   */


  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type { module:logService.LogService }
   */


  _createClass(AssemblageManager, [{
    key: 'createAssemblage',
    value: function createAssemblage(type) {
      var _this = this;

      var state = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var entity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      var TEMPLATE = this._findTemplate(type);
      var ENTITY = entity || this._entityManager.createEntity();

      TEMPLATE.COMPONENTS.forEach(function (componentType) {
        try {
          var mergedState = TEMPLATE.DEFAULTS && TEMPLATE.DEFAULTS[componentType] ? TEMPLATE.DEFAULTS[componentType] : {};

          if (state) {
            if (state.hasOwnProperty(componentType)) {
              mergedState = _this._buildState(mergedState, state[componentType]);
            }
          }
          var COMPONENT = _this._componentManager.createComponent(ENTITY.id, componentType, mergedState);

          ENTITY.attachComponent(componentType, COMPONENT);
        } catch (err) {
          _this._logService.error(err);
          throw err;
        }
      });

      console.log(ENTITY);
      var ASSEMBLAGE = _assemblage2.default.create(ENTITY, type);

      this._assemblages.push(ASSEMBLAGE);
    }

    /**
     * Finds assemblages of the specified type
     * @param { string } type - the assemblage type
     * @return
     */

  }, {
    key: 'findAssemblagesOfType',
    value: function findAssemblagesOfType(type) {
      var ASSEMBLAGES = this._assemblages.filter(function (assemblage) {
        return assemblage.type === type;
      });

      return ASSEMBLAGES;
    }
  }, {
    key: 'removeAssemblage',
    value: function removeAssemblage(type, entity) {
      try {
        var ASSEMBLAGE = this._findAssemblage(type, entity);
        var INDEX = this._assemblages.indexOf(ASSEMBLAGE);

        this._assemblages.splice(INDEX, 1);
      } catch (err) {
        this._logService.error(err);
        throw err;
      }
    }

    //////////////////////////////////////////////////////////////////////////////
    // Private Methods
    //////////////////////////////////////////////////////////////////////////////
    /**
     * Finds an assemblage with the specified type and entity
     * @private
     * @param { string } type - the assemblage type
     * @param { int } entity - the id of the entity
     * @return { module:engine.Assemblage }
     */

  }, {
    key: '_findAssemblage',
    value: function _findAssemblage(type, entity) {
      var ASSEMBLAGE = this._assemblages.find(function (assemblage) {
        var IS_TYPE = assemblage.type === type;
        var IS_ENTITY = assemblage.id === entity;

        if (IS_TYPE && IS_ENTITY) {
          return assemblage;
        }
        return null;
      });

      if (!ASSEMBLAGE) {
        throw new Error('Assemblage type ' + type + ' for entity ' + entity + ' not found');
      }
      return ASSEMBLAGE;
    }

    /**
     * Finds a template for the specified component type
     * @private
     * @param { string } type - the type of template to be retrieved
     * @return { Component }
     */

  }, {
    key: '_findTemplate',
    value: function _findTemplate(type) {
      if (!this._templates[type]) {
        throw new Error('Assemblage template ' + type + ' not found');
      }
      return this._templates[type];
    }
  }, {
    key: '_buildState',
    value: function _buildState(defaults, custom) {
      if (custom) {
        for (var KEY in custom) {
          if (custom.hasOwnProperty(KEY)) {
            defaults[KEY] = custom[KEY];
          }
        }
      }
      return defaults;
    }
    //////////////////////////////////////////////////////////////////////////////
    // Static Methods
    //////////////////////////////////////////////////////////////////////////////
    /**
     * Static factory method
     * @param { object } templates - a collection of assemblage templates
     * @param { module:engine.EntityManager } entityManager - entity manager
     * @param { module:engine.ComponentManager } componentManager - component manager
     * @return {module:engine.AssemblageManager}
     */

  }], [{
    key: 'create',
    value: function create(templates, entityManager, componentManager) {
      return new AssemblageManager(templates, entityManager, componentManager);
    }
  }]);

  return AssemblageManager;
}();

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////


exports.default = AssemblageManager;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Engine - Assemblage
 * ===
 *
 * @module assemblage
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * Assemblage
 * @class
 * @memberof module:engine
 */
var Assemblage = function () {
  _createClass(Assemblage, [{
    key: "id",

    //////////////////////////////////////////////////////////////////////////////
    // Public Properties
    //////////////////////////////////////////////////////////////////////////////

    /**
     * Get _entity.id
     * @readonly
     * @return { int }
     */


    /**
     * The assemblage type
     * @type { string }
     */
    get: function get() {
      return this._entity.id;
    }

    /**
     * Get _type
     * @readonly
     * @return { string }
     */


    /**
     * @type { boolean }
     */


    //////////////////////////////////////////////////////////////////////////////
    // Private Properties
    //////////////////////////////////////////////////////////////////////////////
    /**
     * The root entity
     * @type { module:engine.Entity }
     */

  }, {
    key: "type",
    get: function get() {
      return this._type;
    }

    /**
     * Assemblage
     * @param { module:engine.Entity } entity - the root entity for the assemblage
     * @param { string } type - the assemblage type
     */

  }]);

  function Assemblage(entity, type) {
    _classCallCheck(this, Assemblage);

    this._entity = entity;
    this._type = type;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Find component of specified type
   * @param { string } type -
   * @return { module:engine.Component }
   */


  _createClass(Assemblage, [{
    key: "findComponent",
    value: function findComponent(type) {
      try {
        return this._entity.findComponent(type);
      } catch (err) {
        this._isFlagged = true;
        throw err;
      }
    }

    //////////////////////////////////////////////////////////////////////////////
    // Private Methods
    //////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////////////////
    // Private Methods
    //////////////////////////////////////////////////////////////////////////////
    /**
     * Static factory method
     * @param { module:engine.Entity } entity - the root entity for the assemblage
     * @param { string } type - the assemblage type
     * @return {module:engine.Assemblage}
     */

  }], [{
    key: "create",
    value: function create(entity, type) {
      return new Assemblage(entity, type);
    }
  }]);

  return Assemblage;
}();

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////


exports.default = Assemblage;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Game - Game
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * ===
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module game
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////


var _components = __webpack_require__(1);

var _assemblages = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * Game
 * @class
 * @memberof module:game
 */
var Game = function () {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  function Game() {
    _classCallCheck(this, Game);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////


  _createClass(Game, [{
    key: "create",
    value: function create() {
      var ASSEMBLAGES = [];
      var HEIGHT = 10;
      var WIDTH = 10;
      var TIME_ASSEMBLAGE = {
        type: _assemblages.ASSEMBLAGE_TYPES.TIME_ASSEMBLAGE
      };

      ASSEMBLAGES.push(TIME_ASSEMBLAGE);
      var counter = 0;
      for (var idx = 0; idx < HEIGHT; idx++) {
        for (var jdx = 0; jdx < WIDTH; jdx++) {
          var ASSEMBLAGE = {};
          var POSITION_COMPONENT = {
            X_POSITION: idx,
            Y_POSITION: jdx
          };

          ASSEMBLAGE.type = _assemblages.ASSEMBLAGE_TYPES.CELL_ASSEMBLAGE;
          ASSEMBLAGE.state = {};
          ASSEMBLAGE.state[_components.COMPONENT_TYPES.POSITION_COMPONENT] = POSITION_COMPONENT;

          var ALIVE = this._isAlive();
          if (ALIVE) {
            counter++;
            ASSEMBLAGE.state[_components.COMPONENT_TYPES.HEALTH_COMPONENT] = {
              MAX_HEALTH: 0,
              CURRENT_HEALTH: 1
            };
          }
          ASSEMBLAGES.push(ASSEMBLAGE);
        }
      }
      return ASSEMBLAGES;
    }

    //////////////////////////////////////////////////////////////////////////////
    // Private Methods
    //////////////////////////////////////////////////////////////////////////////

  }, {
    key: "_isAlive",
    value: function _isAlive() {
      var MIN = 1;
      var MAX = 100;
      var CHANCE = Math.floor(Math.random() * (MAX - MIN)) + MIN;

      return CHANCE > 75;
    }
  }]);

  return Game;
}();

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////


exports.default = Game;

/***/ }),
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Engine - Display
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * ===
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @module display
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////


var _components = __webpack_require__(1);

var _constants = __webpack_require__(19);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
var UNIT = 10;
var SPACING = 1;
var SIZE = UNIT - SPACING * 2;

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * Display
 * @class
 * @memberof module:display
 */

var Display = function () {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  function Display() {
    _classCallCheck(this, Display);

    this._fps = _constants.FPS;
    this._framesThisSecond = 0;
    this._init();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////

  _createClass(Display, [{
    key: 'render',
    value: function render(sprites) {
      this._refresh();
      this._draw(sprites);
      this._lastRender = window.performance.now();
      this._framesThisSecond++;
      this._updateFps();
    }

    //////////////////////////////////////////////////////////////////////////////
    // Private Methods
    //////////////////////////////////////////////////////////////////////////////

  }, {
    key: '_init',
    value: function _init() {
      this._element = document.getElementById('root');
      this._canvas = document.createElement('canvas');
      this._element.append(this._canvas);
      this._lastFpsUpdate = window.performance.now();
      this._lastRender = window.performance.now();
      this._refresh();
    }
  }, {
    key: '_updateFps',
    value: function _updateFps() {
      var ELEMENT = document.getElementById('fps');

      if (this._lastRender > this._lastFpsUpdate + _constants.MILLISECONDS) {
        this._fps = 0.25 * this._framesThisSecond + 0.75 * this._fps;
        this._lastFpsUpdate = this._lastRender;
        this._framesThisSecond = 0;
      }

      ELEMENT.textContent = Math.round(this._fps) + ' FPS';
    }
  }, {
    key: '_refresh',
    value: function _refresh() {
      var HEIGHT = this._element.clientHeight;
      var WIDTH = this._element.clientWidth;

      this._canvas.height = HEIGHT;
      this._canvas.width = WIDTH;
    }
  }, {
    key: '_draw',
    value: function _draw(sprites) {
      var CONTEXT = this._canvas.getContext('2d');

      CONTEXT.save();
      CONTEXT.fillStyle = '#FFFFFF';
      CONTEXT.rect(0, 0, this._canvas.width, this._canvas.height);
      CONTEXT.fill();
      sprites.forEach(function (sprite) {
        var POSITION = sprite.findComponent(_components.COMPONENT_TYPES.POSITION_COMPONENT);
        var X_POSITION = POSITION.state.X_POSITION * UNIT + SPACING;
        var Y_POSITION = POSITION.state.Y_POSITION * UNIT + SPACING;

        CONTEXT.save();
        CONTEXT.fillStyle = '#FF0000';
        CONTEXT.fillRect(X_POSITION, Y_POSITION, SIZE, SIZE);
        CONTEXT.restore();
      });
      CONTEXT.restore();
    }

    //////////////////////////////////////////////////////////////////////////////
    // Static Methods
    //////////////////////////////////////////////////////////////////////////////
    /**
     * Static factory method
     * @static
     * @param { object } data - configuration for the component to be created
     * @return { module:engine.Component }
     */

  }], [{
    key: 'create',
    value: function create(data) {}
  }]);

  return Display;
}();

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////


exports.default = Display;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Engine - Constants
 * ===
 *
 */

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
/**
 * The number of milliseconds in a second
 * @type {number}
 */
var MILLISECONDS = exports.MILLISECONDS = 1000;

/**
 * The number of frames per second to display
 * @type {number}
 */
var FPS = exports.FPS = 30;

/**
 * The duration of a frame in milliseconds
 * @type { int }
 */
var FRAME_DURATION = exports.FRAME_DURATION = MILLISECONDS / FPS;

var MAX_FRAME_SKIP = exports.MAX_FRAME_SKIP = 5;

/***/ })
/******/ ]);
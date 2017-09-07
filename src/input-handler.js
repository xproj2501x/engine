/**
 * Engine - Input Handler
 * ===
 *
 * @module inputHandler
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const INPUT = {
  MOUSE_DOWN: 'mousedown',
  MOUSE_UP: 'mouseup',
  MOUSE_MOVE: 'mousemove',
  MOUSE_WHEEL: 'mousewheel',
  CONTEXT_MENU: 'contextmenu',
  KEY_DOWN: 'keydown',
  KEY_UP: 'keyup'
};

const STATE = {
  mouseDown: false,
  drag: false,
  click: false,
  xPosition: null,
  yPosition: null,
  xDown: null,
  yDown: null,
  xUp: null,
  yUp: null,
  mouseDelta: null,
  keys: []
};

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * @memberof module:ui
 */
class InputHandler {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  _element;
  _currentState;
  _states;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  get state() {
    return this._states.shift();

  }

  set state(changes) {
    const NEW_STATE = Object.assign({}, STATE, this._currentState, { mouseDelta: null }, changes);

    this._states.push(NEW_STATE);
    this._currentState = NEW_STATE;
  }

  constructor(configuration) {
    this._states = [];
    this._currentState = Object.assign({}, STATE);
    this.loadConfiguration(configuration);
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////

  loadConfiguration(configuration) {
    this._element = configuration ? document.getElementById(configuration.element) : document;
    document.addEventListener(INPUT.KEY_DOWN, (event) => this._handleKeyDown(event));
    document.addEventListener(INPUT.KEY_UP, (event) => this._handleKeyUp(event));
    this._element.addEventListener(INPUT.MOUSE_DOWN, (event) => this._handleMouseDown(event));
    this._element.addEventListener(INPUT.MOUSE_UP, (event) => this._handleMouseUp(event));
    this._element.addEventListener(INPUT.MOUSE_MOVE, (event) => this._handleMouseMove(event));
    this._element.addEventListener(INPUT.MOUSE_WHEEL, (event) => this._handleMouseWheel(event));
    document.addEventListener(INPUT.CONTEXT_MENU, (event) => { event.preventDefault(); });
  }
  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////

  _handleMouseDown(event) {
    event.preventDefault();
    if (event.button === 0) {
      this.state = {
        mouseDown: true,
        xDown: event.clientX,
        yDown: event.clientY
      };
    }
  }

  _handleMouseUp(event) {
    event.preventDefault();
    if (event.button === 0) {
      this.state = {
        mouseDown: false,
        xUp: event.clientX,
        yUp: event.clientY
      };
    }

  }

  _handleMouseMove(event) {
    event.preventDefault();
    this.state = {
      xPosition: event.clientX,
      yPosition: event.clientY
    };
  }

  _handleMouseWheel(event) {
    event.preventDefault();
    this.state = {
      mouseDelta: event.wheelDelta
    };
  }

  _handleKeyDown(event) {
    const KEYS = this._currentState.keys;
    const KEY_CODE = event.keyCode;
    const INDEX = KEYS.indexOf(KEY_CODE);

    if (INDEX === -1) {
     KEYS.push(KEY_CODE);
     this.state = {
       keys: KEYS
      };
    }

  }

  _handleKeyUp(event) {
    const KEYS = this._currentState.keys;
    const KEY_CODE = event.keyCode;
    const INDEX = KEYS.indexOf(KEY_CODE);

    if (INDEX > -1) {
      KEYS.slice(INDEX, 1);
      this.state = {
        keys: KEYS
      };
    }
  }
  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  static create(configuration) {
    return new InputHandler(configuration);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default InputHandler;

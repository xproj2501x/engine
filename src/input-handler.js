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
  MOUSE_WHEEL: 'mousewheel',
  CONTEXT_MENU: 'contextmenu',
  KEY_DOWN: 'keydown',
  KEY_UP: 'keyup'
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
  _state;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  get state() {
    return this._state;
  }

  constructor() {
    this._state = {
      mouse: {
        down: false,
        xPosition: 0,
        yPosition: 0,
        lastX: 0,
        lastY: 0,
        delta: 0
      },
      keys: []
    };

    this.loadConfiguration();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////

  loadConfiguration(configuration) {
    this._element = document.getElementById(configuration.element) || document;
    document.addEventListener(INPUT.KEY_DOWN, (event) => this._handleKeyDown(event));
    document.addEventListener(INPUT.MOUSE_DOWN, (event) => this._handleMouseDown(event));
    document.addEventListener(INPUT.MOUSE_UP, (event) => this._handleMouseUp(event));
    document.addEventListener(INPUT.MOUSE_WHEEL, (event) => this._handleMouseWheel(event));
    document.addEventListener(INPUT.CONTEXT_MENU, (event) => { event.preventDefault(); });
  }
  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  _init() {
    document.addEventListener(INPUT.KEY_DOWN, (event) => this._handleKeyDown(event));
    document.addEventListener(INPUT.MOUSE_DOWN, (event) => this._handleMouseDown(event));
    document.addEventListener(INPUT.MOUSE_UP, (event) => this._handleMouseUp(event));
    document.addEventListener(INPUT.MOUSE_WHEEL, (event) => this._handleMouseWheel(event));
    document.addEventListener(INPUT.CONTEXT_MENU, (event) => { event.preventDefault(); });
  }

  _handleMouseDown(event) {
    event.preventDefault();
    if (event.button === 0) {
      this._mouse.x = event.clientX;
      this._mouse.y = event.clientY;
      // this._messageService.publish({ subject: 'INPUT', body: {
      //   type: 'click',
      //   elementId: event.target.parentElement.id,
      //   x: this._mouse.x,
      //   y: this._mouse.y
      // }
      // });
    }
  }

  _handleMouseUp(event) {
    event.preventDefault();
    if (event.button === 0) {
      let absX = Math.abs(this._mouse.x - event.clientX);
      let absY = Math.abs(this._mouse.y - event.clientY);
      if ((absX > 10) || (absY > 10)) {
        // this._messageService.publish({
        //   subject: 'INPUT', body: {
        //     type: 'drag',
        //     elementId: event.target.parentElement.id,
        //     x1: this._mouse.x,
        //     y1: this._mouse.y,
        //     x2: event.clientX,
        //     y2: event.clientY
        //   }
        // });
      }
    }
  }

  _handleMouseWheel(event) {
    event.preventDefault();
    // this._messageService.publish({ subject: 'INPUT', body: {
    //   type: 'zoom',
    //   elementId: event.target.parentElement.id,
    //   deltaY: event.deltaY
    // } });
  }

  _handleKeyDown(event) {
    const KEY_CODE = event.keyCode;
    const INDEX = this._state.keys.indexOf(KEY_CODE);

    if (INDEX === -1) {
     this._state.keys.push(KEY_CODE);
    }
  }

  _handleKeyUp(event) {
    const KEY_CODE = event.keyCode;
    const INDEX = this._state.keys.indexOf(KEY_CODE);

    if (INDEX > -1) {
      this._state.keys.slice(INDEX, 1);
    }
  }
  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  static create() {
    return new InputHandler();
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default InputHandler;

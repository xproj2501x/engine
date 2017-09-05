/**
 * Engine - Input Handler
 * ===
 *
 * @module inputHandler
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import MessageService from '../services/message';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const INPUT = {
  MOUSE_DOWN: 'mousedown',
  MOUSE_UP: 'mouseup',
  MOUSE_WHEEL: 'mousewheel',
  CONTEXT_MENU: 'contextmenu',
  KEY_DOWN: 'keydown'
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
  _messageService;
  _element;
  _state;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  constructor(messageService) {
    this._messageService = messageService;

    this._mouse = {
      x: 0,
      y: 0
    };

    this._state = {
      mouse: {
        down: false,
        x: 0,
        y: 0
      },
      keyboard: {
        m: false,
        d: false,
        t: false,
        c: false,
        e: false
      }
    };

    this._init();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////

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
      this._messageService.publish({ subject: 'INPUT', body: {
        type: 'click',
        elementId: event.target.parentElement.id,
        x: this._mouse.x,
        y: this._mouse.y
      }
      });
    }
  }

  _handleMouseUp(event) {
    event.preventDefault();
    if (event.button === 0) {
      let absX = Math.abs(this._mouse.x - event.clientX);
      let absY = Math.abs(this._mouse.y - event.clientY);
      if ((absX > 10) || (absY > 10)) {
        this._messageService.publish({
          subject: 'INPUT', body: {
            type: 'drag',
            elementId: event.target.parentElement.id,
            x1: this._mouse.x,
            y1: this._mouse.y,
            x2: event.clientX,
            y2: event.clientY
          }
        });
      }
    }
  }

  _handleMouseWheel(event) {
    event.preventDefault();
    this._messageService.publish({ subject: 'INPUT', body: {
      type: 'zoom',
      elementId: event.target.parentElement.id,
      deltaY: event.deltaY
    } });
  }

  _handleKeyDown(event) {
    this._messageService.publish({ subject: 'INPUT',
      body: {
        type: 'keyboard',
        keyCode: event.keyCode
      } });
  }

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  static create(messageService) {
    return new InputHandler(messageService);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default InputHandler;

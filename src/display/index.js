/**
 * Engine - Display
 * ===
 *
 * @module display
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import MessageService from '../services/message';
import { COMPONENT_TYPES } from '../../dist/js/game/components';
import { FPS, MILLISECONDS } from '../constants';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const UNIT = 10;
const SPACING = 1;
const SIZE = UNIT - (SPACING + SPACING);

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * Display
 * @class
 * @memberof module:display
 */
class Display {

  _element;
  _canvas;
  _messageService;
  _lastRender;
  _lastFpsUpdate;
  _framesThisSecond;
  _fps;

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Display
   * @constructor
   */
  constructor() {
    this._messageService = MessageService.create();
    this._fps = FPS;
    this._framesThisSecond = 0;
    this._init();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////

  /**
   * Renders a collection of sprites to the screen
   * @param { Array } sprites - a collection of sprite object to be rendered
   */
  render(sprites) {
    this._refresh();
    this._draw(sprites);
    this._lastRender = window.performance.now();
    this._framesThisSecond++;
    this._updateFps();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Initializes the display and generates the canvas element
   * @private
   */
  _init() {
    this._element = document.getElementById('root');
    this._canvas = document.createElement('canvas');
    this._element.append(this._canvas);
    this._lastFpsUpdate = window.performance.now();
    this._lastRender = window.performance.now();
    this._refresh();
  }

  /**
   * Updates the number of frames per second
   * @private
   */
  _updateFps() {
    const MUL1 = 0.25;
    const MUL2 = 0.75;

    if (this._lastRender > this._lastFpsUpdate + MILLISECONDS) {
      this._fps = Math.floor((MUL1 * this._framesThisSecond) + (MUL2 * this._fps));
      this._lastFpsUpdate = this._lastRender;
      const MESSAGE = {
        subject: 'DIAGNOSTICS',
        body: {
          fps: this._fps
        }
      };
      this._messageService.publish(MESSAGE);
      this._framesThisSecond = 0;
    }
  }

  /**
   * Refreshes the canvas element
   * @private
   */
  _refresh() {
    const HEIGHT = this._element.clientHeight;
    const WIDTH = this._element.clientWidth;

    this._canvas.height = HEIGHT;
    this._canvas.width = WIDTH;
  }

  /**
   * Draws a collection of sprites to the screen
   * @param { Array } sprites - a collection of sprites to be rendered
   * @private
   */
  _draw(sprites) {
    const CONTEXT = this._canvas.getContext('2d');

    CONTEXT.save();
    CONTEXT.fillStyle = '#FFFFFF';
    CONTEXT.clearRect(0, 0, this._canvas.width, this._canvas.height);
    CONTEXT.fill();
    sprites.forEach((sprite) => {
      const POSITION = sprite.findComponent(COMPONENT_TYPES.POSITION_COMPONENT);
      const X_POSITION = (POSITION.state.X_POSITION * UNIT) + SPACING;
      const Y_POSITION = (POSITION.state.Y_POSITION * UNIT) + SPACING;

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
   * @return { module:display.Display }
   */
  static create() {
    return new Display();
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Display;

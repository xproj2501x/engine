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
import timestamp from '../utility/timestamp';

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
  _renderDuration;
  _fps;

  _lastFpsUpdate;
  _framesThisSecond;

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
  constructor(messageService) {
    this._messageService = messageService;
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
    const START = timestamp();

    this._refresh();
    this._draw(sprites);

    this._lastRender = timestamp();
    this._renderDuration = this._lastRender - START;
    this._framesThisSecond++;
    this._updateFps();
    this._sendDebugInfo();
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
    this._lastFpsUpdate = timestamp();
    this._lastRender = timestamp();
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
      // this._fps = Math.floor((MUL1 * this._framesThisSecond) + (MUL2 * this._fps));
      this._fps = this._framesThisSecond;
      this._lastFpsUpdate = this._lastRender;
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
    CONTEXT.clearRect(0, 0, this._canvas.width, this._canvas.height);
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

  _sendDebugInfo() {
    const PRECISION = 5;
    const MESSAGE = {
      subject: 'DIAGNOSTICS',
      body: {
        lastRender: this._lastRender.toPrecision(PRECISION),
        renderDuration: this._renderDuration.toPrecision(PRECISION),
        fps: this._fps
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
   * @return { module:display.Display }
   */
  static create(messageService) {
    return new Display(messageService);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Display;

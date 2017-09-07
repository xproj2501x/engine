/**
 * Engine - Display
 * ===
 *
 * @module display
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import { FPS, MILLISECONDS } from './constants';
import timestamp from './utility/timestamp';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

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

  _lastRender;
  _renderDuration;
  _fps;

  _lastFpsUpdate;
  _framesThisSecond;

  _options = {

  };

  _debugInfo = {
    lastRender: null,
    renderDuration: null,
    fps: null,
    lastFpsUpdate: null,
    framesThisSecond: null
  };
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
    this._fps = FPS;
    this._framesThisSecond = 0;
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

  loadConfiguration(configuration) {
    this._parentElement = document.getElementById(configuration.parentElement);
    while (this._parentElement.firstChild) {
      this._parentElement.removeChild(this._parentElement.firstChild);
    }
    this._canvas = document.createElement('canvas');
    this._parentElement.append(this._canvas);
    this._refresh();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////

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
    const HEIGHT = this._parentElement.clientHeight;
    const WIDTH = this._parentElement.clientWidth;

    this._canvas.height = HEIGHT;
    this._canvas.width = WIDTH;
  }

  /**
   * Draws a collection of sprites to the screen
   * @param { Array } sprites - a collection of sprites to be rendered
   * @private
   */
  _draw(sprites) {
    // throw new Error('Error _draw() called from base class');

  }

  _sendDebugInfo() {
    const PRECISION = 5;
    const MESSAGE = {
      subject: 'DIAGNOSTICS',
      body: {
        lastRender: this._lastRender.toPrecision(PRECISION),
        renderDuration: this._renderDuration.toPrecision(PRECISION),
        fps: this._fps,
        sprites: this._debugInfo.sprites
      }
    };
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

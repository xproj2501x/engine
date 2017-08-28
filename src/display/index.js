/**
 * Engine - Display
 * ===
 *
 * @module display
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import { COMPONENT_TYPES, COMPONENTS } from "../../dist/js/game/components";
import { FPS, MILLISECONDS } from '../constants';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const UNIT = 10;
const SPACING = 1;
const SIZE = UNIT - (SPACING * 2);

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
  _lastFpsUpdate;
  _framesThisSecond;
  _fps;

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  constructor() {
    this._fps = FPS;
    this._framesThisSecond = 0;
    this._init();
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////

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
  _init() {
    this._element = document.getElementById('root');
    this._canvas = document.createElement('canvas');
    this._element.append(this._canvas);
    this._lastFpsUpdate = window.performance.now();
    this._lastRender = window.performance.now();
    this._refresh();
  }

  _updateFps() {
    const ELEMENT = document.getElementById('fps');

    if (this._lastRender > this._lastFpsUpdate + MILLISECONDS) {
      this._fps = 0.25 * this._framesThisSecond + 0.75 * this._fps;
      this._lastFpsUpdate = this._lastRender;
      this._framesThisSecond = 0;
    }

    ELEMENT.textContent= Math.round(this._fps) + ' FPS';
  }

  _refresh() {
    const HEIGHT = this._element.clientHeight;
    const WIDTH = this._element.clientWidth;

    this._canvas.height = HEIGHT;
    this._canvas.width = WIDTH;
  }

  _draw(sprites) {
    const CONTEXT = this._canvas.getContext('2d');

    CONTEXT.save();
    CONTEXT.fillStyle = '#FFFFFF';
    CONTEXT.rect(0, 0, this._canvas.width, this._canvas.height);
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
   * @param { object } data - configuration for the component to be created
   * @return { module:engine.Component }
   */
  static create(data) {

  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Display;

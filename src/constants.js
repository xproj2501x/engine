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
 * @type {string}
 */
export const HREF = window.location;

/**
 * The number of milliseconds in a second
 * @type {boolean}
 */
export const DEBUG = (HREF.search === '?DEBUG');

/**
 * The number of milliseconds in a second
 * @type {int}
 */
export const MILLISECONDS = 1000;

/**
 * The number of frames per second to display
 * @type {int}
 */
export const FPS = 60;

/**
 * The duration of a frame in milliseconds
 * @type {number}
 */
export const FRAME_DURATION = MILLISECONDS / FPS;

/**
 * The maximum number that can be skipped before crashing
 * @type {int}
 */
export const MAX_FRAME_SKIP = 5;

/**
 * The subject of messages
 * @enum {string}
 */
export const MESSAGES = {
  DEBUG: 'DEBUG',
  INPUT: 'INPUT',
  EVENT: 'EVENT',
  RENDER: 'RENDER'
};
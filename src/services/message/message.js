/**
 * Engine - Message
 * ===
 *
 * @module message
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import createUUID from '../../utility/uuid';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * Message
 * @class
 * @memberof module:message
 */
class Message {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * The UUID of the message
   * @type {string}
   */
  _id;

  /**
   * The sender of the message
   * @type {string}
   */
  _sender;

  /**
   * The recipient of the message
   * @type {string}
   */
  _recipient;

  /**
   * The subject of the message
   * @type {string}
   */
  _subject;

  /**
   * The content of the message
   * @type {object}
   */
  _body;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Get _id
   * @return {string}
   */
  get id() {
    return this._id;
  }

  /**
   * Get _sender
   * @return {string}
   */
  get sender() {
    return this._sender;
  }

  /**
   * Get _recipient
   * @return {string}
   */
  get recipient() {
    return this._recipient;
  }

  /**
   * Get _subject
   * @return {string}
   */
  get subject() {
    return this._subject;
  }

  /**
   * Get _body
   * @return {*}
   */
  get body() {
    return this._body;
  }
  /**
   * Message
   * @constructor
   */
  constructor(sender, recipient, subject, body) {
    this._id = createUUID();
    this._sender = sender;
    this._recipient = recipient || null;
    this._subject = subject || null;
    this._body = body;
  }

  ////////////////////////////////////////////////////////////////////////////////
  // Public Methods
  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////
  // Private Methods
  ////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////
  // Static Methods
  ////////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @param data
   * @return {module:message.Message}
   */
  static create(data) {
    if (data === null) {
      throw new Error('Message data cannot be null');
    }
    return new Message(data.sender, data.recipient, data.subject, data.body);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default Message;

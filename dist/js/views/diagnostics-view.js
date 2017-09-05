/**
 * Views - Diagnostics View
 * ===
 *
 * @module diagnosticsView
 */

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import LogService from '../../../src/services/log';
import MessageService from '../../../src/services/message';

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Class
////////////////////////////////////////////////////////////////////////////////
/**
 * DiagnosticsView
 * @class
 * @memberof module:views
 */
class DiagnosticsView {

  //////////////////////////////////////////////////////////////////////////////
  // Private Properties
  //////////////////////////////////////////////////////////////////////////////
  /**
   * @private
   * @type { module:logService.LogService }
   */
  _logService;

  _messageService;

  _viewModel;

  //////////////////////////////////////////////////////////////////////////////
  // Public Properties
  //////////////////////////////////////////////////////////////////////////////

  constructor(messageService) {
    this._logService = LogService.create(this.constructor.name);
    this._messageService = messageService;
    this._messageService.subscribe('DIAGNOSTICS', (msg) => this.update(msg));
  }

  //////////////////////////////////////////////////////////////////////////////
  // Public Methods
  //////////////////////////////////////////////////////////////////////////////


  update(message) {
    this._viewModel = Object.assign({}, this._viewModel, message);

    for (const KEY in this._viewModel) {
      if (this._viewModel.hasOwnProperty(KEY)) {
        const ELEMENT = document.getElementById(KEY);

        ELEMENT.textContent = this._viewModel[KEY];
      }
    }
  }

  //////////////////////////////////////////////////////////////////////////////
  // Private Methods
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Static Methods
  //////////////////////////////////////////////////////////////////////////////
  /**
   * Static factory method
   * @return {module:views.DiagnosticsView}
   */
  static create(messageService) {
    return new DiagnosticsView(messageService);
  }
}

////////////////////////////////////////////////////////////////////////////////
// Exports
////////////////////////////////////////////////////////////////////////////////
export default DiagnosticsView;

import '../css/_site.scss';
import { COMPONENT_TYPES, COMPONENTS } from "./game/components";
import { ASSEMBLAGE_TYPES, ASSEMBLAGES } from "./game/assemblages";
import { SYSTEMS } from './game/systems';

import ViewFactory from './views/view-factory';
import DiagnosticsView from './views/diagnostics-view';
import Engine from '../../src/';
import Game from './game';

(function() {
  const HREF = window.location;
  const DEBUG = (HREF.search === '?DEBUG');
  const VIEW_FACTORY = ViewFactory.create();
  const DIAGNOSTICS_VIEW = DiagnosticsView.create();
  const GAME = new Game();
  const CONFIG = {
    COMPONENTS: COMPONENTS,
    ASSEMBLAGES: ASSEMBLAGES,
    SYSTEMS: SYSTEMS,
    STATE: GAME.create()
  };
  const ENGINE = Engine.create(CONFIG);

  VIEW_FACTORY.createView({
    url: 'http://localhost:3050/js/views/diagnostics-view.html',
    headers: {
      'Content-Type': 'text/html',
      'Accept': 'text/html'
    }
  }).then((response) => {

    const PARSER = new DOMParser();
    const DOC = PARSER.parseFromString(response.responseText, 'text/html');
    const ELEMENT = DOC.getElementById('diagnostics');
    const ROOT = document.getElementsByTagName('diagnostics')[0];

    ROOT.append(ELEMENT);
  }).catch((err) => {
    console.log(err);
  });

  if (DEBUG) {
    // const element = document.getElementById('diagnostics');
    // element.classList.toggle('hidden');
  }
  ENGINE.start();

})();






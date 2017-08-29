import '../css/_site.scss';
import { COMPONENT_TYPES, COMPONENTS } from "./game/components";
import { ASSEMBLAGE_TYPES, ASSEMBLAGES } from "./game/assemblages";
import { SYSTEMS } from './game/systems';

import Engine from '../../src/';
import Game from './game';

(function() {
  const HREF = window.location;
  const DEBUG = (HREF.search === '?DEBUG');
  const GAME = new Game();
  const CONFIG = {
    COMPONENTS: COMPONENTS,
    ASSEMBLAGES: ASSEMBLAGES,
    SYSTEMS: SYSTEMS,
    STATE: GAME.create()
  };
  const ENGINE = Engine.create(CONFIG);

  if (DEBUG) {
    const element = document.getElementById('diagnostics');
    element.classList.toggle('hidden');
  }
  ENGINE.start();

})();






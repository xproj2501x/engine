import '../css/_site.scss';
import { DEBUG } from '../../src/constants';
import { COMPONENT_TYPES, COMPONENTS } from './game/components';
import { ASSEMBLAGE_TYPES, ASSEMBLAGES } from './game/assemblages';
import { SYSTEMS } from './game/systems';

import ViewFactory from './views/view-factory';
import DiagnosticsView from './views/diagnostics-view';
import Engine from '../../src/';
import GameOfLife from './game/game-of-life/';
import Genetics from './game/genetics';
import InputHandler from '../../src/input';

import MessageService from '../../src/services/message';
import Message from '../../src/services/message/message';
import EventService from '../../src/services/event';
import Event from '../../src/services/event/event';

(function() {
  const MESSAGE_SERVICE = MessageService.create();
  const EVENT_SERVICE = EventService.create();
  const VIEW_FACTORY = ViewFactory.create();
  const DIAGNOSTICS_VIEW = DiagnosticsView.create(MESSAGE_SERVICE);
  // const GAME_OF_LIFE = new GameOfLife();
  const GENETICS = new Genetics();
  const INPUT_HANDLER = InputHandler.create(MESSAGE_SERVICE);
  const ENGINE = Engine.create(MESSAGE_SERVICE, GENETICS.create());

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

  // if (DEBUG) {
    // const element = document.getElementById('diagnostics');
    // element.classList.toggle('hidden');
  // }
  ENGINE.start();

})();






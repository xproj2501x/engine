////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import Component from '../src/component';
import { COMPONENT_TYPES, COMPONENTS } from '../dist/js/game/components';

let chai = require('chai');

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const DATA = {
  state: {
    property1: 1,
    property2: 'value'
  }
};

////////////////////////////////////////////////////////////////////////////////
// Test
////////////////////////////////////////////////////////////////////////////////
describe('Component', () => {

  describe('#component', () => {
    const COMPONENT = Component.create(DATA);

    it('should have an id', () => {
      chai.expect(COMPONENT.id).to.not.equal(null);
    });

    it('should have a type', () => {
      chai.expect(COMPONENT.type).to.equal(DATA.type);
    });

    it('should have a state', () => {
      chai.expect(COMPONENT.state).to.not.equal(null);
    });

    it('should error on a missing id', () => {
      chai.expect(() => new Component(null)).to.throw();
    });

    it('should error on a missing type', () => {
      chai.expect(() => new Component(1, null)).to.throw();
    });

    it('should error on a missing state', () => {
      chai.expect(() => new Component(1, 1, null)).to.throw();
    });
  });

  describe('#update()', () => {
    const COMPONENT = Component.create(DATA);

    it('should change the state', () => {
      const NEW_STATE = {
        property1: 'foo',
        property2: 12
      };

      COMPONENT.update(NEW_STATE);
      chai.expect(COMPONENT.state.property1).to.equal(NEW_STATE.property1);
    });

    it('should error on an invalid property change', () => {
      const NEW_STATE = {
        property3: 'bar'
      };

      chai.expect(() => COMPONENT.update(NEW_STATE)).to.throw();
    });
  });

  describe('#create()', () => {
    it('should be able to create a new component', () => {
      chai.expect(Component.create(DATA)).to.be.an.instanceof(Component);
    });

    it('should error on invalid data', () => {
      chai.expect(() => Component.create()).to.throw();
    });
  });

});
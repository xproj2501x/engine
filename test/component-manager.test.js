////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import ComponentManager from '../src/component-manager';
import Component from '../src/component';
import { COMPONENT_TYPES, COMPONENTS } from "../dist/js/game/components";

'../dist/js/game/components';
let chai = require('chai');

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Test
////////////////////////////////////////////////////////////////////////////////
describe('ComponentManager', () => {


  describe('#createComponent()', () => {
    const COMPONENT_MANAGER = ComponentManager.create(COMPONENTS);

    it('should create a new component', () => {
      const COMPONENT = COMPONENT_MANAGER.createComponent(1, COMPONENT_TYPES.HEALTH_COMPONENT);

      chai.expect(COMPONENT).to.be.an.instanceof(Component);
    });
  });

  describe('#findComponent()', () => {
    const COMPONENT_MANAGER = ComponentManager.create(COMPONENTS);

    it('should find the component by id', () => {
      const COMPONENT = COMPONENT_MANAGER.createComponent(1, COMPONENT_TYPES.HEALTH_COMPONENT);
      const ID = COMPONENT.id;

      chai.expect(COMPONENT_MANAGER.findComponent(ID)).to.equal(COMPONENT);
    });

    it('should error on an invalid component id', () => {
      chai.expect(() => COMPONENT_MANAGER.findComponent('foo')).to.throw();
    });
  });

  describe('#findComponentsOfType()', () => {
    const COMPONENT_MANAGER = ComponentManager.create(COMPONENTS);

    it('should find all components of type', () => {
      const LENGTH = 10;

      for (let idx = 0; idx < LENGTH; idx++) {
        COMPONENT_MANAGER.createComponent(1, COMPONENT_TYPES.HEALTH_COMPONENT);
      }

      chai.expect(COMPONENT_MANAGER.findComponentsOfType(COMPONENT_TYPES.HEALTH_COMPONENT).length).to.equal(10);
    });

  });

  describe('#removeComponent()', () => {
    const COMPONENT_MANAGER = ComponentManager.create(COMPONENTS);

    it('should be able to remove a component', () => {
      const COMPONENT = COMPONENT_MANAGER.createComponent(1, COMPONENT_TYPES.HEALTH_COMPONENT);
      const ID = COMPONENT.id;

      COMPONENT_MANAGER.removeComponent(ID);
      chai.expect(() => COMPONENT_MANAGER.findComponent(ID)).to.throw();
    });

    it('should error on an invalid component id', () => {
      chai.expect(() => COMPONENT_MANAGER.removeComponent('foo')).to.throw();
    });
  });

});
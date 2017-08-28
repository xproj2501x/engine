////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import Entity from '../src/entity';
let chai = require('chai');

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const CMPT_NAME = 'Component';
const COMPONENT = {};

////////////////////////////////////////////////////////////////////////////////
// Test
////////////////////////////////////////////////////////////////////////////////
describe('Entity', () => {
  let entity = Entity.create();

  describe('#entity', () => {
    it('should have an id', () => {
      chai.expect(entity.id).to.not.equal(null);
    });
  });

  describe('#attachComponent()', () => {

    it('should be able to attach a component', () => {
      entity.attachComponent(CMPT_NAME, COMPONENT);
    });

    it('should not be able to attach the same component type twice', () => {
      chai.expect(() => entity.attachComponent(CMPT_NAME, COMPONENT)).to.throw();
    });
  });

  describe('#findComponent()', () => {
    it('should have the component', () => {
      chai.expect(() => entity.findComponent(CMPT_NAME)).to.not.equal(null);
    })
  });

  describe('#detachComponent()', () => {
    it('should be able to remove the component', () => {
      entity.detachComponent(CMPT_NAME);
      chai.expect(() => entity.findComponent(CMPT_NAME)).to.throw();
    });
  });

});
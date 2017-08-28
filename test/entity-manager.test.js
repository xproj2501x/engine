

////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import EntityManager from '../src/entity-manager';
import Entity from '../src/entity';
let chai = require('chai');

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////
// Test
////////////////////////////////////////////////////////////////////////////////
describe('EntityMananger', () => {

  describe('#createEtity()', () => {
    const ENTITY_MANAGER = new EntityManager();

    it('should create a new entity', () => {
      const ENTITY = ENTITY_MANAGER.createEntity();

      chai.expect(ENTITY).to.be.an.instanceof(Entity);
    });

  });

  describe('#findEntity()', () => {
    const ENTITY_MANAGER = new EntityManager();

    it('should find the entity by id', () => {
      const ENTITY = ENTITY_MANAGER.createEntity();
      const ID = ENTITY.id;

      chai.expect(ENTITY_MANAGER.findEntity(ID)).to.equal(ENTITY);
    });

    it('should error on an invalid entity id', () => {
      chai.expect(() => ENTITY_MANAGER.findEntity('foo')).to.throw();
    })
  });

  describe('#removeEntity()', () => {
    const ENTITY_MANAGER = new EntityManager();

    it('should be able to remove an entity', () => {
      const ENTITY = ENTITY_MANAGER.createEntity();
      const ID = ENTITY.id;

      ENTITY_MANAGER.removeEntity(ID);
      chai.expect(() => ENTITY_MANAGER.findEntity(ID)).to.throw();
    });

    it('should error on an invalid entity id', () => {
      chai.expect(() => ENTITY_MANAGER.removeEntity('foo')).to.throw();
    });
  });

});
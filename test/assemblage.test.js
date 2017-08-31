////////////////////////////////////////////////////////////////////////////////
// Imports
////////////////////////////////////////////////////////////////////////////////
import Assemblage from '../src/assemblage';
import Entity from '../src/entity';
import { COMPONENT_TYPES, COMPONENTS } from '../dist/js/game/components';
import { ASSEMBLAGE_TYPES, ASSEMBLAGES } from '../dist/js/game/assemblages';
let chai = require('chai');

////////////////////////////////////////////////////////////////////////////////
// Definitions
////////////////////////////////////////////////////////////////////////////////
const ENTITY = Entity.create(1);

////////////////////////////////////////////////////////////////////////////////
// Test
////////////////////////////////////////////////////////////////////////////////
describe('Assemblage', () => {

  describe('#assemblage', () => {
    const ASSEMBLAGE = Assemblage.create(ENTITY, ASSEMBLAGE_TYPES.TIME_ASSEMBLAGE);

    it('should have an id', () => {
      chai.expect(ASSEMBLAGE.id).to.equal(ENTITY.id);
    });

    it('should have a type', () => {
      chai.expect(ASSEMBLAGE.type).to.equal(ASSEMBLAGE_TYPES.TIME_ASSEMBLAGE);
    })
  });

  describe('#findComponent()', () => {

    it('should be able to find a component of the specified type', () => {

    });

  });

  describe('#create()', () => {

  });

});
import { describe, it, expect, vi } from 'vitest';
import { Entity } from '../../src/entities/Entity';

const testComponent = {
  name: 'test',
  update: () => {},
  destroy: () => {},
};

describe('Entity', () => {
  it('should initialize with name and tags', () => {
    const entity = new Entity('testEntity', ['player']);
    expect(entity.name).toBe('testEntity');
    expect(entity.hasTag('player')).toBe(true);
    expect(entity.hasTag('enemy')).toBe(false);
  });

  it('should add and retrieve components', () => {
    const entity = new Entity('test');
    entity.addComponent('test', testComponent);
    const component = entity.getComponent('test');
    expect(component).toBe(testComponent);
  });

  it('should remove components', () => {
    const entity = new Entity('test');
    entity.addComponent('test', testComponent);
    const result = entity.removeComponent('test');
    expect(result).toBe(true);
    expect(entity.getComponent('test')).toBeUndefined();
  });

  it('should call update on all components', () => {
    const updateSpy = vi.fn();
    const component = {
      name: 'spy',
      update: updateSpy,
      destroy: () => {},
    };

    const entity = new Entity('test');
    entity.addComponent('spy', component);
    entity.update(0.016);

    expect(updateSpy).toHaveBeenCalledTimes(1);
  });

  it('should destroy properly', () => {
    const destroySpy = vi.fn();
    const component = {
      name: 'test',
      update: () => {},
      destroy: destroySpy,
    };

    const entity = new Entity('test');
    entity.addComponent('test', component);
    entity.destroy();

    expect(destroySpy).toHaveBeenCalledTimes(1);
    expect(entity.getComponent('test')).toBeUndefined();
  });
});

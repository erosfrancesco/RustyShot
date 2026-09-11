import { describe, it, expect, vi, beforeEach } from 'vitest';
import { EventEmitter } from '../../src/utils/EventEmitter';

interface TestEvents extends Record<string, unknown> {
  'test:ping': { message: string };
  'test:sum': { a: number; b: number };
}

describe('EventEmitter', () => {
  let emitter: EventEmitter<TestEvents>;

  beforeEach(() => {
    emitter = new EventEmitter<TestEvents>();
  });

  it('should emit and receive events', () => {
    const handler = vi.fn();
    emitter.on('test:ping', handler);
    emitter.emit('test:ping', { message: 'hello' });

    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith({ message: 'hello' });
  });

  it('should remove listeners with off', () => {
    const handler = vi.fn();
    emitter.on('test:ping', handler);
    emitter.off('test:ping', handler);
    emitter.emit('test:ping', { message: 'hello' });

    expect(handler).not.toHaveBeenCalled();
  });

  it('should remove all listeners', () => {
    const handler1 = vi.fn();
    const handler2 = vi.fn();
    emitter.on('test:ping', handler1);
    emitter.on('test:ping', handler2);
    emitter.removeAll();
    emitter.emit('test:ping', { message: 'hello' });

    expect(handler1).not.toHaveBeenCalled();
    expect(handler2).not.toHaveBeenCalled();
  });
});

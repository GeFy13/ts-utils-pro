import { createEventEmitter } from '../../src/utils/createEventEmitter';

type TestEvents = {
  ready: { at: number };
  message: { text: string };
};

describe('createEventEmitter', () => {
  it('подписывается и эмитит типизированные payload', () => {
    const emitter = createEventEmitter<TestEvents>();
    const readyHandler = jest.fn((payload: TestEvents['ready']) => payload.at);

    emitter.on('ready', readyHandler);
    emitter.emit('ready', { at: 123 });

    expect(readyHandler).toHaveBeenCalledTimes(1);
    expect(readyHandler).toHaveBeenCalledWith({ at: 123 });
  });

  it('удаляет обработчик через off', () => {
    const emitter = createEventEmitter<TestEvents>();
    const handler = jest.fn();

    emitter.on('message', handler);
    emitter.off('message', handler);
    emitter.emit('message', { text: 'привет' });

    expect(handler).not.toHaveBeenCalled();
  });
});

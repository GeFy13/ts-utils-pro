import { debounce } from '../../src/utils/debounce';

describe('debounce', () => {
  it('runs only last call after delay', () => {
    jest.useFakeTimers();
    const fn = jest.fn((value: number) => value * 2);
    const debounced = debounce(fn, 200);

    debounced(1);
    debounced(2);
    debounced(3);

    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(199);
    expect(fn).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(3);

    jest.useRealTimers();
  });
});

import { slicePrevSevenFromArray } from "./array";

describe('slicePrevSevenFromArray', () => {
  let array: number[];

  beforeEach(() => {
    array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  });

  it('returns an empty array if the startIndex is less than 1', () => {
    const startIndex = 0;
    const result = slicePrevSevenFromArray(array, startIndex);

    expect(result).toEqual([]);
  });

  it('returns the previous 7 elements starting from index 7', () => {
    const startIndex = 7;
    const result = slicePrevSevenFromArray(array, startIndex);

    expect(result).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });

  it('returns the previous elements starting from index 2', () => {
    const startIndex = 2;
    const result = slicePrevSevenFromArray(array, startIndex);

    expect(result).toEqual([1, 2]);
  });

  it('returns the previous 7 elements starting from index 11', () => {
    const startIndex = 11;
    const result = slicePrevSevenFromArray(array, startIndex);

    expect(result).toEqual([4, 5, 6, 7, 8, 9, 10]);
  });
});
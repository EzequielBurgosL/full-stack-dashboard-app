export const slicePrevSevenFromArray = (array: any[], startIndex: number) => {
  const end = array.length >= startIndex ? startIndex : array.length;
  const start = Math.max(0, end - 7);
  const result = array.slice(start, end);

  return result;
};

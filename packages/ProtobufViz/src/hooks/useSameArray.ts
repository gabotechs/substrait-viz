import React from 'react';

/**
 * Returns a new array only if the contents of the array change. Useful
 * for passing an Array arg to React.useEffect or React.useMemo.
 *
 * WARNING: this function is currently using a hack where only the length
 * of the array is being checked.
 */
export function useSameArray<T extends { length: number }>(
  array?: T,
): T | undefined {
  return React.useMemo(() => {
    return array;
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [array?.length]);
}

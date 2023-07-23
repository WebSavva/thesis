import isNull from 'lodash-es/isNull';
import isUndefined from 'lodash-es/isUndefined';

export const isDefined = <T>(val: T | null | undefined): val is T =>
  !isNull(val) && !isUndefined(val);

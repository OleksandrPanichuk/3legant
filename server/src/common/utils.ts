import * as _omit from 'lodash.omit';

export const omit = <T, D extends keyof T>(obj: T, fields: D[]): Omit<T, D> => _omit(obj, fields);
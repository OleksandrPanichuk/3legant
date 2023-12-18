import * as _omit from 'lodash.omit';

export const omit = <T>(obj: T, fields: (keyof T)[]): T => _omit(obj, fields);
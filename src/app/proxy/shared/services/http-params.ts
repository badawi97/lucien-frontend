import { HttpParams } from '@angular/common/http';
import { QueryParams, QueryParamValue } from '../models';

export function buildHttpParams(query?: QueryParams): HttpParams {
  let params = new HttpParams();

  if (!query) {
    return params;
  }

  Object.entries(query).forEach(([key, value]) => {
    if (value === null || value === undefined || value === '') {
      return;
    }

    params = params.set(key, serializeQueryParam(value));
  });

  return params;
}

function serializeQueryParam(value: Exclude<QueryParamValue, null | undefined>): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  return String(value);
}


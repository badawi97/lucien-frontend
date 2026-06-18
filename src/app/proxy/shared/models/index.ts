export type QueryParamValue = string | number | boolean | Date | null | undefined;

export type QueryParams = Record<string, QueryParamValue>;

export interface ResultDto<T> {
  data?: T | null;
  message?: string | null;
  isSuccess?: boolean;
  statusCode?: number | null;
}

export interface PagedRequestDto {
  skipCount?: number;
  maxResultCount?: number;
  sorting?: string | null;
}

export interface PagedResultDto<T> {
  totalCount?: number;
  items?: T[] | null;
}

export interface FileResultDto {
  fileContent?: string | null;
  contentType?: string | null;
  fileName?: string | null;
}


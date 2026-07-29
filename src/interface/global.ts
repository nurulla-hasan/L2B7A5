export type TSearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export type TQuery = Record<string, string | number | string[] | undefined>;

export type TParams<T = { [key: string]: string }> = Promise<T>;
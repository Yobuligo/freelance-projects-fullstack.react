export type IFilterConfig<T> = { [P in keyof T]?: T[P] };

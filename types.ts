export type DeepRequired<T> = {
    [P in keyof T]-?: NonNullable<T[P]>;
};
import { ReactNode } from "react";

export interface SortProps extends React.HTMLAttributes<HTMLDivElement> {
    sort: SortEnum;
    setSort: (sort: SortEnum) => void;
}
export enum SortEnum {
    Rating,
    Price
}
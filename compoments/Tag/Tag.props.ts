import { ReactNode } from "react";

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
    size?: 's' | 'm';
    children: ReactNode;
    color?: 'ghost' | 'red' | 'gray' | 'green' | 'primary';
    href?: string;
}
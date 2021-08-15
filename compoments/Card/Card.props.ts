import { ReactNode } from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    color?: 'white' | 'blue';
    children: ReactNode;
}
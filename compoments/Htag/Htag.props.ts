import { ReactNode } from "react";

export interface HtagProps extends React.HTMLAttributes<HTMLHeadingElement> {
    tag: 'h1' | 'h2' | 'h3';
    children: ReactNode;
}
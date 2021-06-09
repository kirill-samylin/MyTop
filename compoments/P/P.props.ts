import { ReactNode } from "react";

export interface PProps extends React.HTMLAttributes<HTMLParagraphElement> {
    size?: 's' | 'm' | 'b';
    children: ReactNode;
}
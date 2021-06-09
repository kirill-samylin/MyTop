import { ReactNode } from "react";

export interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}
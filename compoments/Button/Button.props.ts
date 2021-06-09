import { HTMLButtonElement, ReactNode } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    appearance: 'primary' | 'ghost';
    arrow?: 'rigth' | 'down' | 'none';
}
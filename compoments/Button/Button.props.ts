import { ReactNode, HTMLAttributes } from "react";
export interface ButtonProps extends Omit<HTMLAttributes<HTMLButtonElement>, 
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'> 
{
    children: ReactNode,
    appearance: 'primary' | 'ghost';
    arrow?: 'rigth' | 'down' | 'none';
}
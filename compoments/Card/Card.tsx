import { CardProps } from './Card.props';
import styles from './Card.module.css';
import cn from 'classnames';
import { forwardRef, Ref } from 'react';
import { motion } from 'framer-motion';

export const Card = forwardRef(({ color = 'white', children, className, ...props }: CardProps, ref: Ref<HTMLDivElement>): JSX.Element => {
    return (
        <div className={cn(styles.card, className, {
            [styles.blue]: color == 'blue'
        })} {...props} ref={ref} >
            {children}
        </div>
    );
});
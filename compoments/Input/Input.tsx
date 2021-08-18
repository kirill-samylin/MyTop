import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';
import { forwardRef, Ref } from 'react';

export const Input = forwardRef(({ className, error, ...props }: InputProps, ref?: Ref<HTMLInputElement>): JSX.Element => {
    return (
        <div className={cn(className, styles.inputForm)}>
            <input className={cn(className, styles.input, {
                [styles.error]: error
            })} {...props} ref={ref} />
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
    );
});
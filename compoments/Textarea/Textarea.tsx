import { TextareaProps } from './Textarea.props';
import styles from './Textarea.module.css';
import cn from 'classnames';
import { forwardRef, Ref } from 'react';

export const Textarea = forwardRef(({ className, error, ...props }: TextareaProps, ref?: Ref<HTMLTextAreaElement>): JSX.Element => {
    return (
        <div className={cn(className, styles.textareaForm)}>
            <textarea className={cn(styles.textarea, {
                [styles.error]: error
            })} {...props} ref={ref} />
            {error && <span className={styles.errorMessage}>{error.message}</span>}
        </div>
        
    );
});
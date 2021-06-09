import { SitebarProps } from './Sitebar.props';
import styles from './Sitebar.module.css';
import cn from 'classnames';

export const Sitebar = ({ ...props }: SitebarProps): JSX.Element => {
    return (
        <div {...props}>
            SiteBar
        </div>
    );
};
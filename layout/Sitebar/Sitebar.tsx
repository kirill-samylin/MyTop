import { SitebarProps } from './Sitebar.props';
import styles from './Sitebar.module.css';
import cn from 'classnames';
import { Menu } from '../Menu/Menu';
export const Sitebar = ({ ...props }: SitebarProps): JSX.Element => {
    return (
        <div {...props}>
            <Menu />
        </div>
    );
};
import { SitebarProps } from './Sitebar.props';
import styles from './Sitebar.module.css';
import cn from 'classnames';
import { Menu } from '../Menu/Menu';
import Logo from '../logo.svg';
import React from 'react';
import { Search } from '../../compoments';
export const Sitebar = ({ className, ...props }: SitebarProps): JSX.Element => {
    return (
        <div className={cn(className, styles.sitebar)}  {...props}>
            <Logo className={styles.logo} />
            <Search />
            <Menu />
        </div>
    );
};
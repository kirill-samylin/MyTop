import { SearchProps } from './Search.props';
import styles from './Search.module.css';
import cn from 'classnames';
import React, { useState } from 'react';
import { Button, Input } from '..';
import ClassIcon from './glass.svg';
import { useRouter } from 'next/router';
export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
    const [ search, setSearch ] = useState<string>('');
    const router = useRouter();

    const handleSearch = () => {
        router.push({
            pathname: '/search',
            query: {
                q: search,
            }
        });
    }

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    return (
        <div className={cn(className, styles.search)} {...props}>
            <Input 
                className={styles.input}
                placeholder="Поиск"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <Button appearance="primary" className={styles.button} onClick={handleSearch}>
                <ClassIcon />
            </Button>

        </div>
    );
};
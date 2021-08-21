
import styles from './Advantages.module.css';
import cn from 'classnames';
import { AdvantagesProps } from './Advantages.props';
import React from 'react';
import { Card } from '..';
import CheckIcon from './check.svg';
import { priceRu } from '../../helpers/helpers';
export const Advantages = ({ advantages }: AdvantagesProps): JSX.Element => {
    return (
        <>
            { advantages && advantages.map((a) => (
                <div key={a._id} className={styles.advantage}>
                    <CheckIcon />
                    <div className={styles.title}>{a.title}</div>
                    <hr className={styles.line} />
                    <div>{a.description}</div>
                </div>
            ))}
        </>
    );
};

import styles from './HhData.module.css';
import cn from 'classnames';
import { HhDataProps } from './HhData.props';
import React from 'react';
import { Card } from '..';
import RateIcon from './rate.svg';
import { priceRu } from '../../helpers/helpers';
export const HhData = ({ count, juniorSalary, middleSalary, seniorSalary }: HhDataProps): JSX.Element => {
    return (
        <div className={styles.hh}>
            <Card className={styles.card}>
                <div className={styles.title}>Всего вакансий</div>
                <div className={styles.count}>{count}</div>
            </Card>
            <Card className={styles.salary}>
                <div>
                    <div className={styles.title}>Начальный</div>
                    <div className={styles.salaryValue}>{priceRu(juniorSalary)}</div>
                    <div className={styles.rate}>
                        <RateIcon className={styles.fillded} />
                        <RateIcon />
                        <RateIcon />
                    </div>
                </div>
                <div>
                    <div className={styles.title}>Средний</div>
                    <div className={styles.salaryValue}>{priceRu(middleSalary)}</div>
                    <div className={styles.rate}>
                        <RateIcon className={styles.fillded} />
                        <RateIcon className={styles.fillded} />
                        <RateIcon />
                    </div>
                </div>
                <div>
                    <div className={styles.title}>Профессионал</div>
                    <div className={styles.salaryValue}>{priceRu(seniorSalary)}</div>
                    <div className={styles.rate}>
                        <RateIcon className={styles.fillded} />
                        <RateIcon className={styles.fillded} />
                        <RateIcon className={styles.fillded} />
                    </div>
                </div>
            </Card>
        </div>
    );
};
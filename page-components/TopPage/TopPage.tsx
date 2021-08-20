import { TopPageProps } from './TopPage.props';
import styles from './TopPage.module.css';
import React, { useReducer, useEffect } from 'react';
import { Advantages, HhData, Htag, P, Product, Sort, Tag } from '../../compoments';
import { TopLevelCategory } from '../../interfaces/page.interfaces';
import { SortEnum } from '../../compoments/Sort/Sort.props';
import { sortReducer } from './sort.reducer';
import { useScrollY } from '../../hooks/useScrollY';

export const TopPage = ({ page, products, firstCategory }: TopPageProps): JSX.Element => {
    const [{ products: sortedProducts, sort }, dispathSort ] = useReducer(sortReducer, { products, sort: SortEnum.Rating });
    
    function setSort(sort: SortEnum) {
        dispathSort({ type: sort });
    }

    useEffect(() => {
        dispathSort({ type: 'reset', initialState: products });
    }, [products]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <Htag tag="h1">{page.title}</Htag>
                {products && <Tag color='gray' size="m" aria-label={products.length + ' курсов'}>{products.length}</Tag>}
                <Sort sort={sort} setSort={setSort} />
            </div>
            <div role="list">
                {sortedProducts && sortedProducts.map((p) => (<Product role="listitem" layout key={p._id} product={p} />))}
            </div>
            <div className={styles.hhTitle}>
                <Htag tag="h2">Вакансии - {page.category}</Htag>
                {products && <Tag color='red' size="m">hh.ru</Tag>}
            </div>
            {firstCategory == TopLevelCategory.Courses && page.hh && <HhData {...page.hh} />}
            {page.advantages && page.advantages.length && 
                <>
                    <Htag tag="h2">Преимущества</Htag>
                    <Advantages advantages={page.advantages} />
                </>
            }
            {page.seoText && 
            <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText}}> 
            </div>}
            <Htag tag="h2">Получаемые навыки</Htag>
            {page.tags && page.tags.map((t) => (
                <Tag key={t} color="primary">{t}</Tag>
            ))}
        </div>
    );
};
import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import React, { useState } from 'react';
import { Button, Card, Divider, Rating, ReviewForm, Tag } from '..';
import { devlOfNum, priceRu } from '../../helpers/helpers';
import Image from 'next/image';
import { Review } from '../Review/Review';
export const Product = ({ product, className, ...props }: ProductProps): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] =useState<boolean>(false);
    return (
        <>
            <Card className={cn(className, styles.product)}>
                <div className={styles.logo}> 
                    <Image 
                        src={process.env.NEXT_PUBLIC_DOMAIN + product.image} 
                        alt={product.title}
                        width={70}
                        height={70}
                    />
                </div>
                <div className={styles.title}>{product.title} </div>
                <div className={styles.price}>
                    {priceRu(product.price)}
                    {product.oldPrice && <Tag className={styles.oldPrice} color='green' size="s">{priceRu(product.price - product.oldPrice)}</Tag>}
                </div>
                <div className={styles.credit}>
                    {priceRu(product.credit)}
                    <span className={styles.mount}>/мес</span> 
                </div>
                <div className={styles.rating}>
                    <Rating rating={product.reviewAvg ?? product.initialRating} /> 
                </div>
                <div className={styles.tags}>
                    { product.categories.map((c) => (<Tag key={c} className={styles.category} color="ghost">{c}</Tag> ))}
                </div>
                <div className={styles.priceTitle}>Цена</div>
                <div className={styles.creditTitle}>Кредит</div>
                <div className={styles.ratingTitle}>{product.reviewCount} {devlOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</div>
                <Divider className={styles.hr} />
                <div className={styles.description}>{product.description}</div>
                <div className={styles.feature}>
                    {product.characteristics.map(c => (
                        <div className={styles.characteristics} key={c.name}>
                            <span className={styles.characteristicsName}>{c.name}</span>
                            <span className={styles.characteristicsDots}></span>
                            <span className={styles.characteristicsValue}>{c.value}</span>
                        </div>
                    ))}
                </div>
                <div className={styles.advBlock}>
                    {product.advantages && <div className={styles.advantages}>
                        <div className={styles.addTitle}>Преимущества</div>
                        <div>{product.advantages}</div>
                    </div>}
                    {product.disadvantages && <div className={styles.disadvantages}>
                        <div className={styles.addTitle}>Недостатки</div>
                        <div>{product.disadvantages}</div>
                    </div>}
                </div>
                <Divider className={cn(styles.hr, styles.hr2)} />
                <div className={styles.actions}>
                    <Button appearance="primary">Узнать подробнее</Button>
                    <Button 
                        appearance="ghost" 
                        arrow={isReviewOpened ? 'down' :'rigth'} 
                        className={styles.reviewButton}
                        onClick={() => setIsReviewOpened(!isReviewOpened)}
                    >
                        Читать отзывы
                    </Button>
                </div>
            </Card>
            <Card color="blue" className={cn(styles.reviews, {
                [styles.opened]: isReviewOpened,
                [styles.closed]: !isReviewOpened,
            })}>
                {product.reviews.map((review) => (
                    <>
                        <Review key={review._id} review={review} />
                        <Divider />
                    </>
                ))}
                <ReviewForm productId={product._id} />
            </Card>
        </>
    );
};
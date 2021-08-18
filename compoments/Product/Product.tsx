import { ProductProps } from './Product.props';
import styles from './Product.module.css';
import cn from 'classnames';
import React, { forwardRef, Ref, useRef, useState } from 'react';
import { Button, Card, Divider, Rating, ReviewForm, Tag } from '..';
import { devlOfNum, priceRu } from '../../helpers/helpers';
import Image from 'next/image';
import { Review } from '../Review/Review';
import { motion } from 'framer-motion';

export const Product = motion(forwardRef(({ product, className, ...props }: ProductProps, ref: Ref<HTMLDivElement>): JSX.Element => {
    const [isReviewOpened, setIsReviewOpened] =useState<boolean>(false);
    const reviewRef = useRef<HTMLDivElement>(null);
    
    const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: "start",
        })
    };
    const variants = {
        visible: {
            opacity: 1,
            height: 'auto',
        },
        hidden: {
            opacity: 0,
            height: 0,
        },
    };
    return (
        <div className={className} {...props} ref={ref}>
            <Card className={styles.product}>
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
                <div className={styles.ratingTitle}><a href="#ref" onClick={scrollToReview}>{product.reviewCount} {devlOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}</a></div>
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
            <motion.div animate={isReviewOpened ? 'visible' : 'hidden' } variants={variants} initial='hidden'>
                <Card color="blue" className={styles.reviews} ref={reviewRef}>
                    {product.reviews.map((review) => (
                        <div key={review._id}>
                            <Review review={review} />
                            <Divider />
                        </div>
                    ))}
                    <ReviewForm productId={product._id} />
                </Card>
            </motion.div>
            
        </div>
    );
}));
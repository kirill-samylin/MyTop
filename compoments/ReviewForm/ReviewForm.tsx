import { ReviewFormProps } from './ReviewForm.props';
import styles from './ReviewForm.module.css';
import cn from 'classnames';
import React, { useState } from 'react';
import { Input, Rating } from '..';
import { Textarea } from '../Textarea/Textarea';
import { Button } from '../Button/Button';
import CloseIcon from './close.svg';
import { useForm, Controller } from 'react-hook-form';
import { IReviewForm, IReviewRespons } from './ReviewForm.interface';
import axios from 'axios';
import { API } from '../../helpers/api';
export const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFormProps): JSX.Element => {
    const { register, control, handleSubmit, formState: { errors }, reset, clearErrors } = useForm<IReviewForm>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const onSubmit = async (formData: IReviewForm) => {
        try {
            const { data } = await axios.post<IReviewRespons>(API.review.createDemo, {...formData, productId });
            if (data.message) {
                setIsSuccess(true);
                reset();
            } else {
                setError("Ошибка");
            }
        } catch {
            setError("Ошибка");
        }
       

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={cn(styles.reviewForm, className)} {...props} >
                <Input 
                    {...register('name', { required: { value: true, message: "Заполните имя" } })} 
                    placeholder="Имя"
                    error={errors.name} 
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={errors.name ? true : false}
                />
                <Input 
                    {...register('title', { required: { value: true, message: "Заполните заголовок" }})} 
                    className={styles.title} 
                    placeholder="Заголовок отзыва"
                    error={errors.title}
                    tabIndex={isOpened ? 0 : -1}
                    aria-invalid={errors.title ? true : false}
                />
                <div className={styles.rating}>
                    <span>Оценка:</span>
                    <Controller 
                        control={control}
                        name="rating"
                        rules={{ required: { value: true, message: "Укажите рейтинг" }}}
                        render={({ field }) => (
                            <Rating 
                                isEditable 
                                rating={field.value} 
                                setRating={field.onChange}
                                ref={field.ref}
                                error={errors.rating}
                                tabIndex={isOpened ? 0 : -1}
                            />
                        )}
                    />
                </div>
                <Textarea 
                    {...register('description', { required: { value: true, message: "Заполните описание" }})} 
                    placeholder="Текст отзыва" 
                    className={styles.description}
                    error={errors.description}
                    tabIndex={isOpened ? 0 : -1}
                    aria-label="Текст отзыва"
                    aria-invalid={errors.description ? true : false}
                />
                <div className={styles.submit}>
                    <Button appearance="primary" tabIndex={isOpened ? 0 : -1} onClick={() => clearErrors()}>
                        Отправить
                    </Button>
                        <span className={styles.info}>
                        * Перед публикацией отзыв пройдет предварительную модерацию и проверку
                        </span>
                </div>
            </div>
            {isSuccess && <div className={cn(styles.panel, styles.success)} role="alert">
                <div className={styles.successTitle}>Ваш отзыв отправлен</div>
                <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
                <button className={styles.close} onClick={() => setIsSuccess(false)} aria-label="Закрыть оповещение">
                    <CloseIcon tabIndex={isOpened ? 0 : -1} />
                </button>
                
            </div>}
            {error && <div className={cn(styles.panel, styles.error)} role="alert">
                {error}
                <button className={styles.close} onClick={() => setError(undefined)} aria-label="Закрыть оповещение">
                    <CloseIcon tabIndex={isOpened ? 0 : -1} />
                </button>
            </div>}
        </form>
    );
};
import { ReviewModel } from './../../interfaces/product.interfaces';

export interface ReviewProps extends React.HTMLAttributes<HTMLDivElement> {
    review: ReviewModel
}
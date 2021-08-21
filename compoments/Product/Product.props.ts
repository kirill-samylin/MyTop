import { ProductModel } from './../../interfaces/product.interfaces';

export interface ProductProps extends React.HTMLAttributes<HTMLDivElement> {
    product: ProductModel;
}
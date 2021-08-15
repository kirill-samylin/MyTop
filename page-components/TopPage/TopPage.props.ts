import { TopLevelCategory, TopPageModal } from "../../interfaces/page.interfaces";
import { ProductModel } from "../../interfaces/product.interfaces";

export interface TopPageProps extends Record<string, unknown> {
    firstCategory: TopLevelCategory;
    page: TopPageModal;
    products: ProductModel[];
};
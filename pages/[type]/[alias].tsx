import { GetStaticPaths, GetStaticPropsContext } from 'next';
import React from 'react';
import { withLayout } from '../../layout/Layout/Layout';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interfaces';
import { TopLevelCategory, TopPageModal } from '../../interfaces/page.interfaces';
import { ParsedUrlQuery } from 'querystring';
import { ProductModel } from '../../interfaces/product.interfaces';
import { firstLevelMenu } from '../../helpers/helpers';
import { TopPage } from '../../page-components';

function Course({ firstCategory, page, products }: TopPageProps): JSX.Element {
  return (
    <TopPage 
        firstCategory={firstCategory} 
        page={page} 
        products={products} 
    />
  );
};

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    for (const m of firstLevelMenu) {
        const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
            firstCategory: m.id
        });
        paths = paths.concat(menu.flatMap(block => block.pages.map(page => `/${m.route}/${page.alias}`)));
    }
    return {
        paths,
        fallback: true
    }
}

export async function getStaticProps({ params }: GetStaticPropsContext<ParsedUrlQuery>) {
    if (!params) {
        return {
            notFound: true
        };
    }
    const firstCategoryItem = firstLevelMenu.find((m) => m.route === params.type);
    if (!firstCategoryItem) {
        return {
            notFound: true
        };
    }
    try {
        const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
            firstCategory: firstCategoryItem.id
        });
        if (!menu.length) {
            return {
                notFound: true
            };
        }
        const { data: page } = await axios.get<TopPageModal>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);
    
        const { data: products } = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', {
            "category": page.category,
            "limit": 10
        });
        return {
            props: {
                menu,
                firstCategory: firstCategoryItem.id,
                page,
                products
            }
        };
    } catch {
        return {
            notFound: true
        };
    }
   
}
interface TopPageProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    page: TopPageModal;
    products: ProductModel[];
};
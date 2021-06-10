import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import React, { useState } from 'react';
import { withLayout } from '../../layout/Layout/Layout';
import axios from 'axios';
import { MenuItem } from '../../interfaces/menu.interfaces';
import { TopPageModal } from '../../interfaces/page.interfaces';
import { ParsedUrlQuery } from 'querystring';
import { ProductModel } from '../../interfaces/product.interfaces';

const firstCategory = 0;

function Course({ menu, page, products }: CourseProps): JSX.Element {
  return (
    <div>
        {products && products.length}
    </div>
  );
};

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    });
    return {
        paths: menu.flatMap(m => m.pages.map(p => '/courses/' + p.alias)),
        fallback: true
    }
}

export async function getStaticProps({ params }: GetStaticPropsContext<ParsedUrlQuery>) {
    if (!params) {
        return {
            notFound: true
        };
    }
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    });
    const { data: page } = await axios.get<TopPageModal>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);

    const { data: products } = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find', {
        "category": page.category,
        "limit": 10
    });
    
    return {
        props: {
            menu,
            firstCategory,
            page,
            products
        }
    };
}
interface CourseProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCatefory: number;
    page: TopPageModal;
    products: ProductModel[];
};
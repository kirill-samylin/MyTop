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
import { API } from '../../helpers/api';
import Head from 'next/head';
function Course({ firstCategory, page, products }: TopPageProps): JSX.Element {
  return (
      <>
        <Head>
            <title>{page.metaTitle}</title>
            <meta name="description" content={page.metaDescription}/>
            <meta property="og:title" content={page.metaTitle}/>
            <meta property="og:description" content={page.metaDescription}/>
            <meta property="og:type" content="article" />
        </Head>
        <TopPage 
            firstCategory={firstCategory} 
            page={page} 
            products={products} 
        />
    </>
  );
};

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];
    for (const m of firstLevelMenu) {
        const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
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
        const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
            firstCategory: firstCategoryItem.id
        });
        if (!menu.length) {
            return {
                notFound: true
            };
        }
        const { data: page } = await axios.get<TopPageModal>(API.topPage.byAlias + params.alias);
    
        const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
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
import React, { FunctionComponent } from 'react';
import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import cn from 'classnames';
import { Header } from '../Header/Header';
import { Sitebar } from '../Sitebar/Sitebar';
import { Footer } from '../Footer/Footer';

const Layout = ({ children }: LayoutProps): JSX.Element => {
    return (
        <div className={styles.wrapper}>
            <Header className={styles.header} />
            <Sitebar className={styles.sitebar} />
            <main className={styles.main}>
                {children}
            </main>
            <Footer className={styles.footer} />
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown>>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <Layout>
                <Component {...props} />
            </Layout>
        );
    }
}
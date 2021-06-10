import React, { FunctionComponent } from 'react';
import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import cn from 'classnames';
import { Header } from '../Header/Header';
import { Sitebar } from '../Sitebar/Sitebar';
import { Footer } from '../Footer/Footer';
import { AppContextProvider, IAppContext } from '../../context/app.context';

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

export const AppContextProvider = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        return (
            <AppContextProvider menu={props.menu} firstCategoty={props.firstCategoty}>
                <Layout>
                    <Component {...props} />
                </Layout>
            </AppContextProvider>
        );
    }
}
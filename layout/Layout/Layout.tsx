import React, { FunctionComponent, useState, KeyboardEvent, useRef } from 'react';
import { LayoutProps } from './Layout.props';
import styles from './Layout.module.css';
import cn from 'classnames';
import { Header } from '../Header/Header';
import { Sitebar } from '../Sitebar/Sitebar';
import { Footer } from '../Footer/Footer';
import { AppContextProvider, IAppContext } from '../../context/app.context';
import { Up } from '../../compoments';

const Layout = ({ children }: LayoutProps): JSX.Element => {
    const [isSkipLinkDisplay, setIsSkipLinkDisplay] = useState<boolean>(false);
    const mainRef = useRef<HTMLDivElement>(null);

    const skipContent = (key: KeyboardEvent) => {
        if (key.code === "Space" || key.code ===  "Enter") {
            key.preventDefault();
            mainRef.current?.focus();
        }
        setIsSkipLinkDisplay(false);
    };

    return (
        <div className={styles.wrapper}>
            <a 
                tabIndex={1} 
                onFocus={() => setIsSkipLinkDisplay(true)} 
                onKeyDown={skipContent}
                className={cn(styles.skipLink, {
                    [styles.diplayed]: isSkipLinkDisplay,
                })}>
                Сразу к содержанию
            </a>
            <Header className={styles.header} />
            <Sitebar className={styles.sitebar} />
            <main tabIndex={0} className={styles.main} ref={mainRef} role="main">
                {children}
            </main>
            <Footer className={styles.footer} />
            <Up />
        </div>
    );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
        
        return (
            <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
                <Layout>
                    <Component {...props} />
                </Layout>
            </AppContextProvider>
        );
    }
}
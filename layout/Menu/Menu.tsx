import Link from  'next/link';
import { useRouter } from 'next/router';

import styles from './Menu.module.css';
import cn from 'classnames';
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interfaces';
import { firstLevelMenu } from '../../helpers/helpers';

export const Menu = (): JSX.Element => {
    const { menu, firstCategory, setMenu } = useContext(AppContext);
    const router = useRouter();
    
    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map((m) => {
            if (m._id.secondCategory === secondCategory) {
                m.isOpened = !m.isOpened;
            }
            return m;
        }));
    };

    const buildFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map((m) => (
                    <div key={m.route}>
                        <Link href={`/${m.route}`}>
                            <a>
                                <div className={cn(styles.firstLevel, {
                                    [styles.firstLevelActive]: m.id == firstCategory
                                })}>
                                    {m.icon}
                                    <span>{m.name}</span>
                                </div>
                            </a>
                        </Link>
                        {m.id == firstCategory && buildSecondLevel(m)}
                    </div>
                ))}
            </>
        );
    }
    const buildSecondLevel = (menuItems: FirstLevelMenuItem) => {
        return (
            <div className={styles.secondBlock}>
                {menu.map((m) => {
                    if (m.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])) {
                        m.isOpened = true
                    }
                    return (
                        <div key={m._id.secondCategory} >
                            <div onClick={() => openSecondLevel(m._id.secondCategory)} className={styles.secondLevel}>
                                {m._id.secondCategory}
                            </div>
                            <div className={cn(styles.secondLevelBlock, {
                                [styles.secondLevelBlockOpened]: m.isOpened
                            })}>
                                {buildThirdLevel(m.pages, menuItems.route)}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return (
            pages.map((page) => (
                <Link href={`/${route}/${page.alias}`}>
                    <a className={cn(styles.thirdLevel, {
                        [styles.thirdLevelActive]: `/${route}/${page.alias}` == router.asPath
                    })}>
                        {page.category}
                    </a>
                </Link>
            ))
        );
    };

    return (
       <div className={styles.menu}>
           {buildFirstLevel()}
       </div>
    );
};
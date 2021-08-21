import Link from  'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import styles from './Menu.module.css';
import cn from 'classnames';
import { useContext, KeyboardEvent, useState } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interfaces';
import { firstLevelMenu } from '../../helpers/helpers';

export const Menu = (): JSX.Element => {
    const { menu, firstCategory, setMenu } = useContext(AppContext);
    const router = useRouter();
    const [ announce, setAnnounce ] = useState<'closed' | 'opened' | undefined>();
    const variants = {
        visible: {
            marginBottom: 20,
            transition: {
                when: 'beforeChildren',
                staggerChildren: 0.1,
            }
        },
        hidden: {
            marginBottom: 0,
        },
    };
    const variantsChildren = {
        visible: {
            opacity: 1,
            height: 29,
        },
        hidden: {
            opacity: 0,
            height: 0,
        },
    };

    const openSecondLevel = (secondCategory: string) => {
        setMenu && setMenu(menu.map((m) => {
            if (m._id.secondCategory === secondCategory) {
                setAnnounce(m.isOpened ? 'closed' : 'opened');
                m.isOpened = !m.isOpened;
            }
            return m;
        }));
    };
    const openSecondLevelKey = (key: KeyboardEvent, category: string) => {
        if (key.code === "Space" || key.code ===  "Enter") {
            key.preventDefault();
            openSecondLevel(category);
        }
    };
    const buildFirstLevel = () => {
        return (
            <ul className={styles.list}>
                {firstLevelMenu.map((m) => (
                    <li key={m.route} aria-expanded={m.id == firstCategory}>
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
                    </li>
                ))}
            </ul>
        );
    }
    const buildSecondLevel = (menuItems: FirstLevelMenuItem) => {
        return (
            <ul className={styles.secondBlock}>
                {menu.map((m) => {
                    if (m.pages.map((p) => p.alias).includes(router.asPath.split('/')[2])) {
                        m.isOpened = true
                    }
                    return (
                        <li key={m._id.secondCategory} >
                            <button 
                                onKeyDown={(key: KeyboardEvent) => openSecondLevelKey(key, m._id.secondCategory)} 
                                onClick={() => openSecondLevel(m._id.secondCategory)} 
                                className={styles.secondLevel}>
                                {m._id.secondCategory}
                            </button>
                            <motion.ul 
                                layout
                                variants={variants}
                                initial={m.isOpened ? 'visible' : 'hidden'}
                                animate={m.isOpened ? 'visible' : 'hidden'}
                                className={cn(styles.secondLevelBlock)}
                            >
                                {buildThirdLevel(m.pages, menuItems.route, m.isOpened ?? false)}
                            </motion.ul>
                        </li>
                    );
                })}
            </ul>
        );
    }
    const buildThirdLevel = (pages: PageItem[], route: string, isOpen: boolean) => {
        return (
            pages.map((page) => (
                <motion.li key={page._id} variants={variantsChildren}>
                    <Link href={`/${route}/${page.alias}`}>
                        <a tabIndex={isOpen ? 0 : -1} className={cn(styles.thirdLevel, {
                            [styles.thirdLevelActive]: `/${route}/${page.alias}` == router.asPath
                        })} aria-current={`/${route}/${page.alias}` == router.asPath ? 'page' : false}>
                            {page.category}
                        </a>
                    </Link>
                </motion.li>
            ))
        );
    };

    return (
       <nav className={styles.menu} role="navigation">
           {announce && <span className="visualyHidden" role="log">{announce == 'opened' ? 'развернуто' : 'свернуто'}</span>}
           {buildFirstLevel()}
       </nav>
    );
};
import styles from './Menu.module.css';
import cn from 'classnames';
import { format } from 'date-fns'; 
import { useContext } from 'react';
import { AppContext } from '../../context/app.context';
import { FirstLevelMenuItem, PageItem } from '../../interfaces/menu.interfaces';

import CoursesIcon from './icons/courses.svg';
import BooksIcon from './icons/books.svg';
import ServicesIcon from './icons/services.svg';
import ProductsIcon from './icons/products.svg';
import { TopLevelCategory } from '../../interfaces/page.interfaces';

const firstLevelMenu: FirstLevelMenuItem[] = [
    { route: 'courses', name: 'Курсы', icon: <CoursesIcon />, id: TopLevelCategory.Courses },
    { route: 'services', name: 'Сервисы', icon: <ServicesIcon />, id: TopLevelCategory.Courses },
    { route: 'books', name: 'Книги', icon: <BooksIcon />, id: TopLevelCategory.Courses },
    { route: 'products', name: 'Продукты', icon: <ProductsIcon />, id: TopLevelCategory.Courses },
];

export const Menu = (): JSX.Element => {
    const { menu, firstCategoty, setMenu } = useContext(AppContext);
    
    const buildFirstLevel = () => {
        return (
            <>
                {firstLevelMenu.map((m) => (
                    <div key={m.route}>
                        <a href={`/${m.route}`}>
                            <div className={cn(styles.firstLevel, {
                                [styles.firstLevelActive]: m.id === firstCategoty
                            })}>
                                {m.icon}
                                <span>{m.name}</span>
                            </div>
                        </a>
                        {m.id == firstCategoty && buildSecondLevel(m)}
                    </div>
                ))}
            </>
        );
    }
    const buildSecondLevel = (menuItems: FirstLevelMenuItem) => {
        return (
            <div>
                {menu.map((m) => (
                    <div key={m._id.secondCategory}>
                        <div className={styles.secondLevel}>
                            {m._id.secondCategory}
                        </div>
                        <div className={cn(styles.secondLevelBlock, {
                            [styles.secondLevelBlockOpened]: m.isOpened
                        })}>
                            {buildThirdLevel(m.pages, menuItems.route)}
                        </div>
                    </div>
                )) }
            </div>
        );
    }
    const buildThirdLevel = (pages: PageItem[], route: string) => {
        return (
            pages.map((page) => (
                <a href={`/${route}/${page.alias}`} className={cn(styles.thirdLevel, {
                    [styles.thirdLevelActive]: true
                })}>
                    {page.category}
                </a>
            ))
        );
    };

    return (
       <div className={styles.menu}>
           {buildFirstLevel()}
       </div>
    );
};
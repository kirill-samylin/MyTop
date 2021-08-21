import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import Logo from '../logo.svg';
import { ButtonIcon } from '../../compoments';
import { motion } from 'framer-motion';
import { Sitebar } from '../Sitebar/Sitebar';
import { useRouter } from 'next/router';
export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false); 
    const router = useRouter();

    useEffect(() => {
        setIsOpen(false);
    }, [router]);
    
    const variants = {
        opened: {
            opacity: 1,
            x: 0,
            transition: {
                stiffness: 20
            }
        },
        close: {
            opacity: 0,
            x: '100%',
        }
    };
    return (
        <header className={cn(className, styles.header)}  {...props}>
            <Logo className={styles.logo} />
            <ButtonIcon appearance="white" icon="menu" onClick={() => setIsOpen(true)} />
            <motion.div className={styles.mobileMenu} 
                variants={variants}
                initial='close'
                animate={isOpen ? 'opened' : 'close'}
            >
                <Sitebar />
                <ButtonIcon className={styles.menuClose} appearance="white" icon="close" onClick={() => setIsOpen(false)} />
            </motion.div>
        </header>
    );
};
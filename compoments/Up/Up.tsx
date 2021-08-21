import { useAnimation, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useScrollY } from '../../hooks/useScrollY';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import styles from './Up.module.css';
export const Up = (): JSX.Element => {

    const controls = useAnimation();
    const yPosition = useScrollY();

    useEffect(() => {
        controls.start({ opacity: yPosition / document.body.scrollHeight });
    }, [yPosition, controls])

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    };

    return (
        <motion.div 
            className={styles.up} 
            animate={controls}
            initial={{ opacity: 0 }}
        >
            <ButtonIcon appearance="primary" icon="up"  onClick={scrollToTop} aria-label="Наверх" />
        </motion.div>
    );
};
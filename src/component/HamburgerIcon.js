import {useState } from 'react';
import styles from '../css/Hamburger.module.css';
import { NavLink } from 'react-router-dom';

const Hamburger = () => {

    // Setting state for menu 
    const[isMenuOpen,setIsMenuOpen] = useState(false);

    // Toggle menu button on click
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close Menu on click
    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <div id={styles.hamburgerWrapper}
            className={isMenuOpen ? styles.active : ""} onClick={toggleMenu}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
            {
                isMenuOpen &&
                <div className={styles.dropMenu} onClick={closeMenu}>
                    <NavLink to='/home' className={styles.dropMenu_items}>Home</NavLink>
                    <NavLink to='/recommendation' className={styles.dropMenu_items}>Recommendation</NavLink>
                </div>
            }
        </>
    );
};

export default Hamburger;
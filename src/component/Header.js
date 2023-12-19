import styles from '../css/Header.module.css';
import { NavLink } from 'react-router-dom';
import NavBar from './NavBar.js';

function Header() {
    return (
        <header id={styles.headerWrapper}>
            <NavLink to='/' className={styles.title}>Book Recommendation</NavLink>
            <NavBar />
        </header>
    );
};

export default Header;
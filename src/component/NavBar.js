import { useEffect, useState } from 'react';
import styles from '../css/NavBAr.module.css';
import { NavLink } from 'react-router-dom';
import Hamburger from './HamburgerIcon';

function NavBar () {

    // Width of Screeen 
    const[screenWidth,setScreenWidth] = useState(window.screen.width);

    // Function for setting screen width 
    const handleScreenWidth = () => {
        setScreenWidth(window.screen.width);
    };
    
    // Handle the event when screen is resize
    useEffect(() => {

        //setting screen width
        window.addEventListener('resize', handleScreenWidth);

        return(
            window.addEventListener('resize', handleScreenWidth)
        );
    },[]);

    return(
        <nav id={styles.navWrapper}>
            {
                screenWidth < 600 ? 
                <Hamburger /> :
                <>
                    <NavLink to='/home'>Home</NavLink>
                    <NavLink to='/recommendation'>Recommendation</NavLink>
                </>
            }           
        </nav>
    );
};

export default NavBar;
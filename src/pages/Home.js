import styles from '../css/Home.module.css';
import popularBooks from '../data/popular_books.json';

const Home = () => {
    return(
        <div className={styles.bookContainer}> 
            {
                popularBooks.map((item, index) => {
                    return (
                        <div className={styles.card}>
                            <img src={item.Image_URL_M} alt='' />
                            <p>Rank: {index + 1}</p>
                            <p>Name: {item.Book_Title}</p>
                            <p>Author: {item.Book_Author}</p>
                            <p>Year: {item.Year_Of_Publication}</p>
                            <p>Rating: {item.avg_rating}</p>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Home;
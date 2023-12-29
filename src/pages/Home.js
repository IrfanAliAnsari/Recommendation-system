import styles from '../css/Home.module.css';
import popularBooks from '../data/popular_books.json';

const Home = () => {
    return(
        <div className={styles.bookContainer}> 
            {
                popularBooks.map((item, index) => {
                    return (
                        <div className={styles.cards}>
                            <div className={styles.imgContainer}> 
                                <img src={item.Image_URL_M} alt='' />   
                            </div>
                            <div className={styles.textContainer}>
                                <p className={styles.ranks}><strong>Rank: </strong>{index + 1}</p>
                                <p className={styles.bookNames}>{item.Book_Title}</p>
                                <p className={styles.authorNames}><strong>Author: </strong>{item.Book_Author}</p>
                                <p className={styles.publishedYear}><strong>Year: </strong>{item.Year_Of_Publication}</p>
                                <p className={styles.bookRatings}><strong>Rating: </strong>{item.avg_rating}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default Home;
import { useState } from "react";
import availableBooks from '../data/indexForSimilarity.json';
import styles from '../css/Recommendation.module.css';
import similarityScore from '../data/cosine_similarity_score.json';

const Recommendation = () => {
 
    //set state for click button of recommendation
    const [isClicked,setClicked] = useState(false);

    //set user search
    const[searchValue, setSearchValue] = useState("1");

    //set similarBooks list
    const[list,setList] = useState([]);

    const recommend =() => {
        setClicked(true);
        let bookList = [];
        let index = availableBooks.map(bookName => bookName.toLowerCase()).indexOf(searchValue.toLowerCase());
        let similarBooks = Object.entries(similarityScore[index]).sort((a,b) => b[1] - a[1]).slice(1,6);
        similarBooks.map(item => {
            bookList.push(availableBooks[item[0]]);
        });
        setList(bookList);      
    }

    const handleSearchBox = (e) => {
        setSearchValue(e.target.value)
        setClicked(false);
    }

    return (
        <>
            <form onSubmit={e => e.preventDefault()} id={styles.form}>
                <input type="search" onChange={handleSearchBox} id={styles.searchBox} placeholder="Search..."/>
                <button type="submit" onClick={recommend} id={styles.btn}>Recommend</button>
            </form>
            {
                isClicked ? 
                <>
                    <h1>Recommended</h1>
                        {
                            list.map(item => {
                                return(
                                    <p>{item}</p>
                                )
                            })
                        }
                </> :
                <div className={styles.grid}>
                    <h1>Available Books</h1>
                    {
                        availableBooks.filter(item => {
                            return searchValue.toLowerCase() === "" ? null : item.toLowerCase().includes(searchValue.toLowerCase());
                        }).map(item => {
                            return <p>{item}</p>
                        })
                    }
                </div>
            }
        </>
    );
};

export default Recommendation;
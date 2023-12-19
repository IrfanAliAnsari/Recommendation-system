#library used
library(tidyverse) #for data mining
library(lsa)  #To calulate cosine similarity 
library(jsonlite) #To convert into json file 

#reading csv file
books <- read.csv("Books.csv")
users <- read.csv("Users.csv")
ratings <- read.csv("Rating.csv")


# replacing periods name with underscore in columns
colnames(books) <- gsub("\\.","_", colnames(books))
colnames(users) <- gsub("\\.","_", colnames(users))
colnames(ratings) <- gsub("\\.","_", colnames(ratings))


#popularity based model

#merging ratings and books for further analysis
name_with_ratings <- merge(ratings, books , by ="ISBN")

#Calculating Frequency of Rating on each Books 
number_of_ratings <- name_with_ratings %>% reframe(freq = n(), .by = Book_Title)

#Calculating average ratings of each Books
avg_ratings <- 
  name_with_ratings %>% 
  reframe(avg_rating = round(mean(Book_Rating), 2), 
          .by = Book_Title)

#Merging frequency and average Rating table and stroing in popular_book variable
popular_book <- merge(number_of_ratings, avg_ratings, by = "Book_Title")

#Only keeping those books rating on which more than 250 user rated
popular_book <-
  popular_book %>% 
  filter(freq > 250) %>% #filtering books rated by more than 250 users
  arrange(desc(avg_rating)) %>% #arrange in descending order based on Rating
  head(50)  #keeping only top 50 Books

#Saving into json file
write(toJSON(left_join(popular_book,
                       books,
                       by = "Book_Title",
                       multiple = "any",
                       relationship = "one-to-one")), "popular_books.json")



# collabariting based model

#Calculating Frequency of user that have been rated more than 200 books
user_based_filtering <- 
  name_with_ratings %>% 
  reframe(freq = n(), .by = User_ID) %>% 
  filter(freq > 200)

#Keeping only those Book rating in which more than 200 user rated
filtered_ratings <- 
  name_with_ratings %>% 
  filter(User_ID %in% user_based_filtering$User_ID)

#calculated frequency of book rated
book_based <- 
  filtered_ratings %>% 
  reframe(freq = n(), .by = Book_Title) %>% 
  filter(freq > 50)

#Now keeping only those rating in which books is rated atleast 50 times
final_filtering <- 
  filtered_ratings %>% 
  filter(Book_Title %in% book_based$Book_Title)

#converting into pivot table before calculating cosine similarity
pivot_tbl <- final_filtering %>% 
  select(User_ID, Book_Title, Book_Rating) %>% 
  pivot_wider(names_from = Book_Title,
              values_from = Book_Rating,
              values_fill = 0,
              values_fn = mean) %>% 
  column_to_rownames("User_ID") #convert the user_ID column into row names

#Convert into JSON file taking only colnames for relative indexing
write(toJSON(colnames(pivot_tbl)), "./pivot_tbl.json")

#Calculate cosine_similarity
cosine_similarity_score <- cosine(as.matrix(pivot_tbl))

#Saving similarity score in json format
write(toJSON(as.data.frame(cs_matrix), dataframe = "rows"),"./cosine_similarity_score.json")


#function for making reccomendation
recomendation <- function(book_name) {
  
  #Finding index of book in pivot_tbl
  index <- which(colnames(pivot_tbl) %in% book_name);
  
  #now finding similar books using similarity score and arrange in descending taking top 5
  similar_items <- sort(cosine_similarity_score[index,], decreasing = T)[2:6];
  
  #printing names of books
  for (i in 1:length(similar_items)) {
    print(names(similar_items[i]))
  }
}




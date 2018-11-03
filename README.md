# online platform for movies

## MovieGram

### Is an online platform for movies. Users have the chance to interact with movies save them to their profile. 

### The idea behind this platform is to create a digital library for movies

### Users cas create a digital library with the movies they already watched, or the movies they plan or they want to watch. The platform will provide information and stats about their movie preferences. 

### Actions for all the movies in their profile
* Users can save comments/notes for every specific movie
* Users can rate the movies in a five star scale rating
* Users can create their own customs lists with movies and search the specific list by name. 
* Users can delete any movie they want in by simply drag and drop the movie icon, to the delete area at the bottom of the screen

### The process for the users to create their own lists is very simple:
* Every movie has a tag
* Users can change this tag, by either creating a new one or select from the already exist
* Users can filter the movies in their profile by the tag name
* If the users delete all the movies with a specific tag , the tag will be deleted automatically 

### Besides those actions, it will provided to users stats about their profile. 
* How many movies they saved
* How much time they spend watching the movies
* Which is their favourite movie genre( It will filter the movie genres and will calculate the most favourite)

### General actions 
* Users can navigate and through a huge list of movies
* Users can save movies to their profile
* Users can search for movies and genres
* Users can go through information about a movie, and also recommended movies based on that movie


### Technologies
* HTML, JavaScript, CSS
* React
* Firebase
* Heroku for deployment

### Structure of the project 

#### Main components of the app are:
* Main (main view displaying all the movies)
* Profile (profile view with all the saved movies)
* Present (displaying the movie results based on the genre)
* Movie (displaying the movies based on the keyboard input)
* View (displaying information about a specific movie)
* Navbar(contains the sandwich icon and the Sidebar)
* Sidebar(displaying the sidebar and contains, the profile page link, the dropdown for the genre selection and the user input)
* Results (displaying all the movie boxes)
* Box (represents the movie boxes)
* Profile box (displaying the boxes to the profile page)
* Filtering, stats, modal, popover (components that contribute to the profile page)
* error (component which displays the errors when there is either network or other problem)
* welcome (welcome screen)
* loader(loader gif when making api calls)

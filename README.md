# online platform for movies

## MovieGram

### Is an online platform for movies. Users have the chance to interact with movies and create their own profile and save the movies there. The idea behind this platform is to create a digital library with movies, which movies the user watched and provide specific stats about their preferences.This platform can be used in order for the users to create an online library with all the movies they have watched. 

### Actions for all the movies in their profile
* Users can save comments/notes for every specific movie
* Users can rate the movies in a five star scale rating
* Users can create their own customs lists with movies and search the specific list by name
* Users can delete any movie they want in by simply drag and drop the movie icon, to the delete area at the bottom of the screen

Besides those actions, it will provided to users stats about their profile. How many movies they saved, how many time they spend watching the movies and which is their favourite movie genre( It will filter the movie genres and will calculate the most favourite)

### General actions 
* Users can navigate and through a huge list of movies
* Users can save movies to their profile
* Users can search for movies and genres
* Users can go through information about a movie, and also recommended movies based on that movie


### Technologies
* HTML, JavaScript, CSS
* React
* Firebase
* Heroku for deplaoyment

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

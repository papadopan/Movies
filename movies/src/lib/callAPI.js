// API KEY 
const API_KEY = '?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US';

// API DOMAIN
const API_DOMAIN = 'https://api.themoviedb.org/3/movie';

const API_PAGE = '&page='

const url_maker = (filter, num) =>{
    if( num === undefined)
        return `${API_DOMAIN}/${filter}${API_KEY}`
    else
    return `${API_DOMAIN}/${filter}${API_KEY}${API_PAGE}${num}`

}



const MOVIE_API = fetch =>({
    fetchMovies : (filter, num)  => fetch( url_maker(filter, num))
                                    .then(response => response.json()),

    fetchCategories: () =>fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US')
                            .then(response=> response.json()),
    fetchSpecificGenre: (genre_id) => fetch('https://api.themoviedb.org/3/genre/'+ genre_id +'/movies?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US&include_adult=false&page=1')
                                .then(response=> response.json()),
    fetchMovie : (name) => fetch('https://api.themoviedb.org/3/search/movie?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US&query='+ name )
                                .then(response => response.json()) ,
    fetchMovieInfos : (id) => fetch(' https://api.themoviedb.org/3/movie/'+ id +'?api_key=f35de773b53c4803aa0d72b2f16794f4')
                                .then(response=> response.json())
                                
                                

})

export default MOVIE_API;
// API KEY 
const API_KEY = '?api_key=f35de773b53c4803aa0d72b2f16794f4&language=en-US';

// API DOMAIN
const API_DOMAIN = 'https://api.themoviedb.org/3/';

const API_PAGE = '&page='

const MOVIE_API = fetch =>({
    fetchMovies : (filter, num)  => fetch( `${API_DOMAIN}movie/${filter}${API_KEY}${API_PAGE}${num}`)
                                    .then(response => response.json()),

    fetchCategories: () =>fetch(`${API_DOMAIN}genre/movie/list${API_KEY}`)
                            .then(response=> response.json()),
    fetchSpecificGenre: (genre_id) => fetch(`${API_DOMAIN}genre/${genre_id}/movies${API_KEY}&include_adult=false&page=1`)
                                .then(response=> response.json()),
    fetchMovie : (name) => fetch(`${API_DOMAIN}search/movie${API_KEY}&query=${name}`)
                                .then(response => response.json()) ,
    fetchMovieInfos : (id) => fetch(`${API_DOMAIN}movie/${id}${API_KEY}`)
                                .then(response=> response.json()),
    fetchRecommended : (id) => fetch(`${API_DOMAIN}movie/${id}/recommendations${API_KEY}${API_PAGE}1`)
                                .then(response => response.json())
                                
                                

})

export default MOVIE_API;
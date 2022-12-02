import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchMovieHandler() {
        setIsLoading(true);
        const response = await fetch('https://swapi.dev/api/films');
        const data = await response.json();

        const transformedData = data.results.map(moviedata => {
            return {
                id: moviedata.episode_id,
                title: moviedata.title,
                openingText: moviedata.opening_crawl
            }
        });
        setMovies(transformedData);
        setIsLoading(false);
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMovieHandler}>Fetch Movies</button>
            </section>
            <section>
                {!isLoading && movies.length > 0 && <MoviesList movies={movies}/>}
                {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
                {isLoading && <p>Movie is loading...</p>}
            </section>
        </React.Fragment>
    );
}

export default App;

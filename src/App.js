import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fetchMovieHandler() {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('https://swapi.dev/api/films');
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();

            const transformedData = data.results.map(moviedata => {
                return {
                    id: moviedata.episode_id,
                    title: moviedata.title,
                    openingText: moviedata.opening_crawl
                }
            });
            setMovies(transformedData);
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }

    let content = <p>Found no movies.</p>;
    if (error) {
        content = <p>{error}</p>
    }
    if (movies.length > 0) {
        content = <MoviesList movies={movies}/>
    }
    if (isLoading) {
        content = <p>Movie is loading...</p>
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMovieHandler}>Fetch Movies</button>
            </section>
            <section>
                {content}
            </section>
        </React.Fragment>
    );
}

export default App;

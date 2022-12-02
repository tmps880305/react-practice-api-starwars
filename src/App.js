import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);

    async function fetchMovieHandler() {
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
    }

    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMovieHandler}>Fetch Movies</button>
            </section>
            <section>
                <MoviesList movies={movies}/>
            </section>
        </React.Fragment>
    );
}

export default App;

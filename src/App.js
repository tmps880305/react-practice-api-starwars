import React, {useState, useEffect} from 'react';

import MoviesList from './components/MoviesList';
import NewMovie from './components/NewMovie';
import useHttp from './hooks/use-http';
import './App.css';

function App() {
    const [movies, setMovies] = useState([]);

    const {isLoading, error, sendRequest: fetchMovieHandler} = useHttp();

    const fetchData = () => {
        const requestMoviesConfig = {url: 'https://react-http-aa7a6-default-rtdb.firebaseio.com/movie.json'};
        const transformMovies = (moviesObj) => {
            const loadMovies = [];
            for (const key in moviesObj) {
                loadMovies.push({
                    id: key,
                    title: moviesObj[key].title,
                    openingText: moviesObj[key].openingText,
                    releaseDate: moviesObj[key].releaseDate
                });
            }
            setMovies(loadMovies);
        };
        fetchMovieHandler(requestMoviesConfig, transformMovies);
    };

    useEffect(() => {
        fetchData();
    }, []);


    const addMovieHandler = () => {
        fetchData();
    };


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
                <NewMovie onNewMovie={addMovieHandler}/>
            </section>
            <section>
                <button onClick={fetchData}>Fetch Movies</button>
            </section>
            <section>
                {content}
            </section>
        </React.Fragment>
    );
}

export default App;

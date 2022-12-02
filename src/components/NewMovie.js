import React from 'react';

import AddMovie from './AddMovie';
import useHttp from "../hooks/use-http";


const NewMovie = (props) => {

    const {isLoading, error, sendRequest: fetchMovieHandler} = useHttp();

    const addMovieHandler = (movie) => {
        const addMoviesConfig = {
            url: 'https://react-http-aa7a6-default-rtdb.firebaseio.com/movie.json',
            method: 'POST',
            body: movie,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetchMovieHandler(addMoviesConfig, () => {
            props.onNewMovie();
        });

    };


    return <AddMovie onAddMovie={addMovieHandler}/>;
};

export default NewMovie;

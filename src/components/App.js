import React from 'react';
import Card from './Card';
import Genre from './Genre';
import axios from 'axios';
import { endpoints } from '../../config';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      movieList: [],
      genresList: [],
      likedMoviesList: [],
    }
  }

  componentDidMount() {
    this.requestPopularMovies();
    this.requestGenres();
  }

  requestPopularMovies = () => {
    axios
      .get(endpoints.mostPopularMovies())
      .then((response) => {
        this.setState({
          movieList: response.data.results,
        });
      })
      .catch((error) => console.log(error.response));
  };

  requestGenres = () => {
      axios
        .get(endpoints.genres())
        .then((response) => {
            this.setState({
                genresList: response.data.genres,
            });
        })
        .catch((error) => console.log(error.response));
  };

  requestGenreMovies = (id) => {
      axios
        .get(endpoints.genreMovies(id))
        .then((response) => {
            this.setState({
                movieList: response.data.results,
            });
        })
        .catch((error) => console.log(error.response));
  }

  like = (id) => {
      this.state.likedMoviesList.push(id);
  }

  dislike = (id) => {
      const { likedMoviesList } = this.state;
      let i = likedMoviesList.indexOf(id);
      likedMoviesList.splice(i,1);
  }
  
  render() {
    const { movieList,genresList } = this.state;

    return (
      <React.Fragment>
        {genresList.map((genre) => (
            <Genre key={genre.id} data={genre} updateMovies={this.requestGenreMovies}/>
        ))}

        {movieList.map((movie) => (
          <Card key={movie.id} data={movie} likeFunction={this.like} dislikeFunction={this.dislike} likedMoviesList={this.state.likedMoviesList} />
        ))}
      </React.Fragment>
    );
  }
}

export default App;

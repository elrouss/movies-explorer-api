const Movie = require('../models/movie');

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const { _id } = req.user;

  Movie
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner: _id,
      movieId,
      nameRU,
      nameEN,
    })
    .then(() => res.status(201).send('Фильм успешно сохранен в личном кабинете пользователя'))
    .catch((err) => console.log(err));
}

function receiveMovies(_, res, next) {
  Movie
    .find({})
    .populate('owner', '_id')
    .then((movies) => res.send(movies))
    .catch((err) => console.log(err)); // TODO Должны выводиться только фильмы текущего пользователя?
}

function deleteMovie(req, res, next) {
  const { id: movieId } = req.params;
  const { _id: userId } = req.user;

  Movie
    .findById(movieId)
    .then((movie) => {
      if (!movie) return console.log('Данные по указанному id не найдены');

      const { owner: movieOwnerId } = movie;
      if (movieOwnerId.valueOf() !== userId) return res.status(400).send('Нет прав доступа');

      Movie.findByIdAndDelete(movieId);
    })
    .then(() => res.send('Фильм успешно удален из личного кабинета пользователя'))
    .catch((err) => console.log(err));
}

module.exports = {
  createMovie,
  receiveMovies,
  deleteMovie,
};

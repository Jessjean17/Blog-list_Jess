import { config } from 'dotenv';
import { sortBy } from '../utils/sort';
import format from '../utils/format';
import axiosRequest from '../utils/request';

config();

const movieController = {};

movieController.getMovies = async (req, res) => {
  try {
    const response = await axiosRequest('movie');

    const movies = response.data;
    if (req.query.sort) {
      movies.docs.sort(sortBy(req.query.sort));
    }
    format(movies.docs);
    res.status(200).json({
      status: 'success',
      data: movies
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err
    });
  }
};

export default movieController;
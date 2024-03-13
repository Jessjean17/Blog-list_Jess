// import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";

// import { Context } from "../store/appContext";

import client from '../services/redis';
import { sortBy } from '../utils/sort';
import paginate from '../utils/pagination';
import axiosRequest from '../utils/request';

const charController = {};

charController.getCharacters = async (req, res) => {
  try {
    const response = await axiosRequest('character');
    const characters = response.data;
    if (req.query.sort === 'race' || req.query.sort === 'gender') {
      characters.docs.sort(sortBy(req.query.sort));
    }
    //Paginate Results
    const limit = req.query.limit || 100;
    const pageNumber = req.query.page || 1;
    const data = paginate(characters.docs, pageNumber, limit);

    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err
    });
  }
};

charController.getOneCharacter = async (req, res) => {
  try {
    const { id } = req.params;

    const response = await axiosRequest('character', id);
    const { data } = response;

    client.setex(id, 3600, JSON.stringify(data));

    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: 'Character Not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err
    });
  }
};

charController.cache = (req, res, next) => {
  const { id } = req.params;

  try {
    client.get(id, (err, data) => {
      if (err) {
        throw err;
      }
      if (!data) {
        return next();
      }
      res.status(200).json({
        status: 'success',
        data: JSON.parse(data)
      });
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      error: err
    });
  }
};

export default charController;

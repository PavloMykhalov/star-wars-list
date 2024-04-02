import axios from "axios";

const baseURL = 'https://sw-api.starnavi.io/';

//client for characters
export const charactersAPI = axios.create({
  baseURL: baseURL + 'people',
});

//client for films
export const filmsAPI = axios.create({
  baseURL: baseURL + 'films',
});

//client for starships
export const starshipsAPI = axios.create({
  baseURL: baseURL + 'starships',
});



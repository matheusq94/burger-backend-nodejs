import axios from 'axios';

const key = '7aa00474-14ee-48d5-b2e8-6710ebd1be72';

const apiCoord = axios.create({
  baseURL: `https://geocode-maps.yandex.ru/1.x/?apikey=${key}&geocode=28.978798,41.006543&lang=en_US`,
});

export default apiCoord;

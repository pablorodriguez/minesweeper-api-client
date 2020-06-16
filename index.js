const axios = require('axios');
//const url = 'https://minesweeper-api-mdz.herokuapp.com/minesweepers.json';
const url = 'http://localhost:3000/minesweepers.json';

const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

instance.get('/minesweepers.json')
  .then(response => {
    console.log(response.data.games);
  })
  .catch(error => {
    console.log(error);
  });

  instance.post('/minesweepers.json',{
    name: 'Game A JS',
    max_x: 10,
    max_y: 10,
    amount_of_mines:  15,
    user_name: 'mario'
  }).then(response => {
    console.log(response.data.game);
  }).catch(error => {
    console.log(error);
  })
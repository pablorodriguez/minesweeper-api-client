const axios = require('axios');
const url = 'https://minesweeper-api-mdz.herokuapp.com';
const url = 'http://localhost:3000';

const instance = axios.create({
  baseURL: url,
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

function get_games(user_name) {
  instance.get(`/minesweepers.json?user_name=${user_name}`)
    .then(response => {
      if (response.data.games.length > 0) {
        response.data.games.forEach(g =>{
          print_game(g);
        })
      }else{
        console.log("There are not games created");
      }
    })
    .catch(error => {
      console.log(error.response.data);
    });
}

function print_game(game){
  console.log("Name:", game.name);
  console.log("User Name:", game.user.name);
  console.log("Status:", game.status);
  console.log(`Time: ${game.time} hh:mm`)
  console.table(game.view_map);
  console.log("_________________________________________________________________________________");
};

function show_game(game_name){
  instance.get(`/minesweepers/${game_name}.json`)
  .then(response => {
    print_game(response.data.game);
  })
  .catch(error => {
    console.log(error.response.data);
  });
}

function create(name, max_x, max_y, amount_of_mines, user_name){
  instance.post('/minesweepers.json',{
     name,
     max_x ,
     max_y,
     amount_of_mines,
     user_name
   }).then(response => {
    print_game(response.data.game);
   }).catch(error => {
     console.log(error.response.data);
   })
}

function game_action(action, name){
  instance.patch(`/minesweepers/${name}`,{
    perform: action
  }).then(response => {
    print_game(response.data.game);
  }).catch(error => {
    console.log(error.response.data);
  })
};

function cell_action(action, name, x,y){
  instance.patch(`/minesweepers/${name}`,{
    x,y,perform: action
  }).then(response => {
    print_game(response.data.game);
  }).catch(error => {
    console.log(error.response.data);
  })
};

//console.log(process.argv);

if (process.argv.length > 2){
  const command = process.argv[2];
  const user_name = process.argv[3];
  const game_name = process.argv[4];
  const max_x = process.argv[5];
  const max_y = process.argv[6];
  const mines = process.argv[7];

  if (command == "start"){
    create(game_name,max_x, max_y, mines, user_name)
  }

  if (command == "stop") {
    game_action('stop', game_name);
  }

  if (command == "play") {
    game_action('play', game_name);
  }

  if (command == "list"){
    get_games(user_name);
  }

  if (command == "show"){
    show_game(game_name)
  }

  if (command == "click"){
    cell_action('click', game_name, max_x, max_y);
  }

  if (command == "flag"){
    cell_action('flag', game_name, max_x, max_y);
  }

}
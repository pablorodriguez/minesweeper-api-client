const axios = require('axios');
const url = 'https://minesweeper-api-mdz.herokuapp.com';
//const url = 'http://localhost:3000/minesweepers.json';

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
      console.log(error);
    });
}

function print_game(game){
  console.log("Name:", game.name);
  console.log("Usuario:", game.user.name);
  console.log("Estado:", game.status);
  console.table(game.view_map);
  console.log("_________________________________________________________________________________");
};

function show_game(game_name){
  instance.get(`/minesweepers/${game_name}.json`)
  .then(response => {
    print_game(response.data.game);
  })
  .catch(error => {
    console.log(error);
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
     console.log(error);
   })
}

function click(name, x,y){
  instance.patch(`/minesweepers/${name}`,{
    x,y, perform: 'click'
  }).then(response => {
    print_game(response.data.game);
  }).catch(error => {
    console.log(error);
  })
};

function flag(name, x,y){
  instance.patch(`/minesweepers/${name}`,{
    x,y,perform: 'flag'
  }).then(response => {
    print_game(response.data.game);
  }).catch(error => {
    console.log(error);
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

  if (command == "list"){
    get_games(user_name);
  }

  if (command == "show"){
    show_game(game_name)
  }

  if (command == "click"){
    click(game_name, max_x, max_y);
  }

  if (command == "flag"){
    flag(game_name, max_x, max_y);
  }

}
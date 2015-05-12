
//require('./node_modules').map(require(process.argv[2]));
//var map = require('./node_modules').map(require(process.argv[2]));




//create variable for list of rooms from .JSON file
var game = require("./" + process.argv[2]);

//create variable that creates initial
var map = require('./node_modules').map(game);


var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var currentRoom = "B";
var currentRoomIndex = 1;


//function to display message from current room
var displayMessage = function() {
  for (var i = 0; i < 10; i++)
  {
    if (game.rooms[i].name === currentRoom)
    {
    console.log(game.rooms[i].message);
    }
  }
};

//function to get current room index, and updated the visited member of the current room
var getCurrentRoomIndex = function() {
  for (var i = 0; i < 11; i++)
  {
    if (game.rooms[i].name === currentRoom)
    {
    currentRoomIndex = i;
    game.rooms[i].visited = true;
    }
  }
  return currentRoomIndex;
};


// function to run one iteration of the game
var playGame = function () {
  currentRoomIndex = getCurrentRoomIndex();
  if (game.rooms[currentRoomIndex].treasure)
  {
    console.log("You Found the Treasure!");
    rl.close();
  }

  else
  {
    console.log(require('./node_modules').map(game));  //display map with current visited rooms (updated in variable 'games')
    displayMessage();
    rl.question("Which way do you want to go? ", function(choice){

      if (choice === "north")
      {
        currentRoom = game.rooms[currentRoomIndex].north;
      }

      if (choice === "east")
      {
        currentRoom = game.rooms[currentRoomIndex].east;
      }

      if (choice === "south")
      {
        currentRoom = game.rooms[currentRoomIndex].south;
      }

      if (choice === "west")
      {
        currentRoom = game.rooms[currentRoomIndex].west;
      }

      playGame();

    }); //end of callback function
  }
};


//play first iteration of game to start
playGame();

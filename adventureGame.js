
require('./node_modules').map(require(process.argv[2]));

var game = require("./" + process.argv[2]);

var readline = require('readline');

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var currentRoom = "B";
var currentRoomIndex = 1;

//function to display message from current room and return array index of current room
var displayMessage = function() {
  for (var i = 0; i < 10; i++)
  {
    if (game.rooms[i].name === currentRoom)
    {
    console.log(game.rooms[i].message);
    }
  }
};

var getCurrentRoomIndex = function() {
  for (var i = 0; i < 11; i++)
  {
    if (game.rooms[i].name === currentRoom)
    {
    currentRoomIndex = i;
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

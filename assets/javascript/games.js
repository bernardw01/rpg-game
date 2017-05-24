/* 
Bernard Williams
UCF Bootcamp APR2017 Week 4
RPG Starwars Game
*/

//global variables
var currentPlayerID = "";
var currentDefenderID = "";
var enemies = []; //array of enemy players
var currentPlayer = {};
var currentDefender = {};
var numAttacks = 0;
var initAttackPower = 0; //place holder for storing the initial AP for the current player.
var enemiesRemaining = 0;

//Enumeration to represent game state
var gameState = {
  newGame: true,
  defenderSelected: false,
  playerSelected: false,
  playerDefeated: false,
  defenderDefeated: false,
  playerWins: false,
  newMatch: false
};

//Function used to filter the array of players to only return those players not selected
function getEnemies(player) {
  console.log("------------------------------------");
  console.log("get enemies ran " + player);
  console.log(player);
  console.log("------------------------------------");
  if (player.id != currentPlayerID) {
    enemies.push(player);
  } else {
    currentPlayer = player;
  }
  enemiesRemaining = enemies.length;
}

//Function to randomly generate a players initial strength
function initializePlayers() {
  for (var i = 0; i < characters.length; i++) {
    characters[i].attackPower = getRandomInt(10, 25);
    characters[i].counterAttackPower = getRandomInt(10, 25);
    characters[i].healthPoints = getRandomInt(84, 180);
  }
}

//Function that facilitates the players attack of the defender
function playerAttack() {
  console.log("------------------------------------");
  console.log("Attack " + numAttacks + " has occurred");
  console.log("Player Name " + currentPlayer.name);
  console.log("Player HP " + currentPlayer.healthPoints);
  console.log("Player AP " + currentPlayer.attackPower);
  console.log("defender Name " + currentDefender.name);
  console.log("defender HP " + currentDefender.healthPoints);
  console.log("Defender AP " + currentDefender.attackPower);
  console.log("------------------------------------");
  //The ap of the player is multiplied by the number of attacks
  currentPlayer.attackPower = numAttacks * initAttackPower;
  //Defender hp is reduced by the ap of the player
  currentDefender.healthPoints -= currentPlayer.attackPower;

  //The hp of the player is reduced by the counter attack points of the defender
  currentPlayer.healthPoints -= currentDefender.counterAttackPower;

  //The fight section message is updated
  var msg =
    "You attacked " +
    currentDefender.name +
    "& caused " +
    currentPlayer.attackPower +
    " damage.  ";
  msg +=
    currentDefender.name +
    " attacked you back & caused " +
    currentDefender.counterAttackPower +
    " damage.  ";

  //the currentDefender and currentPlayer object variable is updated
  updatePlayerByID(currentDefender);
  updatePlayerByID(currentPlayer);

  //Determine if someone has lost
  if (
    currentPlayer.healthPoints < 1 &&
    currentPlayer.healthPoints < currentDefender.healthPoints
  ) {
    gameState.playerDefeated = true;
    console.log("------------------------------------");
    console.log("Player Defeated");
    console.log(currentPlayer.name);
    console.log("------------------------------------");
    msg +=
      "You really need to do better.  Save your excuses for your parents whom you so often dissapoint. Now please try again.";
  } else if (
    currentDefender.healthPoints < 1 &&
    currentDefender.healthPoints < currentPlayer.healthPoints
  ) {
    gameState.defenderDefeated = true;
    console.log("------------------------------------");
    console.log("Defender defeated");
    console.log(currentDefender.name);
    console.log(currentDefender.healthPoints);
    console.log("------------------------------------");
    msg +=
      " CONGRATULATIONS!!!! You have won the match!  Please select your next opponent";
  }

  return msg;
}

//Function that facilitates the players attack of the defender
function defenderResponse() {}

/**
       * Get a random integer between `min` and `max`.
       * 
       * @param {number} min - min number
       * @param {number} max - max number
       * @return {int} a random integer
       */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//This function searches an array and returns the object with the matching ID field
function getPlayerByID(ID) {
  for (var i = 0; i < characters.length; i++) {
    var element = characters[i];
    if (element.id == ID) {
      return element;
    }
  }
}

//Take an updated player object and updates the main character array based on a matching ID
function updatePlayerByID(player) {
  for (var i = 0; i < characters.length; i++) {
    var element = characters[i];
    if (element.id == player.id) {
      characters[i] = player;
    }
  }
}

//This function updates the screen with the latest information for the player and defender that was passed.
function updateCharacterDisplay() {
  //update the defender
  if (gameState.defenderDefeated) {
    $("#" + currentDefenderID).remove();
    enemiesRemaining--;
    gameState.defenderSelected = false;
    if (enemiesRemaining < 1) {
      gameState.playerWins = true;
    }
    gameState.defenderDefeated = false;
  } else {
    var hpElement = $("#" + currentDefenderID).find("#hpbadge");
    hpElement.text(currentDefender.healthPoints);

    var apElement = $("#" + currentDefenderID).find("#apbadge");
    apElement.text(currentDefender.attackPower);

    var cpElement = $("#" + currentDefenderID).find("#cpbadge");
    cpElement.text(currentDefender.counterAttackPower);
  }

  //update the Player
  var hpElement = $("#" + currentPlayerID).find("#hpbadge");
  hpElement.text(currentPlayer.healthPoints);

  var apElement = $("#" + currentPlayerID).find("#apbadge");
  apElement.text(currentPlayer.attackPower);

  var cpElement = $("#" + currentPlayerID).find("#cpbadge");
  cpElement.text(currentPlayer.counterAttackPower);
}

function initializeGameBoard() {
  //Code to put the legend in the header
  var hpLabel = $("<span id=''>");
  hpLabel.addClass("badge healthPoints badge-success");
  hpLabel.text("Health Points");
  $("#headerRow").append(hpLabel);
  var apLabel = $("<span id=''>");
  apLabel.addClass("badge healthPoints badge-warning");
  apLabel.text("Attack Power");
  $("#headerRow").append(apLabel);
  var capLabel = $("<span id=''>");
  capLabel.addClass("badge healthPoints badge-danger");
  capLabel.text("Counter Attack Power");
  $("#headerRow").append(capLabel);

  //Once the document is loaded check the config file and add a media object for each player in the config file
  for (var index = 0; index < characters.length; index++) {
    var player = characters[index];
    console.log("------------------------------------");
    console.log(player);

    //set the hit points for the players

    //Create a new media object for each character in the config file
    var newCharacterElement = $("<div>");
    newCharacterElement.addClass("media player");
    newCharacterElement.attr("id", characters[index].id);

    var newMediaLeft = $("<div>");
    newMediaLeft.addClass("media-left");

    var newMediaImage = $("<img>");
    newMediaImage.addClass("media-object media-image");
    newMediaImage.attr("src", characters[index].imgURL);

    var newMediaBody = $("<div>");
    newMediaBody.addClass("media-body");

    //Generate heading
    var newMediaHeading = $("<h5>");
    newMediaHeading.addClass("media-heading");
    newMediaHeading.text(characters[index].name);
    var hpLabel = $("<span id='hpbadge'>");
    hpLabel.addClass("badge healthPoints badge-success");
    hpLabel.text(characters[index].healthPoints);
    newMediaHeading.append(hpLabel);
    var apLabel = $("<span id='apbadge'>");
    apLabel.addClass("badge healthPoints badge-warning");
    apLabel.text(characters[index].attackPower);
    newMediaHeading.append(apLabel);
    var capLabel = $("<span id='cpbadge'>");
    capLabel.addClass("badge healthPoints badge-danger");
    capLabel.text(characters[index].counterAttackPower);
    newMediaHeading.append(capLabel);

    var newMediaText = $("<p>");
    newMediaText.text(characters[index].desc);

    newMediaLeft.append(newMediaImage);
    newMediaBody.append(newMediaHeading);
    newMediaBody.append(newMediaText);
    newCharacterElement.append(newMediaLeft);
    newCharacterElement.append(newMediaBody);

    $("#characters").append(newCharacterElement);

    //Put a border around the character panel
    $("#characters").addClass("panelBorder");
    $("#fightSection").text("... Please select your character to start...");
  }
}

/* 
Bernard Williams
UCF Bootcamp APR2017 Week 4
RPG Starwars Game
*/

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
}

//Function to randomly generate a players initial strength
function initializePlayers() {
  for (var i = 0; i < characters.length; i++) {
    characters[i].attackPower = getRandomInt(2, 6);
    characters[i].counterAttackPower = 25;
    characters[i].healthPoints = getRandomInt(84, 180);
  }
}

//Function that facilitates the players attack of the defender
function playerAttack() {
  console.log("------------------------------------");
  console.log("Attack has occurred");
  console.log("Player Name " + currentPlayer.name);
  console.log("Player HP " + currentPlayer.healthPoints);
  console.log("Player AP " + currentPlayer.attackPower);
  console.log("defender Name " + currentDefender.name);
  console.log("defender HP " + currentDefender.healthPoints);
  console.log("Defender AP " + currentDefender.attackPower);
  console.log("------------------------------------");
  //The ap of the player is multiplied by the number of attacks
  currentPlayer.attackPower *= numAttacks;
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

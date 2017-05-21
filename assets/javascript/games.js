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
    characters[i].attackPower = getRandomInt(2,6);
    characters[i].counterAttackPower = 25;
    characters[i].healthPoints = getRandomInt(84,180);
  }
}

//Function that facilitates the players attack of the defender
function playerAttack() {}

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

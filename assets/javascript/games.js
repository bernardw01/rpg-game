/* 
Bernard Williams
UCF Bootcamp APR2017 Week 4
RPG Starwars Game
*/

//Variable Definition
var characterSection = function gameInit() {
  //Reset the characters
  //Reread the config file
};

//Function used to filter the array of players to only return those players not selected
function getEnemies(player) {
  console.log("------------------------------------");
  console.log("get enemies ran " + player);
  console.log(player);
  console.log("------------------------------------");
  if (player.id != currentPlayerID){
      enemies.push(player);
  } else {
      currentPlayer = player;
  }
}

//Function to randomly generate a players initial strength
function gethealthPoints(){

}

//Function that facilitates the players attack of the defender
function playerAttack(){

}

//Function that facilitates the players attack of the defender
function defenderResponse(){

}
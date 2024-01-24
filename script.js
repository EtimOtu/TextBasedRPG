let xp = 0;
let mana = 30;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const manaText = document.querySelector("#manaText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [  
{
    name: "stick",
    power: 5
},
{
    name: "dagger",
    power: 30
},
{
    name: "claw hammer",
    power: 50
},
{
    name: "sword",
    power: 100
}
];

const monsters = [{
    name: "slime",
    level: 2,
    health: 15
    },{
    name: "fanged beast",
    level: 8,
    health: 60
    },{
      name: "dragon",
      level: 20,
      health: 300
    }
  ];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goRest;
button3.onclick = goCave;
button4.onclick = fightBoss;

function update(locations){
    monsterStats.style.display = "none";
    button1.innerText = locations["button text"][0];
    button2.innerText = locations["button text"][1];
    button3.innerText = locations["button text"][2];

    button1.onclick = locations["button functions"][0];
    button2.onclick = locations["button functions"][1];
    button3.onclick = locations["button functions"][2];

    // check if there is a fourth button
    if (locations["button text"][3]) {
        //show the button
        button4.style.display = "inline-block";
        button4.innerText = locations["button text"][3];
        button4.onclick = locations["button functions"][3];
    } else {
        // Hide the button
        button4.style.display = "none";
    }

    text.innerText = locations.text;
}

function goGuild(){
    update(locations[0]);
}

function goStore(){
    update(locations[1]);
}

function goRest(){
    if(gold >= 80){
        gold -= 80;
        mana += 30;
        health += 20;
        goldText.innerText = gold;
        manaText.innerText = mana;
        healthText.innerText = health;
        text.innerText = "You feel well resteD! gain 20 health 30 mana!"
    }else{
        text.innerText = "You cant afford to rent a room...";
    }

}

function goCave(){
    update(locations[2]);
}

function fightBoss(){
    fighting = 2;
    goFight();
}

function buyHealth(){
    if(gold >= 10){
        gold -= 10;
        health += 20;
        goldText.innerText = gold;
        healthText.innerText = health;
    }else{
        text.innerText = "You do not have enough gold...";
    }
}

function sellWeapon(){
    if(inventory.length > 1){
        gold += 20;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    }else{
        text.innerText = "Don't sell your only weapon!";
    }
}

function buyWeapon(){
    if(currentWeapon < weapons.length - 1){
        if(gold >= 30){
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold;
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You've gained a " + newWeapon +".";
            inventory.push(newWeapon);
            text.innerText += " In your inventory you have: " + inventory;
        }else{
            text.innerText = "You don't have enough gold..."
        }
    }else{
        text.innerText = "There are no weapons left."
        button2.innerText = "Sell weapon for 20 gold";
        button2.onclick = sellWeapon;
    }
}

function fightSlime(){
    fighting = 0;
    goFight();
}

function fightBeast(){
    fighting = 1;
    goFight();
}

function goFight(){
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterName.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
}

const locations = [
    {
        name: "guild",
        "button text": ["Go to store", "Long rest (80 gold)", "Go to cave", "Fight Boss"],
        "button functions": [goStore, goRest, goCave, fightBoss],
        text: "You are back in the guild. What would you like to do?"
    },
    {
        name: "store",
        "button text": ["Buy 20 Health (10 gold)", "Buy weapon (30 gold)", "Go to Guild"],
        "button functions": [buyHealth, buyWeapon, goGuild],
        text: "You enter the store"
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to Guild"],
        "button functions": [fightSlime, fightBeast, goGuild],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Special Attack", "Dodge", "Run"],
        "button functions": [attack, SpAtk, dodge, goGuild],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to Guild", "Go to Guild", "Go to Guild"],
        "button functions": [goGuild, goGuild, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. ☠️"
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! 🎉"
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to Guild"],
        "button functions": [pickTwo, pickEight, goGuild],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
  ];

const characterClass = [
    {
        name: "mage",
        health: 60,
        mana: 100
    },
    {
        name: "fighter",
        health: 100,
        mana: 80
    },
    {
        name: "tank",
        health: 120,
        mana: 25
    }
];

function attack(){
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= getMonsterAttackValue(monsters[fighting].level);
    if (isMonsterHit()) {
        // weapon power + random # from 1 to xp lvl and remove it from monster health
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
      }else{
         text.innerText += " You miss.";
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if(health <= 0){
        lose();
    } else if(monsterHealth <= 0){
        fighting === 2 ? winGame() : defeatMonster();
    }

    if (Math.random() <= .1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks.";
        currentWeapon--;
    }
}

function SpAtk(){
    if(mana >= 10){
        mana -= 10;
        text.innerText = "The " + monsters[fighting].name + " attacks.";
        text.innerText += " You attack it with your special attack!";
        health -= getMonsterAttackValue(monsters[fighting].level);
        if (isMonsterHit()) {
            // weapon power + random # from 1 to xp lvl and remove it from monster health
            monsterHealth -= (weapons[currentWeapon].power * 1.2) + Math.floor(Math.random() * xp) + 1;    
        }else{
            text.innerText += " You miss.";
        }
        manaText.innerText = mana;
        healthText.innerText = health;
        monsterHealthText.innerText = monsterHealth;
        if(health <= 0){
            lose();
        } else if(monsterHealth <= 0){
            fighting === 2 ? winGame() : defeatMonster();
        }

        if (Math.random() <= .1 && inventory.length !== 1) {
            text.innerText += " Your " + inventory.pop() + " breaks.";
            currentWeapon--;
        }
    }else{
        text.innerText = "YOU HAVE NO MANA!";
    }
}

function dodge(){
    text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function lose(){
    update(locations[5]);
}

function defeatMonster(){
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

function restart(){
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    xpText.innerText = xp;
    healthText.innerText = health;
    goldText.innerText = gold;
    goGuild();
}

function winGame(){
    update(locations[6]);
}

function getMonsterAttackValue(level){
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit > 0 ? hit : 0;
}

function isMonsterHit(){
    return Math.random() > .2 || health <= 20? true : false;
}

function easterEgg(){
    update(locations[7]);
}

function pick(guess){
    const numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }
    if (numbers.includes(guess)) {
        text.innerText += "Right! You win 20 gold!";
        gold += 20;
        goldText.innerText = gold;
    }else{
        text.innerText += "Wrong! You lose 10 health!";
        health -= 10;
        healthText.innerText = health;
    }
    if(health <= 0){
        lose();
    }
}

function pickTwo(){
    pick(2);
}

function pickEight(){
    pick(8);
}
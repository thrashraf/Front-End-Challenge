const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK = 14;
const HEAL = 20;

const ATTACK_MODE = 'ATTACK_VALUE';
const STRONG_MODE = 'STRONG_ATTACK_VALUE';
const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';



function getMaxLife() {
    
    let enteredValue = prompt('Enter Maximum life for you & monster' , '100');
    let parsedValue = parseInt(enteredValue);

    if (isNaN(parsedValue) || parsedValue <= 0) {    
        throw{message : 'invalid character!'};
        
    }
    return parsedValue;
}

let chosenMaxLife;

try {
    let chosenMaxLife = getMaxLife();

} catch (er) {

    console.log(er);
    alert('You enter invalid value , so the life is default 100');
    chosenMaxLife = 100;
}

let monsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let delayMilisecond = 2000;
let battleLog = [];

adjustHealthBars(chosenMaxLife);

//basic attack function
function attackHandler() {
    
    attackMonster(ATTACK_MODE);
}

function moreDamage() {
    
    attackMonster(STRONG_MODE);
}

function attackMonster(mode) {
    
    const maxDamage =  mode === 'ATTACK_VALUE' ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    const attack = mode === 'ATTACK_VALUE' ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;

    // if (mode === 'ATTACK_VALUE') {

    //    maxDamage = ATTACK_VALUE;
    //    attack = LOG_EVENT_PLAYER_ATTACK;

    // } else if (mode === 'STRONG_ATTACK_VALUE') {
        
    //     maxDamage = STRONG_ATTACK_VALUE;
    //     attack = LOG_EVENT_PLAYER_STRONG_ATTACK;
    // }

    const damage = dealMonsterDamage(maxDamage);
    monsterHealth -= damage;

    writeLog(
        attack, 
        damage,
        monsterHealth, 
        currentPlayerHealth
    );

    endRound();

}

function endRound() {
    const initialHealth = currentPlayerHealth;
    
    const damage = dealPlayerDamage(MONSTER_ATTACK);
    currentPlayerHealth -= damage;

    writeLog(LOG_EVENT_MONSTER_ATTACK, 
            damage,
            monsterHealth, 
            currentPlayerHealth
    );

    if(currentPlayerHealth < 0 && hasBonusLife){

        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialHealth;
    }

    if(monsterHealth < 0 && currentPlayerHealth > 0){

        alert('YOU WIN');
        writeLog(LOG_EVENT_GAME_OVER, 
            'PLAYER WON',
            monsterHealth, 
            currentPlayerHealth
        );

    } else if(monsterHealth > 0 && currentPlayerHealth < 0) {

        alert('YOU LOSE');
        writeLog(LOG_EVENT_GAME_OVER, 
            'MONSTER WON',
            monsterHealth, 
            currentPlayerHealth
        );

    } else if(monsterHealth < 0 && currentPlayerHealth < 0) {

        alert('DRAW');
        writeLog(LOG_EVENT_GAME_OVER, 
            'DRAW',
            monsterHealth, 
            currentPlayerHealth
        );
    }

    if(monsterHealth < 0 || currentPlayerHealth < 0){
        
        setTimeout( ()=> {

            reset();
        },delayMilisecond);
    }
}

function healPlayer() {

    let healValue;

    if (currentPlayerHealth >= chosenMaxLife - HEAL){

        alert('You initial health is better than value');
        // healValue = chosenMaxLife - currentPlayerHealth;
    } else {

        healValue = HEAL;
        increasePlayerHealth(HEAL);
        currentPlayerHealth += HEAL;
    }
    
    

    writeLog(LOG_EVENT_PLAYER_HEAL, 
        healValue,
        monsterHealth, 
        currentPlayerHealth
    );
    endRound();
}

function reset() {
    
    monsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}


function writeLog(e , value , monsterHealth , playerHealth) {
    
    let logEntry = {

        event: e,
        value: value,
        target: '',
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };

    switch (e) {
        case LOG_EVENT_PLAYER_ATTACK: 
            logEntry.target = 'MONSTER';
            break;
        
        
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        

        case LOG_EVENT_MONSTER_ATTACK:
            logEntry.target = 'PLAYER';
            break;


        case LOG_EVENT_PLAYER_HEAL:
            logEntry.target = 'PLAYER';
            break;
    }

    battleLog.push(logEntry);
}

function gameLog() {
    
    let i = 0;
    for (const log of battleLog) {
        
        console.log(`#${i}`);
        
        for (const key in log) {
            
            console.log(`${key} => ${log[key]}`);
        }
        i++;


    }

}


attackBtn.addEventListener('click' , attackHandler);
strongAttackBtn.addEventListener('click' , moreDamage);
healBtn.addEventListener('click' , healPlayer);
logBtn.addEventListener('click' ,  gameLog);
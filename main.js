const $btnThunder = document.getElementById('btn-kick');
const $btnGust = document.getElementById('btn-kick2');
const $btnReset = document.querySelector('.logo');
const $btnKick = document.getElementsByClassName('buttonKick');
const $logs = document.querySelector('#battle-log');


const character = {
    name: 'Pikachu',
    hp: {
        total: 100,
        current: 100,
    },
    limitOfThunder: 10,
    currentOfThunder: 10,
    limitOfGust: 4,
    currentOfGust: 4,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    getDefaultHP,
    changeHP,
    renderHP,
    renderHPLife,
    renderProgressBarHP,
};
const enemy = {
    name: 'Charmander',
    hp: {
        total: 100,
        current: 100,
    },
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
     getDefaultHP,
     changeHP,
     renderHP,
     renderHPLife,
     renderProgressBarHP,
};

const {name:nameCharacter, limitOfThunder, limitOfGust} = character;
const {name: nameEnemy} = enemy;
const counterBtnThunder = counterKicks(limitOfThunder);
const counterBtnGust = counterKicks(limitOfGust);

$btnReset.addEventListener('click', function () {
    restart();
})

function restart() {
    character.getDefaultHP();
    enemy.getDefaultHP();
    $btnThunder.disabled = false;
    $btnGust.disabled = false;
    resetCurrentKicks();
    renderHits($btnThunder, character.currentOfThunder);
    renderHits($btnGust, character.currentOfGust);
}

function getDefaultHP() {
    this.hp.current = this.hp.total;
    this.renderHP();
}

function resetCurrentKicks() {
    character.currentOfThunder = limitOfThunder
    character.currentOfGust = limitOfGust;
}

$btnGust.addEventListener('click', function () {
    enemy.changeHP(random(10));
    judgingWhoWins();
})

$btnThunder.addEventListener('click', function () {
    character.changeHP(random(20));
    enemy.changeHP(random(20));
    judgingWhoWins();
})

function counterKicks(limitOfKicks){
    return function (button){
        limitOfKicks-=1;
        return limitOfKicks
    }
}

$btnThunder.addEventListener('click', function () {
    character.currentOfThunder = counterBtnThunder();
    renderHits(this, character.currentOfThunder);
})

$btnGust.addEventListener('click', function () {
    character.currentOfGust = counterBtnGust();
    renderHits(this, character.currentOfGust);
})

function renderHits(button, limitOfKicks) {
    if (limitOfKicks === 0){
            button.disabled = true;
    }
    button.querySelector('.spaceForCountKick').innerText = limitOfKicks;
}

init ();

function init() {
    character.renderHP();
    enemy.renderHP();
    renderHits($btnThunder, character.currentOfThunder);
    renderHits($btnGust, character.currentOfGust);
}

function changeHP(count) {
    const $p = document.createElement('p');

    if (this.hp.current < count){
        this.hp.current = 0;
        $btnThunder.disabled = true;
    }
    else {
        this.hp.current -= count;
    }

    $p.innerText = generateLog(this, (this === character ? enemy : character), count);
    $logs.insertBefore($p, $logs.children[0]);
    this.renderHP();
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressBarHP();
}

function renderHPLife() {
    this.elHP.innerText = this.hp.current + ' / ' + this.hp.total;
}

function renderProgressBarHP(){
    this.elProgressbar.style.width = this.hp.current + '%';
}

function judgingWhoWins() {
    if (character.hp.current === 0 || enemy.hp.current === 0){
        if (character.hp.current === enemy.hp.current){
            alert('Ничья')
        }
        else {
            alert ('победу одержал ' + (character.hp.current > enemy.hp.current ? nameCharacter : nameEnemy));
        }
    }
}

function random(num) {
    return Math.ceil(Math.random()*num);
}

function generateLog(firstPerson, secondPerson, count) {
    const logs = [
        `${firstPerson.name} вспомнил что-то важное, но неожиданно ${secondPerson.name}, не помня себя от испуга, ударил в предплечье врага. -${count} / ${firstPerson.hp.current}`,
        `${firstPerson.name} поперхнулся, и за это ${secondPerson.name} с испугу приложил прямой удар коленом в лоб врага. -${count} / ${firstPerson.hp.current}`,
        `${firstPerson.name} забылся, но в это время наглый ${secondPerson.name}, приняв волевое решение, неслышно подойдя сзади, ударил. -${count} / ${firstPerson.hp.current}`,
        `${firstPerson.name} пришел в себя, но неожиданно ${secondPerson.name} случайно нанес мощнейший удар. -${count} / ${firstPerson.hp.current}`,
        `${firstPerson.name} поперхнулся, но в это время ${secondPerson.name} нехотя раздробил кулаком \<вырезанно цензурой\> противника. -${count} / ${firstPerson.hp.current}`,
        `${firstPerson.name} удивился, а ${secondPerson.name} пошатнувшись влепил подлый удар. -${count} / ${firstPerson.hp.current}`,
        `${firstPerson.name} высморкался, но неожиданно ${secondPerson.name} провел дробящий удар. -${count} / ${firstPerson.hp.current}`,
        `${firstPerson.name} пошатнулся, и внезапно наглый ${secondPerson.name} беспричинно ударил в ногу противника. -${count} / ${firstPerson.hp.current}`,
        `${firstPerson.name} расстроился, как вдруг, неожиданно ${secondPerson.name} случайно влепил стопой в живот соперника. -${count} / ${firstPerson.hp.current}`,
        `${firstPerson.name} пытался что-то сказать, но вдруг, неожиданно ${secondPerson.name} со скуки, разбил бровь сопернику. -${count} / ${firstPerson.hp.current}`
    ];
    return logs[random(logs.length) - 1];
}

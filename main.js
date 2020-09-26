const $btnThunder = document.getElementById('btn-kick');
const $btnGust = document.getElementById('btn-kick2');
const $btnReset = document.getElementsByClassName('logo')[0];
const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    rollbackGust: 4,
    counterRollbackGust: 0,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
}
const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    rollbackGust: 4,
    counterRollbackGust: 0,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
}

init ();

$btnReset.addEventListener('click', function () {
    restart();
})

function restart() {
    getDefaultHP(character);
    getDefaultHP(enemy);
    getDefaultSkillCounter(character);
    getDefaultSkillCounter(enemy);
    $btnThunder.disabled = false;
    $btnGust.disabled = false;
}

function getDefaultHP(person) {
    person.damageHP = person.defaultHP;
    renderHP(person);
}

function getDefaultSkillCounter(person) {
    person.counterRollbackGust = 0;
}

$btnGust.addEventListener('click', function () {
    changeHP(random(10), enemy);
    $btnGust.disabled = true;
    judgingWhoWins();
})

$btnThunder.addEventListener('click', function () {
    changeHP(random(20), character);
    changeHP(random(20), enemy);
    counterRollbackSill(character);
    judgingWhoWins();

})

function counterRollbackSill(person){
    person.counterRollbackGust += 1;
    if (person.counterRollbackGust === person.rollbackGust){
        person.counterRollbackGust = 0;
        $btnGust.disabled = false;
    }
}

function init() {
    renderHP(character);
    renderHP(enemy);
}

function renderHP(person) {
    renderHPLife(person);
    renderProgressBarHP(person);
}

function renderHPLife(person) {
    person.elHP.innerText = person.damageHP + ' / ' + person.defaultHP;
}

function renderProgressBarHP(person){
    person.elProgressbar.style.width = person.damageHP + '%';
}

function changeHP(count, person) {
    if (person.damageHP < count){
        person.damageHP = 0;
        $btnThunder.disabled = true;
    }
    else {
        person.damageHP -= count;
    }
    renderHP(person);
}

function judgingWhoWins() {
    if (character.damageHP === 0 || enemy.damageHP === 0){
        if (character.damageHP === enemy.damageHP){
            alert('Ничья')
        }
        else {
            alert (character.damageHP > enemy.damageHP ? character.name : enemy.name);
        }
    }
}

function random(num) {
    return Math.ceil(Math.random()*num);
}

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
    getDefaultHP: getDefaultHP,
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressBarHP: renderProgressBarHP,
    counterRollbackSill: counterRollbackSill,
    getDefaultSkillCounter: getDefaultSkillCounter,
}
const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    rollbackGust: 4,
    counterRollbackGust: 0,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    getDefaultHP: getDefaultHP,
    changeHP: changeHP,
    renderHP: renderHP,
    renderHPLife: renderHPLife,
    renderProgressBarHP: renderProgressBarHP,
    counterRollbackSill: counterRollbackSill,
    getDefaultSkillCounter: getDefaultSkillCounter,
}

init ();

$btnReset.addEventListener('click', function () {
    restart();
})

function restart() {
    character.getDefaultHP();
    enemy.getDefaultHP();
    character.getDefaultSkillCounter();
    enemy.getDefaultSkillCounter();
    $btnThunder.disabled = false;
    $btnGust.disabled = false;
}

function getDefaultHP() {
    this.damageHP = this.defaultHP;
    this.renderHP();
}

function getDefaultSkillCounter() {
    this.counterRollbackGust = 0;
}

$btnGust.addEventListener('click', function () {
    enemy.changeHP(random(10));
    $btnGust.disabled = true;
    judgingWhoWins();
})

$btnThunder.addEventListener('click', function () {
    character.changeHP(random(20));
    enemy.changeHP(random(20));
    character.counterRollbackSill();
    judgingWhoWins();

})

function counterRollbackSill(){
    this.counterRollbackGust += 1;
    if (this.counterRollbackGust === this.rollbackGust){
        this.counterRollbackGust = 0;
        $btnGust.disabled = false;
    }
}

function init() {
    character.renderHP();
    enemy.renderHP();
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressBarHP();
}

function renderHPLife() {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
}

function renderProgressBarHP(){
    this.elProgressbar.style.width = this.damageHP + '%';
}

function changeHP(count) {
    if (this.damageHP < count){
        this.damageHP = 0;
        $btnThunder.disabled = true;
    }
    else {
        this.damageHP -= count;
    }
    this.renderHP();
}

function judgingWhoWins() {
    if (character.damageHP === 0 || enemy.damageHP === 0){
        if (character.damageHP === enemy.damageHP){
            alert('Ничья')
        }
        else {
            alert ('победу одержал ' + (character.damageHP > enemy.damageHP ? character.name : enemy.name));
        }
    }
}

function random(num) {
    return Math.ceil(Math.random()*num);
}

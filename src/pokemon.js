class Selectors {
    constructor(name) {
        this.elHP: document.getElementById(`health-${name}`);
        this.elProgressbar: document.getElementById(`progressbar-${name}`);
    }
}
class Pokemon extends Selectors {
    constructor({name, hp, type, selectors}) {
        super(selectors);

        this.name = name;
        this.hp = {
            total: hp,
            curent: hp,
        }
        this.type = type;
    }

    renderHP = () => {
        this.renderHPLife();
        this.renderProgressBarHP();
    }

    renderHPLife = () => {
        this.elHP.innerText = this.hp.current + ' / ' + this.hp.total;
    }

    renderProgressBarHP = () => {
        this.elProgressbar.style.width = this.hp.current + '%';
    }
}

export default Pokemon;

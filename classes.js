// Guerreiro ou Mago
// Pequeno Monstro Grande Mostro

class Character {

    _life = 1
    maxLife = 1;
    attack = 0;
    defence = 0;


    constructor(name, hp, attack) {
        this.name = name;
        
    }

    get life(){
        return this._life;
    }

    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife; // isso faz com que a vida não seja negativa
    }

  
}

class Guerreiro extends Character {
    constructor(name ) {
        super(name);
        this.life = 100;
        this.attack = 10;
        this.defence = 8;
        this.maxLife = this.life;

    }
}

class Mago extends Character {
    constructor(name) {
        super(name);
        this.life = 80;
        this.attack = 14;
        this.defence = 3;
        this.maxLife = this.life;

    }
}

class MonstroPequeno extends Character {
    constructor() {
        super('Monstro Pequeno');
        this.life = 40;
        this.attack = 4;
        this.defence = 4;
        this.maxLife = this.life;

    }
}

class MonstroGrande extends Character {
    constructor() {
        super('Monstro Grande');
        this.life = 120;
        this.attack = 16;
        this.defence = 6;
        this.maxLife = this.life;
    }
}


class Stage {

    constructor(jogador1, jogador2, jogador1El, jogador2El, logObject){
        this.jogador1 = jogador1;
        this.jogador2 = jogador2;
        this.jogador1El = jogador1El;
        this.jogador2El = jogador2El;
        this.log = logObject;


    }

    start() {
        this.update();
        this.jogador1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.jogador1, this.jogador2));
        this.jogador2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.jogador2, this.jogador1));

    }

    update(){
        //jogador 1
        this.jogador1El.querySelector('.name').innerHTML = ` ${this.jogador1.name} - ${this.jogador1.life.toFixed(1)} HP`;
        let f1Pct = (this.jogador1.life / this.jogador1.maxLife) * 100;
        const bar1 = this.jogador1El.querySelector('.bar');
        bar1.style.width = `${f1Pct}%`;
        bar1.style.backgroundColor = this.getHealthColor(f1Pct);
        //jogador 2
        this.jogador2El.querySelector('.name').innerHTML = ` ${this.jogador2.name} - ${this.jogador2.life.toFixed(1)} HP`;
        let f2Pct = (this.jogador2.life / this.jogador2.maxLife) * 100;
        const bar2 = this.jogador2El.querySelector('.bar');
        bar2.style.width = `${f2Pct}%`;
        bar2.style.backgroundColor = this.getHealthColor(f2Pct);
    }

    doAttack(attacking, attacked){

        // console.log(`${attacking.name} está atacando  ${attacked.name}`);

        if(attacking.life <= 0 || attacked.life <= 0){

            this.log.addMessage(`Atacando jogador morto!`);
            return;
        }

        let attackFactor = (Math.random() * 2);
        let defenseFactor = (Math.random() * 2);

        let actualAttack = attacking.attack * attackFactor;
        let actualDefense = attacked.defence * defenseFactor;

        if(actualAttack > actualDefense){

            attacked.life -= actualAttack;
            this.log.addMessage(`${attacked.name} recebeu ${actualAttack.toFixed(2)} de dano!`);

        } else {
            this.log.addMessage(`${attacked.name} conseguiu se defender!`);
        }

        this.update();
        
    }

    getHealthColor(percent){
        const safePercent = Math.max(0, Math.min(100, percent));
        const hue = (safePercent / 100) * 120; // 120 = verde, 0 = vermelho
        return `hsl(${hue}deg, 80%, 45%)`;
    }

}


class Log {

    list = [];

    constructor(listEl){
        this.listEl = listEl;
    }

    addMessage(msg){

        this.list.push(msg);
        this.render();
    }

    render(){
        this.listEl.innerHTML = '';

        for(let i in this.list){
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
        this.listEl.scrollTop = this.listEl.scrollHeight;
    }

}

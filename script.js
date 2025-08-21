let char = new Guerreiro("Guerreiro");
let monster = new MonstroGrande();
let log = new Log(document.querySelector('.log'));


const stage = new Stage(
    char,
    monster,
    document.querySelector('#char'),
    document.querySelector('#monster'),
    log
);

stage.start();
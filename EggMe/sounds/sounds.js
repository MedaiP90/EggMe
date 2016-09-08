var Sound;

function playOpenBarn() {
    Sound = new Audio("sounds/DOORSLM2.mp3");
    Sound.play();
    console.log("sound played");
}

function playOpenBank() {
    Sound = new Audio("sounds/Doorbell.mp3");
    Sound.play();
    console.log("sound played");
}

function playOpen() {
    Sound = new Audio("sounds/Blop.mp3");
    Sound.play();
    console.log("sound played");
}

function playCobs() {
    Sound = new Audio("sounds/UPSBOX2.wav");
    Sound.play();
    console.log("sound played");
}

function playCoins() {
    Sound = new Audio("sounds/coins-in-hand-1.mp3");
    Sound.play();
    console.log("sound played");
}

function playWin() {
    Sound = new Audio("sounds/TaDa.mp3");
    Sound.play();
    console.log("sound played");
}
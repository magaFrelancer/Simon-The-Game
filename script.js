const panelBlocks = document.querySelectorAll('.block__blocks');
const startBtn = document.querySelector('#start');
const numb = document.querySelector('.numb');
let arrayLevel = [randomNum()];
let canClickPanels = false;
let level = 1;
let innerLevel = 0;
panelBlocks.forEach(item => item.addEventListener('click', panelClicked));
startBtn.addEventListener('click', start)
numb.innerText = `Level:${level}`


function randomNum() {
    return Math.floor(Math.random() * 4);
}

function panelClicked() {
    if (!canClickPanels) return;
    let atr = this.getAttribute('data-select');
    if (+atr === arrayLevel[innerLevel]) {
        innerLevel++;
        if (innerLevel === arrayLevel.length) {
            console.log(('Win'));
            innerLevel = 0;
            arrayLevel.push(randomNum());
            level++;
            numb.innerText = `Level:${level}`
            start()
        }
    } else {
        arrayLevel = [randomNum()];
        level = 1;
        numb.innerText = `Level:${level}`;
        innerLevel = 0;

    }

}

function flash(index) {
    panelBlocks[index].classList.add('active');
    return new Promise(resolve => {
        setTimeout(() => {
            panelBlocks[index].classList.remove('active');
            setTimeout(() => {
                resolve()
            }, 250)
        }, 500)
    })
}
async function start(newGame = false) {
    if (newGame) {
        arrayLevel = [randomNum()];
        level = 1;
        numb.innerText = `Level:${level}`;
        innerLevel = 0;
    }
    canClickPanels = false;
    for (let key of arrayLevel) {
        await flash(key);
    }
    canClickPanels = true;
}
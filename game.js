const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let noGame = true;
let firstCard, secondCard;

//при каждом клике мы:
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  if (noGame) return;

  this.classList.add('flip'); 
  
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards(); //одинаковые имена? да - не переворачивать, нет - перевернуть
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard); //не переворачивать - удалить событие по клику
  secondCard.removeEventListener('click', flipCard); //у обеих карт
  firstCard.removeAttribute('id', 'stop_game');
  secondCard.removeAttribute('id', 'stop_game');

  resetBoard(); //обнуляем значения, присвоенные картам
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip'); //удалить класс flip у обеих карт, 
    secondCard.classList.remove('flip'); //чтобы перевернулись обратно через 1,3 сек

    resetBoard(); //обнуляем значения, присвоенные картам
  }, 1300);
}

function resetBoard() { //обнуляем значения, присвоенные картам
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() { //объявляем и сразу вызываем функцию присвоения рандомного номера карте, чтобы перемешать
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard)); //При каждом "клике" вызываем flipCard()

const buttonRun = document.getElementById("button");
const timerInput = 1;

function setTimeMinut() {
    timeMinut = timerInput * 60 // переводим в минуты
}

buttonRun.addEventListener('click', setTimeMinut);

function Refresh() {
    window.parent.location = window.parent.location.href; //обновление страницы
};

function colorClick() {
    buttonRun.style.color = 'red';
};

const endQuestion = () => {
        let question = document.createElement('div');
        question.className = "alert pro";
        question.innerHTML = "Играть ещё раз";
        question.addEventListener('click', Refresh);    
    
        setInterval(() =>
        document.body.append(question),
        4000);
    };

timer = setInterval(function () {
    seconds = timeMinut%60
    minutes = timeMinut/60
    if (timeMinut <= 0) {
        buttonRun.innerHTML = '00:00';
        clearInterval(timer);
        if(document.getElementById('stop_game')!= null){ 
            let div = document.createElement('div');
            div.className = "alert";
            div.innerHTML = "<strong>Вас повесили!</strong>";

            document.body.append(div);
            
            setTimeout(() => div.remove(), 4000);
            
            endQuestion();
            unflipCards();
        }
        else {
            let div = document.createElement('div');
            div.className = "alert";
            div.innerHTML = "<strong>Вы выжили!</strong>";

            document.body.append(div);
            
            setTimeout(() => div.remove(), 4000);         
            
            endQuestion();
            unflipCards();
        }
        
    } else {
        if (seconds<=9) {
            seconds = "0" + seconds;
        };
        let strTimer = 0+`${Math.trunc(minutes)}:${seconds}`;
        buttonRun.innerHTML = strTimer;
        buttonRun.removeEventListener('click', setTimeMinut);
    }
    --timeMinut;
    if (timeMinut <=9) {
        colorClick();
    };

}, 1000);

butt1 = () => {
    let butt1 = document.querySelector('#button');
    butt1.style.cursor = 'text';
    
    noGame = false;
}


const listOfAllDice = document.querySelectorAll('.die');
const scoreInputs = document.querySelectorAll('#score-options input');

const scoreSpans = document.querySelectorAll('#score-options span');

const currentRoundText = document.getElementById('current-round');

const currentRoundRollsText = document.getElementById('current-round-rolls');

const totalScoreText = document.getElementById('total-score');

const scoreHistory = document.getElementById('score-history');

const rollDiceBtn = document.getElementById('roll-dice-btn');
const keepScoreBtn = document.getElementById('keep-score-btn');

const rulesContainer = document.querySelector('.rules-container');
const rulesBtn = document.getElementById('rules-btn');

let isModalShowing = false;
// keep track of dice values
let diceValuesArr = [];

// keep track of the current score, total score, number of rolls, round.
let rolls = 0;
let score = 0;
let totalScore = 0;
let round = 1;

rulesBtn.addEventListener('click', () => {
  isModalShowing = !isModalShowing;  
  if(isModalShowing){
    rulesBtn.textContent = "Hide Rules";
    rulesContainer.style.display = 'block';
  } else    {
    rulesBtn.textContent = "Show Rules";
    rulesContainer.style.display = 'none';
  }
});

const rollDice = () => {
    diceValuesArr = [];
    for (let i = 0 ; i < 5; i++){
        const randomDice = Math.floor(Math.random() * 6) + 1;
        diceValuesArr.push(randomDice);
    }
    listOfAllDice.forEach((dice, index) => {
        dice.textContent = diceValuesArr[index];
    })
};

rollDiceBtn.addEventListener('click', ()=>{
   resetRadioOption();
    if(rolls === 3){
        alert('You have made three rolls this round. Please select a score.');
    }   else    {
        rolls ++;
        rollDice();
        updateStats();
        getHighestDuplicates(diceValuesArr);
    }
});

const updateStats = () => {
  currentRoundRollsText.textContent = rolls;
  currentRoundText.textContent = round;
}

const updateRadioOption = (optionNode, score) => {
  scoreInputs[optionNode].disabled = false;
  scoreInputs[optionNode].value = score;
  scoreSpans[optionNode].textContent = `, score = ${score}`;
}

const getHighestDuplicates =  (arr) => {
  const counts = {};

  // arr.forEach(num => {
  //   counts[num] = (counts[num] || 0) + 1;
  // });

  for (let num of arr){
    if(counts[num]){
      counts[num] += 1;
    } else {
      counts[num] = 1;
    }
  }
  
  // for (const count of Object.values(counts)) {
  //   highestCount = Math.max(highestCount, count);
  // }

  let highestCount = 0;

  for(const num of arr){
    const count = counts[num];
    if(count >= 3 && count > highestCount){
      highestCount = count;
    }
    if(count >= 4 && count > highestCount){
      highestCount = count;
    }
  }

  const sumOfAllDice = diceValuesArr.reduce((a, b) =>  a + b , 0);

  if(highestCount >= 4){
    updateRadioOption(1, sumOfAllDice);
  }
  if(highestCount >= 3){
    updateRadioOption(0, sumOfAllDice);
  }
  updateRadioOption(5, 0);
}

const resetRadioOption = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.checked = false;
  })

  scoreSpans.forEach((span) => {
    span.textContent = '';
  })
}

const updateScore = (selectedValue, achieved) => {
  totalScore += parseInt(selectedValue);
  totalScoreText.textContent = totalScore;
  scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`
}

keepScoreBtn.addEventListener('click', () => {
  var selectedValue;
  var achieved;

  for(let radioButton of scoreInputs){
    if(radioButton.checked){
      selectedValue = radioButton.value;
      achieved = radioButton.id;
      break;    
    }
  }
    if(selectedValue){
      rolls = 0;
      round = round + 1;
      updateStats();
      resetRadioOption();
      updateScore(selectedValue, achieved);
    }
});




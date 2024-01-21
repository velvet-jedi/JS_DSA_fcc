let calorieCounter = document.getElementById("calorie-counter");
let entryDropdown = document.getElementById("entry-dropdown");
let budgetNumberInput = document.getElementById("budget");

let addEntryButton = document.getElementById("add-entry");
let clearButton = document.getElementById("clear");
let output = document.getElementById("output");

let isError = false;

function cleanInputString (str) {
    let regex = /[+-\s]/g;
    return str.replace(regex,"")
}

function isInvalidInput(str){
    let regex = /\d+e\d+/i;
    return str.match(regex);
}

function addEntry(){
    const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
    const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length +1;
    const HTMLString = `
    <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
    <input type="text" id="${entryDropdown.value}-${entryNumber}-name" placeholder="Name" />
    <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
    <input type="number" min="0" placeholder="Calories" id="${entryDropdown.value}-${entryNumber}-calories">`;

    targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
    
       
}

function getCaloriesFromInputs(list){
    let calories = 0;
    
    for (let i = 0 ; i < list.length ; i++){
        let currVal = cleanInputString(list[i].value);
        let invalidInputMatch = isInvalidInput(currVal);
        if (invalidInputMatch) {
            alert(`Invalid Input: ${invalidInputMatch[0]}`);
            isError = true;
            return null;
        }

        calories += Number(currVal);
    }
    return calories;
}

function calculateCalories(e){
    e.preventDefault()
    isError = false;

    breakfastNumberInputs = document.querySelectorAll(`#breakfast input[type=number]`);
    lunchNumberInputs = document.querySelectorAll(`#lunch input[type=number]`);
    dinnerNumberInputs = document.querySelectorAll(`#dinner input[type=number]`);
    snacksNumberInputs = document.querySelectorAll(`#snacks input[type=number]`);
    exerciseNumberInputs = document.querySelectorAll(`#exercise input[type=number]`);

    const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
    const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
    const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
    const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
    const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);


    let budgetCalories = getCaloriesFromInputs([budgetNumberInput]);

    if(isError){
        return;
    }


    let consumedCalories = breakfastCalories + lunchCalories + dinnerCalories + snacksCalories
    let remainingCalories = budgetCalories - consumedCalories + exerciseCalories;

    let surplusOrDeficit = (remainingCalories >= 0) ? "Surplus" : "Deficit";

    output.innerHTML = `<span class="${surplusOrDeficit.toLowerCase()}">${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}</span>
    <hr>
    <p>${budgetCalories} Calories Budgeted</p>
    <p>${consumedCalories} Calories Consumed</p>
    <p>${exerciseCalories} Calories Burned</p>`;
    output.classList.remove("hide")

    
}

function clearForm(){
    const inputContainers = Array.from(document.querySelectorAll('.input-container'));
    for (let i = 0 ; i < inputContainers.length ; i++){
        inputContainers[i].innerHTML = '';
    }
    budgetNumberInput.value = '';
    output.innerText = '';
    output.classList.add("hide");
    
}

clearButton.addEventListener('click', clearForm)
calorieCounter.addEventListener('submit', calculateCalories);
addEntryButton.addEventListener('click', addEntry);
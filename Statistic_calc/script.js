const calculate = () => {
    let value = document.querySelector('#numbers').value();
    let array = value.split(',');
    let numbers = array.map((el) => Number(el)).filter( el => !Number.isNaN(el));
    
    let mean = getMean(numbers);
    document.querySelector('#mean').textContent = mean;   
    
    let median = getMedian(numbers);
    document.querySelector('#median').textContent = median;

    let mode = getMode(numbers);
    document.querySelector('#mode').textContent = mode;   

    let range = getRange(numbers);
    document.querySelector('#range').textContent = range;

    let variance = getVariance(numbers);
    document.querySelector('#variance').textContent = variance;

    let standardDeviation = getStandardDeviation(numbers);
    document.querySelector('#standardDeviation').textContent = standardDeviation;

}

const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;    

const getMedian = (array) => {
    let sorted = array.slice().sort((a, b) => a - b);
    let median = array.length % 2 === 0 ? getMean([sorted[array.length/2], sorted[(array.length/2)-1]]) : sorted[Math.floor(array.length/2)];
    return median;
};

const getMode = (array) => {
    let counts = {};
    array.forEach(el => {
        counts[el] = (counts[el] || 0) + 1;
    });
    if(new Set(Object.values(counts)).size === 1){
        return null;
    }
    let highest = Object.keys(counts).sort((a, b) => counts[b] - counts[a] )[0];

    let mode = Object.keys(counts).filter((el) => counts[el] === counts[highest]);
    return mode.join(', ');
}

const getRange = (array) => {
    return Math.max(...array) - Math.min(...array);
}

const getVariance = (array) => {
    let mean = getMean(array);
        
    let variance = array.reduce((acc, el) => {
        let difference = el - mean;
        let squared = difference ** 2;
        return acc + squared;
    }, 0)   /   array.length;

    return variance;
}

const getStandardDeviation = (array) => {
    let variance = getVariance(array);
    let standardDeviation = Math.sqrt(variance);
    return standardDeviation;
}
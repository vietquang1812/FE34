'use strict';

const avg = function() {
    let sum = 0
    for(let i = 0; i< arguments.length; i++) {
        sum += arguments[i]
    }
    return sum / arguments.length
}
const sum = (num1, num2, num3) => {
 return num1 + num2 + num3
}
console.log(avg(12,2))
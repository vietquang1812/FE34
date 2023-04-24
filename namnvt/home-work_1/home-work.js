'use strict'
// // 1
// let a = prompt("enter a number:");
// let b = prompt("enter b number:");

// let swapA_B = function () {
//     let a = prompt("enter a number:");
//     let b = prompt("enter b number:");
//     let c = ''

//     if (!(isNaN(a) && isNaN(b))) {
//         c = a;
//         a = b;
//         b = c;

//     }
//     document.getElementById("1").innerHTML = ("new number a is:" + a + "\n" + "new number b is:" + b)
// }

// swapA_B()

// 2
let sortArr = function () {
    let arr = [];
    let isConfirm = true;
    let swap = 0;
    let orderIncrease = ''
    while (isConfirm) {
        let number = prompt("Enter number")
        if (!isNaN(number) && number != "") {
            arr[arr.length] = number;
        } else { alert("not an number, please enter number") }
        isConfirm = confirm("continue...Y/N?")
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swap++;
            }
        }
    }

    for (let i = 0; i < arr.length; i++) {
        orderIncrease += arr[i] + ", "

    }

    document.getElementById("2").innerHTML += "number of swap:" + swap + "<br>" + "orderIncrease:" + orderIncrease
}
// sortArr()
// // 3

let calAvg = function () {
    let number = ''
    let arrScore = []
    let sum = 0
    do {
        number = prompt("Enter number")
        number = parseFloat(number)
        if (!isNaN(number) && number != "" && number <= 10 && number > 0) {
            arrScore[arrScore.length] = parseFloat(number);
        } else { alert("not correct, enter number from 1 to 10") }

    } while (arrScore.length < 3);
    // document.getElementById("3").innerHTML ="your scores is:"
    for (let i = 0; i < arrScore.length; i++) {

        sum += arrScore[i]
        sum = parseFloat(sum)

        // document.getElementById("2").innerHTML+=arrScore[i]+"; "
    }

    return parseFloat(sum / (arrScore.length)).toFixed(2)
    // calAvg = parseFloat(calAvg)
}
// let avgScore = calAvg();
let range = function () {

    if (avgScore >= 8) {
        return "A";
    } else if (avgScore >= 6.5) {
        return "B";
    } else if (avgScore >= 5) {
        return "C";
    } else { return "D" }
}

// let scoreRange=range()

// document.getElementById("3").innerHTML+= "<br> your Average score is: " + avgScore +"<br>" + "range is: " + scoreRange;

// // 4


let linearEquation = function () {
    let a = prompt("enter a ");
    let b = prompt("enter b ");
    let x = ''
    if (!(isNaN(a) && isNaN(b) && (a != "") && b != "")) {
        a = parseFloat(a)
        b = parseFloat(b)
        x = -b / a;
        x = parseFloat(x).toFixed(2)
        return x
    }
    document.getElementById("4").innerHTML = "linearEquation <br>result of " + a + "x" + b + "=0 is:" + x;
}

// linearEquation();



// 5

let quadraticEquation = function () {
    let a = prompt("enter a ");
    let b = prompt("enter b ");
    let c = prompt("enter c");
    let delta = ''
    if (!(isNaN(a) && isNaN(b) && isNaN(c)) && (a != "" && b != "" && c != "")) {
        a = parseFloat(a);
        b = parseFloat(b);
        c = parseFloat(c);
        delta = b ** 2 - 4 * a * c;
        if (a == 0) {
            let x1 = -c / b;
            let x2 = "n/a"
            return [x1, x2];
        } else if (delta < 0) {
            return ["n/a", "n/a"]
        } else if (delta == 0) {
            let x1 = -b / (2 * a);
            let x2 = x1;
            return [x1, x2]
        } else if (delta > 0) {
            let x1 = (-b + Math.sqrt(delta)) / (2 * a);
            let x2 = (-b - Math.sqrt(delta)) / (2 * a);
            return [x1, x2]
        }
    }
}
// let arr = quadraticEquation()
// let x1 = parseFloat(arr[0]).toFixed(2);
// let x2 = parseFloat(arr[1]).toFixed(2);
// console.log(x1)
// if (isNaN(x1)) {
//     document.getElementById("5").innerHTML = "Impossible equation"
// } else if (isNaN(x2)) {
//     document.getElementById("5").innerHTML = "linear equation, x=" + x1;
// } else if (x1 == x2) {
//     document.getElementById("5").innerHTML = "Dual result x1=x2=" + x1;
// }
// else {
//     document.getElementById("5").innerHTML = "Separate result x1 and x2, x1=" + x1 + "; x2=" + x2;
// }

// // 6
let sum50Number = function () {
    let number = prompt("enter an number");
    let sumNumberto50 = 0
    if (!isNaN(number) && number !== "") {
        sumNumberto50 = parseInt(number);

        for (let i = 1; i < 50; i++) {

            sumNumberto50 += parseInt(number + i);
        }
        document.getElementById("6").innerHTML = "Sum of 50 number from" + number + " is: " + sumNumberto50
    }
}
// sum50Number()

// // 7---Fibonanci number
let Fibonanci = function () {
    let Fnumber = []
    Fnumber[0] = 0;
    Fnumber[1] = 1;
    document.getElementById("7").innerHTML = Fnumber[0] + ", " + Fnumber[1] + ", "
    for (let i = 2; i < 20; i++) {
        Fnumber[i] = Fnumber[i - 1] + Fnumber[i - 2]

        document.getElementById("7").innerHTML += Fnumber[i] + ", "
    }
}
// Fibonanci()
// // 8


let checkYear = function () {
    let today = new Date()
    let yearNum = parseInt(today.getFullYear())
    let monthNum = prompt("enter month number need check")
    let isvalid = false;
    if (!isNaN(yearNum) && yearNum != "" && yearNum % 4 == 0 && yearNum >= 0 && !(yearNum % 100 == 0 && yearNum % 400 == 0)) {
        isvalid = true;
        return isvalid;
    } else { isvalid = false }

    if (!isNaN(monthNum) && monthNum > 0 && monthNum <= 12) {
        monthNum = parseInt(monthNum);
        switch (monthNum) {
            case 2:
                if (checkYear()) {
                    document.getElementById("8").innerHTML = "Month " + monthNum + " have 29 day";

                } else {
                    document.getElementById("8").innerHTML = "Month " + monthNum + " have 28 day";
                }
                break;
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                document.getElementById("8").innerHTML = "Month " + monthNum + " have 31 day";
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                document.getElementById("8").innerHTML = "Month " + monthNum + " have 30 day";
                break;
        }
    }
}
// checkYear()
//     // 9

let UCLN = function () {
    let a = prompt('Enter number 1')
    let b = prompt('Enter number 2')
    a = Math.abs(parseInt(a))
    b = Math.abs(parseInt(b))
    let c = ''
    c = parseInt(c)
    if (!isNaN(a) && !isNaN(b) && a != "" & b != "") {
        if (a == b) {
            return a
        } else if (a * b != 0 && a > b) {
            do {
                c = b
                b = a % b
                a = c
            } while (b != 0)
            console.log(c)
            return a

        } else if (a * b != 0 && a < b) {
            do {
                c = a
                a = b % a
                b = c
            } while (a != 0)
            return b
        }
    } else { alert('Error not a number') }
}
// let abc = UCLN()
// document.getElementById('9').innerHTML = abc


// 10
let starTriangle = function () {
    let a = prompt('enter number tri-angle')
    if (!isNaN(a) && a != "") {

        for (let i = 1; i <= a; i++) {

            for (let j = 1; j <= i; j++) {
                document.getElementById('10').innerHTML += "A"
            }
            document.getElementById('10').innerHTML += "<br>"
        }
    } else { alert('error') }
}
// starTriangle()
// *******************//
let BCNN = function () {
    let a = prompt('Enter number 1')
    let b = prompt('Enter number 2')
    let c = ''
    let number = ''
    a = Math.abs(parseInt(a))
    b = Math.abs(parseInt(b))
    c = a * b
    if (!isNaN(a) && !isNaN(b) && a != "" & b != "") {
        if (a == b) {
            return a
        } else {
            if (a % b == 0 || b % a == 0) {

                if (a > b) {
                    return a
                } else { return b }
            }
            else if (a > b) {
                for (let i = a; i <= c; i++) {
                    if (i % a == 0 && i % b == 0) {
                        return i;
                        break;
                    }
                    
                }

            } else {
                if (a < b)
                    for (let i = b; i <= c; i++) {
                        if (i % a == 0 && i % b == 0) {
                            return i;
                            break;
                    }
                        }
                        
            }
        }
    } else { alert('not a number') }
}
let xyz = BCNN()
document.getElementById('11').innerHTML = xyz
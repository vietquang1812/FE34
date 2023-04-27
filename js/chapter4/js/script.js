"use strict";
const $ = function(id) {
    return document.getElementById(id)
}
// const fullnameElement = document.getElementById('fullname')
// const emailElement = document.getElementById('email')
// document.getElementById('button').onclick = function() {
//     document.getElementById('app').innerHTML += `<input class="form-control mt-2" type="text" placeholder="Text" >`
// }

// const $email = document.createElement('input')
// $email.className = 'form-control mt-2'
// $email.placeholder = 'Please Enter Your Email'
// $email.type = 'email'
// const a = 1/3;

// document.getElementById('app').innerHTML = a.toFixed(2)
// $email.type = 

// const date = new Date()
// document.getElementById('app').innerHTML = date.getTime()

// const fullname = 'nguyen van a'
// const arrName = fullname.split(' ')
// for(let i = 0; i< arrName.length; i++) {
//     const firstCharacter = arrName[i].substring(0,1).toUpperCase()
//     const moreString = arrName[i].substring(1)
//     arrName[i] = firstCharacter+moreString
// }

// console.log(fullname.split(' '))
// document.getElementById('app').innerHTML = fullname.indexOf('n', 6 )
// document.getElementById('app').innerHTML = arrName.join(' ')


// const showYear = function() {
//     document.getElementById('app').innerHTML = 'Year: '+(new Date()).getFullYear()
// }

// function showYear() {
//     document.getElementById('app').innerHTML = 'Year: '+(new Date()).getFullYear()
// }

// let fullname = "Nguyen Van A"
// const showYear = function(name='') {
//     const year = (new Date()).getFullYear()
//     document.getElementById('app').innerHTML = 'Hello: '+fullname+' '+year
//     // return name
// }
// showYear()
// console.log(year)

// const $num1 = $('number1')
// const $num2 = $('number2')

// const total = function() {
//     const number1 = $num1.value
//     const number2 = $num2.value
//     console.log(number1, number2)
//     if(!isNaN(number1) && !isNaN(number2) && number1 && number2) {
//         $('total').innerHTML = parseFloat(number1) + parseFloat(number2)
//     } else {
//         $('total').innerHTML = 'Input not a number'
//     }
//  }

// $num1.onkeyup = total
// $num2.onkeyup = total

// $('button').onmouseover = function() {
//     $('button').classList.add('btn-info')
// }
// $('button').onmouseleave = function() {
//     $('button').classList.remove('btn-info')
// }
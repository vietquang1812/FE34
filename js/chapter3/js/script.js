// const age = prompt('Please enter a number:')
// if(isNaN(age)){
//     alert('this is not a number')
// } else if(age < 0) {
//     alert('please enter a number >0')
// } else {
//     alert(`your age is: ${age}`)
// }

// if(!isNaN(number)) {
//     alert(`abs: ${Math.abs(number)}`)
// }
// if(!isNaN(number) && number % 2 == 0) {
//     alert('this is a even number')
// }

// if(!(isNaN(number) || number % 2 != 0)) {
//     alert('this is a even number')
// }

// if(!isNaN(number) && number %4 ==0 && number > 0 && !(number % 100 == 0 && number % 400 !=0)){
//     alert('nhuan')
// } else {
//     alert('khong')
// }

// const a = {
//     b: function() {
//         return {
//             c: 123
//         }
//     }
// }
// console.log(a.b().c)
let number = ''
// while(isNaN(number) || number < 0) {
//     number = prompt('error number, Please try again:')
// }
// do {
//     number = prompt('Please enter a number:')

// }while(isNaN(number) || number < 0 );

// let isConfirm = true;
// while(isConfirm) {
//     const number = prompt('Please enter a number: ')
//     if(!isNaN(number) ) {
//         document.getElementById('app').innerHTML += number +' '
//     }
//     isConfirm = confirm('do you want continue?')
// }

if (!isNaN(number)) {
    // for(let i = 1; i<= number; i++) {
    //     document.getElementById('app').innerHTML += i +' '
    // }
    // for(let i = number; i > 0; i--) {
    //     let html = document.getElementById('app').innerHTML
    //     console.log(html)
    //     html += i + ' '
    //     document.getElementById('app').innerHTML = html
    // }
}

// const arr = new Array(6)

// const arr2 = [12,3,4,5,6,66]
// arr2[6] = 'abc'
// arr2[7] = 'def'

// arr2['abc'] = 123
// for(let i =0; i< arr2.length; i++) {
//     document.getElementById('app').innerHTML += arr2[i] + ' '
// }
// console.log(arr2.length)

let arr = []

// let isConfirm = true;
// while (isConfirm) {
//     const number = prompt('enter number: ')

//     if (!isNaN(number) && number != '') arr[arr.length] = parseInt(number)

//     isConfirm = confirm('continue... ?')
// }
// arr.sort((a,b) => b-a)
// for (let i = 0; i < arr.length; i++) {
//     for (let j = 0; j < arr.length - i - 1; j++) {
//         if (arr[j] < arr[j + 1]) {
//             const swap = arr[j]
//             arr[j] = arr[j + 1]
//             arr[j + 1] = swap
//         }
//     }
// }

arr = [1,2,3,4,5,6]

for(let i =0; i< arr.length - 1; i++) {
    for(let j = i+1; j< arr.length; j++) {
        if(arr[i] < arr[j]) {
            const swap = arr[i]
            arr[i] = arr[j]
            arr[j] = swap

        }
    }
}

document.getElementById('app').innerHTML += arr.join(', ')



switch (number) {
    case 1:
    case 2:
        console.log('Jan')
        break;

    default:
        break;
}
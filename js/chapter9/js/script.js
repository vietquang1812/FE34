'use strict';
const $ = id => (document.getElementById(id))

const todos = [
    {
      "id": 1,
      "todo": "Do something nice for someone I care about",
      "completed": true,
      "userId": 26
    },
    {
      "id": 2,
      "todo": "Memorize the fifty states and their capitals",
      "completed": false,
      "userId": 48
    },
    {
      "id": 3,
      "todo": "Watch a classic movie",
      "completed": false,
      "userId": 4
    },
    {
      "id": 4,
      "todo": "Contribute code or a monetary donation to an open-source software project",
      "completed": false,
      "userId": 48
    },]

const todoItem = {
    "id": 4,
    "todo": "Contribute code or a monetary donation to an open-source software project",
    "completed": false,
    "userId": 48
  }
    // console.log(todos)
const ar = [1,2,3,7,8,4,5]

// ar[0] =  1
// ar[1] = 2
// ar[2] = 3
// ar.product = 'Reactjs'
// ar.push(6,7,8,9)
// ar.unshift(6,7,8)
// const num = ar.shift()
const ar2 = ar.slice(1,3)
// alert(ar)

function desc(a, b) {
    return b-a
}
function sortByUserId(a, b) {
    return a.userId - b.userId
}
// console.log(todos.sort(sortByUserId))
// for(let i = 0; i< 10; i++) {
//     if(i % 0 === 0) {
//         // ar[ar.length] = i
//         ar.push()
//     }
// }

// const obj = {
//     name: 'abc',
//     maths: [1,2,3]
// }
todos.forEach((todo)=> {
    // console.log(todo.todo)
})
const nums = [2,4,6,8,10,1]
nums.concat(ar)
alert(nums.concat(ar))
const todoStrings = todos.map(todo => {
    return todo.todo
})
const todosByUserId = todos.filter(item => {
    return item.userId === 48
})
// nums.forEach(num => {
//     sum += num
// })
// function div(total, item) {
//     return total - item
// }


// alert(nums.toLocaleString())

// alert(Array.isArray(todos))
// console.log(todos.findIndex(item => {
//     return item.id === todoItem.userId
// }))

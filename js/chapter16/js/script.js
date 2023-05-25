'use strict'

// let request = new XMLHttpRequest()

// // request.open('GET','js/data.json')
// request.open('GET', 'https://dummyjson.com/carts', true)
// request.onreadystatechange = function(e) {
//     if(this.status === 200 && this.readyState == 4) {
//         const data = JSON.parse(this.response)

//         //
//         console.log(data)
//     }
// }


// request.send()



// $.get('https://dummyjson.com/carts', {}, function(response) {
//     console.log(response)
// })
// $.post('url', {}, function(res) {})
// $.put()
// $.delete()
// let data; 
// $.ajax({
//     url: 'https://dummyjson.com/carts',
//     data: {},
//     type: 'GET',
//     error: function(e){

//     },
//     success: function(response) {
//         data = response
//         // show data
//     }
// })

// console.log(data)

const arrowFunc = () => {
    //

}

const arrowFunc1 = id => {
    //
}

const arrowFunc2 = (id, index) => id+index
const arrowFunc3 = (id, index) => ({
    id,
    index
})

const obj = {
    fullname: 'Nguyen Van A',
    func1: function() {
        alert(this.fullname)

    },
    func2: () => {
        console.log(this.fullname)
    },
    func3: function() {
        console.log(arguments)
    }

}
obj.func3(1,2,3,4,5,6,7,7,8)

class Person {
    constructor(id,name) {
        this.id = id
        this.name = name
    }

    show() {

    }
}

class Student extends Person {
    constructor(id, name, math = 0) {
        super(id, name)
        this.math = math

    }
}
const student = new Student(1, 'Nguyen Van A')
console.log(student)

// alert(`student Name : ${student.name}`)

const fullname = 'N V A'
const id = 1234

const st  = {fullname, id}
// const st1 = st
// st1.js = 10
const st1 = {...st, js: 10}
console.log(Object.keys(st1))
console.log(Object.values(st1))
console.log(Object.entries(st1))
// let js;
// if(st.js != undefined) {
//     js = st.js
// } else {
//     js = 'abc'
// }
// const js = st.js != undefined ? st.js : 'abc'
const js = st.js || 'abc'
console.log(js)
const ar = [1,3,41,54,2,5,0,3,5]
// alert(Math.max(...ar))
// obj.func2()
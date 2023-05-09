'use strict';
const $ = id => (document.getElementById(id))

// const obj = {
//     firstName: 'Nguyen Van',
//     lastName: 'A',
//     fullName: function() {
//         return this.firstName +' '+ this.lastName
//     }
// }
// class Person {
//     constructor(firstName, lastName, passport, gender) {
//         this.firstName = firstName;
//         this.lastName = lastName;
//         this.passport = passport;
//         this.gender = gender;
//     }
//     fullName() {
//         return this.firstName + ' ' + this.lastName;
//     }
//     toString() {
//         return this.fullName();
//     }
// }



// class ReactJs extends Person {
//     constructor(firstName, lastName, passport, gender, html, js, reactjs, project) {
//         super(firstName, lastName, passport, gender)
//         this.html = html;
//         this.js = js;
//         this.reactjs = reactjs;
//         this.project = project;
//     }

//     avg() {
//         return ((this.html + this.js + this.reactjs + this.project) / 4).toFixed(1);
//     }

// }


// class PHP extends Person {
//     constructor(firstName, lastName, passport, gender, html, php, laravel, project) {
//         super(firstName, lastName, passport, gender)
//         this.html = html
//         this.php = php
//         this.laravel = laravel
//         this.project = project
//     }

// }
// // ReactJs.prototype = new Person('Nguyen Van', 'A', '1234567', true)
// const react = new ReactJs('Nguyen Van', 'A', '1234567', true,7,7,8,9)
// console.log(react)

// // obj = [['firstName', 'Nguyen Van'], ['lastName', 'A']]
// // for(let key in obj) {
// //     console.log(key, obj[key])
// // }
// // console.log(Object.entries(obj))
// // console.log(Object.keys(obj))
// // console.log(Object.values(obj))


class Student {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}

class Book {
    constructor(id, name, quantity) {
        this.id = id
        this.name = name
        this.quantity = quantity
    }
}

class Borrow {
    constructor(id, book_id, student_id, start) {
        this.id = id
        this.book_id = book_id
        this.student_id = student_id
        this.start = start
        this.status = false
    }
}

const localStudents = JSON.parse(localStorage.getItem('students')) || []
const students = localStudents.map(st => new Student(st.id, st.name))

const localBooks = JSON.parse(localStorage.getItem('books')) || []
const books = localBooks.map(b => new Book(b.id, b.name, b.quantity))

const borrows = []
const initSelectStudent = () => {
    let html = ''
    students.forEach(st => {
        html += `<option value="${st.id}">${st.name}</option>`
    })
    $('select_student').innerHTML = html
}

const initSelectBook = () => {
    let html = ''
    books.forEach(b => {
        html += `<option value="${b.id}">${b.name}</option>`
    })
    $('select_book').innerHTML = html
}

$('form_student').onsubmit = function(e) {
    e.preventDefault()
    const id = $('student_id').value
    const name = $('student_name').value
    let isValid = true
    if(name === '') {
        isValid = false
        $('student_name').nextElementSibling.textContent = 'Student Name is Required'   
    } else {
        $('student_name').nextElementSibling.textContent = ''   
    }

    if(id === '') {
        isValid = false
        $('student_id').nextElementSibling.textContent = 'Student ID is required'
    } else {
        const student = students.find(item => item.id === id)
        if(student == null) {
            if(isValid) {
                const newStudent = new Student(id, name)
                students.push(newStudent)
                initSelectStudent()
                localStorage.setItem('students', JSON.stringify(students))
            }
            
        } else {
            $('student_id').nextElementSibling.textContent = 'Student ID is exist'
        }
    }
}

$('form_book').onsubmit = function(e) {
    e.preventDefault()
    const id = $('book_id').value
    const name = $('book_name').value
    const quantity = $('book_quantity').value
    let isValid = true
    if(id === '') {
        isValid = false
        $('book_id').nextElementSibling.textContent = 'ID is Required'
    } else {
        const b = books.find(item => item.id == id)
        if(b != null) {
            isValid = false
            $('book_id').nextElementSibling.textContent = 'ID is exist'
        } else {
            $('book_id').nextElementSibling.textContent = ''
        }
     }

     if(name == '') {
        isValid = false
        $('book_name').nextElementSibling.textContent = 'Name is Required'
     } else {
        $('book_name').nextElementSibling.textContent = ''
     }

     if(isNaN(quantity)) {
        isValid = false
        $('book_quantity').nextElementSibling.textContent = 'is Not a Number'
     } else {
        if(quantity % 1 === 0 && quantity > 0) {
            $('book_quantity').nextElementSibling.textContent = ''
        } else {
            isValid = false
            $('book_quantity').nextElementSibling.textContent = 'Error Number'
        }
     }
     if(isValid) {
        books.push(new Book(id, name, parseInt(quantity)))
        localStorage.setItem('books', JSON.stringify(books))
        initSelectBook()
     }

}

initSelectStudent()
initSelectBook()

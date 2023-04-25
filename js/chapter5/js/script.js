'use strict';
const $ = (id) => (document.getElementById(id))

// const app1 = document.getElementById('app1')
// app1.classList.add('add_class')
// app1.classList.remove('app1')
// app1.classList.contains('app1')
// console.log(app1.tagName)
// app1.onclick = function() {
//     app1.classList.toggle('btn-primary')
//     app1.classList.toggle('btn')
// }
// const student = {
//     first_name : "Nguyen Van",
//     last_name : 'A',
//     full_name: function() {
//         return this.first_name+ ' ' + this.last_name
//     }
// }
// const apps = document.getElementsByTagName('h2')
// const fullname = document.getElementsByName('fullname')
// console.log(fullname)
// for(let i = 0; i< apps.length; i++) {
//     const $e = apps[i]
//     $e.onclick = function() {
//         this.classList.toggle('btn')
//         this.classList.toggle('btn-primary')
//     }
// }
// apps.forEach(($e) => {
    
// });

// const app = document.getElementById('app')
// app.removeAttribute('title')
// alert(app.hasAttribute('title'))
// const search = document.getElementById('search')
// search.setAttribute('type', 'email')
// search.setAttribute('placeholder', 'Please Enter Your Email')

// const questions = document.getElementsByClassName('js-question')
// for(let i = 0; i< questions.length; i++){
//     const $q = questions[i]
//     $q.onclick = function() {
//         if(this.nextElementSibling.style.display == 'block') {
//             this.nextElementSibling.style.display = 'none'
//         } else {
//             this.nextElementSibling.style.display = 'block'
//         }
//     }
// }

// document.getElementById('app').innerHTML = '<h1 class="text-center h1" id="app1">FAQs</h1>'
// const $h1 = document.getElementById('app1')
// const $h1 = document.createElement('h1')
// $h1.id = 'app1'
// $h1.className = 'h1 text-danger text-center bg-secondary'
// $h1.count = 0
// $h1.textContent = 'FAQs'
// const $h1Text = document.createTextNode('FAQs '+ $h1.count)

// $h1.onclick = function() {
//     $h1Text.nodeValue = 'FAQs '+ (++$h1.count)
    
// }
// const $before = document.createTextNode('Before: ')

// $h1.appendChild($h1Text)
// $h1.insertBefore( $before, $h1Text)
// document.getElementById('app').appendChild($h1)
// const $form = document.getElementById('form')
// $form.onsubmit = function(e) {
//     e.preventDefault()  
// }
// const $input = document.getElementById('input')
// document.getElementById('button').onclick = function() {
//     console.log($input.checked)
//     // $form.reset()
// }
   
const $name = $('fullname')
const $salary = $('salary')
const $app = $('app')
const employees = []
const showEmloyees = () => {
    $app.innerHTML = ''
    employees.forEach((emp, index) => {
      $app.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td>${emp.fullName}</td>
            <td>${parseFloat(emp.salary).toFixed(1)}</td>
            <td>${emp.tax().toFixed(1)}</td>
            <td>${emp.total().toFixed(1)}</td>
        </tr>
      `
    })
}
$('form').onsubmit = function(e) {
    e.preventDefault()
    const fullName = $name.value
    let isValid = true
    if(fullName == '') {
        $name.nextElementSibling.textContent = 'Employee Name is required'
        isValid = false
    } else {
        $name.nextElementSibling.textContent = ''   

    }
    let salary = $salary.value
    if(salary != '' && !isNaN(salary) && parseFloat(salary) > 0) {
        
        $salary.nextElementSibling.textContent = ''
    } else {
        $salary.nextElementSibling.textContent = 'Salary is error'
        isValid = false
    }
    if(!isValid) return;
    employees.push({
        fullName: fullName,
        salary: salary,
        tax: function() {
            const s = parseFloat(this.salary)
            if(s > 500) {
                return (s-500)*.1
            }
            return 0
        },
        total: function() {
            return this.salary - this.tax()
        }

    })
    showEmloyees()
}
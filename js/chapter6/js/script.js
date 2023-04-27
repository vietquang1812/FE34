'use strict';
const $ = (id) => (document.getElementById(id))

const $name = $('fullname')
const $salary = $('salary')
const $app = $('app')
const $btn = $('submit')
const employees = []



const showEmloyees = () => {
    $app.innerHTML = ''
    let html = ''
    employees.forEach((emp, index) => {
        html += `
        <tr>
            <td>${index + 1}</td>
            <td>${emp.fullName}</td>
            <td>${parseFloat(emp.salary).toFixed(1)}</td>
            <td>${emp.tax().toFixed(1)}</td>
            <td>${emp.total().toFixed(1)}</td>
            <td>
                <button class="btn btn-info btn-sm js-btn-edit " data-index="${index}" type="button">Edit</button>
                <button class="btn btn-danger btn-sm js-btn-delete ml-2" data-index="${index}" type="button" >Delete</button>
                
            </td>
        </tr>
      `
    })

    $app.innerHTML = html
    const $dltes = document.getElementsByClassName('js-btn-delete')
    for (let i = 0; i < $dltes.length; i++) {
        $dltes[i].onclick = function () {
            const index = this.getAttribute('data-index')
            if(!isNaN(index) && index >= 0 && index < employees.length ) {
                const isConfirm = confirm('do you want to delete?')
                if(isConfirm) {
                    employees.splice(index, 1)
                    showEmloyees()
                }
                
            }
        }
    }
    const $edits = document.getElementsByClassName('js-btn-edit')
    for(let i = 0; i< $edits.length; i++) {
        $edits[i].onclick = function() {
            const index = this.getAttribute('data-index')
            if(!isNaN(index) && index >= 0 && index < employees.length ) {
                $btn.setAttribute('data-event', 'update')
                $btn.textContent = 'Edit'
                $btn.setAttribute('data-index', index)
                $name.value = employees[index].fullName
                $salary.value = employees[index].salary
            }
        }
        
    }    

}

$('form').onsubmit = function (e) {
    e.preventDefault()
    const fullName = $name.value
    let isValid = true
    if (fullName == '') {
        $name.nextElementSibling.textContent = 'Employee Name is required'
        isValid = false
    } else {
        $name.nextElementSibling.textContent = ''

    }
    let salary = $salary.value
    if (salary != '' && !isNaN(salary) && parseFloat(salary) > 0) {

        $salary.nextElementSibling.textContent = ''
    } else {
        $salary.nextElementSibling.textContent = 'Salary is error'
        isValid = false
    }
    if (!isValid) return;

    const eventName = $btn.getAttribute('data-event')
    if(eventName === 'add') {
        employees.push({
            fullName: fullName,
            salary: salary,
            tax: function () {
                const s = parseFloat(this.salary)
                if (s > 500) {
                    return (s - 500) * .1
                }
                return 0
            },
            total: function () {
                return this.salary - this.tax()
            }
    
        })
    } else {
        const index = $btn.getAttribute('data-index')
        if(!isNaN(index) && index >=0 && index < employees.length) {
            employees[index].fullName = fullName
            employees[index].salary = salary
        }

        $btn.setAttribute('data-event', 'add')
        $btn.textContent = 'Add'
    }
    
    $('form').reset()
    showEmloyees()
}


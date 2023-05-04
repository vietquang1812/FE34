'use strict';

// alert(new Date((new Date()).setDate((new Date()).getDate() + 1)).toString())
const $ = (id) => (document.getElementById(id))

const $name = $('fullname')
const $salary = $('salary')
const $app = $('app')
const $btn = $('submit')
$btn.action = 'add'

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
            if (!isNaN(index) && index >= 0 && index < employees.length) {
                const isConfirm = confirm('do you want to delete?')
                if (isConfirm) {
                    employees.splice(index, 1)
                    showEmloyees()
                }

            }
        }
    }
    const $edits = document.getElementsByClassName('js-btn-edit')
    for (let i = 0; i < $edits.length; i++) {
        $edits[i].onclick = function () {
            const index = this.getAttribute('data-index')
            if (!isNaN(index) && index >= 0 && index < employees.length) {

                $btn.setAttribute('data-event', 'update')
                $btn.textContent = 'Edit'
                $btn.setAttribute('data-index', index)
                $name.value = employees[index].fullName
                $salary.value = employees[index].salary

                const existCancel = document.getElementById('cancel')
                if (existCancel == null) {
                    const $cancel = document.createElement('button')
                    $cancel.className = 'btn btn-secondary'
                    $cancel.type = 'reset'
                    $cancel.id = 'cancel'
                    $cancel.textContent = 'Cancel'
                    $btn.parentNode.appendChild($cancel)
                }

                // $btn.parentNode.innerHTML += `<button class="btn btn-secondary ml-2" id="cancel" type="button">Cancel</button>`
            }
        }

    }

}
const $td = (text) => {
    const td = document.createElement('td')
    td.textContent = text

    return td
}
const $btnDelete = (index) => {
    const $btnDlte = document.createElement('button')
    $btnDlte.className = 'btn btn-danger ms-2'
    $btnDlte.type = 'button'
    $btnDlte.textContent = 'Delete'

    $btnDlte.onclick = function () {
        employees.splice(index, 1)
        showEmloyeesDOM()
    }
    return $btnDlte
}
const $btnEdit = (index) => {
    const $button = document.createElement('button')
    $button.type = 'button'
    $button.className = 'btn btn-info'
    $button.textContent = 'Edit'

    $button.onclick = function () {
        $name.value = employees[index].fullName
        $salary.value = employees[index].salary

        $btn.textContent = 'Edit'
        $btn.action = 'update'
        $btn.indexEmployee = index
        // $btn.setAttribute()
        const existCancel = document.getElementById('cancel')
        if (existCancel == null) {
            const $cancel = document.createElement('button')
            $cancel.className = 'btn btn-secondary'
            $cancel.type = 'reset'
            $cancel.id = 'cancel'
            $cancel.textContent = 'Cancel'
            $btn.parentNode.appendChild($cancel)
        }
    }
    return $button
}
const showEmloyeesDOM = () => {
    $app.innerHTML = ''
    employees.forEach((employee, index) => {
        const $tr = document.createElement('tr')
        const $no = $td(index + 1)
        const $empName = $td(employee.fullName)
        const $empSalary = $td(parseFloat(employee.salary).toFixed(1))
        const $empTax = $td(employee.tax().toFixed(1))
        const $empTotal = $td(employee.total().toFixed(1))

        $tr.appendChild($no)
        $tr.appendChild($empName)
        $tr.appendChild($empSalary)
        $tr.appendChild($empTax)
        $tr.appendChild($empTotal)

        const $action = document.createElement('td')
        $action.appendChild($btnEdit(index))
        $action.appendChild($btnDelete(index))

        $tr.appendChild($action)
        $app.appendChild($tr)
    })
}

$('form').onreset = function () {
    $btn.setAttribute('data-event', 'add')
    $btn.action = 'add'
    $btn.textContent = 'Add'
    const $cancel = document.getElementById('cancel')
    if ($cancel != null) {
        $cancel.remove()
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
    // const eventName = $btn.getAttribute('data-event')
    // if (eventName === 'add') {
        if ($btn.action === 'add') {
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
        const index = $btn.indexEmployee
        if (!isNaN(index) && index >= 0 && index < employees.length) {
            employees[index].fullName = fullName
            employees[index].salary = salary
        }

    }

    $('form').reset()
    // showEmloyees()
    showEmloyeesDOM()
}


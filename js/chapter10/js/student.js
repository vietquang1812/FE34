'use strict';
const $ = id => (document.getElementById(id))

// const num = new Number(123) // const num = 123
// const str = new String('String  ')//const str = 'String'
// const bool = new Boolean(0)
// alert(bool)
// const today = new Date()
// const html = 10
// const obj = {
//     fullname: 'N V B',
//     html,
// }
// obj.fullname = 'N V A'
// obj.avg = function() {

// }
// obj.info = {

// }

const Student = function (fullname, html, js, reactjs) {
    this.fullname = fullname
    this.html = html
    this.javascript = js
    this.reactjs = reactjs

}
Student.prototype.avg = function () {
    return ((this.html + this.javascript + this.reactjs) / 3).toFixed(1)
}
Student.prototype.rank = function () {
    const avg = this.avg()
    if (avg < 5) return 'F'
    if (avg < 6.5) return 'D'
    if (avg < 7.5) return 'C'
    if (avg < 8.5) return 'B'
    return 'A'
}
Student.prototype.initRow = function(index) {
    const $row = document.createElement('tr')
    $row.innerHTML =   `<td>${index + 1}</td>
                        <td>${this.fullname}</td>
                        <td>${this.html}</td>
                        <td>${this.javascript}</td>
                        <td>${this.reactjs}</td>
                        <td>${this.avg()}</td>
                        <td>${this.rank()}</td>`
    return $row
}
// const stdent = new Student('Nam', 7,8,9)
// stdent.project = 10
// console.log(stdent)
const students = []

const $inputName = $('fullname')
const $inputHtml = $('html')
const $inputJs = $('javascript')
const $inputReact = $('reactjs')
const $app = $('app')

const validateFields = () => {
    const fullname = $inputName.value
    let isValid = true

    if (fullname == '') {
        isValid = false
        $inputName.nextElementSibling.textContent = 'Student is Required'
    } else if (fullname.length > 50) {
        isValid = false
        $inputName.nextElementSibling.textContent = 'Student is long......'
    } else {
        $inputName.nextElementSibling.textContent = ''
    }

    const html = $inputHtml.value
    if (html == '' || isNaN(html) || html < 0 || html > 10) {
        isValid = false
        $inputHtml.nextElementSibling.textContent = 'inValid'
    } else {
        $inputHtml.nextElementSibling.textContent = ''
    }

    const javascript = $inputJs.value
    if (javascript == '' || isNaN(javascript) || javascript < 0 || javascript > 10) {
        isValid = false
        $inputJs.nextElementSibling.textContent = 'inValid'
    } else {
        $inputJs.nextElementSibling.textContent = ''
    }

    const reactjs = $inputReact.value
    if (reactjs == '' || isNaN(reactjs) || reactjs < 0 || reactjs > 10) {
        isValid = false
        $inputReact.nextElementSibling.textContent = 'inValid'
    } else {
        $inputReact.nextElementSibling.textContent = ''
    }

    return isValid
}

const addStudent = () => {
    const st = new Student($inputName.value,$inputHtml.value,$inputJs.value,$inputReact.value)
    // students.push({
    //     fullname: $inputName.value,
    //     html: parseFloat($inputHtml.value),
    //     javascript: parseFloat($inputJs.value),
    //     reactjs: parseFloat($inputReact.value),
    //     avg: function () {
    //         return ((this.html + this.javascript + this.reactjs) / 3).toFixed(1)
    //     },
    //     rank: function () {
    //         const avg = this.avg()
    //         if (avg < 5) return 'F'
    //         if (avg < 6.5) return 'D'
    //         if (avg < 7.5) return 'C'
    //         if (avg < 8.5) return 'B'
    //         return 'A'
    //     }

    // })
    students.push(st)

    localStorage.setItem('students', JSON.stringify(students))
}
const $tr = ($items) => {
    const $element = document.createElement('tr')
    $items.forEach($item => {
        $element.appendChild($item)
    })
    return $element
}
const $td = text => {
    const $element = document.createElement('td')
    $element.textContent = text
    return $element
}
const showStudents = (list = students) => {
    $app.innerHTML = list.length == 0 ? '<tr><td colspan="7" class="text-center">No Items</td></tr>' : ''

    list.forEach((student, index) => {
        // const $row = $tr([$td(index + 1), $td(student.fullname), $td(student.html), $td(student.javascript), $td(student.reactjs), $td(student.avg()), $td(student.rank())])
        const $row = student.initRow(index)
        $app.appendChild($row)
    })
}
$('submit').onclick = function () {
    if (validateFields()) {
        addStudent()
        showStudents()
    }
}

const localStudents = JSON.parse(localStorage.getItem('students') || '[]')
if (localStudents.length > 0) {
    localStudents.forEach(ls => {
        const st = new Student(ls.fullname, ls.html, ls.javascript, ls.reactjs)
        // students.push({
        //     fullname: ls.fullname,
        //     html: ls.html,
        //     javascript: ls.javascript,
        //     reactjs: ls.reactjs,
        //     avg: function () {
        //         return ((this.html + this.javascript + this.reactjs) / 3).toFixed(1)
        //     },
        //     rank: function () {
        //         const avg = this.avg()
        //         if (avg < 5) return 'F'
        //         if (avg < 6.5) return 'D'
        //         if (avg < 7.5) return 'C'
        //         if (avg < 8.5) return 'B'
        //         return 'A'
        //     }
        // })
        students.push(st)
    })
}
showStudents()
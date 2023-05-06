'use strict'
const $ = id => (document.getElementById(id))

let tasks= []

// localStorage.setItem('name', 'Nguyen Van A')
// sessionStorage.setItem('product', 'ReactJs')
// const name = localStorage.getItem('name')

const checkValidate = () => {
    let isValid = true
    const description = $('description').value
    if(description == '') {
        isValid = false
        $('description').nextElementSibling.innerHTML = 'Please enter Description'
    } else {
        $('description').nextElementSibling.innerHTML = ''
    }
    const deadline = $('deadline').value
    if(deadline == '') {
        $('deadline').nextElementSibling.innerHTML = 'Please enter Deadline'
        isValid = false
    } else {
        $('deadline').nextElementSibling.innerHTML = ''   
    }
    return isValid
}
const addTask = () => {
    const description = $('description').value
    const deadline = $('deadline').value
    const status = $('status').checked

    tasks.push({
        id: tasks.length + 1,
        description,
        deadline,
        status
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))
}
const $tr = ($tds) => {
    const $element = document.createElement('tr')
    $tds.forEach($e => {
        $element.appendChild($e)
    })

    return $element
}

const $td = text => {
    const $element = document.createElement('td')
    $element.textContent = text
    return $element
}
const showTasks = (list = tasks) => {
    $('tasks').innerHTML = list.length === 0 ? '<tr><td colspan="4" class="text-center">No Items</td></tr>' :''

    list.forEach((task) => {
        const $no = $td(task.id)
        const $des = $td(task.description)
        const $deadline = $td(task.deadline)
        const $status = $td(task.status ? 'Complete' : 'Uncomplete')

        const $row = $tr([$no, $des, $deadline, $status])
        $('tasks').appendChild($row)
    })
}

$('search').onkeyup = function() {
    const search = this.value
    const list = tasks.filter(item => item.description.toLowerCase().indexOf(search.toLowerCase()) >=0)
    showTasks(list)
}

$('sort_deadline').onclick = function() {
    const isSortInc = this.getAttribute('data-inc')
    if(isSortInc == 0) {
        const list = tasks.sort((a,b) => {
            const dateA = new Date(a.deadline)
            const dateB = new Date(b.deadline)
            return dateA.getTime() - dateB.getTime()
        })
        showTasks(list)
        this.setAttribute('data-inc', 1)
    } else {
        const list = tasks.sort((a,b) => {
            const dateA = new Date(a.deadline)
            const dateB = new Date(b.deadline)
            return dateB.getTime() - dateA.getTime()
        })
        showTasks(list)
        this.setAttribute('data-inc', 0)
    }
}

$('filter').onclick = function() {
    const list = tasks.filter(item => !item.status)
    showTasks(list)
}
$('late').onclick = function() {
    const list = tasks.filter(item => {
        const today = (new Date()).getTime()
        const taskDate = (new Date(item.deadline)).getTime() + 24*60*60*1000 - 1
        return !item.status && today > taskDate

    })
    showTasks(list)
}
$('submit').onclick = function() {
    if(checkValidate()) {
        addTask()
        showTasks()
    }
}

const getLocalData = () => {
    tasks = JSON.parse(localStorage.getItem('tasks')) || []
    showTasks()
}
getLocalData()
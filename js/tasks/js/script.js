'use strict';
const $ = id =>(document.getElementById(id))

const tasks = [];
const showTasks = function() {
    // $('tasks').innerHTML = '<ul>'
    // for(let i= 0; i< tasks.length; i++) {
    //     $('tasks').innerHTML += `<li>${tasks[i]}</li>`
    // }
    // $('tasks').innerHTML += '</ul>'
    const $ul = document.createElement('ul')
    for(let i = 0; i< tasks.length; i++) {
        const $li = document.createElement('li')
        const $text = document.createTextNode(tasks[i])
        const $delete = document.createElement('button')
        const $deleteText = document.createTextNode('delete')
        $delete.className = 'btn btn-danger'
        $delete.onclick = function() {
            tasks.splice(i, 1)
            showTasks()
        }
        $delete.appendChild($deleteText)

        $li.appendChild($text)
        $li.appendChild($delete)
        $ul.appendChild($li)
    }
    $('tasks').innerHTML = ''
    $('tasks').appendChild($ul)


}
$('submit').onclick = function() {
    const task = $('input').value
    if(task != '') {
        tasks[tasks.length] = task
        showTasks()
        $('input').value = ''
    } else {
        alert('Please Enter task description')
    }
}
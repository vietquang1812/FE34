'use strict'
const $ = id => (document.getElementById(id));

let book_task=[];
let student_task=[];
let borrow_task=[];

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



const check_book = () => {
    let isValid = true
    const book_name = $('book-name').value
    if(book_name == '') {
        isValid = false
        $('book-name').nextElementSibling.innerHTML = 'Vui lòng nhập tên sách'
    } else {
        $('book-name').nextElementSibling.innerHTML = ''
    }
    const quanlity = $('book-quanlity').value
    if(quanlity == '') {
        $('book-quanlity').nextElementSibling.innerHTML = 'Vui lòng nhập số lượng'
        isValid = false
    } else {
        $('book-quanlity').nextElementSibling.innerHTML = ''   
    }
    return isValid
}

const check_student = () => {
    let isValid = true
    const student_name = $('student-name').value
    if(student_name == '') {
        isValid = false
        $('student-name').nextElementSibling.innerHTML = 'Vui lòng nhập tên học sinh'
    } else {
        $('student-name').nextElementSibling.innerHTML = ''
    }
    return isValid
}

const check_borrow = () => {
    let isValid = true
    const borrow_book = $('borrow-book').value
    if(borrow_book == '') {
        isValid = false
        $('borrow-book').nextElementSibling.innerHTML = 'Vui lòng chọn sách mượn'
    } else {
        $('borrow-book').nextElementSibling.innerHTML = ''
    }
    const borrow_student = $('borrow-student').value
    if(borrow_student == '') {
        $('borrow-student').nextElementSibling.innerHTML = 'Vui lòng chọn học sinh mượn'
        isValid = false
    } else {
        $('borrow-student').nextElementSibling.innerHTML = ''   
    }

    const borrow_date = $('borrow-date').value
    if(borrow_date == '') {
        $('borrow-date').nextElementSibling.innerHTML = 'Vui lòng chọn ngày mượn'
        isValid = false
    } else {
        $('borrow-date').nextElementSibling.innerHTML = ''   
    }
    return isValid
}

const add_book= () => {
    const book_name = $('book-name').value
    const quanlity = $('book-quanlity').value
    const id =book_task.length + 1;
    book_task.push({
        id,
        book_name,
        quanlity,
    })
    localStorage.setItem('book_tasks', JSON.stringify(book_task))
    book_option();
}

const add_borrow= () => {
    const book_id = $('borrow-book').value
    let book = '';
    let book_quanlity = '';
    const student = $('borrow-student').value
    const date_borrow = $('borrow-date').value
    const id =borrow_task.length + 1;
    for (let i = 0; i<= book_task.length - 1; i++){
        if (book_task[i].id == book_id) 
        {
            book_quanlity = book_task[i].quanlity;
            if (book_quanlity > 0) {
                book_task[i].quanlity--;
                localStorage.setItem('book_tasks', JSON.stringify(book_task))
                book = book_task[i].book_name;
            }
        }
    }

    if (book_quanlity > 0){
        borrow_task.push({
            id,
            student,
            book,
            date_borrow
        })
        localStorage.setItem('borrow_tasks', JSON.stringify(borrow_task))
    }
    
    show_book();
}

const add_student= () => {
    const student_name = $('student-name').value
    const id =student_task.length + 1;
    student_task.push({
        id,
        student_name,
    })
    localStorage.setItem('student_tasks', JSON.stringify(student_task))
    student_option();
}

const book_option = () => {
    if (book_task.length > 0) {
        book_task.forEach((book,index) => {
            if (book.quanlity > 0) {
                const option_book = document.createElement('option');
                option_book.value = book.id;
                option_book.innerText = book.book_name;
                $('borrow-book').appendChild(option_book);
            }
        })
    }
    
}

const student_option = () => {
    if (student_task.length > 0) {
        student_task.forEach((student,index) => {
            const option_student = document.createElement('option');
            option_student.value = student.student_name;
            option_student.innerText = student.student_name;
            $('borrow-student').appendChild(option_student);
        })
    }
}

const show_book = (list = book_task) => {
    $('book-tasks').innerHTML = list.length === 0 ? '<tr><td colspan="3" class="text-center">No Book</td></tr>' :''

    list.forEach((book_task, index) => {
        const $no = $td(book_task.id)
        const $name = $td(book_task.book_name)
        const $quanlity = $td(book_task.quanlity)

        const $row = $tr([$no, $name, $quanlity])
        $('book-tasks').appendChild($row)
    })
    
}

const show_student = (list = student_task) => {
    $('student-tasks').innerHTML = list.length === 0 ? '<tr><td colspan="2" class="text-center">No Student</td></tr>' :''

    list.forEach((student_task, index) => {
        const $no = $td(student_task.id)
        const $name = $td(student_task.student_name)
        const $row = $tr([$no, $name])
        $('student-tasks').appendChild($row)
    })

}

const show_borrow = (list = borrow_task) => {
    $('borrow-tasks').innerHTML = list.length === 0 ? '<tr><td colspan="4" class="text-center">No borrow</td></tr>' :''

    list.forEach((borrow, index) => {
        const $no = $td(borrow.id)
        const $book = $td(borrow.book)
        const $student = $td(borrow.student);
        const $date_borrow = $td(borrow.date_borrow);
        const $row = $tr([$no, $book,$student,$date_borrow])
        $('borrow-tasks').appendChild($row)
    })

}

$('submit-book').onclick = function() {
    if(check_book()) {
        add_book();
        show_book();
    }
}

$('submit-student').onclick = function() {
    if(check_student()) {
        add_student();
        show_student();
    }
}

$('submit-borrow').onclick = function() {
    if(check_borrow()) {
        add_borrow();
        show_borrow();

    }
}

const getLocalData = () => {
    book_task = JSON.parse(localStorage.getItem('book_tasks')) || []
    student_task = JSON.parse(localStorage.getItem('student_tasks')) || []
    borrow_task = JSON.parse(localStorage.getItem('borrow_tasks')) || []

    show_book();
    book_option();
    show_student();
    student_option();
    show_borrow();
}
getLocalData()
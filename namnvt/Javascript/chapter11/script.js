"use strict";
const $ = function (id) { return document.getElementById(id) }

class Student {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}
class Book {
    constructor(id, name, qty) {
        this.id = id
        this.name = name
        this.qty = qty
    }
}
class Borrow {
    constructor(book_id, book_name, st_name, qty, start, status) {
        this.book_id = book_id
        this.book_name = book_name
        this.st_name = st_name
        this.qty = qty
        this.start = start
        this.status = status
    }
    IntRow = (index) => {
        const $td = (text) => {

            const $element = document.createElement('td')
            $element.textContent = text
            return $element
        }
        const rows = document.createElement('tr')
        rows.appendChild($td(this.book_id))
        rows.appendChild($td(this.book_name))
        rows.appendChild($td(this.st_name))
        rows.appendChild($td(this.qty))
        rows.appendChild($td(this.start))
        const selectStatus = function () {
            const $status = document.createElement('select')
            $status.id = 'status'
            $status.value = "True"
            $status.className = 'form-control'
            const $op = (text) => {
                const $option = document.createElement('option')
                $option.textContent = text
                return $option
            }
            $status.appendChild($op('True'))
            $status.appendChild($op('False'))
            $status.onchange = (index) => {
                index = $status.selectedIndex
                const Select_status = $status.selectedIndex.name
                if (Select_status == True) {
                    $('inventory').value = parseFloat($('inventory').value) + borrows[index].qty
                    $status.disabled
                }
            }
            return $status
        }

        const btndelete = (index) => {
            const $delete = document.createElement('button')
            $delete.id = 'delete'
            $delete.type = 'button'
            $delete.className = "btn btn-danger bg-danger"
            $delete.textContent = 'Delete'
            $delete.onclick = function () {
                borrows.splice(index, 1)
                showBorrow()
            }
            return $delete
        }
        const btnedit = (index) => {
            const $edit = document.createElement('button')
            $edit.id = "edit"
            $edit.className = 'btn btn-success'
            $edit.textContent = 'Edit'
            $edit.onclick = () => {
                [$('select_book').selectedIndex].name = this.book_name
                [$('select_st').selectedIndex].name = this.st_name
                $('book_qty').value = this.qty
                btnsubmit.action = 'edit'
                btnsubmit.textContent = 'Update'
                btnsubmit.editIndex = index
                const isCancel = document.getElementById('cancel')
                if (isCancel == null) {
                    const $cancel = document.createElement('button')
                    $cancel.id = 'cancel'
                    $cancel.className = 'btn btn-secondary'
                    $cancel.textContent = 'Cancel'
                    $cancel.onclick = () => {
                        $cancel.remove()
                        btnsubmit.action = 'add'
                        btnsubmit.textContent = 'Submit'

                    }
                    btnsubmit.parentNode.appendChild($cancel)
                }
            }
            return $edit
        }


        const action = $td()
        action.appendChild(btndelete(index))
        action.appendChild(btnedit(index))
        rows.appendChild(selectStatus())
        rows.appendChild(action)
        return rows
    }
}
const app = $('app')
const students = []
const books = []
const borrows = []
const btnsubmit = $('submit')
btnsubmit.action = 'add'
const showBorrow = (list = borrows) => {
    app.innerHTML = list.length === 0 ? ` <tr><td colspan="7" class="text-center">No Items</td></tr>` : ""
    list.forEach((borrow, index) => {
        const $rows = borrow.IntRow(index)
        app.appendChild($rows)
    })
}
const addBooks = () => {

    const borrowQty = $('borrow_qty')
    const selectbook = $('select_book')
    const bookName = books[selectbook.selectedIndex].name
    const bookID = books[selectbook.selectedIndex].id
    const selectst = $('select_st')
    const borrowst = students[selectst.selectedIndex].name
    const $borrow = new Borrow(bookID, bookName, borrowst, parseFloat(borrowQty.value), $('start_date').value)
    let isValid = true
    if (borrowQty.value != "" && !isNaN(borrowQty.value)) {
        if (parseFloat(borrowQty.value) > parseFloat($('inventory').value)) {
            isValid = false
            borrowQty.nextElementSibling.textContent = "borrow Qty pver stock"
        } else {
            borrowQty.nextElementSibling.textContent = ""
        }
    } else {
        isValid = false
        borrowQty.nextElementSibling.textContent = "Enter qty book borrow"
    }
    // if ($('start_date').value == "") {
    //     isValid = false
    //     $('start_date').nextElementSibling.textContent = "Enter date"
    // } else {
    //     $('start_date').nextElementSibling.textContent = ""
    // }

    if (books.length > 0 && students.length > 0 && isValid) {
        const index = borrows.findIndex(item => item.book_id == bookID)
        const indexst = borrows.findIndex(item => item.st_name == borrowst)
        $('inventory').value = parseFloat($('inventory').value) - parseFloat($('borrow_qty').value)
        if (index >= 0 && indexst >= 0) {
            borrows[indexst].qty = parseFloat(borrowQty.value) + parseFloat(borrows[indexst].qty)
        } else {
            borrows.push($borrow)
        }
    }
}
$('select_book').onchange = function () {
    const bookID = books[$('select_book').selectedIndex].id
    const isInput = document.getElementById('inventory')

    if (isInput == null) {
        const $label = document.createElement('label')
        $label.className = 'd-flex mt-3'
        $label.textContent = 'Inventory'
        const bookInventory = document.createElement('input')
        bookInventory.className = 'form-control disable'
        bookInventory.id = 'inventory'
        $('select_book').parentNode.appendChild($label)
        $('select_book').parentNode.appendChild(bookInventory)

    }
    const index = books.findIndex(item => item.id == bookID)
    if (isNaN(parseFloat($('borrow_qty').value))) { ($('borrow_qty').value) = 0 }

    $('inventory').value = parseFloat(books[index].qty) - parseFloat($('borrow_qty').value)
}

const initSelectStudent = function () {
    let html = ''
    students.forEach(st => {
        html += `<option>${st.name}-${st.id}</option> `

    })
    $('select_st').innerHTML = html

}
const initSelectBook = function () {
    let html = ''
    books.forEach(bk => {
        html += `<option>${bk.name}-${bk.id}</option>`
    })
    $('select_book').innerHTML = html

}
$('form_st').onclick = function (e) {
    e.preventDefault()
    const id = $('st_id').value
    const name = $('st_name').value
    let isValid = true
    if (name == "") {
        isValid = false
        $('st_name').nextElementSibling.textContent = 'Enter Name'
    } else { $('st_name').nextElementSibling.textContent = '' }

    if (id == "") {
        isValid = false
        $('st_id').nextElementSibling.textContent = 'Student ID is required'
    } else {
        const student = students.find(item => item.id == id)
        if (student == null) {
            if (isValid) {
                const newStudent = new Student(id, name)
                students.push(newStudent)
            }
            localStorage.setItem('students', JSON.stringify('students'))
            initSelectStudent()
        }
    }
}
$('form_book').onclick = function (e) {
    e.preventDefault()
    let isValid = true
    const id = $('book_id').value
    const name = $('book_name').value
    const qty = $('book_qty').value

    if (name == "") {
        isValid = false
        $('book_name').nextElementSibling.textContent = 'Please enter book name'
    } else {
        $('book_name').nextElementSibling.textContent = ''
    }
    if (isNaN(qty) || qty < 0 || parseFloat(qty) % 1 != 0) {
        isValid = false
        $('book_qty').nextElementSibling.textContent = "please enter book quantity"
    } else {
        $('book_qty').nextElementSibling.textContent = ""
    }
    if (id == "") {
        isValid = false
        $('book_id').nextElementSibling.textContent = 'Book ID must have'
    } else { $('book_id').nextElementSibling.textContent = '' }

    if (isValid) {
        const newBook = new Book(id, name, qty)
        if (books.length == 0) {
            if (isValid) {
                books.push(newBook)
            }
            initSelectBook()
        } else {
            const index = books.findIndex(item => item.id == id)
            if (index >= 0) {
                books[index].qty = parseFloat(books[index].qty) + parseFloat($('book_qty').value)

            } else { books.push(newBook) }
            initSelectBook()
        }
        localStorage.setItem('books', JSON.stringify('books'))

    }
}

$('submit').onclick = function (e) {
    e.preventDefault()
    if (btnsubmit.action == 'add') {
        addBooks()
    } else {
        const index = btnsubmit.editIndex
        borrows[index].book_id = books[$('select_book').selectedIndex].id
        borrows[index].book_name = books[$('select_book').selectedIndex].name
        borrows[index].st_name = students[$('select_st').selectedIndex].name
        borrows[index].qty = $('select_qty').value
        btnsubmit.action = 'add'
        btnsubmit.textContent = 'Submit'
        const isCancel = document.getElementById('cancel')
        if (isCancel != null) {
            isCancel.remove()
        }
    }
    showBorrow()
}

// const localStudents = JSON.parse(localStorage.getItem('students') || '[]')
// if (localStudents.length > 0) {
//     localStudents.forEach(ls => {
//         const st = new Student(ls.name, ls.id)
//         students.push(st)
//     })


// }
// const localBooks = JSON.parse(localStorage.getItem('books') || '[]')
// if (localBooks.length > 0) {
//     localBooks.forEach(ls => {
//         const bk = new Book(ls.id, ls.name, ls.qty)
//         books.push(bk)
//     })

// }
// initSelectStudent()
// initSelectBook()
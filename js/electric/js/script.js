'use strict'
const $ = id => (document.getElementById(id))

class Bill {
    constructor(id, name, start, end) {
        this.id = id
        this.name = name
        this.start = parseInt(start)
        this.end = parseInt(end)
    }
    amount() {
        let total = this.end - this.start

        if (total > 100) {
            return (total - 100) * 2000 + 50 * 1500 + 50 * 1000
        } else if (total > 50) {
            return (total - 50) * 1500 + 50 * 1000
        } else {
            return total * 1000
        }
    }
    // 1000 => 1,000
    formatNumber(num) {
        let numString = ''
        while (num > 0) {
            let div = num % 1000

            num = Math.floor(num / 1000)
            if (num !== 0) {
                if (div < 10) {
                    div = '00' + div
                } else if (div < 100) {
                    div = '0' + div
                }
                numString = ',' + div + numString
            } else {
                numString = div + numString
            }

        }
        return numString
    }
    initRow() {
        return `<tr>
            <td>${this.id}</td>
            <td>${this.name}</td>
            <td>${this.formatNumber(this.start)}</td>
            <td>${this.formatNumber(this.end)}</td>
            <td>${this.formatNumber(this.end - this.start)}</td>
            <td>${this.formatNumber(this.amount())}</td>
        </tr>`
    }
}

const managerBillsElectric = {
    DOM: {
        $form: $('form'),
        $name: $('name'),
        $start: $('start'),
        $end: $('end'),
        $app: $('app'),
        $summary: $('summary'),
    },
    auto_increasement_id: 0,
    bills: [],
    getStorage: function () {
        const billsStorage = JSON.parse(localStorage.getItem('electrics')) ?? []

        this.bills = billsStorage.map(b => new Bill(b.id, b.name, b.start, b.end))
        this.auto_increasement_id = Math.max(...this.bills.map(b => b.id), 0)
        this.show()
    },
    setStorage: function () {
        localStorage.setItem('electrics', JSON.stringify(this.bills))
    },
    show: function (list = this.bills) {
        this.DOM.$app.innerHTML = list.length === 0 ? '<tr><td colspan="6" class="text-center">No Items</td></tr>' : ''
        list.sort((a, b) => b.amount() - a.amount())
        // list.sort((a,b) => a.id - b.id)
        list.forEach(item => {
            this.DOM.$app.innerHTML += item.initRow()
        })
        const listFilter = list.filter(item => item.end - item.start <= 100)
        this.DOM.$summary.textContent = `Tong so ho co so chu dien nho hon 100: ${listFilter.length}`
    },

    add: function (name, start, end) {
        const bill = new Bill(++this.auto_increasement_id, name, start, end)
        this.bills.push(bill)
        this.setStorage()
        this.show()
    },
    submit: function () {
        const name = this.DOM.$name.value
        const start = this.DOM.$start.value
        const end = this.DOM.$end.value
        let isValid = true
        if (name != '' && name.length <= 50) {
            this.DOM.$name.nextElementSibling.textContent = ''
        } else {
            isValid = false
            this.DOM.$name.nextElementSibling.textContent = 'Invalid'

        }

        if (start != '' && !isNaN(start) && parseInt(start) > 0) {
            this.DOM.$start.nextElementSibling.textContent = ''

        } else {
            isValid = false
            this.DOM.$start.nextElementSibling.textContent = 'Invalid'
        }
        if (end != '' && !isNaN(end) && parseInt(end) > 0 && parseInt(end) > parseInt(start)) {
            this.DOM.$end.nextElementSibling.textContent = ''

        } else {
            isValid = false
            this.DOM.$end.nextElementSibling.textContent = 'Invalid'
        }

        if (isValid) {
            this.add(name, start, end)
        }
    },
    init: function () {
        this.getStorage()
        this.DOM.$form.onsubmit = function (e) {
            e.preventDefault()
            managerBillsElectric.submit()
        }
    }
}

managerBillsElectric.init()
// const bill = new Bill(1, 'name', 1, 2)
// alert(bill.formatNumber(1234567))
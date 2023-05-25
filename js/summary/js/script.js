'use strict'
const common = {
    $: id => (document.getElementById(id)),
    $row: ($items) => {
        const $tr = document.createElement('tr')
        $items.forEach($i => {
            $tr.appendChild($i)
        });
        return $tr
    },
    $cell: contents => {
        const $td = document.createElement('td')
        if(typeof contents == 'string' || typeof contents == 'number') {
            $td.innerHTML = contents
        } else if(Array.isArray(contents)) {
            contents.forEach($c => {
                $td.appendChild($c)
            })
        } else if(typeof contents == 'object') {
            $td.appendChild(contents)
        }
        return $td   
    },
    $btn: (text, classes, handleEvent, type = 'button') => {
        const $b = document.createElement('button')
        $b.className = classes
        $b.innerHTML = text
        $b.setAttribute('type', type)
        $b.addEventListener('click', handleEvent)
        return $b
    },
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

}

class Bill {
    constructor(id, name,start, end) {
        this.id = id
        this.name = name
        this.start = parseInt(start)
        this.end = parseInt(end)
        
    }
    total() {
        return this.end - this.start
    }

    update(name, start, end) {
        this.name = name
        this.start = parseInt(start)
        this.end = parseInt(end)
    }

    amount() {
        const total = this.total()

        if(total > 100) {
            return (total - 100)* 2000 + 50*1500 + 50*1000 
        }
        if(total >50) {
            return (total - 50)*1500 + 50 *1000
        } 
        return total* 1000
    }

    search(search) {
        const s = search.toLowerCase()
        if(this.id.toString().indexOf(s) >= 0) return true
        if(this.name.toLowerCase().indexOf(s) >= 0) return true
        if(common.formatNumber(this.start).indexOf(s) >= 0) return true
        if(common.formatNumber(this.end).indexOf(s) >= 0) return true
        if(common.formatNumber(this.total()).indexOf(s) >= 0) return true
        if(common.formatNumber(this.amount()).indexOf(s) >= 0) return true

        return false
    }

    initRow(handleEdit, handleDelete) {
        const $id = common.$cell(this.id)
        const $name = common.$cell(this.name)
        const $start = common.$cell(common.formatNumber(this.start))
        const $end = common.$cell(common.formatNumber(this.end))
        const $total = common.$cell(common.formatNumber(this.total()))
        const $amount = common.$cell(common.formatNumber(this.amount()))

        const $edit = common.$btn('Edit', 'btn btn-outline-info', handleEdit.bind(this, this.id))
        const $dlte = common.$btn('Delete', 'btn btn-outline-danger ms-2', handleDelete.bind(this, this.id))
        const $action = common.$cell([$edit, $dlte])
        
        return common.$row([$id, $name, $start, $end, $total, $amount, $action])
    }

}

const managerElectricBills = {
    auto_increasement_id: 0,
    bills: [],
    DOM: {
        $form: common.$('form'),
        $name: common.$('fullname'),
        $start: common.$('start'),
        $end: common.$('end'),
        $app: common.$('app'),
        $submit: common.$('submit'),
        $search: common.$('search'),
        $sort: common.$('sort'),
        $summary: common.$('summary')
    },
    setStorage: function() {
        localStorage.setItem('bills', JSON.stringify(this.bills))
    },
    getStorage : function() {
        const bills = JSON.parse(localStorage.getItem('bills')) || []
        this.bills = bills.map(b => new Bill(b.id, b.name, b.start, b.end))
        const ids = this.bills.map(b => b.id)
        this.auto_increasement_id = Math.max(...ids, this.auto_increasement_id)
    },

    show: function(list = this.bills) {
        this.DOM.$app.innerHTML = list.length === 0 ? `<tr><td colspan="7" class="text-center">No Item</td></tr>` : ''
        list.forEach(b => {
            this.DOM.$app.appendChild(b.initRow(this.edit.bind(this), this.delete.bind(this)))
        })

        const bs = list.filter(b => b.amount() > 1000000)

        this.DOM.$summary.innerHTML = `numbers family with amount > 1,000,000: ${bs.length}`
    },
    edit: function(id) {
        const bill = this.bills.find(b => b.id === id)
        if(bill) {
            this.DOM.$name.value = bill.name
            this.DOM.$start.value = bill.start
            this.DOM.$end.value = bill.end

            this.DOM.$form.update = true
            this.DOM.$form.id = id

            this.DOM.$submit.textContent = 'Update'
            if(this.DOM.$submit.nextElementSibling == null) {
                const $cancel = common.$btn('Cancel', 'btn btn-outline-secondary ms-2', this.cancel.bind(this))
                this.DOM.$submit.parentNode.appendChild($cancel)
            }
            
        }
    },
    cancel: function() {
        this.DOM.$form.reset()
        this.DOM.$submit.textContent = 'Submit'
        this.DOM.$form.update = false
        if(this.DOM.$submit.nextElementSibling) {
            this.DOM.$submit.nextElementSibling.remove()
        }
    },
    delete: function(id) {
        const index = this.bills.findIndex(b => b.id === id)
        if(index >=0) {
            this.bills.splice(index, 1)
            this.show()
            this.setStorage()
        }
    },
    validate: function() {
        const name = this.DOM.$name.value
        const start = this.DOM.$start.value
        const end = this.DOM.$end.value

        let isValid = true
        if(name == '' || name.length >50) {
            isValid = false
            this.DOM.$name.nextElementSibling.textContent = 'Invalid'
        } else {
            this.DOM.$name.nextElementSibling.textContent = ''
        }

        if(!isNaN(start) && start != '' && start > 0) {
            this.DOM.$start.nextElementSibling.textContent = ''
        } else {
            isValid = false
            this.DOM.$start.nextElementSibling.textContent = 'Invalid'

        }
        if(!isNaN(end) && end != '' && end > 0 && parseInt(end) > parseInt(start)) {
            this.DOM.$end.nextElementSibling.textContent = ''
        } else {
            isValid = false
            this.DOM.$end.nextElementSibling.textContent = 'Invalid'

        }

        return isValid
    },
    
    submit: function() {
        if(this.validate()) {
            if(this.DOM.$form.update) {
                const id = this.DOM.$form.id
                const bill = this.bills.find(b => b.id === parseInt(id))
                bill.update(this.DOM.$name.value, this.DOM.$start.value, this.DOM.$end.value)
            } else {
                const bill = new Bill(++this.auto_increasement_id, this.DOM.$name.value, this.DOM.$start.value, this.DOM.$end.value)
                this.bills.push(bill)
            }
            

            this.cancel()
            this.show()
            this.setStorage()
        }
    },
    search: function() {
        const s = this.DOM.$search.value
        const list = this.bills.filter(b => b.search(s))
        this.show(list)
    },
    sort() {
        const inc = this.DOM.$sort.inc || 1
        const list = this.bills.sort((a,b) => inc*(a.total() - b.total()))
        this.show(list)
        this.DOM.$sort.inc = -1*inc
    },
    init: function() {
        this.getStorage()
        this.show()
        // this.cancel()
        this.DOM.$form.addEventListener('submit', function(e) {
            e.preventDefault()
            this.submit()
        }.bind(this))

        this.DOM.$search.addEventListener('keyup', this.search.bind(this))

        this.DOM.$sort.addEventListener('click', this.sort.bind(this))
    }


}
managerElectricBills.init()
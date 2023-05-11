'use strict';
const $= id => (document.getElementById(id))

const localProduct = JSON.parse(localStorage.getItem('products')) ?? []

const products = localProduct.map(p => new Product(p.id, p.name, p.price))

const localBills = JSON.parse(localStorage.getItem('bills')) ?? []
const bills = localBills.map(b => new Bill(b.id, b.items, new Date(b.created_at)))
const initSelectBills = () => {
    let html = `<option value="">New Bill</option>`
    bills.forEach(b => {
        html += `<option value="${b.id}">${b.id}</option>`
    })
    $('bill_id').innerHTML = html

}
const initSelectProduct = () => {
    let html = ''
    products.forEach(p => {
        html += `<option value="${p.id}">${p.name}</option>`
    })
    $('select_product').innerHTML = html
}

const showProducts = (list = products) => {
    $('products').innerHTML = ''
    list.forEach(p => {
        $('products').appendChild(p.initRow())
    });
    initSelectProduct()
}


$('form_product').onsubmit = function(e) {
    e.preventDefault()
    const product_name = $('product_name').value
    let isValid = true
    if(product_name == '') {
        isValid = false
        $('product_name').nextElementSibling.textContent = 'invalid'
    } else {
        $('product_name').nextElementSibling.textContent = ''
    }

    const product_price = $('product_price').value
    if(isNaN(product_price) || product_price < 0  || product_price == '') {
        isValid = false
        $('product_price').nextElementSibling.textContent = 'invalid'
    } else {
        $('product_price').nextElementSibling.textContent = ''   
    }
    if(isValid) {
        const ids = products.map(p => p.id)
        const newId = ids.length == 0 ? 0 : Math.max(...ids)
        const product = new Product(newId+1, product_name, parseFloat(product_price))
        products.push(product)
        localStorage.setItem('products', JSON.stringify(products))
        showProducts()
    }

}
const showBills = (list = bills) => {
    $('bills').innerHTML = ''
    list.forEach(b => {
        $('bills').appendChild(b.initRow(products))
    })
}
$('form_bill').onsubmit = function(e) {
    e.preventDefault()
    const id = $('bill_id').value
    const product_id = $('select_product').value
    const quantity = $('quantity').value

    let isValid = true

    if(isNaN(quantity) || quantity == '' ) {
        isValid = false
        $('quantity').nextElementSibling.textContent = 'invalid'
    } else if(parseFloat(quantity) % 1 != 0 || quantity < 0) {
        isValid = false
        $('quantity').nextElementSibling.textContent = 'invalid'

    } else {
        $('quantity').nextElementSibling.textContent = ''
    }
    if(isValid) {
        if(id == '') {
            const ids = bills.map(b => b.id)
            const newId = ids.length == 0 ? 0 : Math.max(...ids)
            const bill = new Bill(newId+1, [{product_id: parseInt(product_id), quantity: parseInt(quantity)}])
            bills.push(bill)
            initSelectBills()
        } else {
            const bill = bills.find(b => b.id === parseInt(id))
            if(bill != null) {
                const existProduct = bill.items.find(i=>i.product_id === parseInt(product_id))
                if(existProduct != null ) {
                    existProduct.quantity += parseInt(quantity)
                } else {
                    bill.addItem(parseInt(product_id), parseInt(quantity))
                }
    
    
            } else {
                alert('bill not exist')
            }
        }
        showBills()

        localStorage.setItem('bills', JSON.stringify(bills))

    }
    
}

showProducts()

showBills()
initSelectBills()
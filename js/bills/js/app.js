'use strict';
const $= id => (document.getElementById(id))

const localProduct = JSON.parse(localStorage.getItem('products')) ?? []

const products = localProduct.map(p => new Product(p.id, p.name, p.price))

const localBills = JSON.parse(localStorage.getItem('bills')) ?? []
const bills = localBills.map(b => new Bill(b.id, b.items, new Date(b.created_at)))

const showProducts = (list = products) => {
    $('products').innerHTML = ''
    list.forEach(p => {
        $('products').appendChild(p.initRow())
    });
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
        const newId = Math.max(...ids)
        const product = new Product(newId, product_name, parseFloat(product_price))
        products.push(product)
        showProducts()
    }

}

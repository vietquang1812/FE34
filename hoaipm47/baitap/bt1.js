'use strict'
const $ = id => (document.getElementById(id));

let arr_product = [];
let arr_order = [];

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

//check validate
const check_product = () => {
    let isValid = true;
    
    const name = $('product').value;
    if(name == '') {
        isValid = false;
        $('product').nextElementSibling.innerHTML = 'Vui lòng nhập tên sản phẩm';
    } else {
        $('product').nextElementSibling.innerHTML = '';
    }
    const price = $('price').value;
    if(price == '') {
        isValid = false;
        $('price').nextElementSibling.innerHTML = 'Vui lòng nhập giá sản phẩm';
    } else if (isNaN(price) && price < 0) {
        isValid = false;
        $('price').nextElementSibling.innerHTML = 'Vui lòng nhập giá sản phẩm là một số tự nhiên';   
    }else {
        $('price').nextElementSibling.innerHTML = '';   
    }
    return isValid
}

const check_order = () => {
    let isValid = true;
    
    const name = $('order-product').value;
    if(name == '') {
        isValid = false;
        $('order-product').nextElementSibling.innerHTML = 'Vui lòng chọn sản phẩm';
    } else {
        $('order-product').nextElementSibling.innerHTML = '';
    }
    const quanlity = $('number').value;
    if(quanlity == '') {
        isValid = false;
        $('number').nextElementSibling.innerHTML = 'Vui lòng chọn số lượng sản phẩm';
    }else {
        $('number').nextElementSibling.innerHTML = '';   
    }
    return isValid
}

// lưu product đã thêm vào mảng arr_product
const add_product= () => {
    const name = $('product').value
    const price = $('price').value
    const id = arr_product.length + 1;
    arr_product.push({
        id,
        name,
        price
    })
    localStorage.setItem('product', JSON.stringify(arr_product))
}

// lưu order đã thêm vào mảng arr_order
const add_order= () => {
    const product_id = $('order-product').value
    const quanlity = $('number').value
    const id = arr_order.length + 1;
    let name = '';
    let total = '';
    let price = '';
    const date = new Date();
    if (arr_product.length > 0){
        arr_product.forEach((item,index)=>{
            if (item.id == product_id) {
                name = item.name;
                price = item.price;
                total = price * quanlity;
            }
        })
    }
    arr_order.push({
        id,
        name,
        quanlity,
        total,
        price,
        date,
    })
    localStorage.setItem('order', JSON.stringify(arr_order))
}


// hiển thị các product ra bảng Product
const show_product = (list = arr_product) => {
    $('product-tasks').innerHTML = list.length === 0 ? '<tr><td colspan="3" class="text-center">No product</td></tr>' :''

    list.forEach((item, index) => {
        const $id = $td(item.id);
        const $name = $td(item.name);
        const $price = $td(item.price);
        const $row = $tr([$id, $name, $price]);
        $('product-tasks').appendChild($row);
    })
}

// hiển thị các order ra bảng Bill
const show_order = (list = arr_order) => {
    $('order-tasks').innerHTML = list.length === 0 ? '<tr><td colspan="6" class="text-center">No bill</td></tr>' :''

    list.forEach((item, index) => {
        const $id = $td(item.id);
        const $name = $td(item.name);
        const $price = $td(item.price);
        const $quanlity = $td(item.quanlity);
        const $total = $td(item.total);
        const $date = $td(item.date);

        const $row = $tr([$id, $name, $price, $quanlity, $total,$date]);
        $('order-tasks').appendChild($row);
    })
}

// hiển thị các product vào select Order
const product_option = () => {
    $('order-product').innerHTML = '<option disabled selected hidden value="">-----Vui lòng chọn sản phẩm-----</option>';
    arr_product.forEach((item,index) => {
        let opt = document.createElement('option');
        opt.value = item.id;
        opt.innerText = item.name;           
        $('order-product').appendChild(opt);
    })
}

//khi click vào nút submit của phần Product thì...
$('btn-product').onclick = function() {
    if(check_product()) {
        add_product();
        show_product();
        product_option();
        $('form-product').reset();
    }
}

$('btn-order').onclick = function() {
    if(check_order()) {
        add_order();
        show_order();
    }
}


//lấy dữ liệu được lưu trong local storage
const getLocalData = () => {
    arr_product = JSON.parse(localStorage.getItem('product')) || [];
    show_product();
    product_option();
}
getLocalData()
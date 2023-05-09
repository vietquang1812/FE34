'use strict';
const $ = (id) => { return document.getElementById(id) }
const $btninbound = $('inbound')
const $btnoutbound = $('outbound')

$btninbound.action = 'add'
const $code = $('code')
const $name = $('name')
const $qty = $('qty')
const app = $('app')

const stores = []

class Material {
    constructor(code, name, qty, ob) {
        this.code = code;
        this.name = name;
        this.qty = qty
        this.outbound = ob

    }
    InitRow(index) {
        const $row = document.createElement('tr')
        const $td = (text) => {
            const $element = document.createElement('td')
            $element.textContent = text
            return $element
        }
        const btndelete = (index) => {
            const $delete = document.createElement('button')
            $delete.id = 'delete'
            $delete.type = 'button'
            $delete.className = "btn btn-danger bg-danger"
            $delete.textContent = 'Delete'
            $delete.onclick = function () {
                stores.splice(index, 1)
                showInbound()
            }
            return $delete
        }
        const btnedit = (index) => {
            const $edit = document.createElement('button')
            $edit.id = 'edit'
            $edit.type = 'button'
            $edit.className = 'btn btn-success bg-sucess'
            $edit.textContent = 'Edit'
            $edit.onclick = () => {
                $code.value = this.code
                $name.value = this.name
                $qty.value = this.qty
                $btninbound.EditIndex = index
                $btninbound.action = 'Edit'
                $btninbound.textContent = 'Update'
                $btnoutbound.style.visibility = 'hidden'
                const isCancel = document.getElementById('cancel')
                if (isCancel == null) {
                    const $cancel = document.createElement('button')
                    $cancel.id = 'cancel'
                    $cancel.type = 'button'
                    $cancel.className = 'btn btn-secondary bg-dark'
                    $cancel.textContent = 'Cancel'
                    $btninbound.parentNode.appendChild($cancel)
                    $cancel.onclick = () => {
                        $code.value = ""
                        $name.value = ""
                        $qty.value = ""
                        $btninbound.textContent = 'Inbound'
                        $btnoutbound.style.visibility = 'visible'
                        $cancel.remove()
                    }
                }
            }
            return $edit
        }
        const action = $td()
        $row.appendChild($td(index + 1))
        $row.appendChild($td(this.code))
        $row.appendChild($td(this.name))
        $row.appendChild($td(this.qty))
        $row.appendChild($td(this.outbound))
        action.appendChild(btnedit(index))
        action.appendChild(btndelete(index))
        $row.appendChild(action)
        return $row
    }

}

const showInbound = (list = stores) => {
    app.innerHTML = list.length === 0 ? ` <tr><td colspan="6" class="text-center">No Items</td></tr>` : ""

    list.forEach((eq, index) => {
        const $rows = eq.InitRow(index)
        app.appendChild($rows)
    })
}
const addMaterial = function () {
    const eq = new Material($code.value, $name.value, $qty.value, 0)
    if (stores.length == 0) {

        stores.push(eq)
    } else {
        const index = stores.findIndex($e => $e.code == $code.value)
        if (index >= 0) {
            if (stores[index].name == $name.value) {

                stores[index].qty = parseInt(stores[index].qty) + parseInt($qty.value)
            } else { alert('materials name not same exit name') }
        } else stores.push(eq)
    }
    localStorage.setItem(stores, JSON.stringify('stores'))
}
const outbound = () => {
    const index = stores.findIndex($e => $e.code == $code.value)

    const oldQty = parseFloat(stores[index].qty)

    if (oldQty == 0) {
        alert('Empty in stock')
    }
    else if (index >= 0) {
        if (parseFloat($qty.value) > oldQty) { alert('Outbound Qty over stock') }
        else {
            let currentob = parseInt(stores[index].outbound)
            stores[index].outbound = currentob + parseInt($qty.value)
            stores[index].qty = oldQty - parseInt($qty.value)
        }
    } else { alert('Outbound quantity not correct') }
}


const checkValidate = () => {
    let isValid = true
    const Mcode = $code.value

    if (Mcode != "" && Mcode.length < 50) {
        if (Mcode.substr(0, 2) === 'BE' || Mcode.substr(0, 2) === "FE") {

            $code.nextElementSibling.textContent = ""
        } else {
            isValid = false
            $code.nextElementSibling.textContent = "materials code must start as BE or FE"
        }
    } else {
        isValid = false
        $code.nextElementSibling.textContent = "Error"
    }
    const Mname = $name.value
    if (Mname != "" && Mname.length < 50) {
        $name.nextElementSibling.textContent = ""
    } else {
        isValid = false
        $name.nextElementSibling.textContent = "Error"
    }
    const Mqty =parseFloat($qty.value)

    if (!isNaN(Mqty) && Mqty != "" && Mqty > 0&&Mqty%1==0) {

        $qty.nextElementSibling.textContent = ""
    } else {
        isValid = false
        $qty.nextElementSibling.textContent = "Error"
    }
    return isValid
}
$btninbound.onclick = function () {
    if (checkValidate()) {
        if ($btninbound.action == 'add') {
            addMaterial()
        } else {
            $btnoutbound.style.visibility = 'visible'
            const index = $btninbound.EditIndex
            if (!isNaN(index) && index >= 0 && index < stores.length) {
                stores[index].code = $code.value
                stores[index].name = $name.value
                stores[index].qty = $qty.value
                $btninbound.action = 'add'
                $btninbound.textContent = 'Inbound'
            }
            const isCancel = document.getElementById('cancel')
            if (isCancel != null) {
                $code.value = ""
                $name.value = ""
                $qty.value = ""
                $btninbound.action = 'add'
                $btninbound.textContent = 'Inbound'
                isCancel.remove()
            }
        }
        showInbound()
    }
}

$btnoutbound.onclick = () => {
    if (checkValidate()) {
        outbound()
        showInbound()
    }
}


const localData = JSON.parse(localStorage.getItem('stores')) || []
localData.forEach(ls => {
    if (localStorage.length > 0) {
        const wh = new Material(ls.code, ls.name, ls.qty, ls.outbound)
        stores.push(wh)
    }
})


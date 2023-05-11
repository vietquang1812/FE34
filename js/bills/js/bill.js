class Bill {
    constructor(id, items = [], created_at = new Date()) {
        this.id = id
        this.items = items
        this.created_at = created_at
    }

    addItem(product_id, quantity) {
        this.items.push({
            product_id, quantity
        })
    }

    amount(products=[]) {
        let sum = 0
        this.items.forEach(item => {
            const product = products.find(p => item.product_id === p.id)
            if(product != null) {
                sum += item.quantity * p.price
            }
        })

        return sum
    }

    initRow(products = []) {
        const $row = document.createElement('tr')

        const $td = content => {
            const $ele = document.createElement('td')
            $ele.innerHTML = content
            // if(typeof content === 'object') {
            //     $ele.appendChild(content)
            // } else {
            //     $ele.textContent = content
            // }
            
            return $ele
        }

        const tableProduct = () => {
            let table =  `<table class="table"><thead>
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Qty</th>
                </tr>
            </thead><tbody>`

            this.items.forEach((item, index) => {
                const product = products.find(p => p.id === item.product_id)
                if(product != null) {
                    table += `<tr>
                        <td>${index+1}</td>
                        <td>${product.name}</td>
                        <td>${item.quantity}</td>
                    </tr>`
                }
            })
            table += '</tbody>'

            return table
        }

        const $id = $td(this.id)
        const $products = $td(tableProduct())
        const $amount = $td(this.amount(products))
        const $created = $td(this.created_at.toString())
        $row.appendChild($id)
        $row.appendChild($products)
        $row.appendChild($amount)
        $row.appendChild($created)
        return $row
    }
    
}
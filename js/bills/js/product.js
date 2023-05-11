class Product {
    constructor(id, name, price) {
        this.id = id
        this.name = name
        this.price = price
    }

    initRow() {
        const $row = document.createElement('tr')
        
        const $td = text => {
            const $ele = document.createElement('td')
            $ele.textContent = text
            return $ele
        }
        const $id = $td(this.id)
        const $name = $td(this.name)
        const $price = $td(this.name)
        $row.appendChild($id)
        $row.appendChild($name)
        $row.appendChild($price)
        return $row
    }
}
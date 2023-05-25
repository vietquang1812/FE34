const common = {
    $: id => (document.getElementById(id)),
    $row: function($items) {
        const $tr = document.createElement('tr')
        $items.forEach($item => {
            $tr.appendChild($item)
        })
        return $tr
    },
    $cell: function(content) {
        const $td = document.createElement('td')
        if(!Array.isArray(content)){
            if(typeof content === 'object') {
                $td.appendChild(content)
            } else {
                $td.textContent = content
            }
        } else {
            content.forEach($item => {
                $td.appendChild($item)
            })
        }
        return $td
    },
    $titles: function(heads) {
        const $thead = document.createElement('thead')
        $thead.className = 'table-dark'
        const $ts = heads.map(h => this.$cell(h))
        const $row = this.$row($ts)
        $thead.appendChild($row)
        return $thead
    },
    $list: function($thead, $rows) {
        const $tb = document.createElement('table')
        $tb.className = 'table table-striped'
        const $tbody = document.createElement('tbody')
        $rows.forEach($row => {
            $tbody.appendChild($row)
        })
        $tb.appendChild($thead)
        $tb.appendChild($tbody)
        return $tb
    }, 

    $btn: function(text, classes, handle) {
        const $ele = document.createElement('button')
        $ele.setAttribute('type', 'button')
        $ele.textContent = text
        $ele.className = classes
        $ele.addEventListener('click', handle)

        return $ele
    }
}
export default common
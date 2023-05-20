'use strict';
const $ = id => (document.getElementById(id))
const common = {
    $row: function($items) {
        const $tr = document.createElement('tr')
        $items.forEach($item => {
            $tr.appendChild($item)
        })
        return $tr
    },
    $cell: function(content) {
        const $td = document.createElement('td')
        if(typeof content === 'object') {
            $td.appendChild(content)
        } else {
            $td.textContent = content
        }
        return $td
    },
    $titles: function(heads) {
        const $thead = document.createElement('thead')
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
    }
}
const managerApartment = {
    DOM : {
        $room : $('room'),
        $roomNumber: $('room_number'),
        $fullname: $('fullname'),
        $relationship: $('relationship'),
        $bod: $('bod'),
        $job: $('job'),
        $form: $('form'),
        $submit: $('submit'),
        $app: $('app'),
    },
    auto_increase_person_id: 0,
    auto_increase_family_id: 0,
    families: [],
    Person: function(id, fullname, relationship, bod, job) {
        this.id = id
        this.fullname = fullname
        this.relationship = relationship
        this.bod = bod
        this.job = job
    },
    show: function(list = this.families) {
        this.DOM.$app.innerHTML = list.length === 0 ? '<td class="text-center" colspan="5">No Family</td>' : ''
        list.forEach(f => {
            this.DOM.$app.appendChild(f.innitRow())
        });
    },
    Family: function(id, room, persons=[]) {
        this.id = id
        this.room_number = room
        this.persons = [...persons]
    },
    storage: function() {
        const load = () => {
            const fms = JSON.parse(localStorage.getItem('families')) || []
            this.families = fms.map(f => {
                this.auto_increase_person_id = Math.max(...f.persons.map(p => p.id), this.auto_increase_person_id)
                const persons = f.persons.map(p => new this.Person(p.id, p.fullname, p.relationship, p.bod, p.job))
                return new this.Family(f.id, f.room_number, persons)
            })
            this.auto_increase_family_id = Math.max(...fms.map(f=>f.id), this.auto_increase_family_id)
        }
        const save = () => {
            localStorage.setItem('families', JSON.stringify(this.families))
        }

        return {load, save}
    },
    validate: function() {
        const isValid = true

        return isValid
    },
    events: function() {
        const submit = () =>{
            if(this.validate()) {
                const id = this.DOM.$room.value
                const room = this.DOM.$roomNumber.value
                if(id == '') {
                    this.families.push(new this.Family(++this.auto_increase_family_id, room, ))
                }
            }
        }

        return {submit}
    },
    init: function() {
        this.storage().load()
        this.show()
        this.events().submit()
    }
}

managerApartment.Person.prototype.row = function() {
    const $id = common.$cell(this.id)
    const $fullname = common.$cell(this.full$fullname)
    const $relationship = common.$cell(this.re$relationship)
    const $bod = common.$cell(this.bod)
    const $job = common.$cell(this.job)

    const $row = common.$row([$id, $fullname, $relationship, $bod, $job])
    return $row
}
managerApartment.Family.prototype.row = function() {
    const $id = common.$cell(this.id)
    const $room = common.$cell(this.room_number)
    const $length = common.$cell(this.persons.length)
    const $theads = common.$titles(['ID', 'Name', 'Rel', 'BoD', 'Job', 'Action'])
    const $persons = this.persons.map(p => p.row())
    const $details = common.$cell(common.$list($theads, $persons))

    return common.$row([$id, $room, $length, $details])
}
managerApartment.init()

// var xhttp = new XMLHttpRequest();
// xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//        // Typical action to be performed when the document is ready:
//        document.getElementById("demo").innerHTML = xhttp.responseText;
//     }
// };
// xhttp.open("GET", "filename", true);
// xhttp.send();
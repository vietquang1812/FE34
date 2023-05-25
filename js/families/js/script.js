'use strict';
import common from "./common.js";
import Family from "./family.js";

const managerApartment = {
    DOM : {
        $room : common.$('room'),
        $roomNumber: common.$('room_number'),
        $fullname: common.$('fullname'),
        $relationship: common.$('relationship'),
        $bod: common.$('bod'),
        $job: common.$('job'),
        $form: common.$('form'),
        $submit: common.$('submit'),
        $app: common.$('app'),
    },
    auto_increase_person_id: 0,
    auto_increase_family_id: 0,
    families: [],
    show: function(list = this.families) {
        this.DOM.$app.innerHTML = list.length === 0 ? '<td class="text-center" colspan="5">No Family</td>' : ''
        list.forEach(f => {
            this.DOM.$app.appendChild(f.row(this.handles.edit.bind(this), this.handles.delete))
        });
    },
    storage: function() {
        const load = () => {
            const fms = JSON.parse(localStorage.getItem('families')) || []
            this.families = fms.map(f => {
                this.auto_increase_person_id = Math.max(...f.persons.map(p => p.id), this.auto_increase_person_id)
                
                return new Family(f.id, f.room_number, f.persons)
            })
            this.auto_increase_family_id = Math.max(...fms.map(f=>f.id), this.auto_increase_family_id)
            this.show()
            this.events().selectId('')
        }
        const save = () => {
            localStorage.setItem('families', JSON.stringify(this.families))
            this.show()
        }

        return {load, save}
    },
    validate: function() {
        const isValid = true

        return isValid
    },
    handles: {
        edit: function(id, isPerson = false)  {
            this.DOM.$form.id = id
            this.DOM.$form.isPerson = isPerson
            this.DOM.$form.edit = true
            let family, person
            if(isPerson) {
                family = this.families.find(f => f.persons.findIndex(p => p.id === id) >=0)
                person = family.persons.find(p => p.id === id)
            } else {
                family = this.families.find(f => f.id === id)
                person = family.persons[0]
            }

            this.DOM.$room.value = family.id
            // this.DOM.$room.setAttribute('readonly', true)
            this.DOM.$roomNumber.value = family.room_number
            this.DOM.$fullname.value = person.fullname
            this.DOM.$relationship.value = person.relationship
            this.DOM.$bod.value = person.bod
            this.DOM.$job.value = person.job
            if(isPerson) {
                this.DOM.$room.setAttribute('disabled', true)
                this.DOM.$roomNumber.style.display = 'none'
            }

        },
        delete: function(id, isPerson = false) {

        }, 
        reset: function() {
            this.DOM.$form.reset()
            this.DOM.$room.removeAttribute('disabled')
        }
    },
    events: function() {
        const selectId = id => {
            let html = '<option value="">New</option>'
            this.families.forEach(f=> {
                html += `<option value="${f.id}">${f.room_number}</option>`
            })
            this.DOM.$room.innerHTML = html
            this.DOM.$room.value = id

        }
        const submit = () =>{
            if(this.validate()) {
                const id = this.DOM.$room.value
                const room = this.DOM.$roomNumber.value
                const fullname = this.DOM.$fullname.value
                const relationship = this.DOM.$relationship.value
                const bod = this.DOM.$bod.value
                const job = this.DOM.$job.value
                if(this.DOM.$form.edit) {
                    const family = this.families.find(f=> f.id === parseInt(id))
                    if(this.DOM.$form.isPerson) {
                        family.update_person(id, fullname,relationship, bod, job)
                    }
                } else {
                    
                    if(id == '') {
                        const family = new Family(++this.auto_increase_family_id, room, [])
                        family.add_person(++this.auto_increase_person_id, fullname, relationship, bod, job)
                        this.families.push(family)
                        selectId(family.id)
                    } else {
                        const family = this.families.find(f=> f.id === parseInt(id))
                        family.add_person(++this.auto_increase_person_id, fullname, relationship, bod, job)
                    }

                }
                this.handles.reset.call(this)

                this.storage().save()
            }
        }

        const changeId = () => {
            const val = this.DOM.$room.value
            if(val === '') {
                this.DOM.$roomNumber.style.display = 'block'
            } else {
                this.DOM.$roomNumber.style.display = 'none'
            }
        }

        return {submit, changeId, selectId}
    },
    init: function() {
        this.storage().load()
        this.DOM.$form.addEventListener('submit', (e) => {
            e.preventDefault()
            this.events().submit()
        } )

        this.DOM.$room.addEventListener('change', this.events().changeId)


    }
}

managerApartment.init()

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       console.log(JSON.parse(xhttp.responseText))
    //    document.getElementById("demo").innerHTML = xhttp.responseText;
    }
};
xhttp.open("GET", "https://dummyjson.com/products", true);
xhttp.send();
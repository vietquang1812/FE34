
import common from "./common.js"
import Person from "./person.js"
class Family {
    constructor(id, room, persons=[]) {
        this.id = id
        this.room_number = room
        this.persons = persons.map(p => new Person(p.id, p.fullname, p.relationship, p.bod, p.job))
    }

    add_person(id, fullname, relationship, bod, job) {
        this.persons.push(new Person(id, fullname, relationship, bod, job))
    }

    update_person(id, fullname, relationship, bod, job) {
        const person = this.persons.find(p => p.id === parseInt(id))
        if(person != null) {
            person.fullname = fullname
            person.relationship = relationship
            person.bod = bod
            person.job = job
        }
    }
    delete_person(id) {
        const index = this.persons.findIndex(p => p.id === parseInt(id))
        if(index >= 0) {
            this.persons.splice(index, 1)
        }
    }

    row = function(handleEdit, handleDelete) {
        const $id = common.$cell(this.id)
        const $room = common.$cell(this.room_number)
        const $length = common.$cell(this.persons.length)
        const $theads = common.$titles(['ID', 'Name', 'Rel', 'BoD', 'Job', 'Action'])
        const $persons = this.persons.map(p => p.row(handleEdit.bind(this), handleDelete))
        const $details = common.$cell(common.$list($theads, $persons))
        
        return common.$row([$id, $room, $length, $details])
    }
}

export default Family
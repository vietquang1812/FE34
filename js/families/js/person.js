import common from "./common.js"
class Person {
    constructor(id, fullname, relationship, bod, job) {
        this.id = id
        this.fullname = fullname
        this.relationship = relationship
        this.bod = bod
        this.job = job
    }
    row = function(handleEventEdit,handleEventDelete) {
        const $id = common.$cell(this.id)
        const $fullname = common.$cell(this.fullname)
        const $relationship = common.$cell(this.relationship)
        const $bod = common.$cell(this.bod)
        const $job = common.$cell(this.job)
        const $edit = common.$btn('Edit', 'btn btn-outline-info', handleEventEdit.bind(this,this.id, true))
        const $delete = common.$btn('Dlte', 'btn btn-outline-danger ms-2', handleEventDelete.bind(this, this.id, true))
        const $action = common.$cell([$edit, $delete])
        const $row = common.$row([$id, $fullname, $relationship, $bod, $job, $action])
        return $row
    }
}

export default Person
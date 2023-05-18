'use strict'
import library from "./library.js"
console.log(library)
const $ = id =>(document.getElementById(id))


const common = {
    initRow: function(items) {
        const $tr = document.createElement('tr')
        items.forEach(element => {
            $tr.appendChild(element)
        }); 
        return $tr
    },
    initCell: function(text) {
        const $td = document.createElement('td')
        $td.textContent = text
        return $td
    }
}
const managerStudent  = {
    Student: function(name, math) {
        this.name = name
        this.math = math
    },
    addStudent: function() {
        const student = new this.Student('name', 10)

    },
    storage: {
        set: function() {

        },
        get: function() {

        }
    },
    events: {
        formSubmit: function() {
    
        },
        btnClick: function() {
            
        },
        searchChange: function() {
            let abc = 123
            const func = function() {
                abc
            }
        }
    
    }
}
let a = 'asdasdasd'
const myModule = (function(text) {
    
})(a)

// $('form').addEventListener('submit', events.formSubmit)
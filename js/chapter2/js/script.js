var student = {
    fistName: 'Nguyen Van',
    lastName: 'A',
    html5css3: 8,
    javascript: 8,
    reactjs: 7,
    project: 9,
}
student.fullname = function() {
    return this.fistName + ' ' + this.lastName
}
// var student2 = {...student};
// student2.fullname = 'Tran Van B'

let fullname = 'N V A'
const FULLNAME2 = fullname;
var html = `<div class="row">
<div class="col-sm-4 bg-success">${student.fullname()}</div>
</div>`
document.getElementById('app').innerHTML = fullname

// function getName() {
//     var fullname = 'Nguyen B';
//     console.log(fullname)
// }
// alert('Hello World')
var number = prompt('Please enter a Number: ',);
number = parseInt(number)
console.log(number)
if(isNaN(number)) {
    alert('this is not a number')
} else {
    alert(number)
}

// var isLarge = confirm('are u confirm it?')
// console.log(isLarge)
// var number = 123;
// var number = new Number(123);
// console.log(location)
// console.log(student.fullname)

// document.getElementById('app').innerHTML = student.fullname
// document.getElementById('app').innerHTML = student['fullname']

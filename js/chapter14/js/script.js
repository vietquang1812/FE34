'use strict'
const $ = id => (document.getElementById(id))

setTimeout(function() {

}, 1000)
const list = []
list.filter(item => item.status)
function countNumber(id, btn) {
    const $app = document.getElementById(id)
    let count = 0
    let step = 1
    $app.innerHTML = count
    document.getElementById(btn).addEventListener('click', function() {
        count += step
        $app.innerHTML = count
    })
    const changeCount = (number = 0) => {
        count = number
    }
    const changeStep = (st = 1) => {
        step = st
    }
    return {changeCount, changeStep}
}


// const funcCount = countNumber('app', 'add')
// funcCount.changeCount(20)
// funcCount.changeStep(10)

function test(callback) {
    if(typeof callback == 'function') {
        callback('app', 'add')
    }
}

test(countNumber)
// window.onload = function() {

// }

// const n = 10

function gt(n) {
    if(n === 0 ) return 1

    return n*gt(n-1)
}


function toBinary(n) {
    if(n=== 0) return ''
    
    return toBinary(parseInt(n/2))+`${n%2}`

}
alert(toBinary(10))
// alert(gt(5))
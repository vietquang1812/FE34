'use strict'
const $ = id =>(document.getElementById(id))

// const $btn = $('button')
// $btn.onclick = function() {
//     console.log('Hello Button')
// }

// $btn.onclick = function() {
//     console.log('Click button')
// }
let current = 0
const images = ['image1.png','image2.png', 'image3.png', 'image4.png', 'image5.png']
const $img = new Image()
$img.alt = 'This Is Image'
$img.src = `../images/${images[current]}`
$img.width = 400
// $img.addEventListener('mouseover', function() {
//     $img.src = '../images/image2.png'
// })
// $img.addEventListener('mouseout', function() {
//     $img.src = '../images/image1.png'
// })

$('app').appendChild($img)

$('next').addEventListener('click', function() {
    current = ++current%images.length
    $img.src = `../images/${images[current]}`
})

$('prev').addEventListener('click', function() {
    // current--
    // if(current < 0) {
    //     current = images.length - 1
    // }
    current = (--current + images.length)%images.length
    $img.src = `../images/${images[current]}`
    
})

setTimeout(function(){
    console.log('SetTimeout')
}, 2000)

console.log('global Scope')

let timerSlides = setInterval(function() {
    $('next').click()
}, 500)

setInterval(function() {
    const now = new Date()
    // $('clock').innerHTML = new Date()
    $('clock').innerHTML = `${now.getHours()}:${now.getMinutes() < 10 ? '0'+ now.getMinutes() : now.getMinutes()}:${now.getSeconds()}`
}, 1000)
$img.addEventListener('mouseover', function() {
    clearInterval(timerSlides)
})
$img.addEventListener('mouseout', function() {
    timerSlides = setInterval(function() {
        $('next').click()
    }, 500)
})
// $btn.addEventListener('click', handleEvent)


// $btn.addEventListener('click', function() {
//     console.log('click 2')
// })

// $('remove').onclick = function(){
//     $btn.removeEventListener('click',handleEvent)
// }
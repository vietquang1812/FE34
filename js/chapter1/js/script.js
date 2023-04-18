// var number1Element = document.getElementById('number1')
// var number2Element = document.getElementById('number2')
// var buttonElement = document.getElementById('button')
// var totalElement = document.getElementById('total')

// button.onclick = function() {
//     var val1 = parseFloat(number1Element.value); 
//     var  val2 = parseFloat(number2Element.value)
//     var totalVal = val1 + val2
//     totalElement.innerHTML = totalVal
// }
var sliderElement = document.getElementById('slider');
var prevElement = document.getElementById('prev')
var nextElement = document.getElementById('next')
var current = 0;
var images = ['./images/image1.png', './images/image2.png', './images/image3.png', './images/image4.png', './images/image5.png'];
var image = new Image();

image.src = images[current];

sliderElement.appendChild(image)

var next = function() {
    current = current%images.length + 1
    image.src = images[current%images.length]
    // image.src = images[(++current)%images.length]
}
var prev = function() {
    current -= 1
    if(current < 0) {
        current = images.length - 1
    }
    image.src = images[current]
}
setInterval(next, 1000)
nextElement.onclick = next
prevElement.onclick = prev
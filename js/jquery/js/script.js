const block = $('#app .block')
console.log(block.html())
// block.html('jQuery')
// for (let i = 0; i < block.length; i++) {
//     block[i].innerHTML = 'abc';
    
// }

$('#app').on('click', '.block', function() {
    alert($(this).html())
})
const $root = document.getElementById('root')
// $root.classList.toggle('block1')
// $root.getAttribute('')
// $root.setAttribute('')
$('#app').toggleClass('block1')
alert($('#app').attr('title'))
block.on('click', function() {
    alert($(this).index())
})
$('#app').find('.block2')

$('#fullname').val('Nguyen Van A')
// $('#app').html(`
// <div class="block"><h1>H1</h1></div>
// <div class="block">2</div>`)
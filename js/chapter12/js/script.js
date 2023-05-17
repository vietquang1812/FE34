'use strict';

const pattern = new RegExp(/[a-zA-Z0-9\.\_]{5,}\@[a-zA-Z]{2,10}\.[a-z]{2,3}/i)


const phonePattern = /^(0|\+84)(90|94|70|77)\d{7}$/

// const passPattern = /\S{6,}$/
// alert(passPattern.test('1234568'))
// alert(phonePattern.test('+84911234567'))
// alert(pattern.test('vietquang1812@gmail.com'))

try {
    let abc = 123
    alert(abc)
} catch (error) {
    // throw Error('eerro')
    console.log('abc is not defined')
}
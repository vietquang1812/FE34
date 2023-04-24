// bai 1 Create two integer variables (a and b) after that assign value for them. Then swap value of a and b and display to the screen

let a = prompt("nhap a : ")
let b = prompt("nhap b : ")

if (!(isNaN(a) && isNaN(b))) {
    let swap = a
    a = b 
    b = swap
}

document.getElementById("app").innerHTML = ("a:"+a + "\n" + "b:"+b)

// bai 2  tạo app để nhập 1 array -> viết 1 function đếm xem số lần hoán đổi khi sử dụng thuật toán nổi bọt để sắp xếp theo thứ tự tăng dần và in ra  dãy số đó

let bubbleSort = function () {
  let isConfirm = true;
  let arr = [];
    while (isConfirm) {
    let number = prompt("Enter a number")
    if (!isNaN(number) && number != "") {
        arr[arr.length] = number;
    } else { alert("not an number, please enter number") }
    isConfirm = confirm("continue...Y/N?")
    }
    let ascending = ''
    let swapped = 0
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
         if (arr[j] > arr[j + 1]) {
          let temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
          swapped++
        }
      }
  
    }
    for (let i = 0; i < arr.length; i++) {
      ascending += arr[i] + ", "
  }
    document.getElementById("app").innerHTML += "ascending: "+ ascending
  }
  bubbleSort()
 
 



// bai 3  Write a program to input three numbers as math, physics, and chemistry. Outputaverage and rank according to the following

function arrScore() {
  let math = parseFloat(prompt("nhap diem toan:"));
  let physics = parseFloat(prompt("nhap diem ly:"));
  let chemistry = parseFloat(prompt("nhap diem hoa:"));
  return [math, physics, chemistry];
}
function calculateAverage(scores) {
    let sum = 0
    for (let i = 0; i <scores.length; i++){
        sum += scores[i]
    }
    return sum / scores.length
}

function getRank(average) {
    if (average >=8.0){
        return "A"
    }else if (average >= 6.5) {
        return "B"
    }else if (average >= 5.0) {
        return "C"
    }else {
        return "D"
    }
}

let scores = arrScore()
let average = calculateAverage(scores)
let rank = getRank(average)

document.getElementById("app").innerHTML += "diem trung binh: " + average + "<br>" + "xep loai :" + rank

                          
// bai 4 Write a program to find x from ax + b =0 equation with a and b are input from keyboards.

const a = prompt("nhap a: ")
const b = prompt("nhap b: ")

    if (a == 0){
        if (b == 0){
            document.getElementById("app").innerHTML=("phuong trinh vo so nghiem")
        }else {
            document.getElementById("app").innerHTML=("phuong trinh vo nghiem")
        }
    } else {
        let x = -b/a
        document.getElementById("app").innerHTML =(`nghiem cua phuong trinh la x =${x} `)
    }



//  bai 5 Write a program to find x from ax2+ bx + c =0 equation with a and b are input fromkeyboards.

    const a = prompt("nhap a: ")
    const b = prompt("nhap b: ")
    const c = prompt("nhap c: ")

    if (a == 0) {
    } else {
    let delta = b * b - 4 * a * c;
    
    if (delta == 0) {
        const x = -b / 2 * a

        document.getElementById("app").innerHTML=('phuong trinh co nghiem kep: x = ',x)
    }   else if (delta < 0) { 

      document.getElementById("app").innerHTML=('phuong trinh vo so nghiem')
    } else {
        document.getElementById("app").innerHTML=('phuong trinh co 2 ngiem phan biet')
        const x1 = (-b + Math.sqrt(delta)) / 2 * a
        const x2 = (-b - Math.sqrt(delta)) / 2 * a

        document.getElementById("app").innerHTML=('nghiem x1 =',x1)
        document.getElementById("app").innerHTML=('nghiem x2 =',x2)

    }
    }

// bai 6 Write a program toinput a number aftercalculate sum of 50 integer number next

const number = parseInt(prompt('enter a number: '))

let sum = 0

for (let i = 1; i <= number; i++) {
    sum +=i
}
document.getElementById("app").innerHTML=(`tong cac so tu nhien ${sum}`)

// bai 7 Write a program to print to screen first 20 numbers of Fibonacci numbers

function fibonacci(n) {
  let sequence = [0, 1]; // Khởi tạo dãy Fibonacci với 2 số đầu tiên là 0 và 1

  for (let i = 2; i < n; i++) {
    // Tính số tiếp theo trong dãy Fibonacci bằng tổng của hai số trước đó
    sequence[i] = sequence[i - 1] + sequence[i - 2];
  }

  return sequence;
}

// Lấy 20 số đầu tiên trong dãy Fibonacci
let fibonacciNumbers = fibonacci(20);

// In kết quả ra màn hình
document.getElementById("app").innerHTML+=("20 số đầu tiên trong dãy Fibonacci là:");
document.getElementById("app").innerHTML+=(fibonacciNumbers.join(", "));
// bai 8 Write a program to accepts a number n from 1 to 12 and then print
// number of days in month n of the current year. If user enter a
// number out of range an error message will display.
// Hint: Use switch case statement

let n = parseInt(prompt("nhap so thang tu 1 den 12:"))
// kiem tra xem so do co trong khoang tu 1-12 hay k

if (n < 1 && n > 12) {
  document.getElementById("app").innerHTML = ("error, please enter from 1 to 12 ")
} else {
  // lay nam hien tai
  let thisYear = new Date().getFullYear()

  // khai bao bien so trong ngay thang
  let dayInMonth

  // use switch case de tinh so ngay trong thang tuong ung voi so nhap
  switch (n)  {
    case 2:
      //kiem tra nam nhuan
      if ((thisYear % 4 == 0 && thisYear % 100 !== 0) || thisYear % 400 == 0) {
        dayInMonth = 29 // nam nhuan co 29 ngay
      } else {
        dayInMonth = 28 // nam kh nhuan co 28 ngay
      }
      break
      
      case 4:
      case 6:
      case 9:
      case 11:
        dayInMonth = 30 // cac thang co 30 ngay
        break
        default:
        dayInMonth = 31
  } 
  document.getElementById("app").innerHTML=(`thang ${n} cua nam ${thisYear} co ${dayInMonth} ngay`)
}

// bai 9Write program to accepts two integer numbers (a and b), then calculate and display their greatest common divisor. Hint: define function int greatestCommonDivisor(int a, int b) Example: greatestCommonDivisor (18, 12) = 6; ( Ư ớ c s ố chung l ớ n nh ấ t – Có th ể xem thu ậ t toán trên m ạ ng)

function  greatestCommonDivisor (a,b) {
  while (b) {
    let temp = b
    b = a % b
    a = temp
  }
  return a
}

let a = parseInt(prompt("nhap a: "))
let b = parseInt(prompt("nhap b: "))

// tinh uoc chung lon nhat 
let gcd = greatestCommonDivisor(a,b)
document.getElementById("app").innerHTML=(`uoc chung lon nhat cau ${a} va ${b} la" ${gcd}`)

// bai 10
let n = parseInt(prompt("nhap so n: "))

for (let i = 1; i <= n; i++) {
  let row = ""
  for (let j = 1; j <= i; j++){
    row += "*"
  }
  document.getElementById("app").innerHTML = row 
  console.log(row);
}


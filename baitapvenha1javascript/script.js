//bài1
let a=5
let b=3
a+=b;
b=a-b
a=a-b
document.getElementById('app').innerHTML= 'a=' + a +  'b=' + b
//bài2
// const arr=[]
// let isConfirm=true
// let index=0
// while(isConfirm)
// {
//     const number = prompt('enter arr number')
//     if(!isNaN(number)) arr[arr.length]=number

//         isConfirm=confirm('continue..?')
// }
// for( let i=0; i<arr.length; i++)
// {
//     for (let j = 0; j < arr.length-i-1; j++)
//      {
        
//         if(arr[j]<arr[j+1])
//         {
//             const swap= arr[j]
//             arr[j]=arr[j+1]
//             arr[j+1]=swap
//             index++
//         }
//     }
// }
// document.getElementById('app').innerHTML += arr.join(', ') + '<br>'+'index='+index
//bài3
// let diemtoan=prompt('nhap diem toan');
//     diemtoan=parseFloat(diemtoan)
// let diemly=prompt('nhap diem ly');
//     diemly=parseFloat(diemly)
// let diemhoa=prompt('nhap diem hoa');
//     diemhoa=parseFloat(diemhoa)
// let diemtrungbinh=(diemtoan+diemly+diemhoa)/3;
// console.log(diemtrungbinh)

// if(diemtrungbinh>=8){
//     alert('RANK A')
// }
// else{
//     if(8>diemtrungbinh && diemtrungbinh>=6.5)
//     {
//         alert('RANK B')
//     }
//     else{
//         if(6.5>diemtrungbinh && diemtrungbinh>=5)
//         {
//             alert('RANK C')
//         }
//         else{
//             alert("RANK D")
//         }
//     }
// }
//bài4
// let a=prompt('input A')
// a=parseFloat(a)
// let b=prompt('input B')
// b=parseFloat(b)
// let x=-(b)/a
// alert('X='+x)
//bài5
// let a=prompt('input A')
//  a=parseFloat(a)
//  let b=prompt('input B')
//  b=parseFloat(b)
//  let c=prompt('input C')
//  c=parseFloat(c)
//  let denta=(b*b)-(4*a*c)
//  if(denta>0){
//     let x1=(-b+ Math.sqrt(denta))/2*a
//     let x2=(-b- Math.sqrt(denta))/2*a
//     alert('X1='+x1 + ' '+'x2='+x2)
//  }
//  else{
//     if(denta==0){
//      let x =-b/(2*a)
//      alert('X='+x)
//     }
//     else{
//         alert('Phương trình vô nghiệm')
//     }
//  }
//bai6
// let number=prompt('input number')
// let sum=0
// number=parseInt(number)
// for(let i=number;i<=number+50;i++)
// {
//     sum+=i
// }
// alert('SUM='+ sum)
//bài7
// let a=0
// let b=1
// let fibo
// for(let i=1;i<=20;i++)
//     {
//        console.log(a)
//         swap=a+b
//         a=b
//         b=swap 
//     }
//bai8
// let checkmont= prompt('enter month check')
//     checkmont=parseInt(checkmont)
//     if(!isNaN(checkmont) && checkmont>0 && checkmont<=12 )
//     {
//         switch(checkmont)
//         {
//             case 1:
//             case 3:
//             case 5:
//             case 7:
//             case 8:
//             case 10:
//             case 12:
//                 alert('Tháng'+checkmont+' có 31 ngày')
//             break;
//             case 4:
//             case 6:
//             case 9:
//             case 11:
//                 alert('Tháng'+checkmont+' có 30 ngày')
//             break;
//             case 2:
//                 let checkyear=prompt('enter year check')
//                 checkmont=parseInt(checkyear)
//                 if (!isNaN(checkyear) && checkyear != "" && checkyear % 4 == 0 && checkyear>0 && !(checkyear % 100 == 0 && checkyear % 400 == 0)) {
//                     alert('tháng 2 có 29')
//                 } else { alert('tháng 2 có 28') }
//     }
// }
//     else{
//         alert('IPNUT MONTH ERROR')
//     }
//bai9
// let a= prompt('input a')
//    a=parseInt(a)
// let b= prompt('input b')
//    b=parseInt(b)
// if(a==0 || b==0){
//     let ucln=a+b
//     alert('UCLN='+ ucln )
// }
// while(b!=0){
//     let swap=a%b;
//     a=b;
//     b=swap
// }
// alert('UCLN='+a)
//bài 10
// let a= prompt('input a')
//    a=parseInt(a)
//    for( let i=1;i<=a;i++){
//         for(j=1;j<=i;j++)
//         {
//             document.getElementById('app').innerHTML+= '*'
//         }
//         document.getElementById('app').innerHTML+= '<br>'
//          }
//bài11
// let n= prompt('input n')
//    n=parseInt(n)
//    for (let i=1; i<=n; i++)
//     {
//         for(let j=1;j<=n-i;j++)
//         {
//             document.getElementById('app').innerHTML+='a'
//         }
//         for(let k=(n-i)+1;k<=n;k++)
//         {
//             document.getElementById('app').innerHTML+= '*'
//         }
//         document.getElementById('app').innerHTML+= '<br>'
//     }
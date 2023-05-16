'use strict'
const $ = id => (document.getElementById(id));
let persons = [];
let hodans = [];

class Person {
    constructor(id,fullname,relationship,birthday,job){
        this.id = id;
        this.fullname = fullname;
        this.relationship = relationship;
        this.birthday = birthday;
        this.job = job;
    }
    save() {
        persons.push(this);
        localStorage.setItem('persons', JSON.stringify(persons));
    }

}
class Hodan {
    constructor(id,address){
        this.id = id;
        this.address = address;
        this.persons = [];
    }
    add_person(a){
        this.persons.push(a);
    }
    save() {
        hodans.push(this);
        localStorage.setItem('hodans', JSON.stringify(hodans));
    }
    chuho() {
        let chuho = [];
        this.persons.forEach((i)=> {
                if(i.relationship == 'chủ hộ') chuho = i;
            }          
        );
        return chuho;
    }
}

function id(arr){
    const ids = arr.map(p => p.id);
        const newId = ids.length == 0 ? 0 : Math.max(...ids);
        return newId+1;
}

function show_hodan(){
        
    $('tasks').innerHTML = hodans.length === 0 ? '<tr><td colspan="4" class="text-center">Không có hộ dân</td></tr>' :'';
    let row_chungcu = '';
    hodans.forEach(e => {
        let detail = '';
        const detail_a = `<table class="table table-striped">
        <thead>
            <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Quan hệ</th>
                <th>Ngày sinh</th>
                <th>Nghề nghiệp</th>
            </tr>
        </thead>
        <tbody>`;
        const detail_b =`</tbody>
        </table>`;

        e.persons.forEach(e => {
            const row = `<tr>
                <td>`+e.id+`</td>
                <td>`+e.fullname+`</td>
                <td>`+e.relationship+`</td>
                <td>`+e.birthday+`</td>
                <td>`+e.job+`</td>
            </tr>`
            detail += row;
        })
        detail = detail_a + detail + detail_b;
        
        const row_hodan = `<tr>
            <td>`+e.id+`</td>
            <td>`+e.address+`</td>
            <td>`+e.persons.length+`</td>
            <td>`+detail+`<td>
            </tr>`
        row_chungcu +=row_hodan;
        
    })
    $('tasks').innerHTML= row_chungcu;
}


//check validate
const check_chungcu = () => {
    let isValid = true;
    
    const name = $('name').value;
    if(name == '') {
        isValid = false;
        $('name').nextElementSibling.innerHTML = 'Vui lòng nhập tên hộ dân';
    } else {
        $('name').nextElementSibling.innerHTML = '';
    }
    const address = $('address').value;
    if(address == '') {
        isValid = false;
        $('address').nextElementSibling.innerHTML = 'Vui lòng nhập địa chỉ';
    } else {
        $('address').nextElementSibling.innerHTML = '';   
    }
    const date = $('date').value;
    if(date == '') {
        isValid = false;
        $('date').nextElementSibling.innerHTML = 'Vui lòng chọn ngày sinh';
    } else {
        $('date').nextElementSibling.innerHTML = '';   
    }
    const job = $('job').value;
    if(job == '') {
        isValid = false;
        $('job').nextElementSibling.innerHTML = 'Vui lòng nhập nghề nghiệp';
    } else {
        $('job').nextElementSibling.innerHTML = '';   
    }
    return isValid
}

const check_hodan = () => {
    let isValid = true;
    
    const name = $('hodan').value;
    if(name == '') {
        isValid = false;
        $('hodan').nextElementSibling.innerHTML = 'Vui lòng chọn hộ dân';
    } else {
        $('hodan').nextElementSibling.innerHTML = '';
    }
    const member = $('name-tv').value;
    if(member == '') {
        isValid = false;
        $('name-tv').nextElementSibling.innerHTML = 'Vui lòng nhập tên thành viên';
    } else {
        $('name-tv').nextElementSibling.innerHTML = '';   
    }
    const relationship = $('relationship').value;
    if(relationship == '') {
        isValid = false;
        $('relationship').nextElementSibling.innerHTML = 'Vui lòng nhập mối quan hệ với chủ hộ';
    } else {
        $('relationship').nextElementSibling.innerHTML = '';   
    }
    const date_tv = $('date-tv').value;
    if(date_tv == '') {
        isValid = false;
        $('date-tv').nextElementSibling.innerHTML = 'Vui lòng chọn ngày sinh thành viên';
    } else {
        $('date-tv').nextElementSibling.innerHTML = '';   
    }
    const job_tv = $('job-tv').value;
    if(job_tv == '') {
        isValid = false;
        $('job-tv').nextElementSibling.innerHTML = 'Vui lòng nhập công việc thành viên';
    } else {
        $('job-tv').nextElementSibling.innerHTML = '';   
    }
    return isValid
}

// hiển thị các product vào select Order
const hodan_opt = () => {
    $('hodan').innerHTML = '<option disabled selected hidden value="">-----Vui lòng chọn hộ dân-----</option>';
    
    hodans.forEach((item,index) => {

        let opt = document.createElement('option');
        opt.innerText = item.chuho().fullname;
        opt.value = item.chuho().id;
                  
        $('hodan').appendChild(opt);
    })
}

$('btn-chungcu').onclick = function(e) {
    e.preventDefault()
    if(check_chungcu()){

        const name = $('name').value;
        const date = $('date').value;
        const job = $('job').value;
        const relationship = 'chủ hộ';
        const address = $('address').value;

        let new_member = new Person(id(persons),name,relationship,date,job);
        new_member.save();

        let new_hodan = new Hodan(id(hodans),address);
        new_hodan.add_person(new_member);
        new_hodan.save();
        show_hodan();
        hodan_opt();

    }
}
$('btn-thanhvien').onclick = function(e) {
    e.preventDefault()
    if(check_hodan()){
        const id_name = $('hodan').value;
        const name_tv = $('name-tv').value;
        const date_tv = $('date-tv').value;
        const job_tv = $('job-tv').value;
        const relationship_tv = $('relationship').value;
        let member= new Person(id(persons),name_tv,relationship_tv,date_tv,job_tv);
        member.save();
        hodans.forEach((item,index)=>{

            if (item.chuho().id == id_name) {
                item.add_person(member);
                localStorage.setItem('hodans', JSON.stringify(hodans));
            }
        })
        show_hodan();

    }
        
}

function getLocalData(){
    const localPerson = JSON.parse(localStorage.getItem('persons')) ?? [];

    persons = localPerson.map(p => new Person(p.id, p.fullname, p.relationship, p.birthday, p.job));
    const localHodan = JSON.parse(localStorage.getItem('hodans')) ?? [];
   
    hodans = localHodan.map(p => {
        let hodan = new Hodan(p.id, p.address);
        p.persons.forEach(e => hodan.add_person(e));
        return hodan;
    });
    hodan_opt();
    show_hodan();
}
getLocalData();
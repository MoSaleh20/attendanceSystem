const saveButton = document.getElementById('save');
const clearButton = document.getElementById('clear');
const attendedButton = document.getElementsByClassName('attendedButton');
const absentButton = document.getElementsByClassName('absentButton');
const lateButton = document.getElementsByClassName('lateButton');
const attendedButtonCount = document.getElementById('attendedCount');
const absentButtonCount = document.getElementById('absentCount');
const lateButtonCount = document.getElementById('lateCount');
const addForm = document.getElementById('addForm');
const table = document.getElementById("attendTableBody");
const popupDialog = document.getElementById('pop-up');
const cancelButton = document.getElementById('cancel');
const addStudentButton = document.getElementById('addStudent');
const title = document.getElementById('title');


// add current date to title
var date = new Date()
title.innerHTML+= date.getFullYear()+'/'+Number(Number(date.getMonth())+1)+'/'+date.getDate();


//attendance button (for each student)
function att(){
   for(var i = 0; i<attendedButton.length;i++){
    attendedButton[i].addEventListener('mouseover', function(e){
        const btn = e.target;
        btn.style.boxShadow='1px 1px 0px 0px black';
    })
    attendedButton[i].addEventListener('mouseout', function(e){
        const btn = e.target;
        btn.style.boxShadow='-1px -1px 0px 0px black';
    })
    attendedButton[i].addEventListener('mouseup', function(e){
        const btn = e.target;
        btn.style.boxShadow='1px 1px 0px 0px black';
        btn.closest("tr").style.backgroundColor = 'rgb(92, 209, 110)';
        btn.closest("tr").cells[4].innerHTML='';
        btn.closest("tr").cells[5].innerHTML='';

        // added attendance condition to show in excel.
        btn.closest("tr").cells[3].innerHTML+='Atended';

        attendedButtonCount.innerHTML=Number(attendedButtonCount.innerHTML)+1
        this.disabled = true;
    })
} 
}

//absentButton button (for each student)
function abs(){
    for(var i = 0; i<absentButton.length;i++){
    absentButton[i].addEventListener('mouseover', function(e){
        const btn = e.target;
        btn.style.boxShadow='1px 1px 0px 0px black';
    })
    absentButton[i].addEventListener('mouseout', function(e){
        const btn = e.target;
        btn.style.boxShadow='-1px -1px 0px 0px black';
    })
    absentButton[i].addEventListener('click', function(e){
        const btn = e.target;
        btn.closest("tr").style.backgroundColor = 'rgb(236, 138, 138)';
        btn.closest("tr").cells[3].innerHTML='';
        btn.closest("tr").cells[5].innerHTML='';
        btn.style.boxShadow='1px 1px 0px 0px black';
        // added attendance condition to show in excel.
        btn.closest("tr").cells[4].innerHTML+='Absent';

        this.disabled = true;
        absentButtonCount.innerHTML=Number(absentButtonCount.innerHTML)+1
    })
}
}

//lateButton button (for each student)
function lat(){
    for(var i = 0; i<lateButton.length;i++){
    lateButton[i].addEventListener('mouseover', function(e){
        const btn = e.target;
        btn.style.boxShadow='1px 1px 0px 0px black';
    })

    lateButton[i].addEventListener('mouseout', function(e){
        const btn = e.target;
        btn.style.boxShadow='-1px -1px 0px 0px black';
    })
        
    lateButton[i].addEventListener('mouseup', function(e){
        const btn = e.target;
        btn.style.boxShadow='1px 1px 0px 0px black';
        btn.closest("tr").style.backgroundColor = 'rgb(145, 147, 146)';
        btn.closest("tr").cells[3].innerHTML='';
        btn.closest("tr").cells[4].innerHTML='';

        // added attendance condition to show in excel.
        btn.closest("tr").cells[5].innerHTML+='Late';
        

        this.disabled = true;
        lateButtonCount.innerHTML=Number(lateButtonCount.innerHTML)+1
    })
}
}

//clear all button
function clr(){
    clearButton.addEventListener('click',function(){
    for (var i = 0, row; row = table.rows[i]; i++) {
        row.style.backgroundColor = 'white';
        row.cells[3].innerHTML = '<input type="button" class="formButton attendedButton" name="attendedButton" id="attendedButton">'
        row.cells[4].innerHTML = '<input type="button" class="formButton absentButton" name="absentButton" id="absentButton">'
        row.cells[5].innerHTML = '<input type="button" class="formButton lateButton" name="lateButton" id="lateButton">' 
    }
    attendedButtonCount.innerHTML = 0;
    absentButtonCount.innerHTML = 0;
    lateButtonCount.innerHTML = 0;
    reset();
    })
}


//save button (as excel). // used table2excel plugin.
saveButton.addEventListener('click', function(e){
    var table2excel = new Table2Excel();
    table2excel.export(document.getElementById("attendTable"));
    window.onbeforeunload = function() {
        return '';
    }
})


var i = 2;
//add button (inside popup)
function addStudentForm(){
    addForm.addEventListener('submit', function(e){
        e.preventDefault();
        
        const id = document.getElementById('id');
        const fname = document.getElementById('fname');
        const lname = document.getElementById('lname');
        i++;
        if (!id.value || !fname.value || !lname.value ){
            alert('Fill all blanks');
        }
        else{
            table.innerHTML += `
        <tr>
            <td class='entry'>${i}</td>
            <td class='entry'>${id.value}</td>
            <td class='entry'>${fname.value} ${lname.value}</td>
            <td>
                <input type="button" class="formButton attendedButton" name="attendedButton" id="attendedButton">
            </td>
            <td>
                <input type="button" class="formButton absentButton" name="absentButton" id="absentButton">
            </td>
            <td>
                <input type="button" class="formButton lateButton" name="lateButton" id="lateButton">
            </td>
        </tr>
        `
        addForm.reset();
        reset();
        clearButton.click();
        popupDialog.style.display = 'none';
        } 
    })
}

// cancel button to discard popup (inside popup)
function cancelFunc(){
    cancelButton.addEventListener('click',function(){
        console.log('c')
        popupDialog.style.display = 'none';
    }) 
}

// add student button (popup initiator)
function addStudent(){
    addStudentButton.addEventListener('click', function(){
        popupDialog.style.display = 'flex';
    }) 
}

//reset buttons inside form after clearing all
function reset(){
    att();
    abs();
    lat();
}

//functions reference
clr();
att();
abs();
lat();
addStudentForm();
cancelFunc();
addStudent();
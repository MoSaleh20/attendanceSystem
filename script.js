const save = document.getElementById('save');
const clear = document.getElementById('clear');
const attended = document.getElementsByClassName('attendedButton');
const absent = document.getElementsByClassName('absentButton');
const late = document.getElementsByClassName('lateButton');
const attendedCount = document.getElementById('attendedCount');
const absentCount = document.getElementById('absentCount');
const lateCount = document.getElementById('lateCount');


//attendance button
function att(){
   for(var i = 0; i<attended.length;i++){
    attended[i].addEventListener('click', function(e){
        const btn = e.target;

        btn.closest("tr").style.backgroundColor = 'rgb(248, 80, 80)';
        btn.closest("tr").cells[4].innerHTML='';
        btn.closest("tr").cells[5].innerHTML='';

        attendedCount.innerHTML=Number(attendedCount.innerHTML)+1
        this.disabled = true;
    })
} 
}
att();

//absent button
function abs(){
    for(var i = 0; i<absent.length;i++){
    absent[i].addEventListener('click', function(e){
        const btn = e.target;

        btn.closest("tr").style.backgroundColor = 'rgb(2, 80, 80)';
        btn.closest("tr").cells[3].innerHTML='';
        btn.closest("tr").cells[5].innerHTML='';

        this.disabled = true;
        absentCount.innerHTML=Number(absentCount.innerHTML)+1
    })
}
}
abs();

//late button
function lat(){
    for(var i = 0; i<late.length;i++){
    late[i].addEventListener('click', function(e){
        const btn = e.target;

        btn.closest("tr").style.backgroundColor = 'rgb(100, 80, 80)';
        btn.closest("tr").cells[3].innerHTML='';
        btn.closest("tr").cells[4].innerHTML='';
        

        this.disabled = true;
        lateCount.innerHTML=Number(lateCount.innerHTML)+1
    })
}
}
lat();


clear.addEventListener('click',function(){
    var table = document.getElementById("attendTableBody");
    
    for (var i = 0, row; row = table.rows[i]; i++) {
        row.style.backgroundColor = 'white';
        row.cells[3].innerHTML = '<input type="button" class="formButton attendedButton" name="attended" id="attendedButton">'
        row.cells[4].innerHTML = '<input type="button" class="formButton absentButton" name="absent" id="absentButton">'
        row.cells[5].innerHTML = '<input type="button" class="formButton lateButton" name="late" id="lateButton">' 
    }
    attendedCount.innerHTML = 0;
    absentCount.innerHTML = 0;
    lateCount.innerHTML = 0;
    att();
    abs();
    lat();
})

//save as excel.
save.addEventListener('click', function(){
    var table2excel = new Table2Excel();
    table2excel.export(document.getElementById("attendTable"));
})
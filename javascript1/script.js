const authorPlaceholder="Enter new author";
const titlePlaceholder="Enter new title";

function grabTable(){
    const table=document.querySelector('table');
    return table;
}

function createInput(placeholder){
    const newInput=document.createElement('input');
    newInput.placeholder=placeholder;
    newInput.setAttribute("maxlength",50);
    newInput.setAttribute("type","text");
    return newInput;
}
function addField(){
    const table=grabTable();
    const newRow=document.createElement('tr');
    const newAuthor=createInput(authorPlaceholder);
    const newTitle=createInput(titlePlaceholder);
    const firstRow=document.createElement('td');
    firstRow.setAttribute("class","data");
    const secondRow=document.createElement('td');
    secondRow.setAttribute("class","data");
    const buttons=document.createElement('td');
    const delButton=document.createElement('button');
    const saveButton=document.createElement('button');
    delButton.textContent="Remove";
    delButton.setAttribute("onclick", "remove(this)");
    saveButton.setAttribute("onclick","save(this)");
    saveButton.textContent="Save";
    buttons.appendChild(saveButton);
    buttons.appendChild(delButton);
    var children=buttons.children;
    for(var i=0;i<children.length;i++){
        children[i].setAttribute("class", "editButtons");
    }
    secondRow.appendChild(newAuthor);
    firstRow.appendChild(newTitle);
    newRow.appendChild(firstRow);
    newRow.appendChild(secondRow);
    newRow.appendChild(buttons);
    table.appendChild(newRow);
}
function remove(param){
    const table=grabTable();
    table.removeChild(param.parentNode.parentNode);
}
function checkInputs(inputs){
    var input;
    var content;
    for(var i=0;i<inputs.length; i++){
        input=inputs[i].querySelector("input");
        content=input.value;
        if(content) continue;
        else return false;
    }
    return true;
}

function save(param){
   
    const row=param.parentNode.parentNode;
    var inputs=row.querySelectorAll(".data");
    var input;
    var content;
    if(checkInputs(inputs)){
        for(var i=0;i<inputs.length; i++){
            input=inputs[i].querySelector("input");
            content=input.value;
            input.remove();
            inputs[i].textContent=content;
        }
        param.setAttribute("onclick","edit(this)");
        param.textContent="Edit";
    }
}

function fillInput(placeholder,value){
    const input=createInput(placeholder);
    input.value=value;
    return input;
}
function edit(param){
    param.setAttribute("onclick","save(this)");
    param.textContent="Save";
    const row=param.parentNode.parentNode;
    var data=row.querySelectorAll(".data");

    for(var i=0;i<data.length; i++){
        var content=data[i].textContent;
        console.log(content);
        data[i].textContent="";
        var newInput;
        if(i==0) 
         newInput=fillInput(titlePlaceholder,content);
        else 
         newInput=fillInput(authorPlaceholder,content);
        data[i].appendChild(newInput);
    }
}
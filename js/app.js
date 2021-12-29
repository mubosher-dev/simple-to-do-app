const nameInput = document.querySelector('#name'),
      sourNameInput = document.querySelector('#sourname'),
      phoneInput = document.querySelector('#phone-number'),
      contentInput = document.querySelector('#content'),
      btn = document.querySelector('#addBtn'),
      form = document.querySelector('.form'),
      tBody = document.querySelector('#body'),
      changeName = document.querySelector('#change-name'),
      changeSourname = document.querySelector('#change-sourname'),
      changePhone_Number = document.querySelector('#change-phone-number'),
      changeContent = document.querySelector('#content-change'),
      changeBtn = document.querySelector('#changerBtn'),
      changeItemsWrapper = document.querySelector('.modal-section'),
      xBtn = document.querySelector('.x-btn'),
      bodyItem = document.querySelector('.body-item');
      
let num = 0;
let changeItemsList = [];
let itemListNum = [];
let todos = [];
let removeLocalIndex = [];
let deleted = [];
function addList(e){
    e.preventDefault();
    
    if(
        (nameInput.value !== '')&&
        (sourNameInput.value !== '')&&
        (phoneInput.value !== '')&&
        (contentInput.value !== '')
    ){  
        num++;
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="num">${num}</td>
            <td>${nameInput.value}</td>
            <td>${sourNameInput.value}</td>
            <td>+${phoneInput.value}</td>
            <td>${contentInput.value}</td>
            <td>
                <i class="penc fas fa-pen-square"></i>
            </td>
            <td>
                <button class="deleteBtn">Delete</button>
            </td>
        `;
        tBody.appendChild(tr)
        removeInputValue(nameInput,sourNameInput,phoneInput,contentInput);
        saveTodoLocalstorage(nameInput,sourNameInput,phoneInput,contentInput);
    }
    else{
        alert("Write the form");
    }
}

function wrapperActive(e){
    const item = e.target;
    if(item.classList[0] === 'penc' ){
        changeItemsWrapper.classList.add('active')
        const todo = item.parentElement.parentElement;
        changeItemsList.push(todo)
        itemListNum.push(todo.children[0].innerText);
        deleted.push(todo.children[0].innerText);
    }
    else if(item.classList[0] === 'deleteBtn'){
        const removedRow = item.parentElement.parentElement;
        removeTodoLocalStorage();
        removeLocalIndex.push(removedRow.children[0].innerText);
        removedRow.remove();
    }
}

function changerList(e){
    e.preventDefault()

    if(
        (changeContent.value !== '')&&
        (changeSourname.value !== '')&&
        (changeName.value !== '')&&
        (changePhone_Number.value !== "")
    ){
            
        changeItemsList[0].innerHTML = `
        <td>${itemListNum[0]}</td>
        <td>${changeName.value}</td>
        <td>${changeSourname.value}</td>
        <td>+${changePhone_Number.value}</td>
        <td>${changeContent.value}</td>
        <td>
            <h4 class="red">Writer</h4>
        </td>
        <td>
            <button class="deleteBtn">Delete</button>
        </td>
        `;

        let  obj = {
            name:changeName.value,
            sourName:changeSourname.value,
            phoneNumber:changePhone_Number.value,
            content:changeContent.value
        };
        removeChangeLocal();
        changeItemsList.shift();
        itemListNum.shift()
        todos.push(obj);
        changeItemsWrapper.classList.remove('active');
        localStorage.setItem("todos",JSON.stringify(todos));
        removeInputValue(changeName,changeSourname,changePhone_Number,changeContent); 
    }
    else{
        alert("Write the form")
    }
}

function removeInputValue(n,s,p,c){
    setTimeout(() => {
        n.value ='';
        s.value ='';
        p.value ='';
        c.value ='';
    }, 150);
}

function saveTodoLocalstorage(n,s,p,c){
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const obj = {
        name:n.value,
        sourName:s.value,
        phoneNumber:p.value,
        content:c.value
    }
    todos.push(obj)
    localStorage.setItem("todos",JSON.stringify(todos))
}

function getTodos(){
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    localStorage.setItem("todos",JSON.stringify(todos))
    todos.forEach((todo,index) => {
        let tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="num">${index+1}</td>
            <td>${todo.name}</td>
            <td>${todo.sourName}</td>
            <td>+${todo.phoneNumber}</td>
            <td>${todo.content}</td>
            <td>
                <i class="penc fas fa-pen-square"></i>
            </td>
            <td>
                <button class="deleteBtn">Delete</button>
            </td>
        `;
        tBody.appendChild(tr);
    });
    
}

function removeTodoLocalStorage(){
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = removeLocalIndex[0];
    todos.pop(todoIndex)
    localStorage.setItem("todos",JSON.stringify(todos));
    removeLocalIndex.shift();
}

function removeChangeLocal(){
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const removeIndex = deleted;
    todos.pop(removeIndex)
    localStorage.setItem("todos",JSON.stringify(todos));
}

form.addEventListener('submit',addList);
tBody.addEventListener('click',wrapperActive);
changeBtn.addEventListener('click',changerList);
xBtn.addEventListener('click', function(){
    changeItemsWrapper.classList.remove('active');
})
window.addEventListener('DOMContentLoaded',getTodos)
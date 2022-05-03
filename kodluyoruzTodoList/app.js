const form = document.querySelector(".todo-form")
const input = document.querySelector(".todo-input")
const containerTodo = document.querySelector(".todo-container")
let number = 0
let deleteBTNS
let checkBoxs


const Conf = () => {{}
    const todos = JSON.parse(localStorage.getItem("todos"))
    if (!todos){
        localStorage.setItem("todos",JSON.stringify([]))
    }else{
        todos.forEach(todo => {
            HTML(todo)
            deleteBTNS = document.querySelectorAll(".delete")
            checkBoxs = document.querySelectorAll(".check-box")
        });
    }
}



const todoAdd = (a) => {
    a.preventDefault()
    if (!input.value){
        input.style.border = '1px solid tomato';
        setTimeout(() => {
           input.style.borderColor = 'transparent';
        }, 2500);
        return false;

    }else if(input.value == " " || input.value == "  "){
        input.style.border = '1px solid tomato';
        setTimeout(() => {
           input.style.borderColor = 'transparent';
        }, 2500);
        return false;
    }else{
        const inputValue = input.value

        const todo = {
            text : inputValue,
            isCompleted: false,
        }   
        const todos = JSON.parse(localStorage.getItem("todos"))
        todos.push(todo)
        localStorage.setItem("todos",JSON.stringify(todos))
        
    
        HTML(todo)
    
        form.reset()
    }


}

const deleteBTN = (a) =>{
    let todos = JSON.parse(localStorage.getItem("todos"))
    const todo = a.target.parentElement.parentElement
    const text = todo.firstChild.children[1].textContent
    todos = todos.filter(t => t.text != text)
    localStorage.setItem("todos",JSON.stringify(todos))
      
    todo.remove()
}

const completeCB = (a) =>{
    let todos = JSON.parse(localStorage.getItem("todos"))
    const todo = a.target.parentElement.parentElement
    const text = todo.firstChild.children[1].textContent
    todos.forEach(t => {
        if (t.text === text) t.isCompleted = !t.isCompleted
    })
    localStorage.setItem("todos",JSON.stringify(todos))
}

const HTML = (todo) =>{
    const divTodo = document.createElement("div")
    divTodo.classList.add("todo")

    const leftTodo = document.createElement("div")
    leftTodo.classList.add("left")

    const chackBox = document.createElement("input")
    chackBox.id = "check"+number
    chackBox.type = "checkbox"
    chackBox.checked = todo.isCompleted
    chackBox.classList.add("check-box")
    chackBox.addEventListener("click",completeCB)

    const textTodo = document.createElement("label")
    textTodo.htmlFor = "check"+number
    textTodo.classList.add("todo-text")
    textTodo.textContent = todo.text

    leftTodo.appendChild(chackBox)
    leftTodo.appendChild(textTodo)

    const rightTodo = document.createElement("div")
    rightTodo.classList.add("right")

    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("delete")
    deleteBtn.textContent = "Sil"
    deleteBtn.addEventListener("click",deleteBTN)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit")
    editBtn.textContent = "Ekle"

    rightTodo.appendChild(deleteBtn)
    //rightTodo.appendChild(editBtn)

    divTodo.appendChild(leftTodo)
    divTodo.appendChild(rightTodo)

    containerTodo.appendChild(divTodo)
    
    number++
}

form.addEventListener("submit", todoAdd)
Conf()





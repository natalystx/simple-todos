const storeTodos = (storeKey, todos) => {
  const todosInStore = localStorage.getItem(storeKey)
  
  Object.assign(todos, {done: false});
  Object.assign(todos, {id: Date.now()});
  
  if(todosInStore === null){
    localStorage.setItem(storeKey, JSON.stringify([todos]))
  } else{
    const todosList = JSON.parse(todosInStore);      
     todosList.push(todos)
    localStorage.setItem(storeKey, JSON.stringify(todosList))
  }

}


const getTodos = (storeKey) => {
    const todosInStore = localStorage.getItem(storeKey)
    const todosList = JSON.parse(todosInStore);    
    generateTodos(todosList)
}

const editTodos = (storeKey, id) => {
  toggleModal(true)
   const todosInStore = localStorage.getItem(storeKey)
   const todosList = JSON.parse(todosInStore);
   const updateBTN = document.querySelector('.update');
   const addBTN = document.querySelector('.add-new');
   updateBTN.style.display = 'block';
   addBTN.style.display = 'none';

   const currentTodos = todosList.filter(todo => todo.id === id)
   
   if(currentTodos.length === 1){
     const {title, details, id} = currentTodos[0]
      const titleInput = document.querySelector('.title-input');
      const detailInput = document.querySelector('.detail-input');
      updateBTN.setAttribute('data-id', id);
      titleInput.value = title;
      detailInput.value = details;
   }
}


const deleteTodos = (storeKey, todoId) => {  
  const todosInStore = localStorage.getItem(storeKey)
  const todosList = JSON.parse(todosInStore);  
  const remainsList =  todosList.filter((todo) => todo.id !== todoId);  
  localStorage.setItem(storeKey, JSON.stringify(remainsList));
  generateTodos(remainsList);
  
}


const generateTodos = (todos) => {
  const todosWrapper = document.querySelector('.todos-wrapper');
  todosWrapper.innerHTML = '';
  todos.forEach(todo => {
    const todosElem = document.createElement('li', {
    class: 'todos'
    });
    

    todosElem.innerHTML = ` <li class="todos ${todo.done ? 'done' : ''}">
        <div class="content">
          <h4 class="title">title: ${todo.title}</h4>
          <p class="details">details: ${todo.details}</p>
        </div>
        <div class="btn-wrapper">
          <button onclick="deleteTodos('todos',${todo.id})">delete</button>
          <button  onclick="editTodos('todos',${todo.id})">edit</button>
          <button onclick="doneTodos('todos',${todo.id})">done</button>
        </div>
      </li>`
        

    todosWrapper.appendChild(todosElem);

  
  })
}

const main = () => {
    getTodos('todos'); 
}

const toggleModal = (open) => {
  const modal = document.querySelector('.todos-add-modal');
  clearInput();

  if(open){    
    modal.style.display = 'flex';        
  } else{
    modal.style.display = 'none';
  }
}

const clearInput = () => {
  const titleInput = document.querySelector('.title-input');
  const detailInput = document.querySelector('.detail-input');
  titleInput.value = '';
  detailInput.value = '';

}

const submitTodos = () => {
    const titleInput = document.querySelector('.title-input');
    const detailInput = document.querySelector('.detail-input');
    
    const content = {
      title: titleInput.value,
      details: detailInput.value
    };

    if(content.title && content.details){
      storeTodos('todos', content);
      getTodos('todos');
    toggleModal(false);
    }else{
      alert(`title and details can't be empty!`)
    }
    
}

const updateTodos = () => {
    const titleInput = document.querySelector('.title-input');
    const detailInput = document.querySelector('.detail-input');
    const updateBtn = document.querySelector('.update');
    
    const content = {
      title: titleInput.value,
      details: detailInput.value
    };

    if(content.title && content.details){
      const id = updateBtn.dataset.id;
      saveTodos('todos',content,id)
      getTodos('todos');
      toggleModal(false);
    }else{
      alert(`title and details can't be empty!`)
    }
    
}

const saveTodos = (storeKey, todos ,id) => {  
  const todosInStore = localStorage.getItem(storeKey)  
  const todosList = JSON.parse(todosInStore);   
  const sameIdIndex = todosList.findIndex(todo => todo.id === parseInt(id));  
  todosList[sameIdIndex].title = todos.title;
  todosList[sameIdIndex].details = todos.details;
  localStorage.setItem(storeKey, JSON.stringify(todosList))
}

const doneTodos = (storeKey ,id) => {
  const todosInStore = localStorage.getItem(storeKey)  
  const todosList = JSON.parse(todosInStore);   
  const sameIdIndex = todosList.findIndex(todo => todo.id === parseInt(id));  
  todosList[sameIdIndex].done = true;
  generateTodos(todosList)
  localStorage.setItem(storeKey, JSON.stringify(todosList))
}


main();
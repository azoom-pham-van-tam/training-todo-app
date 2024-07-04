const PATH = {
  checkedImagePath: './assets/img/Check-Circle-Outline.png',
  uncheckedImagePath: './assets/img/Radio-Button-Unchecked.png',
  deleteImagePath: './assets/img/Delete-Outline.png',
  todoListContentPath: '.modal__content .modal__todo',
  navigationTabPath: '.modal__navigation button',
  clearAllImagePath: './assets/img/Clear-Complete.png'
}

const TASKS_TAB_BUTTON_ID = {
  personal: 'personal-tab',
  professional: 'professional-tab'
}

const TODO_LIST_DATA = {
  'personal-tab': [
    {
      id: 1,
      content: 'Personal Work No. 1',
      completed: true
    },
    {
      id: 2,
      content: 'Personal Work No. 2',
      completed: false
    },
    {
      id: 3,
      content: 'Personal Work No. 3',
      completed: false
    },
    {
      id: 4,
      content: 'Personal Work No. 4',
      completed: true
    },
    {
      id: 5,
      content: 'Personal Work No. 5',
      completed: false
    }
  ],
  'professional-tab': [
    {
      id: 1,
      content: 'Professional Work No. 1',
      completed: true
    },
    {
      id: 2,
      content: 'Professional Work No. 2',
      completed: false
    },
    {
      id: 3,
      content: 'Professional Work No. 3',
      completed: false
    },
    {
      id: 4,
      content: 'Professional Work No. 4',
      completed: true
    },
    {
      id: 5,
      content: 'Professional Work No. 5',
      completed: false
    }
  ]
}

let currentTabId = TASKS_TAB_BUTTON_ID.personal
getTodoListContent(currentTabId)

function getTodoListContent(tabId) {
  let todoListContent = document.querySelector(PATH.todoListContentPath)
  let todoListItems = ''

  TODO_LIST_DATA[tabId].forEach(todo => {
    todoListItems += setContentForTodoItem({
      itemId: todo.id,
      completed: todo.completed,
      content: todo.content
    })
  })
  todoListItems += setClearButtonForTodoContent(tabId)
  todoListContent.innerHTML = todoListItems
  return
}

function selectTab(tabId) {
  const tabs = document.querySelectorAll(PATH.navigationTabPath)
  tabs.forEach(tab => {
    if (tab.classList.contains('selected')) {
      tab.classList.remove('selected')
    }
  })
  const currentTab = document.getElementById(tabId)
  currentTab.classList.add('selected')
  currentTabId = tabId
  getTodoListContent(tabId)
  return
}

function toggleCheckbox(checkboxImageId, contentId) {
  const checkboxImage = document.getElementById(checkboxImageId)
  if (checkboxImage.src.match(PATH.checkedImagePath)) {
    checkboxImage.src = PATH.uncheckedImagePath
    updateTaskContent(contentId, false)
    getTodoListContent(currentTabId)
  } else {
    checkboxImage.src = PATH.checkedImagePath
    updateTaskContent(contentId, true)
    getTodoListContent(currentTabId)
  }
  return
}

function updateTaskContent(contentId, status) {
  return TODO_LIST_DATA[currentTabId].forEach(todo => {
    if (todo.id === contentId) {
      todo.completed = status
    }
  })
}

function removeTodoItem(itemId) {
  const item = getItemDetail(itemId)
  const confirmMessage = `${item.content} will be deleted. Are you sure?`
  const isConfirmed = confirm(confirmMessage)
  if (!isConfirmed) {
    return
  }
  const todoList = TODO_LIST_DATA[currentTabId]
  const index = todoList.findIndex(todo => todo.id === itemId)
  todoList.splice(index, 1)
  getTodoListContent(currentTabId)
  return
}

function removeAllTodoItems(tabId) {
  TODO_LIST_DATA[tabId] = TODO_LIST_DATA[tabId].filter(
    todo => todo.completed !== true
  )
  getTodoListContent(tabId)
  return
}

function setContentForTodoItem({ itemId, completed, content }) {
  return `<div id="modal__todo-item-${itemId}" class ="modal__todo-item">
      <button class="modal__todo-check-button" onclick="toggleCheckbox('checkboxImage-${itemId}', ${itemId})">
        <img id="checkboxImage-${itemId}" src=${
    completed ? PATH.checkedImagePath : PATH.uncheckedImagePath
  } alt="Unchecked Checkbox" />
      </button>
      <div class="modal__todo-item-content ${completed ? 'checked-task' : ''}">
        ${content}
      </div>
      <button class="modal__todo-delete-button" onclick="removeTodoItem(${itemId})">
      <img src=${PATH.deleteImagePath} alt="Delete"/>
      </button>
    </div>`
}

function getItemDetail(itemId) {
  const todoList = TODO_LIST_DATA[currentTabId]
  return todoList.find(todo => todo.id === itemId)
}

function setClearButtonForTodoContent(currentTabId) {
  return `<button class="modal__todo-clear-button" onclick="removeAllTodoItems('${currentTabId}')"><img src=${PATH.clearAllImagePath} alt="Clear"/></button>`
}

function validateInput(inputContent) {
  const addButton = document.querySelector('.modal__add-button')
  if (!inputContent.trim()) {
    addButton.classList.add('disable')
  } else {
    addButton.classList.remove('disable')
  }
  return
}

function addToDoItem() {
  let inputContent = document.querySelector('.modal__add-input')
  const inputContentTrimmed = inputContent.value.trim()

  if (!inputContentTrimmed) {
    return
  }

  const todoList = TODO_LIST_DATA[currentTabId]
  if (todoList.some(todo => todo.content === inputContentTrimmed)) {
    return
  }
  const todoIdMax = todoList.length
    ? todoList.reduce(
        (max, todo) => (todo.id > max ? todo.id : max),
        todoList[0].id
      )
    : 0
  const newId = todoIdMax + 1
  todoList.push({
    id: newId,
    content: inputContentTrimmed,
    completed: false
  })
  inputContent.value = ''
  validateInput(inputContent.value)
  getTodoListContent(currentTabId)
  return
}

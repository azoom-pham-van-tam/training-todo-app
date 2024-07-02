const PATH = {
  checkedImagePath: './assets/img/Check-Circle-Outline.png',
  uncheckedImagePath: './assets/img/Radio-Button-Unchecked.png',
  deleteImagePath: './assets/img/Delete-Outline.png',
  todoListContentPath: '.modal__content .modal__todo',
  navigationTabPath: '.modal__navigation button',
  clearAllImagePath: '"./assets/img/Clear-Complete.png"',
};

const TASKS_TAB_BUTTON_ID = {
  personal: 'personal-tab',
  professional: 'professional-tab',
};

const TODO_LIST_DATA = {
  personalTodoList: [
    {
      id: 1,
      content: 'Personal Work No. 1',
      completed: true,
    },
    {
      id: 2,
      content: 'Personal Work No. 2',
      completed: false,
    },
    {
      id: 3,
      content: 'Personal Work No. 3',
      completed: false,
    },
    {
      id: 4,
      content: 'Personal Work No. 4',
      completed: true,
    },
    {
      id: 5,
      content: 'Personal Work No. 5',
      completed: false,
    },
  ],
  professionalTodoList: [
    {
      id: 1,
      content: 'Professional Work No. 1',
      completed: true,
    },
    {
      id: 2,
      content: 'Professional Work No. 2',
      completed: false,
    },
    {
      id: 3,
      content: 'Professional Work No. 3',
      completed: false,
    },
    {
      id: 4,
      content: 'Professional Work No. 4',
      completed: true,
    },
    {
      id: 5,
      content: 'Professional Work No. 5',
      completed: false,
    },
  ],
};

let currentTabId = TASKS_TAB_BUTTON_ID.personal;
getTodoListContent(currentTabId);

function getTodoListContent(tabId) {
  let todoListContent = document.querySelector(PATH.todoListContentPath);
  let todoListItems = '';
  if (tabId === TASKS_TAB_BUTTON_ID.personal) {
    TODO_LIST_DATA.personalTodoList.forEach((personalTodo) => {
      todoListItems += setContentForTodoItem({
        itemId: personalTodo.id,
        completed: personalTodo.completed,
        content: personalTodo.content,
      });
    });

    todoListItems += setClearButtonForTodoContent(tabId);
    todoListContent.innerHTML = todoListItems;
    return;
  }
  TODO_LIST_DATA.professionalTodoList.forEach((professionalTodo) => {
    todoListItems += setContentForTodoItem({
      itemId: professionalTodo.id,
      completed: professionalTodo.completed,
      content: professionalTodo.content,
    });
  });
  todoListItems += setClearButtonForTodoContent(tabId);
  todoListContent.innerHTML = todoListItems;
  return;
}

function selectTab(tabId) {
  const tabs = document.querySelectorAll(PATH.navigationTabPath);
  tabs.forEach((tab) => {
    if (tab.classList.contains('selected')) {
      tab.classList.remove('selected');
    }
  });
  const currentTab = document.getElementById(tabId);
  currentTab.classList.add('selected');
  currentTabId = tabId;
  getTodoListContent(tabId);
}

function toggleCheckbox(checkboxImageId, contentId) {
  const checkboxImage = document.getElementById(checkboxImageId);
  if (checkboxImage.src.match(PATH.checkedImagePath)) {
    checkboxImage.src = PATH.uncheckedImagePath;
    updateTaskContent(contentId, false);
    getTodoListContent(currentTabId);
  } else {
    checkboxImage.src = PATH.checkedImagePath;
    updateTaskContent(contentId, true);
    getTodoListContent(currentTabId);
  }
}

function updateTaskContent(contentId, status) {
  if (currentTabId === TASKS_TAB_BUTTON_ID.personal) {
    return TODO_LIST_DATA.personalTodoList.forEach((personalTodo) => {
      if (personalTodo.id === contentId) {
        personalTodo.completed = status;
      }
    });
  }

  return TODO_LIST_DATA.professionalTodoList.forEach((professionalTodo) => {
    if (professionalTodo.id === contentId) {
      professionalTodo.completed = status;
    }
  });
}

function removeTodoItem(itemId) {
  const item = getItemDetail(itemId);
  const confirmMessage = `${item.content} will be deleted. Are you sure?`;
  const isConfirmed = confirm(confirmMessage);

  if (!isConfirmed) {
    return;
  }

  const { personalTodoList, professionalTodoList } = TODO_LIST_DATA;
  if (currentTabId === TASKS_TAB_BUTTON_ID.personal) {
    const index = personalTodoList.findIndex((personalTodo) => personalTodo.id === itemId);
    personalTodoList.splice(index, 1);
    getTodoListContent(currentTabId);
    return;
  }

  const index = professionalTodoList.findIndex((professionalTodo) => professionalTodo.id === itemId);
  professionalTodoList.splice(index, 1);
  getTodoListContent(currentTabId);
  return;
}

function removeAllTodoItems(tabId) {
  const confirmMessage = `All tasks done will be deleted. Are you sure?`;
  const isConfirmed = confirm(confirmMessage);
  if (!isConfirmed) {
    return;
  }

  if (tabId === TASKS_TAB_BUTTON_ID.personal) {
    TODO_LIST_DATA.personalTodoList = TODO_LIST_DATA.personalTodoList.filter((personalTodo) => personalTodo.completed !== true);
    getTodoListContent(tabId);
    return;
  }

  TODO_LIST_DATA.professionalTodoList = TODO_LIST_DATA.professionalTodoList.filter((professional) => professional.completed !== true);
  getTodoListContent(tabId);
  return;
}

function setContentForTodoItem({ itemId, completed, content }) {
  return `<div id="modal__todo-item-${itemId}" class ="modal__todo-item">
      <button class="modal__todo-check-button" onclick="toggleCheckbox('checkboxImage-${itemId}', ${itemId})">
        <img id="checkboxImage-${itemId}" src=${completed ? PATH.checkedImagePath : PATH.uncheckedImagePath} alt="Unchecked Checkbox" />
      </button>
      <div class="modal__todo-item-content ${completed ? 'checked-task' : ''}">
        ${content}
      </div>
      <button class="modal__todo-delete-button" onclick="removeTodoItem(${itemId})">
      <img src=${PATH.deleteImagePath} alt="Delete"/>
      </button>
    </div>`;
}

function getItemDetail(itemId) {
  const { personalTodoList, professionalTodoList } = TODO_LIST_DATA;
  if (currentTabId === TASKS_TAB_BUTTON_ID.personal) {
    return personalTodoList.find((personalTodo) => personalTodo.id === itemId);
  }
  return professionalTodoList.find((professionalTodo) => professionalTodo.id === itemId);
}

function setClearButtonForTodoContent(currentTabId) {
  return `<button class="modal__todo-clear-button" onclick="removeAllTodoItems('${currentTabId}')"><img src=${PATH.clearAllImagePath} alt="Clear"/></button>`;
}

function validateInput(inputContent) {
  const addButton = document.querySelector('.modal__add-button');
  console.log('call validateINput');
  if (!inputContent.trim()) {
    addButton.classList.add('disable');
  } else {
    addButton.classList.remove('disable');
  }
}

function addToDoItem() {
  let inputContent = document.querySelector('.modal__add-input');
  const inputContentTrimmed = inputContent.value.trim();

  if (!inputContentTrimmed) {
    return;
  }

  if (currentTabId === TASKS_TAB_BUTTON_ID.personal) {
    const personalTodoList = TODO_LIST_DATA.personalTodoList;
    if (personalTodoList.some((personalTodo) => personalTodo.content === inputContentTrimmed)) {
      return;
    }

    const personalTodoIdMax = personalTodoList.length ? personalTodoList.reduce((max, personalTodo) => (personalTodo.id > max.id ? personalTodo : max), personalTodoList[0]) : 0;
    const newId = personalTodoIdMax.id + 1;
    personalTodoList.push({
      id: newId,
      content: inputContentTrimmed,
      completed: false,
    });
    inputContent.value = '';
    validateInput(inputContent.value);
    getTodoListContent(currentTabId);
    return;
  }

  const professionalTodoList = TODO_LIST_DATA.professionalTodoList;
  if (professionalTodoList.some((professionalTodo) => professionalTodo.content === inputContentTrimmed)) {
    return;
  }

  const professionalTodoIdMax = professionalTodoList.length
    ? professionalTodoList.reduce((max, professionalTodo) => (professionalTodo.id > max.id ? professionalTodo : max), professionalTodoList[0])
    : 0;
  const newId = professionalTodoIdMax.id + 1;
  professionalTodoList.push({
    id: newId,
    content: inputContentTrimmed,
    completed: false,
  });
  inputContent.value = '';
  validateInput(inputContent.value);
  getTodoListContent(currentTabId);
  return;
}

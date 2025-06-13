import todoManager from "./todo";
import projectManager from "./project";
import storageManager from "./storageManager";
import { format, isAfter, isBefore, startOfDay, isToday } from "date-fns";

const domManager = (() => {
  let projectsList = document.getElementById("projectsList");
  let projectTitle = document.getElementById("projectTitle");
  let todosDisplay = document.getElementById("todosDisplay");

  const allButton = document.getElementById("allButton");
  const todayButton = document.getElementById("todayButton");
  const overdueButton = document.getElementById("overdueButton");
  const completedButton = document.getElementById("completedButton");
  const addProjButton = document.getElementById("addProject");

  const projFormContainer = document.getElementById("projFormContainer");
  const cancelProjButton = document.getElementById("cancelProj");
  const projectForm = document.getElementById("newProjectForm");

  const todoFormContainer = document.getElementById("todoFormContainer");
  const todoForm = document.getElementById("newTodoForm");
  const newTodoButton = document.getElementById("newTodo");
  const cancelTodoButton = document.getElementById("cancelTodo");
  let selectProject = document.getElementById("selectProject");

  const displayTodo = (todo, projectSpecific = false) => {
    let wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
    let todoDiv = document.createElement("div");
    todoDiv.classList.add("todoDiv");

    let todoCheck = document.createElement("div");
    todoCheck.classList.add("buttonContainer");
    todoCheck.innerHTML = "<input type='checkbox'>";
    todoCheck.addEventListener("click", () => {
      todo.toggleCompletion();
      storageManager.saveTodosToStorage();
      if (!projectSpecific) {
        wrapper.remove();
      } else {
        if (todo.completed) {
          todoDiv.classList.add("checkedComplete");
        } else if (!todo.completed) {
          todoDiv.classList.remove("checkedComplete");
        }
      }
    });

    let todoContent = document.createElement("div");
    todoContent.classList.add("todoContent");

    let todoIcons = document.createElement("div");
    todoIcons.classList.add("todoIcons");
    let editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid", "fa-edit");
    editIcon.addEventListener("click", () => {
        todoDiv.classList.add("hidden");
        todoEditForm.classList.remove("hidden");
    });
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash");
    deleteIcon.addEventListener("click", () => {
      todoManager.deleteTodo(todo);
      storageManager.saveTodosToStorage();
      wrapper.remove();
    });
    todoIcons.appendChild(editIcon);
    todoIcons.appendChild(deleteIcon);

    let todoName = document.createElement("div");
    todoName.classList.add("todoName");
    todoName.textContent = todo.name;
    todoContent.appendChild(todoName);

    if (todo.description !== "") {
      let todoDescription = document.createElement("div");
      todoDescription.classList.add("todoDescription");
      todoDescription.textContent = todo.description;
      todoContent.appendChild(todoDescription);
    }

    let todoLabels = document.createElement("div");
    todoLabels.classList.add("todoLabels");

    let todoDate = document.createElement("div");
    todoDate.classList.add("label", "todoDate");
    if (isToday(todo.dueDate)) {
      todoDate.innerHTML = "<i class='fa-regular fa-calendar'></i> Today";
    } else {
      todoDate.innerHTML =
        "<i class='fa-regular fa-calendar'></i> " +
        format(todo.dueDate, "EEE, MMM dd, yyyy");
    }
    todoLabels.appendChild(todoDate);

    let todoPriority = document.createElement("div");
    todoPriority.classList.add("label", "todoPriority");
    todoPriority.innerHTML =
      "<i class='fa-solid fa-circle-exclamation'></i> " + todo.priority;
    todoLabels.appendChild(todoPriority);

    if (!projectSpecific) {
      let todoProject = document.createElement("div");
      todoProject.classList.add("label", "todoProject");
      todoProject.innerHTML =
        "<i class='fa-regular fa-folder'></i> " +
        projectManager.getTitleFromId(todo.projectId);
      todoLabels.appendChild(todoProject);
    }

    if (projectSpecific) {
      if (todo.completed) {
        todoDiv.classList.add("checkedComplete");
      } else if (!todo.completed) {
        todoDiv.classList.remove("checkedComplete");
      }
    }

    todoContent.appendChild(todoLabels);

    todoDiv.appendChild(todoCheck);
    todoDiv.appendChild(todoContent);
    todoDiv.appendChild(todoIcons);
    let todoEditForm = createEditForm(todo);
    wrapper.appendChild(todoDiv);
    wrapper.appendChild(todoEditForm);
    todosDisplay.appendChild(wrapper);
  };

  const createEditForm = (todo) => {
    const projectsOptions = projectManager.projectList.map(project =>
        `<option value="${project.title}" ${todo.projectId == project.id ? 'selected' : ''}>${project.title}</option>`).join('');

    const editFormHTML = `<form id="editTodoForm" class="hidden">
                <input name="editedTaskName" type="text" id="editTodoTitle" placeholder="Task Name (required)" value="${todo.name}" required />
                <input name="editedTaskDescription" type="text" id="editTodoDescription" placeholder="Describe the task (optional)" value="${todo.description}" />
                <div>
                    <input name="editedTaskDate" type="date" id="editTodoDueDate" value="${todo.dueDate}" required />
                    <select name="editedTaskPriority" required>
                        <option value="" disabled>Priority (required)</option>
                        <option value="Low" ${todo.priority == 'Low' ? 'selected' : ''}>Low</option>
                        <option value="Medium" ${todo.priority == 'Medium' ? 'selected' : ''}>Medium</option>
                        <option value="Urgent" ${todo.priority == 'Urgent' ? 'selected' : ''}>Urgent</option>
                    </select>
                    <select name="editedTaskProject" id="selectProject" required>
                        <option value="" selected disabled>Project (required)</option>
                        ${projectsOptions}
                    </select>
                </div>
                <div class="todoFormButtons">
                    <button id="cancelEditTodo">Cancel</button>
                    <button id="saveTodo" type="submit">Save</button>
                </div>
            </form>
            `

    const container = document.createElement("div");
    container.innerHTML = editFormHTML;

    const editForm = container.querySelector("form");
            
    editForm.addEventListener("submit", function(event) {
      event.preventDefault();

      const editedTodoData = new FormData(editForm);

      const name = editedTodoData.get("editedTaskName");
      const dueDate = editedTodoData.get("editedTaskDate");
      const priority = editedTodoData.get("editedTaskPriority");
      const projectName = editedTodoData.get("editedTaskProject");
      const projectId = projectManager.getIdFromTitle(projectName);
      const description = editedTodoData.get("editedTaskDescription");
      editForm.reset();
      todo.editTask(name, description, dueDate, priority, projectId);
    

      storageManager.saveTodosToStorage();
      editForm.classList.add("hidden");
      refreshCurrentDisplay();
    });

    editForm.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        editForm.dispatchEvent(new Event("submit"));
      }
    });

    const cancelEdit = container.querySelector("#cancelEditTodo");
    cancelEdit.addEventListener("click", () => {
        editForm.classList.add("hidden");
        refreshCurrentDisplay();
    });

    return editForm;
  }

  const displayAllTodos = () => {
    todosDisplay.innerHTML = "";
    projectTitle.textContent = "All Tasks";
    for (const todo of todoManager.filterIncompleted()) {
      displayTodo(todo);
    }
  };

  const displayTodayTodos = () => {
    todosDisplay.innerHTML = "";
    projectTitle.textContent = "Today's Tasks";
    for (const todo of todoManager.filterIncompleted()) {
      if (isToday(todo.dueDate)) {
        displayTodo(todo);
      }
    }
  };

  const displayOverdueTodos = () => {
    let today = new Date();
    todosDisplay.innerHTML = "";
    projectTitle.textContent = "Overdue Tasks";
    for (const todo of todoManager.filterIncompleted()) {
      if (isBefore(todo.dueDate, startOfDay(today))) displayTodo(todo);
    }
  };

  const displayCompletedTodos = () => {
    todosDisplay.innerHTML = "";
    projectTitle.textContent = "Completed Tasks";
    for (const todo of todoManager.filterCompleted()) {
      displayTodo(todo);
    }
  };

  const displayProjectTodos = (projectId) => {
    todosDisplay.innerHTML = "";
    let idToTitle = projectManager.getTitleFromId(projectId);
    projectTitle.textContent = idToTitle;
    const filteredProject = todoManager.filterProject(projectId);
    for (let i = 0; i < filteredProject.length; i++) {
      displayTodo(filteredProject[i], true);
    }
  };

  const displaySelectProject = () => {
    selectProject.innerHTML =
      "<option value='' selected disabled>Project (required)</option>";
    for (const project of projectManager.projectList) {
      let projectOption = document.createElement("option");
      projectOption.setAttribute("value", project.title);
      projectOption.textContent = project.title;
      selectProject.appendChild(projectOption);
    }
  };

  const displayProjectsList = () => {
    projectsList.innerHTML = "";
    for (const project of projectManager.projectList) {
      let projectDiv = document.createElement("div");
      projectDiv.classList.add("sidebutton");
      projectDiv.innerHTML = "<i class='fas fa-folder'></i>" + project.title;
      projectDiv.addEventListener("click", () => {
        displayProjectTodos(project.id);
      });
      projectsList.appendChild(projectDiv);
    }
  };

  const getCurrentDisplay = () => {
    return projectTitle.textContent;
  };

  const refreshCurrentDisplay = () => {
    let current = getCurrentDisplay();
    if (current == "All Tasks") {
      displayAllTodos();
    } else if (current == "Today's Tasks") {
      displayTodayTodos();
    } else if (current == "Overdue Tasks") {
      displayOverdueTodos();
    } else if (current == "Completed Tasks") {
      displayCompletedTodos();
    } else {
      displayProjectTodos(projectManager.getIdFromTitle(current));
    }
  };

  const init = () => {

    allButton.addEventListener("click", () => {
      displayAllTodos();
    });

    todayButton.addEventListener("click", () => {
      displayTodayTodos();
    });

    overdueButton.addEventListener("click", () => {
      displayOverdueTodos();
    });

    completedButton.addEventListener("click", () => {
      displayCompletedTodos();
    });

    addProjButton.addEventListener("click", () => {
      projFormContainer.classList.remove("hidden");
    });

    cancelProjButton.addEventListener("click", () => {
      projectForm.reset();
      projFormContainer.classList.add("hidden");
    });

    newTodoButton.addEventListener("click", () => {
      todoFormContainer.classList.remove("hidden");
    });

    cancelTodoButton.addEventListener("click", () => {
      todoForm.reset();
      todoFormContainer.classList.add("hidden");
    });

    projectForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const title = document.getElementById("newProjTitle").value;
      projectForm.reset();
      projectManager.addProject(title);
      projFormContainer.classList.add("hidden");
      storageManager.saveProjectsToStorage();
      displayProjectsList();
      displaySelectProject();
    });

    todoForm.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        todoForm.dispatchEvent(new Event("submit"));
      }
    });

    todoForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const todoData = new FormData(todoForm);

      const name = todoData.get("taskName");
      const dueDate = todoData.get("taskDate");
      const priority = todoData.get("taskPriority");
      const projectName = todoData.get("taskProject");
      const projectId = projectManager.getIdFromTitle(projectName);
      const description = todoData.get("taskDescription");
      todoForm.reset();
      todoManager.addTodo(name, description, dueDate, priority, false, projectId);
      todoFormContainer.classList.add("hidden");

      storageManager.saveTodosToStorage();

      refreshCurrentDisplay();
    });

    displayProjectsList();
    displaySelectProject();
  };

  return {
    displayAllTodos,
    displayCompletedTodos,
    displayProjectTodos,
    displayProjectsList,
    displaySelectProject,
    init
  };
})();

export default domManager;

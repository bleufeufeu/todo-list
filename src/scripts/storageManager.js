import todoManager from "./todo"
import projectManager from "./project"

const storageManager = (() => {
    const saveProjectsToStorage = () => {
    localStorage.setItem("projects", JSON.stringify(projectManager.projectList))
    console.log(projectManager.projectList);
  }
  
  const saveTodosToStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todoManager.todosList))
    console.log(todoManager.todosList);
  }

  const convertToProject = (projects) => {
    let newProjectList = [];

    for (const project of projects) {
        newProjectList.push(new projectManager.Project(project.title, project.id));
    }

    return newProjectList;
  }

  const convertToTodo = (todos) => {
    let newTodosList = []

    for (const todo of todos) {
        newTodosList.push(new todoManager.Todo(todo.name, todo.description, new Date(todo.dueDate), todo.priority, todo.completed, todo.projectId));
    }

    return newTodosList;
  }

  const loadFromLocalStorage = () => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects) {
      const newProjects = convertToProject(JSON.parse(storedProjects))
      projectManager.projectList.length = 0;
      projectManager.projectList.push(...newProjects);
    }

    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
        const newTodos = convertToTodo(JSON.parse(storedTodos));
        todoManager.todosList.length = 0;
        todoManager.todosList.push(...newTodos);
    }

    console.log("=== AFTER LOADING FROM STORAGE ===");
console.log("todoManager.todosList:", todoManager.todosList);
console.log("Length:", todoManager.todosList.length);
console.log("Sample todo:", todoManager.todosList[0]);

    console.log(projectManager.projectList);
    console.log(todoManager.todosList);
    todoManager.filterIncompleted();

  };

  return {
    saveProjectsToStorage,
    saveTodosToStorage,
    loadFromLocalStorage
  }
})();

export default storageManager;
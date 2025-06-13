const todoManager = (() => {
  class Todo {
    constructor(name, description = "", dueDate, priority, completed=false, projectId) {
      this.name = name;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.completed = completed;
      this.projectId = projectId;
    }

    editTask(newName, newDescription, newDueDate, newPriority, projectId) {
      this.name = newName;
      this.description = newDescription;
      this.dueDate = newDueDate;
      this.priority = newPriority;
      this.projectId = projectId;
    }

    toggleCompletion() {
      this.completed = !this.completed;
    }
  }

  let todosList = [
  
  ];

  function addTodo(name, description, dueDate, priority, completed, projectId) {
    this.todosList.push(
      new Todo(name, description, dueDate, priority, completed, projectId),
    );
  }

  function deleteTodo(toDelete) {
    console.log(this.todosList);

    const index = this.todosList.indexOf(toDelete);
    if (index > -1) {
      this.todosList.splice(index, 1);
    }
    console.log(this.todosList);
  }

  function filterProject(projectId) {
    return todosList.filter((todo) => todo.projectId === projectId);
  }

  function filterCompleted() {
    return todosList.filter((todo) => todo.completed === true);
  }

  function filterIncompleted() { 
    const result = todosList.filter((todo) => {
      return todo.completed === false;
    });

    return result;
  }

  return {
    Todo,
    todosList,
    addTodo,
    deleteTodo,
    filterProject,
    filterCompleted,
    filterIncompleted,
  };
})();

export default todoManager;

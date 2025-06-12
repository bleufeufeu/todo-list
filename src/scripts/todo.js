const todoManager = (() => {
  class Todo {
    constructor(name, description = "", dueDate, priority, projectId) {
      this.name = name;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.completed = false;
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
    new Todo(
      "Test Todo",
      "Hello World",
      "2025-01-01",
      "Urgent",
      "k7x2m9p1q",
    ),
    new Todo("Finish the website", "", "2025-06-12", "Low", "pofewfqwefo"),
  ];

  function addTodo(name, description, dueDate, priority, projectId) {
    this.todosList.push(
      new Todo(name, description, dueDate, priority, projectId),
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
    return todosList.filter((todo) => todo.completed === false);
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

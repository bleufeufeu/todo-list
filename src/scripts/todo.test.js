import todoManager from "./todo.js";

test("Creates a todo", () => {
  const newTodo = new todoManager.Todo(
    "Task",
    "new task",
    "tomorrow",
    "no notes",
    "k7x2m9p1q",
  );
  expect(newTodo.dueDate).toBe("tomorrow");
});

test("Adds a todo to the list", () => {
  todoManager.addTodo("Task", "new task", "tomorrow", "no notes", "k7x2m9p1q");
  expect(todoManager.todosList.length).toBe(3);
});
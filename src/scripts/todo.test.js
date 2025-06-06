import Todo from "./todo.js";

test("Creates a todo", () => {
    const newTodo = new Todo("Task", "new task", "tomorrow", 1, "no notes");
    expect(newTodo.name).toBe("Task");
});

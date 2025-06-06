import Project from "./project.js";

test("Creates a project", () => {
    const newTodo = new Project("Test Project");
    expect(newTodo.name).toBe("Test Project");
});

test("Can change name", () => {
    const newTodo = new Project("Test Project");
    newTodo.editName("New Name");
    expect(newTodo.name).toBe("New Name");
});

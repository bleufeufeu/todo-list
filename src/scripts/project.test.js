import projectManager from "./project.js";

test("Creates a project", () => {
  projectManager.addProject("New Project");
  expect(projectManager.projectList).toHaveLength(3);
});

test("Can change name", () => {
  projectManager.addProject("Second Project");
  expect(projectManager.getProject("Second Project").title).toBe(
    "Second Project",
  );
});

test("Can get project title", () => {
  expect(projectManager.getTitleFromId("pofewfqwefo")).toBe(
    "My Second Project",
  );
});

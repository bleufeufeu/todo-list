export default class Project {
    constructor(name) {
        this.name = name;
        this.todoList = [];
    }

    editName(newName) {
        this.name = newName;
    }

    addTask(task) {
        this.todoList.push(task);
    }

    deleteTask(index) {
        this.todoList.splice(index, 1);
    }
}
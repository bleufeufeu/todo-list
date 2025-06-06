export default class Todo {
  constructor(name, description, dueDate, priority, notes) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.completed = false;
  }

  editTask(newName, newDescription, newDueDate, newPriority, newNotes) {
    this.name = newName;
    this.description = newDescription;
    this.dueDate = newDueDate;
    this.priority = newPriority;
    this.notes = newNotes;
  }

  toggleCompletion() {
    this.completed = !this.completed;
  }
}

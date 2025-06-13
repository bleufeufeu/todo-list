import "./styles.css";
import domManager from "./scripts/domManager.js";
import storageManager from "./scripts/storageManager.js";

storageManager.loadFromLocalStorage();
domManager.init();
domManager.displayAllTodos();

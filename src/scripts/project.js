const projectManager = (() => {
  let projectList = [];

  projectList = [
    {
      title: "Hello World",
      id: "k7x2m9p1q",
    },
    {
      title: "My Second Project",
      id: "pofewfqwefo",
    },
  ];

  class Project {
    constructor(title) {
      this.title = title;
      this.id = Math.random().toString(36).slice(2, 9);
    }

    get projectTitle() {
      return this.title;
    }

    get projectId() {
      return this.id;
    }
  }

  function addProject(title) {
    projectList.push(new Project(title));
  }

  function deleteProject(index) {
    if (index > -1 && index < projectList.length) {
      projectList.splice(index, 1);
    }
  }

  function getProject(title) {
    const project = projectList.find((project) => project.title === title);
    return project || null;
  }

  function getTitleFromId(projectId) {
    const project = projectList.find((project) => project.id === projectId);
    return project ? project.title : null;
  }

  function getIdFromTitle(projectTitle) {
    const project = projectList.find(
      (project) => project.title === projectTitle,
    );
    return project ? project.id : null;
  }

  function editProject(title, index) {
    if (index > -1 && index < projectList.length) {
      projectList[index].title = title;
    }
  }

  return {
    projectList,
    Project,
    addProject,
    deleteProject,
    getProject,
    getTitleFromId,
    getIdFromTitle,
    editProject,
  };
})();

export default projectManager;

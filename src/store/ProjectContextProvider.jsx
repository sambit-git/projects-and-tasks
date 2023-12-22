import { createContext, useReducer } from "react";

const KEY_PROJECTS = "projects";
const KEY_SELECTED_PROJECT = "selectedProject";
const KEY_TASKS = "tasks";

const loadData = () => {
  let storedProjects = localStorage.getItem(KEY_PROJECTS);
  let storedSelectedProject = localStorage.getItem(KEY_SELECTED_PROJECT);
  let storedTasks = localStorage.getItem(KEY_TASKS);

  if (storedProjects) {
    storedProjects = JSON.parse(storedProjects);
  } else {
    storedProjects = [];
  }
  if (storedSelectedProject) {
    if (storedProjects == "null") storedProjects = null;
    else if (storedSelectedProject == "undefined") {
      storedSelectedProject = undefined;
    } else {
      storedSelectedProject = parseInt(storedSelectedProject, 10);
    }
  }
  if (storedTasks) {
    storedTasks = JSON.parse(storedTasks);
  } else {
    storedTasks = [];
  }
  const storedData = {
    projects: storedProjects,
    selected: storedSelectedProject,
    tasks: storedTasks,
  };
  return storedData;
};

export const ProjectContext = createContext({
  projects: [],
  selected: null,
  tasks: [],
  showNewProjectForm: () => {},
  hideNewProjectForm: () => {},
  addProject: (newProject) => {},
  selectProject: (id) => {},
  addTask: (task) => {},
  deleteProject: (projectId) => {},
});

const projectReducer = (state, action) => {
  if (action.type === "SHOW_PROJECT_FORM") {
    localStorage.setItem(KEY_SELECTED_PROJECT, "undefined");
    return { ...state, selected: undefined };
  } else if (action.type === "HIDE_PROJECT_FORM") {
    localStorage.setItem(KEY_SELECTED_PROJECT, "null");
    return { ...state, selected: null };
  } else if (action.type === "SELECT_PROJECT") {
    localStorage.setItem(KEY_SELECTED_PROJECT, action.payload);
    return { ...state, selected: action.payload };
  } else if (action.type === "ADD_PROJECT") {
    const id = state.projects.length + 1;
    const newState = {
      ...state,
      projects: [...state.projects, { ...action.payload, id }],
      selected: id,
    };
    localStorage.setItem(KEY_SELECTED_PROJECT, newState.selected);
    localStorage.setItem(KEY_PROJECTS, JSON.stringify(newState.projects));
    return newState;
  } else if (action.type === "DELETE_PROJECT") {
    const newState = {
      ...state,
      projects: [
        ...state.projects.filter((project) => project.id !== action.payload),
      ],
      tasks: [
        ...state.tasks.filter((task) => task.projectId !== action.payload),
      ],
      selected: null,
    };
    localStorage.setItem(KEY_SELECTED_PROJECT, newState.selected);
    localStorage.setItem(KEY_PROJECTS, JSON.stringify(newState.projects));
    localStorage.setItem(KEY_TASKS, JSON.stringify(newState.tasks));
    return newState;
  } else if (action.type === "ADD_TASK") {
    const newState = {
      ...state,
      tasks: [
        ...state.tasks,
        {
          ...action.payload,
          id: state.tasks.length + 1,
        },
      ],
    };
    localStorage.setItem(KEY_TASKS, JSON.stringify(newState.tasks));

    return newState;
  }
};

export const ProjectContextProvider = ({ children }) => {
  const [projectsState, projectsStateDispatch] = useReducer(
    projectReducer,
    loadData()
  );

  const showNewProjectForm = () => {
    projectsStateDispatch({ type: "SHOW_PROJECT_FORM" });
  };
  const hideNewProjectForm = () => {
    projectsStateDispatch({ type: "HIDE_PROJECT_FORM" });
  };
  const addProject = (newProject) => {
    projectsStateDispatch({ type: "ADD_PROJECT", payload: newProject });
  };
  const selectProject = (id) => {
    projectsStateDispatch({ type: "SELECT_PROJECT", payload: id });
  };
  const addTask = (task) => {
    projectsStateDispatch({ type: "ADD_TASK", payload: task });
  };
  const deleteProject = (projectId) => {
    projectsStateDispatch({ type: "DELETE_PROJECT" });
  };

  const ctx = {
    projects: projectsState.projects,
    selected: projectsState.selected,
    tasks: projectsState.tasks,
    showNewProjectForm,
    hideNewProjectForm,
    addProject,
    selectProject,
    addTask,
    deleteProject,
  };
  return (
    <ProjectContext.Provider value={ctx}>{children}</ProjectContext.Provider>
  );
};

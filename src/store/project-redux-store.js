import { createStore } from "redux";

const KEY_PROJECTS = "projects";
const KEY_SELECTED_PROJECT = "selected";
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

const initialState = loadData();

const projectReducer = (state = initialState, action) => {
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
  return state;
};

export const store = createStore(projectReducer);

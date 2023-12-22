import { useState } from "react";
import MainContent from "./components/MainContent";
import Navs from "./components/Navs";
import AddProject from "./components/AddProject";
import NoProjects from "./components/NoProjects";
import ProjectDetails from "./components/ProjectDetails";

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

function App() {
  const [projectsState, setProjectsState] = useState(loadData());

  const handleShowAddProject = () => {
    setProjectsState((prevState) => ({ ...prevState, selected: undefined }));
    localStorage.setItem(KEY_SELECTED_PROJECT, "undefined");
  };

  const handleHideAddProject = () => {
    setProjectsState((prevState) => ({ ...prevState, selected: null }));
    localStorage.setItem(KEY_SELECTED_PROJECT, "null");
  };

  const handleSaveProject = (newProject) => {
    setProjectsState((prevState) => {
      const id = prevState.projects.length + 1;
      const newState = {
        ...prevState,
        projects: [...prevState.projects, { ...newProject, id }],
        selected: id,
      };
      localStorage.setItem(KEY_SELECTED_PROJECT, newState.selected);
      localStorage.setItem(KEY_PROJECTS, JSON.stringify(newState.projects));
      return newState;
    });
  };

  const handleSelectProject = (id) => {
    setProjectsState((prevState) => ({ ...prevState, selected: id }));
    localStorage.setItem(KEY_SELECTED_PROJECT, id);
  };

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selected
  );

  const handleAddTask = (task) => {
    setProjectsState((prevState) => {
      const newState = {
        ...prevState,
        tasks: [
          ...prevState.tasks,
          {
            ...task,
            id: prevState.tasks.length + 1,
          },
        ],
      };
      localStorage.setItem(KEY_TASKS, JSON.stringify(newState.tasks));

      return newState;
    });
  };

  const handleDeleteProject = (projectId) => {
    setProjectsState((prevState) => {
      const newState = {
        ...prevState,
        projects: [
          ...prevState.projects.filter((project) => project.id !== projectId),
        ],
        tasks: [
          ...prevState.tasks.filter((task) => task.projectId !== projectId),
        ],
        selected: null,
      };
      localStorage.setItem(KEY_SELECTED_PROJECT, newState.selected);
      localStorage.setItem(KEY_PROJECTS, JSON.stringify(newState.projects));
      localStorage.setItem(KEY_TASKS, JSON.stringify(newState.tasks));
      return newState;
    });
  };

  const showContent =
    projectsState.selected === undefined ? (
      <AddProject
        onCancelProject={handleHideAddProject}
        onProjectSave={handleSaveProject}
      />
    ) : projectsState.selected === null ? (
      <NoProjects onAddProject={handleShowAddProject} />
    ) : (
      <ProjectDetails
        onAddTask={handleAddTask}
        tasks={projectsState.tasks}
        onDelete={handleDeleteProject}
        {...selectedProject}
      />
    );

  return (
    <>
      <Navs
        selected={projectsState.selected}
        projects={projectsState.projects}
        onAddProject={handleShowAddProject}
        onProjectSelect={handleSelectProject}
      />

      <MainContent>{showContent}</MainContent>
    </>
  );
}

export default App;

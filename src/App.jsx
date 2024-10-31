import ProjectsSidebar from './components/ProjectsSidebar'
import NewProject from './components/NewProject'
import NoProjectSelected from './components/NoProjectSelected';
import { useState } from 'react';
import SelectedProject from './components/SelectedProject'

function App() {
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: []
  });

  function handleAddTask(projectId, taskData) {
    setProjectsState(prevState => {
      const newTask = {
        ...taskData,
        id: Math.random()
      }

      return {
        ...prevState,
        projects: prevState.projects.map(project => {
          if (project.id === projectId) {
            return {
              ...project,
              tasks: project.tasks ? [newTask, ...project.tasks] : [newTask]
            }
          } else {
            return { ...project }
          }
        })
      }
    })
  }

  function handleDeleteTask(projectId, taskId) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        projects: prevState.projects.map(project => {
          if (project.id === projectId) {
            return {
              ...project,
              tasks: project.tasks.filter(task => task.id !== taskId)
            }
          } else {
            return { ...project }
          }
        })
      }
    })
  }

  function handleStartAddProject() {
    setProjectsState(prevProjectsState => ({
      ...prevProjectsState,
      selectedProjectId: null,
    }))
  }

  function handleAddProject(projectData) {
    setProjectsState(prevProjectsState => {
      const id = Math.random();
      const newProject = {
        ...projectData,
        id
      }

      return {
        ...prevProjectsState,
        selectedProjectId: undefined,
        projects: [...prevProjectsState.projects, newProject]
      }
    })
  }

  function handleCancelAddProject() {
    setProjectsState(prevProjectsState => ({
      ...prevProjectsState,
      selectedProjectId: undefined,
    }))
  }

  function handleSelectProject(id) {
    setProjectsState(prevProjectsState => ({
      ...prevProjectsState,
      selectedProjectId: id,
    }))
  }

  function handleDeleteProject(id) {
    setProjectsState(prevProjectsState => ({
      ...prevProjectsState,
      selectedProjectId: undefined,
      projects: prevProjectsState.projects.filter(project => project.id !== prevProjectsState.selectedProjectId)
    }))
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  console.log(projectsState);

  let content = projectsState.selectedProjectId === null
    ? <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    : projectsState.selectedProjectId === undefined
      ? <NoProjectSelected onStartAddProject={handleStartAddProject} />
      : <SelectedProject project={selectedProject} onDelete={handleDeleteProject} onAddTask={handleAddTask} onDeleteTask={handleDeleteTask} />;

  return (
    <main className='h-screen my-8 flex gap-8'>
      <ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectsState.selectedProjectId} />
      {content}
    </main>
  );
}

export default App;

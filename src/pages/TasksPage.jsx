import { useEffect, useState } from 'react'
import { createTask, deleteTask, getTasks, updateTaskStatus } from '../api/tasksApi'
import './TasksPage.css'

const taskFilters = ['All', 'Todo', 'In Progress', 'Done']

function TasksPage({ onLogout }) {
  const [tasks, setTasks] = useState([])
  const [taskName, setTaskName] = useState('')
  const [taskNameError, setTaskNameError] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [addTaskError, setAddTaskError] = useState('')
  const [loadTasksError, setLoadTasksError] = useState('')
  const [isLoadingTasks, setIsLoadingTasks] = useState(true)
  const [isAddingTask, setIsAddingTask] = useState(false)
  const [deletingTaskIds, setDeletingTaskIds] = useState([])
  const [deleteTaskError, setDeleteTaskError] = useState('')
  const [statusTaskIds, setStatusTaskIds] = useState([])
  const [statusTaskError, setStatusTaskError] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadTasks() {
      try {
        const result = await getTasks()
        const taskList = Array.isArray(result) ? result : result?.data
        if (!Array.isArray(taskList)) {
          throw new Error('API response is not a task list')
        }
        if (isActive) setTasks(taskList)
      } catch {
        if (isActive) setLoadTasksError('Nepavyko įkelti užduočių iš duomenų bazės.')
      } finally {
        if (isActive) setIsLoadingTasks(false)
      }
    }

    loadTasks()
    return () => {
      isActive = false
    }
  }, [])

  const filteredTasks =
    selectedFilter === 'All'
      ? tasks
      : tasks.filter((task) => task.status === selectedFilter)

  async function handleAddTask(event) {
    event.preventDefault()

    const title = taskName.trim()
    if (!title) {
      setTaskNameError('Task title is empty')
      return
    }
    if (isAddingTask) return

    setTaskNameError('')
    setAddTaskError('')
    setIsAddingTask(true)
    try {
      const createdTask = await createTask({ title, status: 'Todo' })
      if (createdTask) {
        setTasks((currentTasks) => [...currentTasks, createdTask])
        setTaskName('')
      } else {
        setAddTaskError('Užduotis sukurta, bet API negrąžino jos duomenų.')
      }
    } catch {
      setAddTaskError('Nepavyko sukurti užduoties. Bandykite dar kartą.')
    } finally {
      setIsAddingTask(false)
    }
  }

  async function handleStatusChange(id, newStatus) {
    const currentTask = tasks.find((task) => task.id === id)
    if (!currentTask || statusTaskIds.includes(id)) return

    setStatusTaskError('')
    setStatusTaskIds((currentIds) => [...currentIds, id])
    try {
      await updateTaskStatus(id, currentTask.title, newStatus)
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        )
      )
    } catch {
      setStatusTaskError('Nepavyko pakeisti užduoties būsenos. Bandykite dar kartą.')
    } finally {
      setStatusTaskIds((currentIds) => currentIds.filter((taskId) => taskId !== id))
    }
  }

  async function handleDeleteTask(taskId) {
    if (deletingTaskIds.includes(taskId)) return

    setDeleteTaskError('')
    setDeletingTaskIds((currentIds) => [...currentIds, taskId])
    try {
      await deleteTask(taskId)
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId))
    } catch {
      setDeleteTaskError('Nepavyko ištrinti užduoties. Bandykite dar kartą.')
    } finally {
      setDeletingTaskIds((currentIds) => currentIds.filter((id) => id !== taskId))
    }
  }

  return (
    <main className="tasks-page">
      <div className="tasks-page__top-bar">
        <a className="tasks-page__back" href="/">
          Back to Home
        </a>
        <button className="tasks-page__logout" type="button" onClick={onLogout}>
          Log off
        </button>
      </div>
      <h1>Task Manager</h1>
      <form className="tasks-form" onSubmit={handleAddTask}>
        <input
          type="text"
          value={taskName}
          onChange={(event) => {
            setTaskName(event.target.value)
            if (event.target.value.trim()) setTaskNameError('')
          }}
          placeholder="Enter task name"
          aria-label="Enter task name"
          aria-invalid={Boolean(taskNameError)}
          aria-describedby={taskNameError ? 'task-name-error' : undefined}
        />
        <button type="submit" disabled={isAddingTask}>
          {isAddingTask ? 'Adding…' : 'Add Task'}
        </button>
      </form>
      {taskNameError && (
        <p className="tasks-form__error" id="task-name-error" role="alert">
          {taskNameError}
        </p>
      )}
      {addTaskError && <p role="alert">{addTaskError}</p>}
      {deleteTaskError && <p role="alert">{deleteTaskError}</p>}
      {statusTaskError && <p role="alert">{statusTaskError}</p>}
      <div className="tasks-filters" aria-label="Filter tasks by status">
        {taskFilters.map((filter) => (
          <button
            className={`tasks-filters__button${selectedFilter === filter ? ' tasks-filters__button--active' : ''}`}
            type="button"
            key={filter}
            aria-pressed={selectedFilter === filter}
            onClick={() => setSelectedFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
      <table className="tasks-table">
        <thead>
          <tr>
            <th scope="col">Task Name</th>
            <th scope="col">Status</th>
            <th scope="col" aria-label="Delete task"></th>
          </tr>
        </thead>
        <tbody>
          {isLoadingTasks ? (
            <tr><td colSpan="3">Kraunamos užduotys…</td></tr>
          ) : loadTasksError ? (
            <tr><td colSpan="3" role="alert">{loadTasksError}</td></tr>
          ) : filteredTasks.length === 0 ? (
            <tr><td colSpan="3">Užduočių nėra.</td></tr>
          ) : (
            filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>{task.title}</td>
                <td>
                  <select
                    className="tasks-status"
                    value={task.status}
                    disabled={statusTaskIds.includes(task.id)}
                    onChange={(event) =>
                      handleStatusChange(task.id, event.target.value)
                    }
                    aria-label={`Status for ${task.title}`}
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </td>
                <td className="tasks-table__actions">
                  <button
                    className="tasks-delete-button"
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    disabled={deletingTaskIds.includes(task.id)}
                    aria-label={`Delete ${task.title}`}
                    title="Delete task"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M4 7h16M10 11v6m4-6v6M5.5 7l1 14h11l1-14M9 7V4h6v3" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </main>
  )
}

export default TasksPage

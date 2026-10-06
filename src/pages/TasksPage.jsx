import { useEffect, useState } from 'react'
import './TasksPage.css'

const STORAGE_KEY = 'task-manager-tasks'

const initialTasks = [
  {
    id: 1,
    title: 'Learn React',
    status: 'Todo',
  },
  {
    id: 2,
    title: 'Build Vite App',
    status: 'In Progress',
  },
  {
    id: 3,
    title: 'Deploy App',
    status: 'Done',
  },
]

const taskFilters = ['All', 'Todo', 'In Progress', 'Done']
const validStatuses = ['Todo', 'In Progress', 'Done']

function loadTasks() {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY)
    if (!savedTasks) return initialTasks

    const parsedTasks = JSON.parse(savedTasks)
    const isValidTasks =
      Array.isArray(parsedTasks) &&
      parsedTasks.every(
        (task) =>
          task &&
          (typeof task.id === 'number' || typeof task.id === 'string') &&
          typeof task.title === 'string' &&
          validStatuses.includes(task.status)
      )

    return isValidTasks ? parsedTasks : initialTasks
  } catch {
    return initialTasks
  }
}

function TasksPage() {
  const [tasks, setTasks] = useState(loadTasks)
  const [taskName, setTaskName] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // Keep the page usable if browser storage is unavailable.
    }
  }, [tasks])

  const filteredTasks =
    selectedFilter === 'All'
      ? tasks
      : tasks.filter((task) => task.status === selectedFilter)

  function handleAddTask(event) {
    event.preventDefault()

    if (!taskName.trim()) return

    setTasks((currentTasks) => [
      ...currentTasks,
      {
        id: Date.now(),
        title: taskName,
        status: 'Todo',
      },
    ])
    setTaskName('')
  }

  function handleStatusChange(id, newStatus) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    )
  }

  return (
    <main className="tasks-page">
      <a className="tasks-page__back" href="/">
        Back to Home
      </a>
      <h1>Task Manager</h1>
      <form className="tasks-form" onSubmit={handleAddTask}>
        <input
          type="text"
          value={taskName}
          onChange={(event) => setTaskName(event.target.value)}
          placeholder="Enter task name"
          aria-label="Enter task name"
        />
        <button type="submit">Add Task</button>
      </form>
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
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>
                <select
                  className="tasks-status"
                  value={task.status}
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
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default TasksPage

import { useState } from 'react'
import './TasksPage.css'

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

function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks)
  const [taskName, setTaskName] = useState('')

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
      <table className="tasks-table">
        <thead>
          <tr>
            <th scope="col">Task Name</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default TasksPage

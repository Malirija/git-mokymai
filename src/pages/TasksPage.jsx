import './TasksPage.css'

const tasks = [
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
  return (
    <main className="tasks-page">
      <a className="tasks-page__back" href="/">
        Back to Home
      </a>
      <h1>Task Manager</h1>
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

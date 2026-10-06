import './StatusSummary.css'

function StatusSummary({ rows }) {
  const statuses = ['Aktyvus', 'Neaktyvus', 'Laukiantis']

  return (
    <section className="status-summary" aria-labelledby="status-summary-title">
      <h3 id="status-summary-title">Įrašai pagal statusą</h3>
      <ul className="status-summary__list">
        {statuses.map((status) => (
          <li className="status-summary__item" key={status}>
            <span>{status}</span>
            <strong>{rows.filter((row) => row.status === status).length}</strong>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default StatusSummary
